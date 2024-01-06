import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import iconnaz from '../icon/nazat.png';

const Done = () => {
  return (
    <div>
      <NavLink exact to="Navigation" activeClassName="active-icon">
        <Link to="/" className="iconnaz">
          <img src={iconnaz} alt="nazz" />
        </Link>
      </NavLink>
    </div>
  );
};

export default Done;
//тут крч идет процес иконки
