import "@emotion/react";
import { ThemeProps } from "./constants/theme";

declare module "@emotion/react" {
  export interface Theme extends ThemeProps {}
}
