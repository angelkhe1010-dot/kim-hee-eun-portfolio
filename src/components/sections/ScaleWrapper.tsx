import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import styles from './ScaleWrapper.module.css';

interface ScaleWrapperProps {
  children: ReactNode;
}

export default function ScaleWrapper({ children }: ScaleWrapperProps) {
  const [scale, setScale] = useState(1);
  const [naturalHeight, setNaturalHeight] = useState(0);
  const screenRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const handleResize = () => {
      setScale(window.innerWidth / 1920);

      /*
       * `transform: scale()` only changes how .screen is painted, not
       * its layout box -- offsetHeight below is always the natural,
       * unscaled 1920-width height. .wrapper (the normal-flow element
       * that reserves vertical space for this section) needs to be
       * set to that height times the current scale, or it keeps
       * reserving the full unscaled height, leaving blank space below
       * the visually shrunk content (most visible after the last
       * section, at the very bottom of the page).
       */
      if (screenRef.current) {
        setNaturalHeight(screenRef.current.offsetHeight);
      }
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
        height: naturalHeight ? naturalHeight * scale : undefined,
      } as React.CSSProperties}
    >
      <div
        ref={screenRef}
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