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
              <td>val 10 &euro; 20 &cent;</td>
              <td>val 1 &pound; 98 &cent;</td>
            </tr>
            <tr>
              <td>val 20 &#8364; 40 &#162;</td>
              <td>val 1 &#163; 99 &cent;</td>
            </tr>
          </tbody>
        </table>
      </aside>
      &nbsp;&nbsp;
      &nbsp;
      <form>
        <img src="" alt="profile picture"/>
        <input type="text" name="name">
          <label>&emsp;name</label>
        </input>
        <label for="date-input">Birth date</label>
        <input id="date-input" type="date" name="birth date" />
        <button type="submit">submit form</button>
      </form>
    </main>
  );
};

export default ExampleAppComponent;
