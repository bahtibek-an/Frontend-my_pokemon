import { render } from "../../../utils/test-utils";
import Badge from "./Badge";

describe("Badge", () => {
  it("should render Badge correctly", () => {
    const { getByText } = render(<Badge title="This is Badge" />);
    expect(getByText(/badge/i)).toBeInTheDocument();
  });
});
