/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { shimmer } from "./styles";

interface BlockLoaderProps {
  width: string;
  height: string;
}

export default function BlockLoader({ height, width }: BlockLoaderProps) {
  return (
    <div
      css={css`
        ${shimmer};
        display: block;
        border-radius: 8px;
        height: ${height};
        width: ${width};
      `}
    />
  );
}

BlockLoader.defaultProps = {
  height: "100px",
  width: "auto",
};
