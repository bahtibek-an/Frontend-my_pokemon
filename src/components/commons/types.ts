import { CSSProperties } from "react";
import { ThemeProps } from "../../constants/theme";

type Spacing = keyof ThemeProps["spacing"];
type Color = keyof ThemeProps["color"];

export interface StyledProps extends CSSProperties {
  m?: Spacing;
  mt?: Spacing;
  mb?: Spacing;
  mr?: Spacing;
  ml?: Spacing;
  p?: Spacing;
  pt?: Spacing;
  pb?: Spacing;
  pl?: Spacing;
  pr?: Spacing;
  color?: Color;
  backgroundColor?: Color;
}
