import React from "react";
import renderer from "react-test-renderer";

import App from "../App";

// TODO: Is it better way or not?

describe("snapshot testing", () => {
  test("renders when there are no items", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot(`<div />`);
  });
});
