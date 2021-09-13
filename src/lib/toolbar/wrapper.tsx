import styled from "styled-components";

const ToolbarStyled = styled.div`
  .prosemirror-toolbar-group {
    border: none;
  }

  .prosemirror-toolbar-item {
    padding: 3px 5px 1px 5px;
    &:hover {
      background-color: #f8f9fa;
    }
  }

  .prosemirror-toolbar-item[data-active="false"] {
    color: #1b3a4b;
  }

  .prosemirror-toolbar-item[data-active="true"] {
    color: #fff;
    background-color: #1b3a4b;
  }
`;

export default ToolbarStyled;
