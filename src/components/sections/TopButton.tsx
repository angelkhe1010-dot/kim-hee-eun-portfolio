import { useEffect, useState } from 'react';
import styles from './TopButton.module.css';

import fabArrowUp from '../../assets/images/contact/fab-arrow-up.svg';

export default function TopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll,
      );
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      className={`${styles.topButton} ${
        visible ? styles.visible : ''
      }`}
      aria-label="맨 위로 이동"
      onClick={handleClick}
    >
      <img
        src={fabArrowUp}
        alt=""
        className={styles.icon}
      />
    </button>
  );
}