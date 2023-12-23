/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { ImageProps } from "./types";

export default function Image({ src, alt, sx }: ImageProps) {
  return <img src={src} alt={alt} css={{ ...sx }} />;
}

Image.defaultProps = {
  sx: {},
};
