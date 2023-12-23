import styled from "@emotion/styled";
import { loaderPage } from "./styles";

export default function PageLoader() {
  return (
    <Container>
      <Loader>
        <div></div>
        <div></div>
        <div></div>
      </Loader>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  margin: 0px auto;
  padding: 16px 16px 32px;
  max-width: 480px;
  background-color: ${(props) => props.theme.color.background};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Loader = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  > div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 16px;
    background: #fff;
    animation: ${loaderPage} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;

    :nth-of-type(1) {
      left: 8px;
      animation-delay: -0.24s;
    }

    :nth-of-type(2) {
      left: 32px;
      animation-delay: -0.12s;
    }

    :nth-of-type(3) {
      left: 56px;
      animation-delay: 0;
    }
  }
`;
