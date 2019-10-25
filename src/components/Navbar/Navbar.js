import React from 'react';
import { Link } from "gatsby";
import "./Navbar.scss";
import NavMenu from '../NavMenu/NavMenu';

function Navbar() {
  return (
    <div className="header">
      <header className="header-title">
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            // color: `inherit`,
          }}
          to={`/`}
        >
          Dwny Blog
        </Link>
      </header>
      <NavMenu />
    </div>
  );
}

export default Navbar;
