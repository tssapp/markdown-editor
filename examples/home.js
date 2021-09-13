import React, {useState} from "../_snowpack/pkg/react.js";
import {Markdown} from "../lib/index.js";
export default () => {
  const [value, setValue] = useState("");
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h3", {
    style: {fontWeight: "lighter", color: "gray"}
  }, "Default"), /* @__PURE__ */ React.createElement(Markdown, {
    value,
    onChange: (v) => setValue(v)
  }));
};
