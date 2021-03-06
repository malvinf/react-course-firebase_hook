import React from 'react';
import { Link } from 'react-router-dom';
import cookie from '../../utils/cookie';

const Header = () => {
  const listMenu = ['home', 'profile', 'contact', 'infoCorona'];
  return (
    <div className="header">
      {listMenu.map((name) => {
        return (
          <Link to={`/${name}`} key={name}>
            <div className="menu">{name}</div>
          </Link>
        );
      })}
      {cookie.isUserAuthenticated ? <span>logout</span> : <span />}
    </div>
  );
};
export default Header;
