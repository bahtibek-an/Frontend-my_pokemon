/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { spacing } from "../../../utils/theme";
import { TextProps } from "./types";

export default function Text({ variant, children, sx, ...rest }: TextProps) {
  const { fontVariant, breakpoint, color: colors, ...theme } = useTheme();
  const { m, mt, mb, mr, ml, color = "text-1", ...restOfSx } = sx;
  return (
    <TextComponent
      css={{
        ...fontVariant[variant].mobile,
        [breakpoint.tablet]: {
          ...fontVariant[variant].tablet,
        },
        color: colors[color],
        ...(m && { margin: spacing(m)({ theme }) }),
        ...(mt && { marginTop: spacing(mt)({ theme }) }),
        ...(mb && { marginBottom: spacing(mb)({ theme }) }),
        ...(ml && { marginLeft: spacing(ml)({ theme }) }),
        ...(mr && { marginRight: spacing(mr)({ theme }) }),
        ...restOfSx,
      }}
      {...rest}
    >
      {children}
    </TextComponent>
  );
}

Text.defaultProps = {
  variant: "default",
  sx: {},
};

const TextComponent = styled.span``;
