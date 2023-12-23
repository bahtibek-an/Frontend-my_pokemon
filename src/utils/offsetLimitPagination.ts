import { FieldPolicy } from "@apollo/client";

export default function offsetLimitPagination(): FieldPolicy {
  return {
    keyArgs: false,
    merge(existing, incoming, params) {
      if (!incoming) {
        return existing;
      }
      const { args } = params || {};
      const { offset = 0 } = args || {};
      const existingResults = existing?.results || [];
      const incomingResults = incoming.results;
      const merged = existingResults.slice(0);
      for (let i = 0; i < incomingResults.length; ++i) {
        merged[offset + i] = incomingResults[i];
      }
      return {
        ...incoming,
        results: merged,
      } as const;
    },
  };
}
