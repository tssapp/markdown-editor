import React, { useState } from "react";

import Markdown from "../lib/markdown";
import * as T from "../lib/markdown/type";
import Tb from "./toolbar";

const Wrapper = (props: { children: any }) => {
  return (
    <div
      style={{
        border: "3px solid black",
        borderRadius: 15,
        padding: 20,
        backgroundColor: "#fff",
        height: 500,
      }}
    >
      {props.children}
    </div>
  );
};

const myDef: T.ToolbarDefinition = {
  [T.Elements.Bold]: {
    Icon: () => <strong>BOLD</strong>,
    skip: true,
  },
  [T.Elements.Italic]: {
    Icon: () => <i>ITALIC</i>,

    skip: false,
  },
  [T.Elements.ListOrdered]: {
    skip: false,
    Icon: () => <strong>ORDERED LIST</strong>,
  },
  [T.Elements.ListBullet]: {
    skip: false,
    Icon: () => <strong>BULLETED LIST</strong>,
  },
};

export default () => {
  const [value, setValue] = useState<string>("");

  return (
    <>
      <Markdown
        value={value}
        onChange={(v) => setValue(v)}
        Wrapper={Wrapper}
        ToolbarWrapper={Tb}
        toolbarDef={myDef}
      />
    </>
  );
};
