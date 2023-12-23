import { ThemeProps } from "../../../constants/theme";
import { StyledProps } from "../types";

export interface TextProps {
  variant: keyof ThemeProps["fontVariant"];
  children: React.ReactNode;
  sx: StyledProps;
  as?: keyof JSX.IntrinsicElements;
  htmlFor?: string;
}
