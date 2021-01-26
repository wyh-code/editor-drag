export interface BlockType {
  top: number;
  left: number;
  componentKey: string;
  adjustPosition: boolean;
}

export interface EditorState {
  container: {
    width: number;
    height: number;
  };
  blocks?: BlockType[];
}

export interface ContainerProps {
  editorState: EditorState;
  setContainer: any;
  componentsMap: EditorComponentMap;
}

export interface EditorComponent {
  key: string;
  label: string;
  preview: () => JSX.Element;
  render: () => JSX.Element;
}

export interface EditorComponentMap {
  [key: string]: EditorComponent;
}
export interface BlockProps {
  block: BlockType;
  componentsMap: EditorComponentMap;
}

export interface MenuProps {
  config: EditorComponent[];
  drag: any;
}
