export interface BlockType {
  top: number;
  left: number;
}

export interface Props {
  drag: any;
}

export interface EditorState {
  container: {
    width: number;
    height: number;
  };
  blocks?: BlockType[];
}

export interface ContainerProps extends Props {
  editorState: EditorState;
  setContainer: any;
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

export interface MenuProps extends Props {
  config: EditorComponent[];
}
