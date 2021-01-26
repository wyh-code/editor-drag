import { useRef, useEffect, useState } from 'react';
import styles from './index.less';
import { BlockProps } from '@/util/type';

export default function IndexPage({ block, componentsMap }: BlockProps) {
  const blockRef = useRef(null);
  const [offsetHeight, setOffsetHeight] = useState(0);
  const [offsetWidth, setOffsetWidth] = useState(0);
  const { top, left, componentKey, adjustPosition } = block;
  useEffect(() => {
    if (blockRef.current && adjustPosition) {
      const { offsetWidth, offsetHeight } = blockRef?.current as any;
      setOffsetHeight(offsetHeight);
      setOffsetWidth(offsetWidth);
      console.log(blockRef?.current, 'blockRef.current');
      console.log(offsetWidth, 'blockRef.current', offsetHeight);
    }
  }, []);

  return (
    <div
      ref={blockRef}
      className={styles.blockItem}
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
