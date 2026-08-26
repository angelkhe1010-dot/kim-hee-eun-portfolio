import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

import bgBlob from '../../assets/images/hero/bg-blob.svg';
import bgWave from '../../assets/images/hero/bg-wave.svg';
import arrowDown from '../../assets/images/hero/arrow-down.svg';

import blob1 from '../../assets/images/hero/blob-1.png';
import blob2 from '../../assets/images/hero/blob-2.png';
import blob3 from '../../assets/images/hero/blob-3.png';
import blob4 from '../../assets/images/hero/blob-4.png';
import blob5 from '../../assets/images/hero/blob-5.png';
import blob6 from '../../assets/images/hero/blob-6.png';

const ITEM_COUNT = 18;
const ITEM_SIZE = 330;

const ORBIT_DURATION = 32000;

/*
 * 이전보다 도형 크기를 한 단계 더 축소
 */
const ITEM_SCALES = [
  0.5,
  0.48,
  0.5,
  0.48,
  0.5,
];

function BlobArtwork({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (
        <div className={styles.assetViewport}>
          <div
            style={{
              position: 'absolute',
              left: -195,
              top: -207,
              width: 699.232,
              height: 748.991,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: 476.287,
                height: 595.504,
                transform: 'rotate(-152.17deg) scaleY(-1)',
              }}
            >
              <img
                src={blob1}
                alt=""
                className={styles.blobImg}
              />
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              left: 50.98,
              top: -18.83,
              width: 313.461,
              height: 311.64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: 233.491,
                height: 229.13,
                borderRadius: 105.291,
                overflow: 'hidden',
                transform: 'rotate(-152.17deg) scaleY(-1)',
              }}
            >
              <img
                src={blob2}
                alt=""
                className={styles.blobImg}
                style={{
                  width: '102.62%',
                  height: '130.74%',
                  left: '-2.62%',
                  top: '-0.02%',
                }}
              />
            </div>
          </div>
        </div>
      );

    case 1:
      return (
        <div className={styles.assetViewport}>
          <img
            src={blob3}
            alt=""
            className={styles.blobImg}
            style={{
              left: -49.67,
              top: -103.4,
              width: 428.234,
              height: 536.8,
            }}
          />
        </div>
      );

    case 2:
      return (
        <div className={styles.assetViewport}>
          <img
            src={blob4}
            alt=""
            className={styles.blobImg}
            style={{
              left: '-27.01%',
              top: '-44.91%',
              width: '147.97%',
              height: '191.22%',
            }}
          />
        </div>
      );

    case 3:
      return (
        <div className={styles.assetViewport}>
          <div
            style={{
              position: 'absolute',
              left: -171.41,
              top: -172.98,
              width: 706.461,
              height: 751.377,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: 474.864,
                height: 594.41,
                transform: 'rotate(29.59deg)',
              }}
            >
              <img
                src={blob5}
                alt=""
                className={styles.blobImg}
              />
            </div>
          </div>
        </div>
      );

    case 4:
    default:
      return (
        <div className={styles.assetViewport}>
          <div
            style={{
              position: 'relative',
              width: 330,
              height: 330,
              overflow: 'hidden',
              transform: 'rotate(180deg) scaleY(-1)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: -53.9,
                top: -129.8,
                width: 477.76,
                height: 589.098,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: 457.429,
                  height: 573.003,
                  transform: 'rotate(-2.06deg)',
                }}
              >
                <img
                  src={blob6}
                  alt=""
                  className={styles.blobImg}
                />
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let animationFrame = 0;

    const startTime = performance.now();

    const animate = (now: number) => {
      const hero = heroRef.current;

      if (!hero) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      const width = hero.clientWidth;
      const height = hero.clientHeight;

      /*
       * 궤도 조정
       *
       * - 전체 반원을 조금 더 아래로 이동
       * - 가로 폭을 더 좁게
       * - 세로 높이도 살짝 압축
       *
       * 가장 위쪽 도형들이 View Projects 버튼
       * 근처를 자연스럽게 지나가도록 설정
       */
      const centerX = width * 0.5;
      const centerY = height * 1.085;

      const radiusX = width * 0.27;
      const radiusY = height * 0.475;

      const elapsed = now - startTime;

      const orbitProgress =
        (elapsed % ORBIT_DURATION) /
        ORBIT_DURATION;

      blobRefs.current.forEach((node, index) => {
        if (!node) return;

        /*
         * 18개 균등 배치
         *
         * 360 / 18 = 20도
         *
         * 도형 크기를 줄인 만큼
         * 개수를 늘려 간격은 자연스럽게 유지
         */
        const phase =
          (index / ITEM_COUNT) *
          Math.PI *
          2;

        const angle =
          phase -
          orbitProgress *
            Math.PI *
            2;

        const x =
          centerX +
          Math.cos(angle) *
            radiusX;

        const y =
          centerY +
          Math.sin(angle) *
            radiusY;

        /*
         * 도형 자체는 회전하지 않고
         * 위치만 이동
         */
        node.style.transform = `
          translate3d(
            ${x - ITEM_SIZE / 2}px,
            ${y - ITEM_SIZE / 2}px,
            0
          )
        `;

        const normalizedY =
          (y - (centerY - radiusY)) /
          (radiusY * 2);

        node.style.zIndex =
          String(
            Math.round(
              10 +
              normalizedY * 20,
            ),
          );

        node.style.opacity = '1';
      });

      animationFrame =
        requestAnimationFrame(animate);
    };

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      id="hero"
    >
      <div className={styles.bgBlob}>
        <div className={styles.bgBlobInner}>
          <div
            style={{
              position: 'absolute',
              inset: '-19.98% -2.16% 4.93% -23.64%',
            }}
          >
            <img
              src={bgBlob}
              alt=""
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        </div>
      </div>

      <div className={styles.bgWave}>
        <div
          style={{
            position: 'absolute',
            inset: '-8.16% -12.97%',
          }}
        >
          <img
            src={bgWave}
            alt=""
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      </div>

      <div
        className={styles.blobCluster}
        aria-hidden="true"
      >
        {Array.from(
          { length: ITEM_COUNT },
          (_, index) => {
            const artworkIndex =
              index % 5;

            return (
              <div
                key={index}
                ref={(element) => {
                  blobRefs.current[index] = element;
                }}
                className={styles.blobItem}
              >
                <div
                  className={styles.blobVisual}
                  style={{
                    transform: `scale(${
                      ITEM_SCALES[
                        artworkIndex
                      ]
                    })`,
                  }}
                >
                  <BlobArtwork
                    index={artworkIndex}
                  />
                </div>
              </div>
            );
          },
        )}
      </div>

      <div className={styles.textBlock}>
        <div className={styles.headlineGroup}>
          <p className={styles.headline}>
            UIUX DESIGN
            <br />
            PORTFOLIO
          </p>

          <p className={styles.subtext}>
            김희은 · UI/UX Designer · 2026
          </p>
        </div>

        <a
          href="#works"
          className={styles.ctaButton}
        >
          <span className={styles.ctaLabel}>
            View Projects
          </span>

          <span className={styles.ctaIcon}>
            <img
              src={arrowDown}
              alt=""
            />
          </span>
        </a>
      </div>
    </section>
  );
}