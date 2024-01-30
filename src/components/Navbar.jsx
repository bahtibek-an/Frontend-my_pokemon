import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../img/logo.png'

const Navbar = () => {
  const [input, setInput] = useState('')
  const navigate = useNavigate()
  

  const handleSearch = (e) => {
    e.preventDefault()

    navigate(`/pokemon/${input}`)
    setInput('')
  }


  return (
    <section className="navbar-section">
      <div className="container">
        <nav>
          <div className="logo">
            <Link to={'/'}>
              <img src={logo} alt="" width={"200px"} />
            </Link>
          </div>
          <div className="search">
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
