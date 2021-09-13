import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <header>
    Prosemirror MD Editor
    <span style={{ float: "right" }}>
      <Link to="/" style={{ paddingRight: "10px" }}>
        Default
      </Link>
      <Link to="/custom">Custom</Link>
    </span>
  </header>
);
