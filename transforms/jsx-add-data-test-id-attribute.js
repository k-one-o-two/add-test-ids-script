const allNativeAreLowercase = (el) => {
  const name = el.name.name[0];
  return name === name.toLowerCase();
};

/**
 * @param {InputFile} file
 * @param {typeof import("jscodeshift")} j
 * @param {string[]} htmlTagList
 * */
function addTestIds(file, j, htmlTagList) {
  const isHtmlTag = htmlTagList?.length
    ? (el) => htmlTagList.includes(el.name.name)
    : allNativeAreLowercase;

  const testIdExists = (openingElement) =>
    openingElement.attributes.some(
      (attribute) => attribute?.name?.name === "data-test-id"
    );

  let i = 0;
  /** @type {function(el: import('jscodeshift).Node): string}*/
  const testIdName = (el) => file.name + `_${el.name.name}_`;

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
                    j.jsxIdentifier("data-test-id"),
                    j.literal(testIdName(openingElement) + i++)
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
