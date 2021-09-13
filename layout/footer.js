import React from "../_snowpack/pkg/react.js";
import {github, sha} from "../config.js";
export default () => /* @__PURE__ */ React.createElement("footer", {
  className: "h-10 px-10"
}, /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("small", null, /* @__PURE__ */ React.createElement("a", {
  href: github.sha
}, sha.slice(0, 15)))));
