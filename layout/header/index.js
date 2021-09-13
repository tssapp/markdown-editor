import React from "../../_snowpack/pkg/react.js";
import {Link} from "../../_snowpack/pkg/react-router-dom.js";
export default () => /* @__PURE__ */ React.createElement("header", null, "Prosemirror MD Editor", /* @__PURE__ */ React.createElement("span", {
  style: {float: "right"}
}, /* @__PURE__ */ React.createElement(Link, {
  to: "/",
  style: {paddingRight: "10px"}
}, "Default"), /* @__PURE__ */ React.createElement(Link, {
  to: "/custom"
}, "Custom")));
