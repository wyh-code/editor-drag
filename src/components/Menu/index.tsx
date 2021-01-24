import { useRef } from 'react';
import styles from './index.less';
import { MenuProps } from '@/util/type';

export default function IndexPage({ config, drag }: MenuProps) {
  const { onDragStart, onDragEnd } = drag;

  return (
    <div className={styles.menu}>
      {config.map((item) => {
        return (
          <div
            draggable
            onDragStart={(e) => onDragStart(e, item)}
            onDragEnd={(e) => onDragEnd(e, item)}
            className={styles.menuItem}
            key={item.key}
          >
            <div className={styles.label}>{item.label}</div>
            {typeof item.render === 'string' ? item.render : item.render()}
          </div>
        );
      })}
    </div>
  );
}
