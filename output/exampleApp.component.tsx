import React from "react";

const ExampleAppComponent = () => {
  return (
    <main>
      <h1>Example file to show data-test-id assigning</h1>
      <aside>
        <table data-test-id="example-app.component_table_0">
          <thead data-test-id="example-app.component_thead_1">
            <th>column 1</th>
            <th>column 2</th>
          </thead>
          <tbody data-test-id="example-app.component_tbody_2">
            <tr>
              <td>val a1</td>
              <td>val b1</td>
            </tr>
            <tr>
              <td>val a2</td>
              <td>val b2</td>
            </tr>
          </tbody>
        </table>
      </aside>
      <form data-test-id="example-app.component_form_3">
        <img src="" alt="profile picture" data-test-id="example-app.component_img_4" />
        <input type="text" name="name" data-test-id="example-app.component_input_5">
          <label data-test-id="example-app.component_label_6">name</label>
        </input>
        <label for="date-input" data-test-id="example-app.component_label_7">Birth date</label>
        <input
          id="date-input"
          type="date"
          name="birth date"
          data-test-id="example-app.component_input_8" />
        <button type="submit" data-test-id="example-app.component_button_9">submit form</button>
      </form>
    </main>
  );
};

export default ExampleAppComponent;
