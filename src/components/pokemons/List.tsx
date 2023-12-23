import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import { ListProps } from "./types";
import { breakpoint, spacing } from "../../utils/theme";
import { PokeCard } from "../commons/PokeCard";
import useDeletePokemon from "../MyPokemon/useDeletePokemon";

export default function List({ data, isPokeBag }: ListProps) {
  const [remove] = useDeletePokemon();

  const handleDelete = (name: string) => {
    remove(name).catch(() => {});
  };

  return (
    <Container data-testid="pokemon-list">
      {data?.map(({ id, image, name, nickname }) => {
        let props;
        if (isPokeBag) {
          props = {
            name: nickname || "",
            subname: name,
            onClickDelete: handleDelete,
          };
        } else {
          props = {
            name,
          };
        }
        return (
          <Link
            key={id}
            to={{
              pathname: `/${name}`,
              state: { image: image },
            }}
          >
            <PokeCard image={image} {...props} />
          </Link>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-gap: ${spacing(500)};
  margin-bottom: 1rem;

  ${breakpoint("tablet")`
    grid-template-columns: repeat(2, minmax(0, 1fr));
  `}
`;
