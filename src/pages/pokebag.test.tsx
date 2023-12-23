import React from "react";
import userEvent from "@testing-library/user-event";
import { render, waitFor, screen, cleanup } from "../utils/test-utils";

import Pokebag from "./pokebag";

const dummyPokemon =
  '{"warta":{"id": 99,"name":"wartortle","image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png"}}';

afterEach(cleanup);

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(() => dummyPokemon),
      setItem: jest.fn(() => null),
      removeItem: jest.fn(() => null),
    },
    writable: true,
  });
});

describe("Pokebag page", () => {
  it("Should show caught pokemon", async () => {
    const { getByText } = render(<Pokebag />);
    // expect initial pokemon fetch from mock local storage to be shown
    await waitFor(() => expect(getByText(/warta/i)).toBeInTheDocument());
  });

  it("Should be able to delete", async () => {
    const { getAllByTestId, queryByText } = render(<Pokebag />);
    // expect initial pokemon fetch from mock local storage to be shown
    await waitFor(() => screen.getByText(/warta/i));

    // probably return more than 1 remove button so we use getAllby
    // and click the first remove button
    const [removeBtn] = getAllByTestId("delete-pokemon-btn");
    userEvent.click(removeBtn);

    // expect warta no longer appear on dom
    await waitFor(() => expect(queryByText(/warta/i)).not.toBeInTheDocument());
  });
});
