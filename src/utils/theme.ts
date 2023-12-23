import { ThemeData, ThemeProps } from "../constants/theme";

/**
 *
 * @param {string} bp
 * breakpoint that works for min-width only following
 * mobile-first concept.
 */
export function breakpoint(bp: keyof ThemeProps["breakpoint"]) {
  return (style: TemplateStringsArray) => {
    return (props: ThemeData) => {
      const { breakpoint } = props.theme || {};
      return `${breakpoint?.[bp]} {
          ${style[0]}
        }
      `;
    };
  };
}

export function spacing(space: keyof ThemeProps["spacing"]) {
  return (props: ThemeData) => {
    return props.theme.spacing?.[space];
  };
}

export function shadow(shade: keyof ThemeProps["shadow"]) {
  return (props: ThemeData) => {
    return props.theme.shadow?.[shade];
  };
}

export function color(color: keyof ThemeProps["color"]) {
  return (props: ThemeData) => {
    return props.theme.color?.[color];
  };
}
