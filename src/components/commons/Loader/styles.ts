import { css, keyframes } from "@emotion/react";

const placeholderShimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  
  100% {
    background-position: 468px 0; 
  }
`;

export const loaderPage = keyframes`
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
`;

export const shimmer = css`
  background: #fcfcfc;
  background-image: linear-gradient(
    to right,
    #fcfcfc 0%,
    #edeef1 20%,
    #fcfcfc 40%,
    #fcfcfc 100%
  );
  background-repeat: no-repeat;
  background-size: auto 200px;
  position: relative;

  -webkit-animation-duration: 1s;
  -webkit-animation-fill-mode: forwards;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-name: ${placeholderShimmer};
  -webkit-animation-timing-function: linear;
`;
