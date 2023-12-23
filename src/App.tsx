import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageLoader from "./components/commons/Loader/PageLoader";

const Home = lazy(
  () => import(/* webpackChunkName: "home-page" */ "./pages/index")
);
const Detail = lazy(
  () => import(/* webpackChunkName: "detail-page" */ "./pages/detail")
);
const Pokebag = lazy(
  () => import(/* webpackChunkName: "pokebag-page" */ "./pages/pokebag")
);

export default function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/pokebag" component={Pokebag} />
          <Route path="/:id" component={Detail} />
        </Switch>
      </Suspense>
    </Router>
  );
}
