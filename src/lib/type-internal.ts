import * as T from "./type";

export interface ToolbarDefinition {
  id: "marks" | "list" | "identation";
  items: ToolbarItem[];
}

export interface ToolbarItem {
  id: string;
  title?: string;
  content: JSX.Element;
  action: any; // todo
  enable: any; // todo
  active?: (state: any) => boolean;
  type: T.Elements;
}
