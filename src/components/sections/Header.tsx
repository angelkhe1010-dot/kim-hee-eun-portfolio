import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';

type ActiveSection =
  | 'portfolio'
  | 'about'
  | 'experience'
  | 'skills'
  | 'contact'
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

/*
 * Portfolio 드롭다운의 실제 위치/크기(panelRect)를 저장하는 타입.
 * 유리 배경 패널(headerGlass 쪽, blend-mode 미적용)을 텍스트 목록
 * (header 쪽, blend-mode 적용)과 픽셀 단위로 정확히 겹치기 위해,
 * 실제 렌더된 텍스트 목록의 getBoundingClientRect()를 그대로 복사해
 * 쓴다 -- 폰트 렌더링/줄바꿈 등으로 발생할 수 있는 오차를 없앤다.
 */
type PanelRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const PORTFOLIO_MENU_ITEMS = [
  { label: 'All Portfolio', to: '/#portfolio' },
  {
    label: '신한카드 - SOLPay 상세보기',
    to: '/works/solpay',
  },
  {
    label: '신한카드 - 카드신청 상세보기',
    to: '/works/cardapply',
  },
];

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

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const [panelRect, setPanelRect] =
    useState<PanelRect | null>(null);

  const navItemRef = useRef<HTMLDivElement>(null);
  const menuListRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const [headerBoxHeight, setHeaderBoxHeight] =
    useState<number | null>(null);

  /*
   * 메뉴가 5개로 늘어난 뒤 좁은 화면에서 .navRight가 둘째 줄로
   * 줄바꿈되면 <header>의 실제 높이가 늘어난다. .headerGlass는
   * 별도 DOM 트리(형제 레이어)라 CSS만으로는 이 높이를 그대로
   * 따라갈 수 없으므로, ResizeObserver로 header의 실제 렌더 높이를
   * 재서 headerGlass에 그대로 복사한다(Portfolio 드롭다운의
   * menuGlass/menuList 쌍과 같은 이유, 같은 방식).
   */
  useEffect(() => {
    const el = headerRef.current;

    if (!el) {
      return;
    }

    const measure = () => {
      setHeaderBoxHeight(
        el.getBoundingClientRect().height,
      );
    };

    measure();

    const observer = new ResizeObserver(measure);

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

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
          'portfolio',
        );

      const about =
        document.getElementById(
          'about',
        );

      const experience =
        document.getElementById(
          'experience',
        );

      /*
       * Design Skills 섹션은 Skills.tsx에 이미 id="skills"로 존재해
       * ("Design Skills" 제목도 이미 그 안에 있다) -- 새 id를 따로
       * 만들지 않고 그대로 재사용한다.
       */
      const skills =
        document.getElementById(
          'skills',
        );

      const contact =
        document.getElementById(
          'contact',
        );

      /*
       * 1920 기준
       *
       * Header 높이: 72px
       * 추가 offset: 50px
       *
       * Header 자체 크기에 맞게
       * active 판단 위치도 축소.
       * 메뉴가 좁은 화면에서 둘째 줄로 줄바꿈되면 실제 헤더 높이가
       * 72px*scale보다 커지므로, 측정된 실제 높이(headerBoxHeight)가
       * 있으면 그 값을 우선한다.
       */
      const headerHeight =
        headerBoxHeight ??
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

      /*
       * Contact는 페이지 맨 마지막 섹션이라, 문서 길이가 짧으면
       * (뷰포트보다 섹션 자체가 크지 않으면) 스크롤이 최대치에
       * 도달해도 checkY 지점이 섹션 안쪽까지 못 들어가는 경우가
       * 있다 -- 이 경우 isInSection(contact)는 계속 false지만
       * 실제로는 페이지 맨 아래(=Contact)를 보고 있는 것이므로,
       * "문서 끝에 도달했는지"로 직접 판정해 우선 처리한다.
       */
      const isAtDocumentBottom =
        window.scrollY +
          window.innerHeight >=
        document.documentElement
          .scrollHeight - 1;

      if (
        isAtDocumentBottom &&
        contact
      ) {
        setActiveSection(
          'contact',
        );
      } else if (
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
      } else if (
        isInSection(skills)
      ) {
        setActiveSection(
          'skills',
        );
      } else if (
        isInSection(contact)
      ) {
        setActiveSection(
          'contact',
        );
      } else {
        /*
         * Hero / Approach /
         * Process 등에서는
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
  }, [scale, headerBoxHeight]);

  /*
   * Portfolio 드롭다운이 열려 있는 동안, 실제로 렌더된 텍스트 목록
   * (menuListRef)의 화면상 위치/크기를 그대로 읽어 유리 배경 패널에
   * 복사한다. 두 레이어(headerGlass의 배경, header의 텍스트)가 서로
   * 다른 DOM 트리에 있어 CSS만으로는 겹칠 수 없기 때문이다.
   */
  useLayoutEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const measure = () => {
      const el = menuListRef.current;

      if (!el) {
        return;
      }

      const rect = el.getBoundingClientRect();

      setPanelRect({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      });
    };

    measure();

    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, { passive: true });

    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure);
    };
  }, [isMenuOpen, scale]);

  /*
   * 데스크톱 hover로 열렸을 때: 트리거 -> 메뉴로 포인터가 이동하는
   * 짧은 간격에서 깜빡이며 닫히지 않도록, mouseleave는 짧은 지연 뒤에
   * 실제로 포인터가 wrapper 밖에 있을 때만 닫는다(hover-intent).
   * 트리거와 메뉴 사이의 간격 자체는 CSS의 padding-bottom bridge로
   * 메워 hit-test상 끊기지 않게 한다(Header.module.css .navItem 참고).
   */
  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const openMenu = () => {
    clearCloseTimeout();
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    clearCloseTimeout();
    setIsMenuOpen(false);
  };

  const scheduleClose = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsMenuOpen(false);
    }, 120);
  };

  const supportsHover = () =>
    typeof window !== 'undefined' &&
    window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;

  /*
   * Escape로 닫기 + 바깥 클릭으로 닫기 (열려 있을 때만 리스너를 붙인다)
   */
  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (
        navItemRef.current &&
        !navItemRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isMenuOpen]);

  useEffect(
    () => () => clearCloseTimeout(),
    [],
  );

  /*
   * CSS에서 사용할
   * Header 전용 scale 변수
   */
  const headerStyle = {
    '--header-scale':
      scale,
  } as CSSProperties;

  const panelStyle: CSSProperties | undefined = panelRect
    ? {
        left: panelRect.left,
        top: panelRect.top,
        width: panelRect.width,
        height: panelRect.height,
      }
    : undefined;

  const headerGlassStyle: CSSProperties = {
    ...headerStyle,
    ...(headerBoxHeight !== null
      ? { height: headerBoxHeight }
      : {}),
  };

  return (
    <>
      {/* 반투명 + blur 전용 레이어 */}
      <div
        className={`${styles.headerGlass} ${
          isScrolled
            ? styles.scrolled
            : ''
        }`}
        style={headerGlassStyle}
      >
        {/*
         * Portfolio 드롭다운의 유리 배경만 여기 둔다 -- header 레이어의
         * mix-blend-mode/filter 파이프라인을 타지 않아야 Figma의
         * 부드러운 반투명 패널(blur 12px, 흰색 6% 배경)이 그대로
         * 보인다. 텍스트는 아래 header 레이어 쪽에 별도로 있다.
         */}
        {isMenuOpen && panelStyle && (
          <div
            className={styles.menuGlass}
            style={panelStyle}
            aria-hidden="true"
          />
        )}
      </div>

      {/* 글자 / navigation 레이어 */}
      <header
        ref={headerRef}
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
          <div
            className={styles.navItem}
            ref={navItemRef}
            onMouseEnter={() => {
              if (supportsHover()) {
                openMenu();
              }
            }}
            onMouseLeave={() => {
              if (supportsHover()) {
                scheduleClose();
              }
            }}
            onBlur={(e) => {
              if (
                !navItemRef.current?.contains(
                  e.relatedTarget as Node,
                )
              ) {
                closeMenu();
              }
            }}
          >
            <button
              type="button"
              className={`${styles.navLink} ${styles.navTrigger} ${
                activeSection === 'portfolio' || isMenuOpen
                  ? styles.active
                  : ''
              }`}
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
              aria-controls="portfolio-menu"
              onClick={(e) => {
                /*
                 * 마우스가 hover-capable한 기기에서는 mouseenter가
                 * 클릭 직전에 이미 메뉴를 열어버리므로, 곧바로 이어지는
                 * "실제 포인터 클릭"까지 토글에 반영하면 열리자마자
                 * 닫혀버린다(hover는 mouseleave로 스스로 닫는다).
                 * 반면 키보드 활성화(Enter/Space, event.detail === 0)나
                 * hover가 없는 터치 기기에서는 클릭이 유일한 열기/닫기
                 * 수단이므로 그대로 토글한다.
                 */
                const isKeyboardActivation = e.detail === 0;

                if (isKeyboardActivation || !supportsHover()) {
                  setIsMenuOpen((prev) => !prev);
                }
              }}
              onFocus={(e) => {
                /*
                 * 마우스 클릭도 클릭 직전에 focus를 발생시키므로,
                 * 여기서 무조건 열어버리면 onClick의 토글과 겹쳐
                 * "열렸다가 바로 닫히는" 상태가 된다. 진짜 키보드
                 * 포커스(:focus-visible)일 때만 자동으로 연다.
                 */
                if (e.target.matches(':focus-visible')) {
                  openMenu();
                }
              }}
            >
              Portfolio
            </button>

            {isMenuOpen && (
              <div
                className={styles.menuList}
                ref={menuListRef}
                role="menu"
                id="portfolio-menu"
                aria-label="Portfolio"
              >
                {PORTFOLIO_MENU_ITEMS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    role="menuitem"
                    className={styles.menuItem}
                    data-text={item.label}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

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

          {/*
           * "Design Skills"는 Skills.tsx의 id="skills" 섹션(이미
           * "Design Skills" 제목을 쓰고 있다)으로 이동한다 -- 새 id를
           * 만들지 않고 기존 id를 그대로 재사용한다.
           */}
          <a
            href="#skills"
            className={`${styles.navLink} ${
              activeSection ===
              'skills'
                ? styles.active
                : ''
            }`}
          >
            Design Skills
          </a>

          <a
            href="#contact"
            className={`${styles.navLink} ${
              activeSection ===
              'contact'
                ? styles.active
                : ''
            }`}
          >
            Contact
          </a>
        </nav>
      </header>
    </>
  );
}
