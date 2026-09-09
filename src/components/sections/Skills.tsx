import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

import styles from './Skills.module.css';

import ellipseBlue1 from '../../assets/images/skills/ellipse-blue-1.svg';
import ellipseBlue2 from '../../assets/images/skills/ellipse-blue-2.svg';
import ellipseRed from '../../assets/images/skills/ellipse-red.svg';
import codeIcon from '../../assets/images/skills/code-icon.svg';
import ellipsePink from '../../assets/images/skills/ellipse-pink.svg';
import cursorArt from '../../assets/images/skills/cursor.svg';

/*
 * `--motion` is a custom property consumed by every keyframe rule's
 * `animation-play-state: var(--motion)` in Skills.module.css. CSSProperties
 * doesn't know about custom properties, so this extends it just enough to
 * type-check the inline style below.
 */
type MotionStyle = CSSProperties & { '--motion': 'running' | 'paused' };

const captions = [
  {
    title: 'Lottie 인터랙션 및 모션 디자인',
    desc: '작은 움직임을 더해 화면의 흐름을 자연스럽게 만들고 생동감을 더했습니다.',
  },
  {
    title: 'Claude 디자인 및 코드 구현',
    desc: 'Claude로 디자인을 웹으로 구현해 포트폴리오를 완성했습니다.',
  },
  {
    title: 'Figma 인터랙션 및 프로토타이핑',
    desc: '인터랙션을 직접 연결하여 실제 사용 흐름을 구체화했습니다.',
  },
];

