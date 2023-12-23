/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme, css } from "@emotion/react";
import { color, spacing } from "../../../utils/theme";
import { ButtonProps } from "./types";

export default function Button({
  variant,
  loading,
  label,
  disabled,
  onClick,
  sx,
  type,
  ...rest
}: ButtonProps) {
  const theme = useTheme();

  const { m, mt, mb, mr, ml, ...restOfSx } = sx;

  const variants = {
    primary: {
      backgroundColor: color("interactive-1")({ theme }),
      color: color("text-4")({ theme }),
      border: `1px solid ${color("interactive-1")({ theme })}`,
      "&:hover": css({
        backgroundColor: color("interactive-1-hover")({ theme }),
      }),
      "&:active": css({
        backgroundColor: color("interactive-1-active")({ theme }),
      }),
    },
    secondary: {
      backgroundColor: color("text-4")({ theme }),
      color: color("interactive-1")({ theme }),
      border: `1px solid ${color("interactive-1")({ theme })}`,
      "&:hover": css({
        color: color("interactive-1-hover")({ theme }),
        border: `1px solid ${color("interactive-1-hover")({ theme })}`,
      }),
      "&:active": css({
        color: color("interactive-1-active")({ theme }),
        border: `1px solid ${color("interactive-1-active")({ theme })}`,
      }),
    },
  };

  return (
    <button
      onClick={disabled || loading ? () => {} : onClick}
      css={{
        ...(m && { margin: spacing(m)({ theme }) }),
        ...(mt && { marginTop: spacing(mt)({ theme }) }),
        ...(mb && { marginBottom: spacing(mb)({ theme }) }),
        ...(ml && { marginLeft: spacing(ml)({ theme }) }),
        ...(mr && { marginRight: spacing(mr)({ theme }) }),
        fontFamily: "Rubik, sans-serif",
        padding: spacing(500)({ theme }),
        borderRadius: "8px",
        cursor: "pointer",
        ...variants[variant],
        ...restOfSx,
      }}
      type={type}
      {...rest}
    >
      {label}
    </button>
  );
}

Button.defaultProps = {
  disabled: false,
  onClick: () => {},
  sx: {},
  variant: "primary",
  loading: false,
  type: "button",
};
