import { useHistory } from "react-router-dom";

import { Text } from "../commons/Text";
import { Box } from "../commons/Box";
import Button from "../commons/Button/Button";
import { PokeAddSuccessProps } from "./types";

export default function PokeAddSuccess({ handleClose }: PokeAddSuccessProps) {
  let history = useHistory();
  const gotoPokebag = () => {
    history.push("/pokebag");
  };
  return (
    <>
      <Text variant="heading">
        Your Pokemon is safe and sound in your pokebag.
      </Text>
      <Box sx={{ mt: 500, flexDirection: "row" }}>
        <Button
          label="Close"
          onClick={handleClose}
          sx={{ flex: 1 }}
          variant="secondary"
        />
        <Box sx={{ width: "1rem" }} />
        <Button label="See PokeBag" onClick={gotoPokebag} sx={{ flex: 1 }} />
      </Box>
    </>
  );
}
