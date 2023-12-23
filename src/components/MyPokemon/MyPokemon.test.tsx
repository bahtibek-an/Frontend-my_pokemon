import React from "react";
import userEvent from "@testing-library/user-event";
import { waitFor, render, cleanup } from "@testing-library/react";

import {
  PokemonProvider,
  useCreatePokemon,
  useDeletePokemon,
  usePokemon,
} from "./index";

afterEach(cleanup);

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => null),
      removeItem: jest.fn(() => null),
    },
    writable: true,
  });
});

const Mutator = () => {
  const { data } = usePokemon();
  const [create, { error: errCreate }] = useCreatePokemon();
  const [remove, { error: errRemove }] = useDeletePokemon();
  return (
    <>
      {errCreate && <span data-testid="errMessage">{errCreate}</span>}
      {errRemove && <span data-testid="errRemoveMessage">{errRemove}</span>}
      {data ? (
        <div>
          {Object.keys(data).map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
      ) : (
        <div>not found</div>
      )}
      <button
        onClick={() =>
          create("ivysaur", { id: 10, name: "ivysaur" }).catch(() => {})
        }
      >
        Add Ivysaur
      </button>
      <button
        onClick={() =>
          create("bulbasaur", { id: 11, name: "bulbasaur" }).catch(() => {})
        }
      >
        Add Bulbasaur
      </button>
      <button
        data-testid="removeBtn"
        onClick={() => {
          remove(Object.keys(data || {})?.[0]).catch(() => {});
        }}
      >
        Remove Pokemon
      </button>
    </>
  );
};

const App = () => {
  return (
    <PokemonProvider>
      <Mutator />
    </PokemonProvider>
  );
};

describe("MyPokemon", () => {
  it("Should show empty message on empty data", () => {
    const { getByText } = render(<App />);
    const el = getByText(/found/i);
    expect(el).toBeInTheDocument();
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
  });

  it("Should call localStorage getItem on render", () => {
    render(<App />);
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
  });

  it("Should call localStorage setItem on add create and show error on duplicate", async () => {
    const { getByTestId, getByText, getAllByText } = render(<App />);
    const [btn1, btn2] = getAllByText(/add/i);
    expect(btn1).toBeInTheDocument();

    userEvent.click(btn1);
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      "my-pokemon",
      JSON.stringify({
        ivysaur: {
          id: 10,
          name: "ivysaur",
        },
      })
    );

    // check existence of data just added
    const pokelist = getByText(/ivysaur/);
    expect(pokelist).toBeInTheDocument();

    // try to add same pokemon with same nickname
    userEvent.click(btn1);
    const err = getByTestId("errMessage");
    expect(err).toBeInTheDocument();

    // try to add another pokemon
    userEvent.click(btn2);
    // check existence of data just added
    expect(getByText(/bulbasaur/)).toBeInTheDocument();

    // try to delete pokemon
    const removeBtn = getByTestId("removeBtn");
    userEvent.click(removeBtn);
    userEvent.click(removeBtn);
    await waitFor(() => expect(getByText(/found/i)).toBeInTheDocument());

    // try to delete pokemon twice
    const invalidRemove = getByTestId("removeBtn");
    userEvent.click(invalidRemove);
    expect(getByTestId("errRemoveMessage")).toBeInTheDocument();
  });
});
