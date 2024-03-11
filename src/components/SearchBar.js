import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const history = useHistory();

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchClick = () => {
    console.log('Search text:', searchText);
    const pokemonNumber = parseInt(searchText);
    if (!isNaN(pokemonNumber)) {
      console.log('Searching by number:', pokemonNumber);
      history.push(`/pokemon/${pokemonNumber}`);
    } else {
      const formattedName = searchText.toLowerCase().trim();
      console.log('Searching by name:', formattedName);
      history.push(`/pokemon/name/${formattedName}`);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={searchText}
        onChange={handleInputChange}
      />
      <button className="search-button" onClick={handleSearchClick}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
