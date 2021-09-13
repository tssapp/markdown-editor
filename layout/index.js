import React from "../_snowpack/pkg/react.js";
import Header from "./header/index.js";
const Layout = ({children}) => /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Header, null), /* @__PURE__ */ React.createElement("main", {
  className: "flex-grow"
}, /* @__PURE__ */ React.createElement("div", {
  className: "container mx-auto px-4 py-4"
}, children, " ")));
export default Layout;
