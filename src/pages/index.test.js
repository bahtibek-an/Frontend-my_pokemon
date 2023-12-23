import React from "react";
import userEvent from "@testing-library/user-event";
import { render, waitFor, screen, cleanup } from "../utils/test-utils";

import Home from "./index";
import { GET_POKEMONS } from "../query";
import { InMemoryCache } from "@apollo/client";
import offsetLimitPagination from "../utils/offsetLimitPagination";

const pokemons = {
  count: 2,
  nextOffset: 1,
  prevOffset: 0,
  results: [
    {
      name: "bulbasaur",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      id: 1,
      __typename: "PokemonItem",
    },
  ],
  __typename: "PokemonList",
};

const morePokemons = {
  count: 2,
  nextOffset: 0,
  prevOffset: 1,
  results: [
    {
      name: "toxtricity-low-key-gmax",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10220.png",
      id: 10220,
      __typename: "PokemonItem",
    },
  ],
  __typename: "PokemonList",
};

const mocks = [
  {
    request: {
      query: GET_POKEMONS,
      variables: {
        offset: 0,
        limit: 10,
      },
    },
    result: {
      data: {
        pokemons,
      },
    },
  },
  {
    request: {
      query: GET_POKEMONS,
      variables: {
        offset: 1,
        limit: 10,
      },
    },
    result: {
      data: {
        pokemons: morePokemons,
      },
    },
  },
];

const errorMocks = {
  request: {
    query: GET_POKEMONS,
    variables: {
      offset: 0,
      limit: 10,
    },
  },
  error: new Error("Oops something went wrong"),
};

let cache = null;

describe("pokemon home page integration test", () => {
  afterEach(cleanup);

  // prepare mock local storage
  // and cache for each individual test
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
        removeItem: jest.fn(() => null),
      },
      writable: true,
    });
    cache = new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            pokemons: offsetLimitPagination(),
          },
        },
      },
    });
  });

  test("success render pokemons data", async () => {
    const { getByTestId, getByText } = render(
      <Home apolloMockForTestOnly={mocks} cache={cache} />
    );

    // expect loading UI shown
    expect(getByText(/loading/i)).toBeInTheDocument();

    // wait until next render
    await waitFor(() => screen.getByTestId("pokemon-list"));

    // expect pokemon data rendered successfully
    expect(getByTestId("pokemon-list")).not.toBeEmptyDOMElement();

    // expect show more button to appear if data is not at limit
    const btnMore = getByText(/show more/i);
    expect(btnMore).toBeInTheDocument();

    // click show more button
    userEvent.click(btnMore);

    // wait until new pokemon fetched and shown
    await waitFor(() =>
      expect(getByText(/toxtricity-low-key-gmax/i)).toBeInTheDocument()
    );

    // expect previous pokemon not disappear after fetch more
    expect(getByText(/bulbasaur/i)).toBeInTheDocument();
  });

  test("show error UI", async () => {
    const { getByText } = render(
      <Home apolloMockForTestOnly={[errorMocks]} cache={cache} />
    );

    // wait until next render and expect error from query
    await waitFor(() =>
      expect(getByText(/something went wrong/i)).toBeInTheDocument()
    );
  });
});
