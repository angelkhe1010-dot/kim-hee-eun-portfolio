import {
  useEffect,
  useState,
  type CSSProperties,
} from 'react';

import styles from './Header.module.css';

type ActiveSection =
  | 'portfolio'
  | 'experience'
  | 'about'
  | null;

/*
 * Header는 본문보다 너무 작아지지 않도록
 * 최소 85% 크기를 유지합니다.
 */
const MIN_HEADER_SCALE = 0.7;

function getHeaderScale() {
  if (typeof window === 'undefined') {
    return 1;
  }

  const viewportScale =
    window.innerWidth / 1920;

  return Math.min(
    1,
    Math.max(
      viewportScale,
      MIN_HEADER_SCALE,
    ),
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] =
    useState(false);

  const [
    activeSection,
    setActiveSection,
  ] =
    useState<ActiveSection>(
      null,
    );

  const [scale, setScale] =
    useState(getHeaderScale);

  /*
   * Header 전용 반응형 scale
   */
  useEffect(() => {
    const handleResize = () => {
      setScale(
        getHeaderScale(),
      );
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

  /*
   * Scroll 상태 +
   * 현재 섹션 active 처리
   */
  useEffect(() => {
    const handleScroll = () => {
      /*
       * 헤더가 축소된 만큼
       * 스크롤 기준도 같이 보정
       */
      setIsScrolled(
        window.scrollY >
          20 * scale,
      );

      const works =
        document.getElementById(
          'works',
        );

      const experience =
        document.getElementById(
          'experience',
        );

      const about =
        document.getElementById(
          'about',
        );

      /*
       * 1920 기준
       *
       * Header 높이: 72px
       * 추가 offset: 50px
       *
       * Header 자체 크기에 맞게
       * active 판단 위치도 축소
       */
      const headerHeight =
        72 * scale;

      const activeOffset =
        50 * scale;

      const checkY =
        headerHeight +
        activeOffset;

      const isInSection = (
        element:
          | HTMLElement
          | null,
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

      if (
        isInSection(works)
      ) {
        setActiveSection(
          'portfolio',
        );
      } else if (
        isInSection(about)
      ) {
        setActiveSection(
          'about',
        );
      } else if (
        isInSection(
          experience,
        )
      ) {
        setActiveSection(
          'experience',
        );
      } else {
        /*
         * Hero / Process /
         * Contact 등에서는
         * 모든 메뉴 비활성화
         */
        setActiveSection(
          null,
        );
      }
    };

    handleScroll();

    window.addEventListener(
      'scroll',
      handleScroll,
      {
        passive: true,
      },
    );

    /*
     * resize 시 섹션 위치도
     * 다시 계산
     */
    window.addEventListener(
      'resize',
      handleScroll,
    );

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll,
      );

      window.removeEventListener(
        'resize',
        handleScroll,
      );
    };
  }, [scale]);

  /*
   * CSS에서 사용할
   * Header 전용 scale 변수
   */
  const headerStyle = {
    '--header-scale':
      scale,
  } as CSSProperties;

  return (
    <>
      {/* 반투명 + blur 전용 레이어 */}
      <div
        className={`${styles.headerGlass} ${
          isScrolled
            ? styles.scrolled
            : ''
        }`}
        style={headerStyle}
      />

      {/* 글자 / navigation 레이어 */}
      <header
        className={
          styles.header
        }
        style={headerStyle}
      >
        <div
          className={
            styles.navLeft
          }
        >
          <a
            href="#"
            className={
              styles.navLogo
            }
          >
            KIM HEEUN
          </a>
        </div>

        <nav
          className={
            styles.navRight
          }
        >
          <a
            href="#works"
            className={`${styles.navLink} ${
              activeSection ===
              'portfolio'
                ? styles.active
                : ''
            }`}
          >
            Portfolio
          </a>

          <a
            href="#about"
            className={`${styles.navLink} ${
              activeSection ===
              'about'
                ? styles.active
                : ''
            }`}
          >
            About
          </a>

          <a
            href="#experience"
            className={`${styles.navLink} ${
              activeSection ===
              'experience'
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