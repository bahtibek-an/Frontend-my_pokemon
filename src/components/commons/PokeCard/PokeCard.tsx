import { lazy } from "react";
import { Card } from "../Card";
import { Text } from "../Text";
import { Image } from "../Image";
import Delete from "../../../assets/delete.svg";
import { PokeCardProps } from "./types";

const PlainButton = lazy(
  () =>
    import(
      /* webpackChunkName: "poke-card-delete-button" */ "../Button/PlainButton"
    )
);
const Box = lazy(
  () => import(/* webpackChunkName: "poke-card-box" */ "../Box/Box")
);

export default function PokeCard({
  image,
  name,
  subname,
  onClickDelete,
}: PokeCardProps) {
  const handleDelete = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!!onClickDelete) {
      onClickDelete(name);
    }
  };

  const imgAlt = subname
    ? `Detail Page Pokemon ${name} with name ${subname}`
    : `Detail Page Pokemon ${name}`;

  return (
    <Card sx={{ backgroundColor: "ui-1" }}>
      <Image
        src={image}
        alt={imgAlt}
        sx={{
          width: "100px",
          height: "100px",
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      />
      <Text
        variant="label"
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          textTransform: "capitalize",
        }}
      >
        {name}
      </Text>
      {!!subname && <Text sx={{ textTransform: "capitalize" }}>{subname}</Text>}

      {!!onClickDelete && (
        <Box sx={{ position: "absolute", bottom: "1rem", left: "1rem" }}>
          <PlainButton onClick={handleDelete} data-testid="delete-pokemon-btn">
            <Image
              src={Delete}
              alt={`Delete ${subname} with name ${name}`}
              sx={{ width: "20px", height: "20px" }}
            />
          </PlainButton>
        </Box>
      )}
    </Card>
  );
}
