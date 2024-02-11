import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/homepage";
import Single from "./pages/singlepage";
import SearchPage from "./pages/searchpage";
import Navigation from "./pages/navigation";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        
        <Route path="search" element={<SearchPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="pokemon/:id" element={<Single />} />
    </Routes>
  );
};

export default AppRouter;
