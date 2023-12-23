/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";

import { shadow, spacing, color } from "../../../utils/theme";
import { BoxProps } from "./types";

export default function Box({ children, sx, ...rest }: BoxProps) {
  const {
    m,
    mt,
    mb,
    ml,
    mr,
    p,
    pt,
    pb,
    pl,
    pr,
    display = "flex",
    flexDirection = "column",
    boxShadow,
    backgroundColor = "transparent",
    ...restOfSx
  } = sx;
  const theme = useTheme();
  return (
    <div
      css={{
        ...(m && { margin: spacing(m)({ theme }) }),
        ...(mt && { marginTop: spacing(mt)({ theme }) }),
        ...(mb && { marginBottom: spacing(mb)({ theme }) }),
        ...(ml && { marginLeft: spacing(ml)({ theme }) }),
        ...(mr && { marginRight: spacing(mr)({ theme }) }),
        ...(p && { padding: spacing(p)({ theme }) }),
        ...(pt && { paddingTop: spacing(pt)({ theme }) }),
        ...(pb && { paddingBottom: spacing(pb)({ theme }) }),
        ...(pl && { paddingLeft: spacing(pl)({ theme }) }),
        ...(pr && { paddingRight: spacing(pr)({ theme }) }),
        display: display,
        flexDirection: flexDirection,
        ...(boxShadow && { boxShadow: shadow(boxShadow)({ theme }) }),
        backgroundColor: color(backgroundColor)({ theme }),
        ...restOfSx,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

Box.defaultProps = {
  sx: {},
};
