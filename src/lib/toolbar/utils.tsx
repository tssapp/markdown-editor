import React from "react";
import * as T from "../type";

import * as defDefault from "./tools-default";

export const mapDef = (
  def: T.ToolbarDefinition,
  type: "mark" | "list" | "indent"
) => {
  const defToMap =
    type === "mark"
      ? defDefault.marksDef
      : type === "list"
      ? defDefault.listDef
      : defDefault.identDef;
  return defToMap
    .filter((fd) => {
      const customDef = def[fd.type];
      if (!customDef) {
        return true;
      }
      if (customDef.skip) {
        return false;
      }
      return true;
    })
    .map((fd) => {
      const customDef = def[fd.type];
      if (!customDef) {
        return fd;
      }
      if (!customDef.Icon) {
        return fd;
      }

      return { ...fd, content: <customDef.Icon /> };
    });
};
