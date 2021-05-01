import { render, screen } from '@testing-library/react';
import App from './App';
import renderer from "react-test-renderer";

test('getbytext', () => {
  render(<App />);
  const linkElement = screen.getByText(/Media Panel/i);
  expect(linkElement).toBeInTheDocument();
});

if("renders without crashing", ()=> {
  const div = document.createElement("div");
  ReactDOM.render(<img />, div);
})

describe("snapshot testing", () => {
  test("renders when there are no items", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot(`<div />`);
  });
});
