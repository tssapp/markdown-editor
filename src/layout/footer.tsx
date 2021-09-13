import React from "react";
import { github, sha } from "../config";

export default () => (
  <footer className="h-10 px-10">
    <p>
      <small>
        <a href={github.sha}>{sha.slice(0, 15)}</a>
      </small>
    </p>
  </footer>
);
