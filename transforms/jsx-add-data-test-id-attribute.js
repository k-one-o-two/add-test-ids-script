const allNativeAreLowercase = (el) => {
  const name = el.name.name[0];
  return name === name.toLowerCase();
};

/**
 * @param {InputFile} file
 * @param {typeof import("jscodeshift")} j
 * @param {string[]} htmlTagList
 * @param {string} testAttribute - default value "data-test-id"
 * */
function addTestIds(file, j, htmlTagList, testAttribute = "data-test-id") {
  const isHtmlTag = htmlTagList?.length
    ? (el) => htmlTagList.includes(el.name.name)
    : allNativeAreLowercase;

  const testIdExists = (openingElement) =>
    openingElement.attributes.some(
      (attribute) => attribute?.name?.name === testAttribute
    );

  const memo = {}
  /** @type {function(el: import('jscodeshift).Node): string}*/
  const testIdName = (el) => {
    const name = file.name + `--${el.name.name}-`;
    if (memo[name] !== undefined) {
      memo[name]++;
    } else {
      memo[name] = 0;
    }
    return name + memo[name]
  };

  /** @type {import("jscodeshift").Collection} Collection */
  const jsxElements = j(file.source).find(j.JSXElement);

  return jsxElements
    .forEach((p) => {
      const openingElement = p.node.openingElement;
      if (isHtmlTag(openingElement)) {
        // only add the attribute if id does not already exist
        if (!testIdExists(openingElement)) {
          j(p).replaceWith(
            j.jsxElement(
              j.jsxOpeningElement(
                j.jsxIdentifier(openingElement.name.name),
                openingElement.attributes.concat(
                  j.jsxAttribute(
                    j.jsxIdentifier(testAttribute),
                    j.literal(testIdName(openingElement))
                  )
                ),
                openingElement.selfClosing
              ),
              p.node.closingElement,
              p.node.children
            )
          );
        }
      }
    })
    .toSource();
}

module.exports.addTestIds = addTestIds;
