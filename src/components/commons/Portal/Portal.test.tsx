import { render } from "../../../utils/test-utils";
import Portal from "./Portal";

describe("Portal", () => {
  it("should render component inside Portal correctly", () => {
    const { getByText } = render(
      <Portal>
        <span>This is portal</span>
      </Portal>
    );
    expect(getByText("This is portal")).toBeInTheDocument();
  });
});
