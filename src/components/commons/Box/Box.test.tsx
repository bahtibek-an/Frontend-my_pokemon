import { render } from "../../../utils/test-utils";
import Box from "./Box";

describe("Box", () => {
  it("should render <Box /> correctly", () => {
    const { getByText } = render(<Box>example</Box>);
    expect(getByText("example")).toBeInTheDocument();
  });
});
