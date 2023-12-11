import React from 'react';
import './Navbar.css'; // Import the CSS file for custom styling
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="container navbar navbar-expand-lg bg-body-primary">
      <div className="container">
        <Link to='/' className="navbar-brand">
          <img src="/logo192.png" alt="Logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* Move the "Home" link to the right using the "ms-auto" class */}
            <li className="nav-item">
              <Link to= '/' className="nav-link text-align-right active" aria-current="page">Home</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
