import { useRef, useEffect } from 'react';
import styles from './index.less';
import { EditorState, ContainerProps, BlockType } from '@/util/type';
import Block from './Block';

export default function IndexPage({
  editorState,
  setContainer,
  componentsMap,
  refresh,
}: ContainerProps) {
  const containerRef = useRef(null);
  const { container, blocks } = editorState as EditorState;

  useEffect(() => {
    if (containerRef?.current) {
      setContainer(containerRef?.current);
    }
  }, [containerRef?.current]);

  // block 拖拽
  const blockDragger = (() => {
    const dragStart = {
      x: 0,
      y: 0,
    };

    const mousemove = () => {
      console.log('mousemove');
    };
    const mouseup = () => {
      console.log('mouseup');
    };

    return {
      onMouseDown: (e: MouseEvent) => {
        dragStart.x = e.clientX;
        dragStart.y = e.clientX;

        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
      },
      mouseup: () => {
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);
      },
    };
  })();

  // block 焦点处理
  const focusHandler = (() => {
    const clearFouse = (block?: BlockType) => {
      if (!blocks?.length) return;

      blocks
        .filter((item) => item !== block)
        .map((item) => {
          item.focus = false;
        });

      refresh();
    };

    return {
      container: {
        onMouseDown: (e: MouseEvent) => {
          e.stopPropagation();
          e.preventDefault();
          clearFouse();
        },
      },
      block: {
        onMouseDown: (e: MouseEvent, block: BlockType) => {
          e.stopPropagation();
          e.preventDefault();

          if (e.shiftKey) {
            block.focus = !block.focus;
          } else {
            /* 未选中时才选中，并清空其他选项，选中后，点击不改变状态，便于多个拖拽 */
            if (!block.focus) {
              block.focus = true;
              clearFouse(block);
            }
          }

          // 添加拖拽事件监听
          blockDragger.onMouseDown(e);
          // 更新数据
          refresh && refresh();
        },
      },
    };
  })();

  return (
    <div className={styles.container}>
      <div
        ref={containerRef}
        className={styles.content}
        style={{
          width: `${container.width}px`,
          height: `${container.height}px`,
        }}
        {...(focusHandler.container as any)}
      >
        {blocks?.map((block, index) => (
          <Block
            key={index}
            block={block}
            componentsMap={componentsMap}
            {...(focusHandler.block as any)}
          />
        ))}
      </div>
    </div>
  );
}
