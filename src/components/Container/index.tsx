import { useRef, useEffect, useState } from 'react';
import styles from './index.less';
import { EditorState, ContainerProps, BlockType } from '@/util/type';
import Block from './Block';

export default function IndexPage({
  editorState,
  setContainer,
  componentsMap,
  refresh,
}: ContainerProps) {
  const containerRef = useRef({} as any);
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
      scrollTop: 0,
    };
    const mousemove = (e: MouseEvent) => {
      const offsetTop = e.clientY - dragStart.y;
      const offsetLeft = e.clientX - dragStart.x;

      // 更新鼠标位置，作为下次偏移计算的原点
      dragStart.y = e.clientY;
      dragStart.x = e.clientX;

      blocks?.forEach((item) => {
        if (item.focus) {
          item.left = item.left + offsetLeft;
          item.top = item.top + offsetTop;
        }
      });
      refresh && refresh();
    };

    const mouseup = () => {
      document.onmousemove = null;
    };

    const onscroll = (e: MouseEvent) => {
      const dom = e.target as any;

      blocks?.forEach((item) => {
        if (item.focus) {
          item.top = item.top + dom?.scrollTop - dragStart.scrollTop;
        }
      });
      dragStart.scrollTop = dom?.scrollTop;
      refresh && refresh();
    };

    return {
      onMouseDown: (e: MouseEvent) => {
        dragStart.x = e.clientX;
        dragStart.y = e.clientY;

        document.onmousemove = mousemove;
        document.onmouseup = mouseup;
        containerRef.current.onscroll = onscroll;
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
    <div ref={containerRef} className={styles.container}>
      <div
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
