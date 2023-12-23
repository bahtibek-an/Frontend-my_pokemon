import { lazy, Suspense } from "react";
import { Page } from "../components/commons/Page";
import { usePokemon } from "../components/MyPokemon/MyPokemon";

const List = lazy(
  () =>
    import(/* webpackChunkName: "pokebag-list" */ "../components/pokemons/List")
);

export default function PokebagPage() {
  const { dataAsArray } = usePokemon();
  return (
    <Page title="Pokebag">
      <Suspense fallback={null}>
        {dataAsArray.length > 0 && <List data={dataAsArray} isPokeBag />}
      </Suspense>
    </Page>
  );
}
