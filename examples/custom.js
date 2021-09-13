import React, {useState} from "../_snowpack/pkg/react.js";
import {Markdown} from "../lib/index.js";
import * as T from "../lib/type.js";
import Tb from "./toolbar.js";
const Wrapper = (props) => {
  return /* @__PURE__ */ React.createElement("div", {
    style: {
      border: "3px solid black",
      borderRadius: 15,
      padding: 20,
      backgroundColor: "#fff",
      height: 500
    }
  }, props.children);
};
const myDef = {
  [T.Elements.Bold]: {
    Icon: () => /* @__PURE__ */ React.createElement("strong", null, "BOLD"),
    skip: true
  },
  [T.Elements.Italic]: {
    Icon: () => /* @__PURE__ */ React.createElement("i", null, "ITALIC"),
    skip: false
  },
  [T.Elements.ListOrdered]: {
    skip: false,
    Icon: () => /* @__PURE__ */ React.createElement("strong", null, "ORDERED LIST")
  },
  [T.Elements.ListBullet]: {
    skip: false,
    Icon: () => /* @__PURE__ */ React.createElement("strong", null, "BULLETED LIST")
  }
};
export default () => {
  const [value, setValue] = useState("");
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Markdown, {
    value,
    onChange: (v) => setValue(v),
    Wrapper,
    ToolbarWrapper: Tb,
    toolbarDef: myDef
  }));
};
