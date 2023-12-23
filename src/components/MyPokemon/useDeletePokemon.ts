import { useState } from "react";
import { usePokemon } from "./MyPokemon";

import { HandleRemove, UseDeletePokemon } from "./types";

export default function useDeletePokemon(): UseDeletePokemon {
  const [status, setStatus] = useState<string | null>(null);
  const { remove } = usePokemon();
  const error = status && status !== "loading" ? status : null;

  const handleRemove: HandleRemove = (name) =>
    new Promise((resolve, reject) => {
      try {
        setStatus("loading");
        const result = remove(name);
        setStatus(null);
        resolve(result);
      } catch (error) {
        setStatus(error.message);
        reject(error);
      }
    });

  return [handleRemove, { loading: status === "loading", error }];
}
