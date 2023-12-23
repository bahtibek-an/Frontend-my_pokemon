import { useState } from "react";
import { usePokemon } from "./MyPokemon";

import { HandleCreate, UseCreatePokemon } from "./types";

export default function useCreatePokemon(): UseCreatePokemon {
  const [status, setStatus] = useState<string | null>(null);
  const { create } = usePokemon();
  const error = status && status !== "loading" ? status : null;

  const handleCreate: HandleCreate = (name, pokemon) =>
    new Promise((resolve, reject) => {
      try {
        setStatus("loading");
        const result = create(name, pokemon);
        setStatus(null);
        resolve(result);
      } catch (error) {
        setStatus(error.message);
        reject(error);
      }
    });

  return [handleCreate, { loading: status === "loading", error }];
}
