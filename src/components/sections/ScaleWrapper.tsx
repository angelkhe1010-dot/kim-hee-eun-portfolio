import { useEffect, useState, type ReactNode } from 'react';
import styles from './ScaleWrapper.module.css';

interface ScaleWrapperProps {
  children: ReactNode;
}

export default function ScaleWrapper({ children }: ScaleWrapperProps) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setScale(window.innerWidth / 1920);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={styles.wrapper}
      style={{
        '--scale': scale,
      } as React.CSSProperties}
    >
      <div
        className={styles.screen}
        style={{
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}