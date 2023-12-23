import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ThemeProvider } from "@emotion/react";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import theme from "./constants/theme";
import { PokemonProvider } from "./components/MyPokemon/MyPokemon";
import offsetLimitPagination from "./utils/offsetLimitPagination";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const client = new ApolloClient({
  uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemons: offsetLimitPagination(),
        },
      },
    },
  }),
});

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <PokemonProvider>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </PokemonProvider>
    </ThemeProvider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
