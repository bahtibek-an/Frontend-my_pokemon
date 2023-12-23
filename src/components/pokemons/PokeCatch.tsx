import { lazy, useState } from "react";
import { keyframes } from "@emotion/react";

import { Box } from "../commons/Box";
import { Image } from "../commons/Image";
import PlainButton from "../commons/Button/PlainButton";
import { Portal } from "../commons/Portal";
import PokeBall from "../../assets/pokeball.svg";
import { PokeCatchProps } from "./types";

const PokeModal = lazy(
  () => import(/* webpackChunkName: "poke-modal" */ "./PokeModal")
);

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`;

export default function PokeCatch({ name, image }: PokeCatchProps) {
  const [result, setResult] = useState<boolean | null>(null);

  const handleGatcha = () => {
    setResult(Math.random() < 0.5);
  };

  return (
    <Portal>
      {result !== null && (
        <PokeModal
          result={result}
          handleClose={() => {
            setResult(null);
          }}
          pokemon={{ name, image }}
        />
      )}
      {result === null && (
        <Box
          sx={{
            position: "fixed",
            bottom: "1rem",
            left: "calc(50vw - 30px)",
          }}
        >
          <PlainButton
            data-testid="catch-btn"
            sx={{
              animation: `${bounce} 1.5s ease-in-out infinite`,
              transformOrigin: "center bottom",
            }}
            onClick={handleGatcha}
          >
            <Image
              src={PokeBall}
              alt="Pokeball Button to Catch Pokemon"
              sx={{
                width: "60px",
                height: "60px",
              }}
            />
          </PlainButton>
        </Box>
      )}
    </Portal>
  );
}
