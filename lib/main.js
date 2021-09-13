import React from "../_snowpack/pkg/react.js";
import {HtmlEditor, Editor} from "../_snowpack/pkg/@aeaton/react-prosemirror.js";
import {
  plugins,
  schema
} from "../_snowpack/pkg/@aeaton/react-prosemirror-config-default.js";
import Toolbar from "./toolbar/index.js";
import {liftListItem, sinkListItem} from "../_snowpack/pkg/prosemirror-schema-list.js";
import WrapperDefault from "./wrapper.js";
import ToolbarWrapperDefault from "./toolbar/wrapper.js";
export const liftListItemCommand = liftListItem(schema.nodes.listItem);
export const sinkListItemCommand = sinkListItem(schema.nodes.listItem);
export default ({
  value,
  onChange,
  ToolbarWrapper = ToolbarWrapperDefault,
  Wrapper = WrapperDefault,
  toolbarDef
}) => {
  return /* @__PURE__ */ React.createElement(Wrapper, null, /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(HtmlEditor, {
    schema,
    plugins,
    value: value || `<p></p>`,
    handleChange: (v) => onChange(v),
    debounce: 250
  }, /* @__PURE__ */ React.createElement(Toolbar, {
    def: toolbarDef,
    Wrapper: ToolbarWrapper
  }), /* @__PURE__ */ React.createElement(Editor, {
    autoFocus: true
  }))));
};
