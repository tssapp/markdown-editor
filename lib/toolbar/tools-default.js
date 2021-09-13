import * as ET from "../type.js";
import React from "../../_snowpack/pkg/react.js";
import {
  schema
} from "../../_snowpack/pkg/@aeaton/react-prosemirror-config-default.js";
import {
  isMarkActive,
  isBlockActive,
  setListTypeOrWrapInList
} from "../../_snowpack/pkg/@aeaton/prosemirror-commands.js";
import {toggleMark} from "../../_snowpack/pkg/prosemirror-commands.js";
import {liftListItem, sinkListItem} from "../../_snowpack/pkg/prosemirror-schema-list.js";
const toggleMarkBold = toggleMark(schema.marks.bold);
const toggleMarkItalic = toggleMark(schema.marks.italic);
const toggleMarkCode = toggleMark(schema.marks.code);
const toggleMarkUnderline = toggleMark(schema.marks.underline);
const toggleMarkStrikethrough = toggleMark(schema.marks.strikethrough);
const setListTypeBullet = setListTypeOrWrapInList(schema.nodes.list, {
  type: "bullet"
});
const setListTypeOrdered = setListTypeOrWrapInList(schema.nodes.list, {
  type: "ordered"
});
export const liftListItemCommand = liftListItem(schema.nodes.listItem);
export const sinkListItemCommand = sinkListItem(schema.nodes.listItem);
export const marksDef = [
  {
    type: ET.Elements.Bold,
    id: "toggle-bold",
    content: /* @__PURE__ */ React.createElement("strong", null, "B"),
    action: toggleMarkBold,
    enable: toggleMarkBold,
    active: isMarkActive(schema.marks.bold)
  },
  {
    type: ET.Elements.Italic,
    id: "toggle-italic",
    content: /* @__PURE__ */ React.createElement("i", {
      style: {padding: 5}
    }, "I"),
    action: toggleMarkItalic,
    enable: toggleMarkItalic,
    active: isMarkActive(schema.marks.italic)
  },
  {
    type: ET.Elements.Code,
    id: "toggle-code",
    content: /* @__PURE__ */ React.createElement("code", null, `</>`),
    action: toggleMarkCode,
    enable: toggleMarkCode,
    active: isMarkActive(schema.marks.code)
  },
  {
    type: ET.Elements.Underline,
    id: "toggle-underline",
    content: /* @__PURE__ */ React.createElement("u", null, "U"),
    action: toggleMarkUnderline,
    enable: toggleMarkUnderline,
    active: isMarkActive(schema.marks.underline)
  },
  {
    type: ET.Elements.Strikethrough,
    id: "toggle-strikethrough",
    content: /* @__PURE__ */ React.createElement("del", null, "S"),
    action: toggleMarkStrikethrough,
    enable: toggleMarkStrikethrough,
    active: isMarkActive(schema.marks.strikethrough)
  }
];
export const listDef = [
  {
    type: ET.Elements.ListBullet,
    id: "block-bullet-list",
    title: "Wrap in bullet list",
    content: /* @__PURE__ */ React.createElement("ul", {
      style: {margin: 0}
    }, /* @__PURE__ */ React.createElement("li", null, "— ")),
    action: setListTypeBullet,
    enable: setListTypeBullet,
    active: isBlockActive(schema.nodes.list, {type: "bullet"})
  },
  {
    type: ET.Elements.ListOrdered,
    id: "block-ordered-list",
    title: "Wrap in ordered list",
    content: /* @__PURE__ */ React.createElement("ol", {
      style: {margin: 0}
    }, /* @__PURE__ */ React.createElement("li", null, "— ")),
    action: setListTypeOrdered,
    enable: setListTypeOrdered,
    active: isBlockActive(schema.nodes.list, {type: "ordered"})
  }
];
export const identDef = [
  {
    type: ET.Elements.Outdent,
    id: "outdent",
    title: "Outdent",
    action: liftListItemCommand,
    enable: liftListItemCommand,
    content: /* @__PURE__ */ React.createElement("code", null, `| <<`)
  },
  {
    type: ET.Elements.Indent,
    id: "indent",
    title: "Indent",
    action: sinkListItemCommand,
    enable: sinkListItemCommand,
    content: /* @__PURE__ */ React.createElement("code", null, `>> |`)
  }
];
export const fullDef = [
  {id: "marks", items: marksDef},
  {id: "list", items: listDef},
  {id: "identation", items: identDef}
];
