import { render, screen } from "@testing-library/react";
import App from "./App";

test("check headings text 'Profit & Loss'", () => {
  render(<App />);
  const thHeadings = screen.getAllByText("Profit & Loss");
  expect(thHeadings).toHaveLength(2);
});
