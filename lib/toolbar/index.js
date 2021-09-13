import React from "../../_snowpack/pkg/react.js";
import {Toolbar} from "../../_snowpack/pkg/@aeaton/react-prosemirror.js";
import {mapDef} from "./utils.js";
import * as defDefault from "./tools-default.js";
const Tb = ({
  def,
  Wrapper
}) => {
  if (!def) {
    return /* @__PURE__ */ React.createElement(Wrapper, null, /* @__PURE__ */ React.createElement(Toolbar, {
      toolbar: defDefault.fullDef
    }));
  }
  const marks = mapDef(def, "mark");
  const list = mapDef(def, "list");
  const indent = mapDef(def, "indent");
  const fullDef = [
    {
      id: "marks",
      items: marks
    },
    {
      id: "list",
      items: list
    },
    {
      id: "identation",
      items: indent
    }
  ];
  return /* @__PURE__ */ React.createElement(Wrapper, null, /* @__PURE__ */ React.createElement(Toolbar, {
    toolbar: fullDef
  }));
};
export default Tb;
