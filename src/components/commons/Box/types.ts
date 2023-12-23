import { ThemeProps } from "../../../constants/theme";
import { StyledProps } from "../types";

interface SX extends Omit<StyledProps, "boxShadow"> {
  boxShadow?: keyof ThemeProps["shadow"];
}

export interface BoxProps {
  children?: React.ReactNode;
  sx: SX;
  as?: keyof JSX.IntrinsicElements;
  role?: string;
  tabIndex?: number;
}