export default function Skills() {
  const cardsRowRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = cardsRowRef.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, []);

  const motionStyle = {
    '--motion': isVisible ? 'running' : 'paused',
  } as MotionStyle;

  return (
    <section className={styles.skills} id="skills">
      <div className={styles.titleBlock}>
        <p className={styles.titleHeading}>Design Skills</p>
        <p className={styles.titleSub}>디자인을 넘어, 움직임과 코드로 사용자 경험을 구현합니다.</p>
      </div>

      <div className={styles.cardsRow} ref={cardsRowRef} style={motionStyle}>
        {/* ---------- Card 1: Lottie ---------- */}
        <div
          className={`${styles.card} ${styles.cardBlue}`}
          tabIndex={0}
          aria-label="Lottie 인터랙션 및 모션 디자인"
        >
          {/*
            배경 글로우 2장을 각각 별도 래퍼에 담아 hover 시 서로 다른
            거리/방향으로 이동시켜 parallax를 만든다. 래퍼는 위치 이동만,
            글로우 자체의 breathe(scale/opacity) 애니메이션은 그대로 유지.
          */}
          <span
            className={styles.parallaxBg1}
            style={{ left: 28, top: 91, width: 754, height: 754 }}
          >
            <img
              src={ellipseBlue1}
              alt=""
              className={`${styles.glow} ${styles.glowBreathe}`}
            />
          </span>
          <span
            className={styles.parallaxBg2}
            style={{ left: -242, top: -260, width: 620, height: 620 }}
          >
            <img
              src={ellipseBlue2}
              alt=""
              className={`${styles.glow} ${styles.glowBreathe}`}
              style={{ animationDelay: '-3.4s' }}
            />
          </span>

          <div
            className={`${styles.glassPanel} ${styles.glassPanelBlue}`}
            style={{ left: 50, top: 78, width: 433, height: 480 }}
          >
            <div
              className={styles.sliderRow}
              style={{ left: 28, top: 184, width: 373 }}
            />
            <div
              className={`${styles.sliderRow} ${styles.sliderRowActive} ${styles.barBreathe}`}
              style={{ left: 28, top: 239, width: 373 }}
            />
            <div
              className={styles.sliderRow}
              style={{ left: 28, top: 294, width: 373 }}
            />
            <div
              className={styles.sliderRow}
              style={{ left: 28, top: 349, width: 373 }}
            />
            <div
              className={styles.sliderRow}
              style={{ left: 28, top: 404, width: 373 }}
            />

            <div
              className={`${styles.sliderDot} ${styles.sliderDotActive} ${styles.dotDrift1}`}
              style={{ left: 48, top: 231 }}
            />
            <div
              className={`${styles.sliderDot} ${styles.sliderDotActive} ${styles.dotDrift2}`}
              style={{ left: 258, top: 231 }}
            />
            <div
              className={`${styles.sliderDot} ${styles.sliderDotIdle} ${styles.idleFloat1}`}
              style={{ left: 333, top: 341 }}
            />
            <div
              className={`${styles.sliderDot} ${styles.sliderDotIdle} ${styles.idleFloat2}`}
              style={{ left: 173, top: 396 }}
            />

            {/*
              Lottie 타임라인 니들: 삼각형(재생 헤드)과 트랙(세로선)을
              분리해서 서로 다른 타이밍으로 움직이도록 인라인 SVG로 구성
            */}
            <div className={styles.timelineArt}>
              <svg
                className={styles.needleSweep}
                width="67"
                height="361.612"
                viewBox="0 0 67 361.612"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className={styles.needlePoly}
                  d="M36.2318 43.516C34.932 45.4648 32.068 45.4648 30.7682 43.516L13.0894 17.0085C11.6341 14.8264 13.1983 11.903 15.8211 11.903L51.1789 11.903C53.8017 11.903 55.366 14.8264 53.9106 17.0085L36.2318 43.516Z"
                  fill="#FA8423"
                />
                <rect
                  className={styles.needleTrack}
                  x="31"
                  y="37.6119"
                  width="5"
                  height="324"
                  rx="2.5"
                  fill="#FA8423"
                />
              </svg>
            </div>

            <div className={styles.axisTick} style={{ left: 48, top: 133 }}>
              <p className={styles.axisLabel}>0s</p>
              <span className={styles.axisMark} />
            </div>
            <div className={styles.axisTick} style={{ left: 205.5, top: 133 }}>
              <p className={styles.axisLabel}>1s</p>
              <span className={styles.axisMark} />
            </div>
            <div className={styles.axisTick} style={{ left: 363, top: 133 }}>
              <p className={styles.axisLabel}>2s</p>
              <span className={styles.axisMark} />
            </div>
          </div>
        </div>

        {/* ---------- Card 2: Claude ---------- */}
        <div
          className={`${styles.card} ${styles.cardPeach}`}
          tabIndex={0}
          aria-label="Claude 디자인 및 코드 구현"
        >
          <img
            src={ellipseRed}
            alt=""
            className={`${styles.glow} ${styles.glowBreathe}`}
            style={{ left: 78, top: -299, width: 754, height: 754, animationDelay: '-6.1s' }}
          />

          <div
            className={`${styles.glassPanel} ${styles.glassPanelPeach}`}
            style={{ left: 50, top: 78, width: 433, height: 480 }}
          >
            <div className={styles.chatHead}>
              <div
                className={styles.chatHeadLine}
                style={{ top: 14.11, width: 183.43 }}
              />
              <div
                className={styles.chatHeadLine}
                style={{ top: 37.04, width: 112 }}
              />
            </div>

            <div className={styles.chatBubble}>
              <div
                className={styles.chatBubbleLine}
                style={{ top: 16, width: 208 }}
              />
              <div
                className={styles.chatBubbleLine}
                style={{ top: 42, width: 159 }}
              />
              <div
                className={styles.chatBubbleLine}
                style={{ top: 68, width: 105 }}
              />
            </div>

            {/*
              codeContent: 줄이 순서대로 타이핑되어 나타났다가,
              전체가 함께 부드럽게 사라지며 초기화되는 루프.
              codeBlock(틀)에는 애니메이션을 주지 않고
              내부 codeContent 래퍼에만 fade in/out을 적용해
              라인들의 clip-path 리셋이 보이지 않게 감춘다.
            */}
            <div className={styles.codeBlock}>
              <div className={styles.codeContent}>
                <img src={codeIcon} alt="" className={styles.codeIcon} />

                <div
                  className={`${styles.codeLine} ${styles.typeRowAGray}`}
                  style={{ left: 25, top: 62, width: 50, background: '#5d616e' }}
                />
                <div
                  className={`${styles.codeLine} ${styles.typeRowAPurple}`}
                  style={{ left: 83, top: 62, width: 109, background: '#cbb6db' }}
                />
                <div
                  className={`${styles.codeLine} ${styles.typeRowBOrange}`}
                  style={{ left: 25, top: 86, width: 50, background: '#fa8423' }}
                />
                <div
                  className={`${styles.codeLine} ${styles.typeRowBGray}`}
                  style={{ left: 83, top: 86, width: 167, background: '#5d616e' }}
                />
                <div
                  className={`${styles.codeLine} ${styles.typeCursor}`}
                  style={{ left: 222, top: 108, width: 4, height: 18, background: '#fa8423' }}
                />
                <div
                  className={`${styles.codeLine} ${styles.typeRowCGray1}`}
                  style={{ left: 25, top: 110, width: 85, background: '#5d616e' }}
                />
                <div
                  className={`${styles.codeLine} ${styles.typeRowCGray2}`}
                  style={{ left: 118, top: 110, width: 100, background: '#5d616e' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Card 3: Figma ---------- */}
        <div
          className={`${styles.card} ${styles.cardLavender}`}
          tabIndex={0}
          aria-label="Figma 인터랙션 및 프로토타이핑"
        >
          <img
            src={ellipsePink}
            alt=""
            className={`${styles.glow} ${styles.glowBreathe}`}
            style={{ left: 78, top: -299, width: 754, height: 754, animationDelay: '-1.8s' }}
          />

          {/*
            figmaIllustration: 배경 글로우를 제외한 폰 2장 + 연결선 +
            커서를 한 그룹으로 묶어, hover 시 이 그룹 전체만 살짝
            확대되게 한다(요소별 개별 이동은 전부 제거).
          */}
          <div className={styles.figmaIllustration}>
            <div
              className={styles.phoneCard}
              style={{ left: 50 }}
            >
              <div
                className={styles.phoneBlockPurple}
                style={{ left: 20.47, top: 56.3, width: 162.776, height: 97.251 }}
              />
              <div
                className={styles.phoneBlockPurple}
                style={{ left: 20.47, top: 243.64, width: 162.776, height: 61.422 }}
              />
              <div
                className={styles.phoneBlockPurple}
                style={{ left: 20.47, top: 168.91, width: 126.946, height: 14.332 }}
              />
              <div
                className={styles.phoneBlockPurple}
                style={{ left: 20.47, top: 190.41, width: 81.896, height: 14.332 }}
              />
              <div
                className={styles.phoneBlockPurple}
                style={{ left: 64.49, top: 16.38, width: 75.756, height: 14.332 }}
              />
            </div>

            {/* phone2 = 연결선이 도착하는 오른쪽 화면 */}
            <div
              className={styles.phoneCard}
              style={{ left: 279.29 }}
            >
              {/* 연결 지점: 커브가 다 그려진 직후 짧게 강조되는 블록 */}
              <div
                className={`${styles.phoneBlockBlue} ${styles.connectionPoint}`}
                style={{ left: 20.47, top: 56.3, width: 162.766, height: 160.72 }}
              />
              <div
                className={styles.phoneBlockBlue}
                style={{ left: 20.47, top: 229.3, width: 126.946, height: 14.332 }}
              />
              <div
                className={styles.phoneBlockBlue}
                style={{ left: 20.47, top: 250.8, width: 81.896, height: 14.332 }}
              />
              <div
                className={styles.phoneBlockBlue}
                style={{ left: 64.49, top: 16.38, width: 75.756, height: 14.332 }}
              />
            </div>

            {/*
              연결선: Figma node 394:255823 > Group 2117919165 실측값
              (컨테이너 200x169, left139/top277 — bleed 보정 좌표).
              curve/arrowhead를 connectorDraw 그룹으로 묶어 opacity로
              감싸고, 그 안에서 curve는 stroke-dasharray/dashoffset로
              실제 그려지는 것처럼, 화살촉은 curve가 다 그려진 시점에
              맞춰 나타난다. reduced-motion 기본값은 항상 "다 그려진"
              정지 상태(Figma 최종 프레임)로 둔다.
            */}
            <svg
              className={styles.connectorArt}
              viewBox="0 0 200 169"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g className={styles.connectorDraw}>
                <path
                  className={styles.connectorCurve}
                  d="M29.5 156.003C49 155.003 122.5 166.003 130 103.503C139.24 26.503 168 10.003 199 9.003"
                  stroke="#0B99FF"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="300"
                />
                <path
                  className={styles.connectorArrowhead}
                  d="M188 0.003L198.983 7.665C199.506 8.03 199.558 8.785 199.09 9.219L188 19.503"
                  stroke="#0B99FF"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <g className={styles.connectorDot}>
                <circle cx="16" cy="153.003" r="16" fill="white" fillOpacity="0.7" />
                <circle cx="16" cy="153.003" r="14" fill="none" stroke="#0B99FF" strokeWidth="4" />
              </g>
            </svg>

            {/* 클릭 지점 ripple: 커서가 원 근처에 도착하는 순간에만 짧게 표시 */}
            <span className={styles.clickRipple} />

            <img
              src={cursorArt}
              alt=""
              className={`${styles.cursorArt} ${styles.cursorClick}`}
            />
          </div>
        </div>
      </div>

      <div className={styles.captionsRow}>
        {captions.map((c) => (
          <div className={styles.caption} key={c.title}>
            <p className={styles.captionTitle}>{c.title}</p>
            <p className={styles.captionDesc}>{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
