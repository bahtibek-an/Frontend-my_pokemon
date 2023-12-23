import React from "react";
import { render } from "../../../utils/test-utils";
import Page from "./Page";

describe("Page", () => {
  it("should render <Page /> correctly", () => {
    const { getByText } = render(<Page title="Heading">example</Page>);
    expect(getByText("example")).toBeInTheDocument();
    expect(getByText(/heading/i)).toBeInTheDocument();
  });

  it("should not render title", () => {
    const { getByText, queryByRole } = render(<Page>example</Page>);
    expect(getByText("example")).toBeInTheDocument();
    expect(queryByRole("title")).not.toBeInTheDocument();
  });
});
