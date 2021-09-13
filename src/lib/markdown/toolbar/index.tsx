import React from "react";

import { Toolbar } from "@aeaton/react-prosemirror";
import * as T from "../type";

import * as defDefault from "./tools-default";

const mapDef = (def: T.ToolbarDefinition, type: "mark" | "list" | "indent") => {
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

const Tb = ({
  def,
  Wrapper,
}: {
  def?: T.ToolbarDefinition;
  Wrapper: (props: any) => JSX.Element;
}): JSX.Element => {
  if (!def) {
    return (
      <Wrapper>
        <Toolbar toolbar={defDefault.fullDef} />
      </Wrapper>
    );
  }
  const marks = mapDef(def, "mark");
  const list = mapDef(def, "list");
  const indent = mapDef(def, "indent");

  const fullDef = [
    {
      id: "marks",
      items: marks,
    },
    {
      id: "list",
      items: list,
    },
    {
      id: "identation",
      items: indent,
    },
  ];

  return (
    <Wrapper>
      <Toolbar toolbar={fullDef} />
    </Wrapper>
  );
};

export default Tb;
