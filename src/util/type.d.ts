export interface BlockType {
  top: number;
  left: number;
  offsetHeight: number;
  offsetWidth: number;
  componentKey: string;
  adjustPosition: boolean;
  focus: boolean;
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
  refresh: any;
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
  onMouseDown: any;
}

export interface MenuProps {
  config: EditorComponent[];
  drag: any;
}
