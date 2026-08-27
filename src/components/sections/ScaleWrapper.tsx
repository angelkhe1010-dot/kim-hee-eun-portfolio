import {
  useLayoutEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';

import styles from './ScaleWrapper.module.css';

interface ScaleWrapperProps {
  children: ReactNode;
}

const DESIGN_WIDTH = 1920;

export default function ScaleWrapper({
  children,
}: ScaleWrapperProps) {
  const [scale, setScale] = useState(() => {
    if (typeof window === 'undefined') {
      return 1;
    }

    return window.innerWidth / DESIGN_WIDTH;
  });

  useLayoutEffect(() => {
    const handleResize = () => {
      const nextScale =
        window.innerWidth / DESIGN_WIDTH;

      setScale(nextScale);
    };

    handleResize();

    window.addEventListener(
      'resize',
      handleResize,
    );

    return () => {
      window.removeEventListener(
        'resize',
        handleResize,
      );
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.screen}
        style={
          {
            zoom: scale,
          } as CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
}