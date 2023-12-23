import React from "react";
import userEvent from "@testing-library/user-event";
import { render, waitFor, screen, cleanup } from "../utils/test-utils";

import Detail from "./detail";
import { GET_POKEMON } from "../query";

const pokemon = {
  id: 25,
  name: "pikachu",
  moves: [
    {
      move: {
        name: "mega-punch",
      },
    },
  ],
  types: [
    {
      type: {
        name: "electric",
      },
    },
  ],
};

const mocks = [
  {
    request: {
      query: GET_POKEMON,
      variables: {
        name: "pikachu",
      },
    },
    result: {
      data: {
        pokemon,
      },
    },
  },
];

describe("pokemon detail page integration test", () => {
  describe("test detail page", () => {
    test("success render pikachu data", async () => {
      const { getByTestId } = render(<Detail apolloMockForTestOnly={mocks} />, {
        route: "/pikachu",
        path: "/:id",
      });

      // wait until type-badges is filled with type badges
      await waitFor(() =>
        expect(getByTestId("type-badges")).not.toBeEmptyDOMElement()
      );

      // expect moves to shown on list
      expect(getByTestId("move-badges")).not.toBeEmptyDOMElement();
    });
  });

  describe("test success catch pokemon", () => {
    beforeEach(() => {
      jest.spyOn(global.Math, "random").mockReturnValue(0.2);
    });

    afterEach(() => {
      jest.spyOn(global.Math, "random").mockRestore();
      cleanup();
    });

    test("success catch pokemon", async () => {
      const { getByTestId, getByText, getByRole, queryByText } = render(
        <Detail apolloMockForTestOnly={mocks} />,
        {
          route: "/pikachu",
          path: "/:id",
        }
      );

      // wait until type-badges is filled with type badges
      await waitFor(() => screen.getByTestId("catch-btn"));

      // get catch button
      const btn = getByTestId("catch-btn");
      userEvent.click(btn);
      // pokemon caught
      await waitFor(() => {
        expect(getByText(/gotcha/i)).toBeInTheDocument();
      });

      // wait for lazy form to render
      await waitFor(() => screen.getByTestId("add-pokemon-form"));

      // click submit without filling nickname
      const submitBtn = getByText(/submit/i);
      userEvent.click(submitBtn);

      // show error nickname required
      expect(getByText(/required/i)).toBeInTheDocument();

      // input nickname
      const input = getByRole("textbox");
      userEvent.type(input, "pikachul");

      // click submit again
      userEvent.click(submitBtn);

      // wait until success indicated by close button appear
      await waitFor(() => expect(getByText(/close/i)).toBeInTheDocument());

      // click close button
      const closeBtn = getByText(/close/i);
      userEvent.click(closeBtn);

      // modal disappear as word Your Pokemon is safe and sound in pokebag not exist
      expect(queryByText(/your pokemon/i)).not.toBeInTheDocument();
    });
  });

  describe("test fail catch pokemon", () => {
    beforeEach(() => {
      jest.spyOn(global.Math, "random").mockReturnValue(0.6);
    });

    afterEach(() => {
      jest.spyOn(global.Math, "random").mockRestore();
      cleanup();
    });

    test("fail catch pokemon", async () => {
      const { getByTestId, getByText, queryByText } = render(
        <Detail apolloMockForTestOnly={mocks} />,
        {
          route: "/pikachu",
          path: "/:id",
        }
      );

      // wait until type-badges is filled with type badges
      await waitFor(() => screen.getByTestId("catch-btn"));

      // click catch button
      const btn = getByTestId("catch-btn");
      userEvent.click(btn);

      // show message fail to catch pokemon
      expect(getByText(/lady luck/i)).toBeInTheDocument();

      // close modal
      const closeBtn = getByText(/close/i);
      userEvent.click(closeBtn);

      // modal disappear as word lady luck not in your side today not exist
      expect(queryByText(/lady luck/i)).not.toBeInTheDocument();
    });
  });
});
