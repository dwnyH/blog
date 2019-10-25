import React from 'react';
import { useSiteMetadata } from '../../hooks';
import { Link } from 'gatsby';
import "./NavMenu.scss";

const NavMenu = () => {
  const { menu } = useSiteMetadata();

  return (
    <nav>
      <ul>
        {menu.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
