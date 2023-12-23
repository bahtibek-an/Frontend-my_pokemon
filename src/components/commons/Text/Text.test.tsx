import { render } from "../../../utils/test-utils";
import Text from "./Text";

describe("Text", () => {
  it("should render <Text /> correctly", () => {
    const { getByText } = render(<Text>example</Text>);
    expect(getByText("example")).toBeInTheDocument();
  });
});
