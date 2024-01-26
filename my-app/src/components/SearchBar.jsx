// SearchBar.jsx

import React from 'react';

const SearchBar = ({ onSearch }) => {
  const handleSearch = (e) => {
    const query = e.target.value;
    onSearch(query);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
