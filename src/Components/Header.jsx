import React, { useState } from 'react'
import './Header.css'
const Header = () => {
    const [search,setSearch] = useState("");
    const value = search;
    
  return (
    <header className='header'>
        <h1>Pokemon App</h1>
        <div className="search_panel">
            <input  type="text" placeholder='Search' onChange={(e) => setSearch(e.target.value)}/>
        </div>
    </header>
  )
}
export default Header