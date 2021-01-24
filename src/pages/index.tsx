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

  const drag = {
    current: {
      component: null as null | EditorComponent,
    },
    onDragStart: (e: HTMLElement, component: EditorComponent) => {
      container?.addEventListener('dragenter', drag.onDragEnter);
      container?.addEventListener('dragover', drag.onDragOver);
      container?.addEventListener('dragleave', drag.onDragLeave);
      container?.addEventListener('drop', drag.onDrop);

      drag.current.component = component;
    },
    onDragEnd: (e: HTMLElement, component: EditorComponent) => {
      container?.addEventListener('dragenter', drag.onDragEnter);
      container?.addEventListener('dragover', drag.onDragOver);
      container?.addEventListener('dragleave', drag.onDragLeave);
      container?.addEventListener('drop', drag.onDrop);
    },
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
      // console.log('drop', drag.current.component)
      blocks?.push({
        left: e.offsetX,
        top: e.offsetY,
      });

      setState({ ...state });
    },
  };

  return (
    <div className={styles.editor}>
      <Menu drag={drag} config={creatConfig.componentsList} />
      <Head />
      <Operator />
      <Container setContainer={setContainer} editorState={state} drag={drag} />
    </div>
  );
}
