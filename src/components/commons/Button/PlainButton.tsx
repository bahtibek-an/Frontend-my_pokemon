/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { spacing } from "../../../utils/theme";
import { PlainButtonProps } from "./types";

export default function PlainButton({
  children,
  type,
  disabled,
  onClick,
  sx,
  ...rest
}: PlainButtonProps) {
  const theme = useTheme();

  const { m, mt, mb, mr, ml, ...restOfSx } = sx;

  return (
    <button
      type={type}
      onClick={disabled ? () => {} : onClick}
      css={{
        display: "flex",
        padding: 0,
        border: "none",
        cursor: "pointer",
        background: "transparent",
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
    </button>
  );
}

PlainButton.defaultProps = {
  disabled: false,
  onClick: () => {},
  sx: {},
  type: "button",
};
