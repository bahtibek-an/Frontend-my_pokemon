import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (value) {
      navigate(`/search/${value}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          className="form-control"
          type="text"
          name="query"
          value={value}
          placeholder="Search Pokemon"
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchBar;
