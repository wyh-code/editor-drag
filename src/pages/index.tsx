import { useState } from 'react';
import styles from './index.less';
import Head from '@/components/Head';
import Container from '@/components/Container';
import Menu from '@/components/Menu';
import Operator from '@/components/Operator';
import { EditorState, EditorComponent } from '@/util/type';
import { editorState, editorConfig } from '@/util/config.tsx';
import { creatEditorConfig } from '@/util/util';

const creatConfig = creatEditorConfig();
editorConfig.forEach((item) => {
  creatConfig.regitry(item.key, item as EditorComponent);
});

export default function IndexPage() {
  const [state, setState] = useState<EditorState>(editorState);
  const [container, setContainer] = useState<null | HTMLElement>(null);

  const drag = (() => {
    let component = null as null | EditorComponent;

    const containerHandler = {
      onDragEnter: (e: DragEvent) => {
        e.dataTransfer!.dropEffect = 'move';
      },
      onDragOver: (e: DragEvent) => {
        e.preventDefault();
      },
      onDragLeave: (e: DragEvent) => {
        e.dataTransfer!.dropEffect = 'none';
      },
      onDrop: (e: DragEvent) => {
        const { blocks } = state;
        blocks?.push({
          left: e.offsetX,
          top: e.offsetY,
          componentKey: component!.key,
          adjustPosition: true,
        });

        setState({ ...state });
      },
    };

    return {
      onDragStart: (e: HTMLElement, current: EditorComponent) => {
        container?.addEventListener('dragenter', containerHandler.onDragEnter);
        container?.addEventListener('dragover', containerHandler.onDragOver);
        container?.addEventListener('dragleave', containerHandler.onDragLeave);
        container?.addEventListener('drop', containerHandler.onDrop);

        component = current;
      },
      onDragEnd: (e: HTMLElement) => {
        container?.addEventListener('dragenter', containerHandler.onDragEnter);
        container?.addEventListener('dragover', containerHandler.onDragOver);
        container?.addEventListener('dragleave', containerHandler.onDragLeave);
        container?.addEventListener('drop', containerHandler.onDrop);

        component = null;
      },
    };
  })();

  return (
    <div className={styles.editor}>
      <Menu drag={drag} config={creatConfig.componentsList} />
      <Head />
      <Operator />
      <Container
        setContainer={setContainer}
        editorState={state}
        componentsMap={creatConfig.componentsMap}
      />
    </div>
  );
}
