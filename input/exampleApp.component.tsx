import React from "react";

const ExampleAppComponent = () => {
  return (
    <main>
      <h1>Example file to show data-test-id assigning</h1>
      <aside>
        <table>
          <thead>
            <th>column 1</th>
            <th>column 2</th>
          </thead>
          <tbody>
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
      <form>
        <img src="" alt="profile picture"/>
        <input type="text" name="name">
          <label>name</label>
        </input>
        <label for="date-input">Birth date</label>
        <input id="date-input" type="date" name="birth date" />
        <button type="submit">submit form</button>
      </form>
    </main>
  );
};

export default ExampleAppComponent;
