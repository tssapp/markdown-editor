export interface Props {
  value: string | null;
  onChange: (v: string) => void;
  Wrapper?: (children: any) => JSX.Element;
  ToolbarWrapper?: (props: any) => JSX.Element;
  toolbarDef?: ToolbarDefinition;
}

export type ToolbarDefinition = {
  [key in Elements]?: ItemDef;
};

export type ItemDef = {
  Icon?: () => JSX.Element;
  skip: boolean;
};

export enum Elements {
  Bold,
  Italic,
  Code,
  CodeBlock,
  Underline,
  Strikethrough,
  ListBullet,
  ListOrdered,
  Indent,
  Outdent,
}
