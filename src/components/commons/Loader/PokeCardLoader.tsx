/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { spacing } from "../../../utils/theme";
import { shimmer } from "./styles";

interface PokeCardLoaderProps {
  length: number;
}

export default function PokeCardLoader({ length }: PokeCardLoaderProps) {
  return (
    <Container>
      {[...new Array(length)].map((_, index) => (
        <Loader key={index} css={shimmer} />
      ))}
    </Container>
  );
}

PokeCardLoader.defaultProps = {
  length: 4,
};

const Container = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-gap: ${spacing(500)};
`;

const Loader = styled.div`
  display: block;
  min-height: 150px;
  border-radius: 8px;
`;
