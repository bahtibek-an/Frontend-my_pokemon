import React, { Suspense, useMemo } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import theme from "../constants/theme";
import { PokemonProvider } from "../components/MyPokemon";

interface TestWrapperProps {
  children: React.ReactElement;
}

function TestWrapper({ children }: TestWrapperProps): React.ReactNode {
  const { mocks, cache, addTypename } = useMemo(() => {
    try {
      const {
        props: { apolloMockForTestOnly, cache },
      } = React.Children.only(children);
      return {
        mocks: apolloMockForTestOnly || [],
        cache: cache,
        addTypename: !!cache,
      };
    } catch (error) {
      return {};
    }
  }, []);

  return (
    <PokemonProvider>
      <MockedProvider mocks={mocks} addTypename={addTypename} cache={cache}>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<div>Fallback</div>}>{children}</Suspense>
        </ThemeProvider>
      </MockedProvider>
    </PokemonProvider>
  );
}

function customRender(
  ui: React.ReactElement,
  { path = "/", route = "/" } = {},
  options?: Omit<RenderOptions, "queries">
) {
  window.history.pushState({}, "Test page", route);
  const { props } = React.Children.only(ui);

  return render(
    <BrowserRouter {...props}>
      <Switch>
        <Route path={path} children={ui} />
      </Switch>
    </BrowserRouter>,
    { wrapper: TestWrapper as React.ComponentType, ...options }
  );
}

export * from "@testing-library/react";
export { customRender as render };
