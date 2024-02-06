import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import PropTypes from "prop-types";
import { useState } from "react";

function Navbar({ onSearch }) {
  const [page, setPage] = useState(1);
  const handleClick = () => {
    onSearch("");
  };
  function handlePrevClick() {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  }

  function handleNextClick() {
    setPage((prevPage) => prevPage + 1);
  }

  return (
    <header className="w-full h-20 flex items-center justify-center px-10">
      <div className="container  mx-0">
        <div className="hidden items-center justify-between mx-0  md:flex md:w-full">
          <div className="flex justify-start w-1/2 ">
            <h1 style={{ fontSize: "33px" }}>Pokemon</h1>
          </div>
          <div className="flex justify-end w-1/2  ">
            <SearchBar placeHolder="Search Pokemon" onSearch={onSearch} />
          </div>
        </div>

        <div className="flex items-center justify-center mx-auto w-full md:hidden ">
          <div className="flex justify-center w-full ">
            <SearchBar placeHolder="Search Pokemon" onSearch={onSearch} />
          </div>
        </div>
      </div>
    </header>
  );
}

Navbar.propTypes = {
  onSearch: PropTypes.func,
};

export default Navbar;
