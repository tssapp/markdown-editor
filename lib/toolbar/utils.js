import React from "../../_snowpack/pkg/react.js";
import * as defDefault from "./tools-default.js";
export const mapDef = (def, type) => {
  const defToMap = type === "mark" ? defDefault.marksDef : type === "list" ? defDefault.listDef : defDefault.identDef;
  return defToMap.filter((fd) => {
    const customDef = def[fd.type];
    if (!customDef) {
      return true;
    }
    if (customDef.skip) {
      return false;
    }
    return true;
  }).map((fd) => {
    const customDef = def[fd.type];
    if (!customDef) {
      return fd;
    }
    if (!customDef.Icon) {
      return fd;
    }
    return {...fd, content: /* @__PURE__ */ React.createElement(customDef.Icon, null)};
  });
};
