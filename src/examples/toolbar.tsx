import styled from "styled-components";

const ToolbarStyled = styled.div`
  .prosemirror-toolbar-group {
    border: none;
  }

  .prosemirror-toolbar-item {
    min-width: 50px;
    margin: 2px;
    padding: 5px 7px;
    transition: background-color 1s ease-out;
    border-radius: 5px;
    &:hover {
      background-color: #ced4da;
    }
  }

  .prosemirror-toolbar-item[data-active="false"] {
    color: gray;
  }

  .prosemirror-toolbar-item[data-active="true"] {
    color: #fff;
    background-color: #7209b7;
  }
`;

export default ToolbarStyled;
