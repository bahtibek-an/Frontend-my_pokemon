import { useState } from "react";
import { Box } from "../commons/Box";
import { Text } from "../commons/Text";
import { TextInput } from "../commons/TextInput";
import { PokeAddProps } from "./types";
import Button from "../commons/Button/Button";
import useCreatePokemon from "../MyPokemon/useCreatePokemon";

export default function PokeAddForm({ pokemon, onSuccess }: PokeAddProps) {
  const [name, setName] = useState("");
  const [create, { loading, error }] = useCreatePokemon();

  const onSubmit = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      const result = await create(name, pokemon);
      onSuccess(result);
    } catch (_) {}
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  return (
    <form onSubmit={onSubmit} data-testid="add-pokemon-form">
      <Box sx={{ mt: 500 }}>
        <Text as="label" sx={{ mb: 300 }} htmlFor="name">
          Now enter your {pokemon.name} nickname
        </Text>
        <TextInput id="name" name="name" onChange={handleChange} />
        {error && <Text sx={{ mt: 300, color: "text-error" }}>{error}</Text>}
      </Box>
      <Box>
        <Button
          type="submit"
          loading={loading}
          label="Submit"
          sx={{ mt: 500 }}
        />
      </Box>
    </form>
  );
}
