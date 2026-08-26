import { useRef, useState } from 'react';
import styles from './Works.module.css';

import chevronLeft from '../../assets/images/works/chevron-left.svg';

import SmartHomeCard from './works/SmartHomeCard';
import SolPayCard from './works/SolPayCard';
import BfmCard from './works/BfmCard';

const TOTAL_PROJECTS = 6;

/*
 * 현재 Works.tsx에서 확인 가능한 프로젝트 3개.
 *
 * 최신 프로젝트가 01번부터 시작하도록 정렬.
 *
 * 나머지 3개 프로젝트 컴포넌트를 받으면
 * 이 배열 뒤에 그대로 추가하면 01 ~ 06 전체가 동작합니다.
 */
const projects = [
  {
    id: 'solpay',
    Component: SolPayCard,
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

    event.currentTarget.setPointerCapture(
      event.pointerId,
    );
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (pointerStartX.current === null) return;

    pointerCurrentX.current = event.clientX;
  };

  const handlePointerUp = () => {
    if (
      pointerStartX.current === null ||
      pointerCurrentX.current === null
    ) {
      return;
    }

    const distance =
      pointerCurrentX.current -
      pointerStartX.current;

    /*
     * 너무 작은 움직임은 클릭/실수로 판단.
     */
    if (Math.abs(distance) >= 60) {
      if (distance < 0) {
        goNext();
      } else {
        goPrev();
      }
    }

    pointerStartX.current = null;
    pointerCurrentX.current = null;
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
        onPointerCancel={handlePointerUp}
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

              const isActive = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;

              /*
               * 현재 카드와 바로 양옆 카드만 노출.
               */
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