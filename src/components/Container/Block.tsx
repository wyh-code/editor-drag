import { useRef, useEffect, useState } from 'react';
import styles from './index.less';
import { BlockProps } from '@/util/type';

export default function IndexPage({
  block,
  componentsMap,
  onMouseDown,
}: BlockProps) {
  const blockRef = useRef(null);
  const [offsetHeight, setOffsetHeight] = useState(0);
  const [offsetWidth, setOffsetWidth] = useState(0);
  const { top, left, componentKey, adjustPosition } = block;
  useEffect(() => {
    if (blockRef.current && adjustPosition) {
      const { offsetWidth, offsetHeight } = blockRef?.current as any;
      setOffsetHeight(offsetHeight);
      setOffsetWidth(offsetWidth);

      // 更新数据
      block.adjustPosition = false;
      block.offsetWidth = offsetWidth;
      block.offsetHeight = offsetHeight;
    }
  }, []);

  return (
    <div
      ref={blockRef}
      className={`${styles.blockItem} ${block.focus && styles.blockFocus}`}
      onMouseDown={(e) => onMouseDown(e, block)}
      style={{
        left: `${left - offsetWidth / 2}px`,
        top: `${top - offsetHeight / 2}px`,
      }}
    >
      {typeof componentsMap[componentKey].render === 'string'
        ? componentsMap[componentKey].render
        : componentsMap[componentKey].render()}
    </div>
  );
}
