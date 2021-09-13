import React from "react";

import { Toolbar } from "@aeaton/react-prosemirror";
import * as T from "../type";
import { mapDef } from "./utils";

import * as defDefault from "./tools-default";

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
