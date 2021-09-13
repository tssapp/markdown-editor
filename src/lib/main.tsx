import React from "react";
import { HtmlEditor, Editor } from "@aeaton/react-prosemirror";
import {
  plugins,
  schema,
  // toolbar
} from "@aeaton/react-prosemirror-config-default";
import Toolbar from "./toolbar";

import { liftListItem, sinkListItem } from "prosemirror-schema-list";
import * as T from "./type";

import WrapperDefault from "./wrapper";
import ToolbarWrapperDefault from "./toolbar/wrapper";

export const liftListItemCommand = liftListItem(schema.nodes.listItem);
export const sinkListItemCommand = sinkListItem(schema.nodes.listItem); // TODO: same list type

export default ({
  value,
  onChange,
  ToolbarWrapper = ToolbarWrapperDefault,
  Wrapper = WrapperDefault,
  toolbarDef,
}: T.Props) => {
  return (
    <Wrapper>
      <>
        <HtmlEditor
          schema={schema}
          plugins={plugins}
          value={value || `<p></p>`}
          handleChange={(v) => onChange(v)}
          debounce={250}
        >
          <Toolbar def={toolbarDef} Wrapper={ToolbarWrapper} />
          <Editor autoFocus />
        </HtmlEditor>
      </>
    </Wrapper>
  );
};
