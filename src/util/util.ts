import { EditorComponent, EditorComponentMap } from './type';

export const creatEditorConfig = () => {
  const componentsList: EditorComponent[] = [];
  const componentsMap: EditorComponentMap = {};

  return {
    componentsList,
    componentsMap,
    regitry: (key: string, component: EditorComponent) => {
      componentsList.push(component);
      componentsMap[key] = component;
    },
  };
};
