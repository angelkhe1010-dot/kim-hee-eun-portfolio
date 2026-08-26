import { useRef, useState } from 'react';
import styles from './Works.module.css';

import chevronLeft from '../../assets/images/works/chevron-left.svg';

import SmartHomeCard from './works/SmartHomeCard';
import SolPayCard from './works/SolPayCard';
import BfmCard from './works/BfmCard';
import CardApplyCard from './works/CardApplyCard';
import D2tCard from './works/D2tCard';
import HeyBeagleCard from './works/HeyBeagleCard';

const TOTAL_PROJECTS = 6;

const SOLPAY_URL =
  'https://www.shinhancard.com/mob/MOBFM829N/MOBFM829R01.shc?crustMenuId=ms117';

const projects = [
  {
    id: 'solpay',
    Component: SolPayCard,
  },
  {
    id: 'd2t',
    Component: D2tCard,
  },
  {
    id: 'cardapply',
    Component: CardApplyCard,
  },
  {
    id: 'heybeagle',
    Component: HeyBeagleCard,
  },
  {
    id: 'bfm',
    Component: BfmCard,
  },
  {
    id: 'smart-home',
    Component: SmartHomeCard,
  },
];

function getCircularOffset(
  index: number,
  activeIndex: number,
  length: number,
) {
  let offset = index - activeIndex;

  if (offset > length / 2) {
    offset -= length;
  }

  if (offset < -length / 2) {
    offset += length;
  }

  return offset;
}

export default function Works() {
  const [activeIndex, setActiveIndex] = useState(0);

  const pointerStartX = useRef<number | null>(null);
  const pointerCurrentX = useRef<number | null>(null);

  const pointerIdRef = useRef<number | null>(null);

  const didDrag = useRef(false);

  const goPrev = () => {
    setActiveIndex((current) =>
      current === 0
        ? projects.length - 1
        : current - 1,
    );
  };

  const goNext = () => {
    setActiveIndex((current) =>
      current === projects.length - 1
        ? 0
        : current + 1,
    );
  };

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    pointerStartX.current = event.clientX;
    pointerCurrentX.current = event.clientX;

    pointerIdRef.current = event.pointerId;

    didDrag.current = false;
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (pointerStartX.current === null) {
      return;
    }

    pointerCurrentX.current = event.clientX;

    const distance =
      event.clientX - pointerStartX.current;

    if (
      Math.abs(distance) >= 10 &&
      !didDrag.current
    ) {
      didDrag.current = true;

      try {
        event.currentTarget.setPointerCapture(
          event.pointerId,
        );
      } catch {
        // 브라우저에서 capture가 불가능한 경우 무시
      }
    }
  };

  const handlePointerUp = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (
      pointerStartX.current === null ||
      pointerCurrentX.current === null
    ) {
      return;
    }

    const distance =
      pointerCurrentX.current -
      pointerStartX.current;

    if (Math.abs(distance) >= 60) {
      if (distance < 0) {
        goNext();
      } else {
        goPrev();
      }
    }

    if (
      pointerIdRef.current !== null &&
      event.currentTarget.hasPointerCapture(
        pointerIdRef.current,
      )
    ) {
      event.currentTarget.releasePointerCapture(
        pointerIdRef.current,
      );
    }

    pointerStartX.current = null;
    pointerCurrentX.current = null;
    pointerIdRef.current = null;
  };

  const handlePointerCancel = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (
      pointerIdRef.current !== null &&
      event.currentTarget.hasPointerCapture(
        pointerIdRef.current,
      )
    ) {
      event.currentTarget.releasePointerCapture(
        pointerIdRef.current,
      );
    }

    pointerStartX.current = null;
    pointerCurrentX.current = null;
    pointerIdRef.current = null;
    didDrag.current = false;
  };

  const handleCardClick = (
    id: string,
    offset: number,
  ) => {
    /*
     * 드래그 직후 발생하는 click은 무시
     */
    if (didDrag.current) {
      didDrag.current = false;
      return;
    }

    /*
     * SOL Pay가 현재 메인 카드일 때 클릭하면
     * 신한카드 SUPER SOL 페이지 새 탭으로 이동
     */
    if (id === 'solpay' && offset === 0) {
      window.open(
        SOLPAY_URL,
        '_blank',
        'noopener,noreferrer',
      );

      return;
    }

    /*
     * 왼쪽 카드 클릭
     */
    if (offset === -1) {
      goPrev();
      return;
    }

    /*
     * 오른쪽 카드 클릭
     */
    if (offset === 1) {
      goNext();
    }
  };

  return (
    <section
      className={styles.works}
      id="works"
    >
      <div className={styles.titleBlock}>
        <p className={styles.titleHeading}>
          Selected Works
        </p>

        <p className={styles.titleSub}>
          06 Projects · 2023 - 2026
        </p>
      </div>

      <div
        className={styles.carouselViewport}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <div className={styles.track}>
          {projects.map(
            ({ id, Component }, index) => {
              const offset =
                getCircularOffset(
                  index,
                  activeIndex,
                  projects.length,
                );

              const isActive =
                offset === 0;

              const isLeft =
                offset === -1;

              const isRight =
                offset === 1;

              const isVisible =
                isActive ||
                isLeft ||
                isRight;

              return (
                <div
                  key={id}
                  className={[
                    styles.cardSlot,

                    isActive
                      ? styles.cardActive
                      : '',

                    isLeft
                      ? styles.cardLeft
                      : '',

                    isRight
                      ? styles.cardRight
                      : '',

                    !isVisible
                      ? styles.cardHidden
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() =>
                    handleCardClick(
                      id,
                      offset,
                    )
                  }
                >
                  <div
                    className={
                      isActive
                        ? styles.largeCardScale
                        : styles.smallCardScale
                    }
                  >
                    <Component
                      variant={
                        isActive
                          ? 'large'
                          : 'small'
                      }
                    />
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>

      <div className={styles.pagination}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="이전 프로젝트"
          onClick={goPrev}
        >
          <img
            src={chevronLeft}
            alt=""
            className={styles.chevron}
          />
        </button>

        <span
          className={`${styles.pageNum} ${styles.pageNumActive}`}
        >
          {String(activeIndex + 1).padStart(
            2,
            '0',
          )}
        </span>

        <span className={styles.pageDash}>
          -
        </span>

        <span
          className={`${styles.pageNum} ${styles.pageNumMuted}`}
        >
          {String(TOTAL_PROJECTS).padStart(
            2,
            '0',
          )}
        </span>

        <button
          type="button"
          className={styles.iconButton}
          aria-label="다음 프로젝트"
          onClick={goNext}
        >
          <img
            src={chevronLeft}
            alt=""
            className={`${styles.chevron} ${styles.chevronRight}`}
          />
        </button>
      </div>
    </section>
  );
}