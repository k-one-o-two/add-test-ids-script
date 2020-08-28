import React from "react";

const ExampleAppComponent = () => {
  return (
    <main>
      <h1>Example file to show data-test-id assigning</h1>
      <aside>
        <table data-test-id="example-app.component--table-0">
          <thead data-test-id="example-app.component--thead-0">
            <th>column 1</th>
            <th>column 2</th>
          </thead>
          <tbody data-test-id="example-app.component--tbody-0">
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
      <form data-test-id="example-app.component--form-0">
        <img src="" alt="profile picture" data-test-id="example-app.component--img-0" />
        <input type="text" name="name" data-test-id="example-app.component--input-0">
          <label data-test-id="example-app.component--label-0">name</label>
        </input>
        <label for="date-input" data-test-id="example-app.component--label-1">Birth date</label>
        <input
          id="date-input"
          type="date"
          name="birth date"
          data-test-id="example-app.component--input-1" />
        <button type="submit" data-test-id="example-app.component--button-0">submit form</button>
      </form>
    </main>
  );
};

export default ExampleAppComponent;
