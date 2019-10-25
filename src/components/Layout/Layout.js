import React from "react"
import './Layout.scss';
import Navbar from '../Navbar/Navbar';
import { rhythm, scale } from "../../utils/typography"

class Layout extends React.Component {
  render() {
    const { children } = this.props;

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
    )
  }
}

export default Layout
