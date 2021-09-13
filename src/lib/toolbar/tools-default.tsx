import * as T from "../type-internal";
import * as ET from "../type";
import React from "react";

import {
  schema,
  // toolbar
} from "@aeaton/react-prosemirror-config-default";

import {
  isMarkActive,
  isBlockActive,
  setListTypeOrWrapInList,
} from "@aeaton/prosemirror-commands";
// @ts-ignore
import { toggleMark } from "prosemirror-commands";
import { liftListItem, sinkListItem } from "prosemirror-schema-list";

const toggleMarkBold = toggleMark(schema.marks.bold);
const toggleMarkItalic = toggleMark(schema.marks.italic);
const toggleMarkCode = toggleMark(schema.marks.code);
const toggleMarkUnderline = toggleMark(schema.marks.underline);
const toggleMarkStrikethrough = toggleMark(schema.marks.strikethrough);
const setListTypeBullet = setListTypeOrWrapInList(schema.nodes.list, {
  type: "bullet",
});
const setListTypeOrdered = setListTypeOrWrapInList(schema.nodes.list, {
  type: "ordered",
});

export const liftListItemCommand = liftListItem(schema.nodes.listItem);
export const sinkListItemCommand = sinkListItem(schema.nodes.listItem); // TODO: same list type

export const marksDef: T.ToolbarItem[] = [
  {
    type: ET.Elements.Bold,
    id: "toggle-bold",
    content: <strong>B</strong>,
    action: toggleMarkBold,
    enable: toggleMarkBold,
    active: isMarkActive(schema.marks.bold),
  },
  {
    type: ET.Elements.Italic,
    id: "toggle-italic",
    content: <i style={{ padding: 5 }}>I</i>,
    action: toggleMarkItalic,
    enable: toggleMarkItalic,
    active: isMarkActive(schema.marks.italic),
  },
  {
    type: ET.Elements.Code,
    id: "toggle-code",
    content: <code>{`</>`}</code>,
    action: toggleMarkCode,
    enable: toggleMarkCode,
    active: isMarkActive(schema.marks.code),
  },
  {
    type: ET.Elements.Underline,
    id: "toggle-underline",
    content: <u>U</u>,
    action: toggleMarkUnderline,
    enable: toggleMarkUnderline,
    active: isMarkActive(schema.marks.underline),
  },
  {
    type: ET.Elements.Strikethrough,
    id: "toggle-strikethrough",
    content: <del>S</del>,
    action: toggleMarkStrikethrough,
    enable: toggleMarkStrikethrough,
    active: isMarkActive(schema.marks.strikethrough),
  },
];

export const listDef: T.ToolbarItem[] = [
  {
    type: ET.Elements.ListBullet,
    id: "block-bullet-list",
    title: "Wrap in bullet list",
    content: (
      <ul style={{ margin: 0 }}>
        <li>&#8212; </li>
      </ul>
    ),
    action: setListTypeBullet,
    enable: setListTypeBullet,
    active: isBlockActive(schema.nodes.list, { type: "bullet" }),
  },
  {
    type: ET.Elements.ListOrdered,
    id: "block-ordered-list",
    title: "Wrap in ordered list",
    content: (
      <ol style={{ margin: 0 }}>
        <li>&#8212; </li>
      </ol>
    ),
    action: setListTypeOrdered,
    enable: setListTypeOrdered,
    active: isBlockActive(schema.nodes.list, { type: "ordered" }),
  },
];

export const identDef: T.ToolbarItem[] = [
  {
    type: ET.Elements.Outdent,
    id: "outdent",
    title: "Outdent",
    action: liftListItemCommand,
    enable: liftListItemCommand,
    content: <code>{`| <<`}</code>,
  },
  {
    type: ET.Elements.Indent,
    id: "indent",
    title: "Indent",
    action: sinkListItemCommand,
    enable: sinkListItemCommand,
    content: <code>{`>> |`}</code>,
  },
];

export const fullDef: T.ToolbarDefinition[] = [
  { id: "marks", items: marksDef },
  { id: "list", items: listDef },
  { id: "identation", items: identDef },
];
