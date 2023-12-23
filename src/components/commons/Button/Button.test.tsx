import React from "react";
import userEvent from "@testing-library/user-event";

import { render, cleanup } from "../../../utils/test-utils";
import Button from "./Button";

afterEach(cleanup);

const defaultProps = {
  onClick: jest.fn(),
  label: "Push Me",
};

describe("Button", () => {
  it("Should not fire event onClick on disabled", () => {
    const { getByText } = render(<Button disabled {...defaultProps} />);
    const btn = getByText(defaultProps.label);

    userEvent.click(btn);
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });

  it("Should fire event onClick", () => {
    const { getByText } = render(<Button {...defaultProps} />);
    const btn = getByText(defaultProps.label);
    expect(btn).toBeInTheDocument();

    userEvent.click(btn);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});
