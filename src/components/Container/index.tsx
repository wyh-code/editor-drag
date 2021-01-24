import { useRef, useEffect } from 'react';
import styles from './index.less';
import { EditorState, ContainerProps } from '@/util/type';

export default function IndexPage({
  editorState,
  drag,
  setContainer,
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
        {blocks?.map((item, index) => (
          <div
            key={index}
            className={styles.blockItem}
            style={{
              left: `${item.left}px`,
              top: `${item.top}px`,
            }}
          >
            block
          </div>
        ))}
      </div>
    </div>
  );
}
