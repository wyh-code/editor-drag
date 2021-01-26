import { useRef, useEffect } from 'react';
import styles from './index.less';
import { EditorState, ContainerProps } from '@/util/type';
import Block from './Block';

export default function IndexPage({
  editorState,
  setContainer,
  componentsMap,
}: ContainerProps) {
  const containerRef = useRef(null);
  const { container, blocks } = editorState as EditorState;

  useEffect(() => {
    if (containerRef?.current) {
      setContainer(containerRef?.current);
    }
  }, [containerRef?.current]);

  return (
    <div className={styles.container}>
      <div
        ref={containerRef}
        className={styles.content}
        style={{
          width: `${container.width}px`,
          height: `${container.height}px`,
        }}
      >
        {blocks?.map((block, index) => (
          <Block key={index} block={block} componentsMap={componentsMap} />
        ))}
      </div>
    </div>
  );
}
