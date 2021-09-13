import React from "../_snowpack/pkg/react.js";
export default ({children}) => {
  return /* @__PURE__ */ React.createElement("div", {
    style: {
      borderRadius: "5px",
      padding: "10px",
      height: "200px",
      overflow: "scroll",
      border: "1px solid gray"
    }
  }, children);
};
