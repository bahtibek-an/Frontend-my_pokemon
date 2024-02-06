import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import Layout from "./PokeControl";
import Main from "./Main";
import PokeDetail from "./components/CardsType/PokeDetail";
import CloseCard from "./components/CardsType/CloseCard";

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [bigCardIsOpen, setBigCardIsOpen] = useState(false);
  const [bigCardData, setBigCardData] = useState(null);

  function openBigCard(id, image) {
    setBigCardIsOpen(true);
    setBigCardData({ id, image });
  }

  function closeBigCard() {
    setBigCardIsOpen(false);
  }

  return (
    <QueryClientProvider client={client}>
      <Layout onSearch={setSearchTerm}>
        <Main searchTerm={searchTerm} openBigCard={openBigCard} />
      </Layout>
      {bigCardIsOpen && <CloseCard closeBigCard={closeBigCard} />}
      {bigCardIsOpen && (
        <PokeDetail
          closeBigCard={closeBigCard}
          id={bigCardData.id}
          image={bigCardData.image}
        />
      )}
    </QueryClientProvider>
  );
}

export default App;
