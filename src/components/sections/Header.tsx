import { useEffect, useState } from 'react';
import styles from './Header.module.css';

type ActiveSection =
  | 'portfolio'
  | 'experience'
  | 'about'
  | null;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  const [activeSection, setActiveSection] =
    useState<ActiveSection>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const works =
        document.getElementById('works');

      const experience =
        document.getElementById('experience');

      const about =
        document.getElementById('about');

      /*
       * active 판단 기준
       *
       * Header 높이 72px
       * + 추가 여백 50px
       *
       * 화면 상단에서 122px 지점에
       * 해당 섹션이 들어오면 active
       */
      const headerHeight = 72;
      const activeOffset = 50;

      const checkY =
        headerHeight + activeOffset;

      const isInSection = (
        element: HTMLElement | null
      ) => {
        if (!element) {
          return false;
        }

        const rect =
          element.getBoundingClientRect();

        return (
          rect.top <= checkY &&
          rect.bottom > checkY
        );
      };

      if (isInSection(works)) {
        setActiveSection('portfolio');
      } else if (isInSection(about)) {
        setActiveSection('about');
      } else if (isInSection(experience)) {
        setActiveSection('experience');
      } else {
        /*
         * Hero / Process / Contact 등
         * 메뉴에 없는 영역에서는
         * 모든 메뉴 비활성화
         */
        setActiveSection(null);
      }
    };

    handleScroll();

    window.addEventListener(
      'scroll',
      handleScroll,
      {
        passive: true,
      }
    );

    window.addEventListener(
      'resize',
      handleScroll
    );

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );

      window.removeEventListener(
        'resize',
        handleScroll
      );
    };
  }, []);

  return (
    <>
      {/* 반투명 + blur 전용 레이어 */}
      <div
        className={`${styles.headerGlass} ${
          isScrolled
            ? styles.scrolled
            : ''
        }`}
      />

      {/* 글자 전용 레이어 */}
      <header className={styles.header}>
        <div className={styles.navLeft}>
          <a
            href="#"
            className={styles.navLogo}
          >
            KIM HEEUN
          </a>
        </div>

        <nav className={styles.navRight}>
          <a
            href="#works"
            className={`${styles.navLink} ${
              activeSection === 'portfolio'
                ? styles.active
                : ''
            }`}
          >
            Portfolio
          </a>

          <a
            href="#about"
            className={`${styles.navLink} ${
              activeSection === 'about'
                ? styles.active
                : ''
            }`}
          >
            About
          </a>

          <a
            href="#experience"
            className={`${styles.navLink} ${
              activeSection === 'experience'
                ? styles.active
                : ''
            }`}
          >
            Experience
          </a>
        </nav>
      </header>
    </>
  );
}