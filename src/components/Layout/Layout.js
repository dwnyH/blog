import React from "react"
import './Layout.scss';
import Navbar from '../Navbar/Navbar';

function Layout(props) {
  const { children } = props;

  return (
    <div
      className="layout"
    >
      <Navbar />
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built By Dwny with Gatsby
      </footer>
    </div>
  );
}

export default Layout
