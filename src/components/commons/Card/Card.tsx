/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import styled from "@emotion/styled";

import { shadow } from "../../../utils/theme";
import { CardProps } from "./types";

export default function Card({ children, sx }: CardProps) {
  const { backgroundColor = "ui-1", ...restOfSx } = sx;
  const { color } = useTheme();
  return (
    <StyledCard
      css={{
        backgroundColor: color[backgroundColor],
        ...restOfSx,
      }}
    >
      {children}
    </StyledCard>
  );
}

Card.defaultProps = {
  sx: {},
};

const StyledCard = styled.div`
  position: relative;
  box-shadow: ${shadow(200)};
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  min-height: 130px;
`;
