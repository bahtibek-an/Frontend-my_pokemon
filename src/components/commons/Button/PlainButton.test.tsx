import React from "react";
import userEvent from "@testing-library/user-event";

import { render, cleanup } from "../../../utils/test-utils";
import PlainButton from "./PlainButton";

afterEach(cleanup);

const defaultProps = {
  onClick: jest.fn(),
  children: "Push Me",
};

describe("PlainButton", () => {
  it("Should not fire event onClick on disabled", () => {
    const { getByText } = render(<PlainButton disabled {...defaultProps} />);
    const btn = getByText(defaultProps.children);

    userEvent.click(btn);
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });

  it("Should fire event onClick", () => {
    const { getByText } = render(<PlainButton {...defaultProps} />);
    const btn = getByText(defaultProps.children);
    expect(btn).toBeInTheDocument();

    userEvent.click(btn);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});
