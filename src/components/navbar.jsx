import { Link } from "react-router-dom";
import "../index.css";
import { SearchBar } from "./";

const Navbar = () => {
  return (
    <main className="main">
      <nav className="navbar navbar-expand navbar-dark bg-dark p-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            <h3>Pokemon App</h3>
          </Link>
          <SearchBar />
        </div>
      </nav>
    </main>
  );
};

export default Navbar;
