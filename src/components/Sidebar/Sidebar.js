import React from 'react';
import { useSiteMetadata } from '../../hooks';
import { Link } from 'gatsby';

const Sidebar = () => {
  const { menu } = useSiteMetadata();
  console.log(menu);
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

export default Sidebar;
