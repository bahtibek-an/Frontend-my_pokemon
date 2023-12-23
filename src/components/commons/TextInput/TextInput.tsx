/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { spacing, color } from "../../../utils/theme";
import { TextInputProps } from "./types";

export default function TextInput({ name, required, onChange, ...rest }: TextInputProps) {
  const theme = useTheme();
  return (
    <input
      name={name}
      onChange={onChange}
      type="text"
      css={{
        paddingTop: spacing(300)({ theme }),
        paddingBottom: spacing(300)({ theme }),
        paddingLeft: spacing(500)({ theme }),
        paddingRight: spacing(500)({ theme }),
        borderRadius: spacing(300)({ theme }),
        border: `1px solid ${color("ui-4")({ theme })}`,
        ...theme.fontVariant.default.mobile,
        [theme.breakpoint.tablet]: {
          ...theme.fontVariant.default.tablet,
        },
      }}
      required={required}
      {...rest}
    />
  );
}

TextInput.defaultProps = {
  required: false,
};
