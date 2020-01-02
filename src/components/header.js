import React from "react"
import { Link } from "gatsby"

export default ({ headerText = "Default header text" }) => (
  <header>
    <h1>{headerText}</h1>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  </header>
)
