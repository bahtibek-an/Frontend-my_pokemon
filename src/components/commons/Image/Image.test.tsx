import React from "react";
import { render } from "../../../utils/test-utils";
import Image from "./Image";

describe("Image", () => {
  it("should render <Image /> correctly", () => {
    const { getByAltText } = render(
      <Image src="https://via.placeholder.com/100" alt="example" />
    );
    expect(getByAltText("example")).toBeInTheDocument();
    expect(getByAltText("example")).toHaveAttribute(
      "src",
      "https://via.placeholder.com/100"
    );
  });
});
