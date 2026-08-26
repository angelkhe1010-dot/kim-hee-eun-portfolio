import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

import bgBlob from '../../assets/images/hero/bg-blob.svg';
import bgWave from '../../assets/images/hero/bg-wave.svg';
import arrowDown from '../../assets/images/hero/arrow-down.svg';

import blob1 from '../../assets/images/hero/blob-1.png';
import blob3 from '../../assets/images/hero/blob-3.png';
import blob4 from '../../assets/images/hero/blob-4.png';
import blob5 from '../../assets/images/hero/blob-5.png';
import blob6 from '../../assets/images/hero/blob-6.png';

const ITEM_COUNT = 15;
const ITEM_SIZE = 330;

const ORBIT_DURATION = 32000;

const ITEM_SCALES = [
  0.64,
  0.48,
  0.5,
  0.48,
  0.5,
];

function BlobArtwork({
  index,
}: {
  index: number;
}) {
  switch (index) {
    /*
     * blob-1
     */
    case 0:
      return (
        <div
          className={styles.assetViewport}
        >
          <img
            src={blob1}
            alt=""
            className={styles.blobImg}
            style={{
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
      );

    /*
     * blob-3
     */
    case 1:
      return (
        <div
          className={styles.assetViewport}
        >
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

    /*
     * blob-4
     */
    case 2:
      return (
        <div
          className={styles.assetViewport}
        >
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

    /*
     * blob-5
     */
    case 3:
      return (
        <div
          className={styles.assetViewport}
        >
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
                transform:
                  'rotate(29.59deg)',
              }}
            >
              <img
                src={blob5}
                alt=""
                className={
                  styles.blobImg
                }
              />
            </div>
          </div>
        </div>
      );

    /*
     * blob-6
     */
    case 4:
    default:
      return (
        <div
          className={styles.assetViewport}
        >
          <div
            style={{
              position: 'relative',
              width: 330,
              height: 330,
              overflow: 'visible',
              transform:
                'rotate(180deg) scaleY(-1)',
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
                  transform:
                    'rotate(-2.06deg)',
                }}
              >
                <img
                  src={blob6}
                  alt=""
                  className={
                    styles.blobImg
                  }
                />
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default function Hero() {
  const heroRef =
    useRef<HTMLElement | null>(null);

  const blobRefs = useRef<
    (HTMLDivElement | null)[]
  >([]);

  useEffect(() => {
    let animationFrame = 0;

    const startTime =
      performance.now();

    const animate = (
      now: number,
    ) => {
      const hero = heroRef.current;

      if (!hero) {
        animationFrame =
          requestAnimationFrame(
            animate,
          );

        return;
      }

      const width =
        hero.clientWidth;

      const height =
        hero.clientHeight;

      /*
       * Orbit center
       */
      const centerX =
        width * 0.5;

      const centerY =
        height * 1.085;

      const radiusX =
        width >= 1600
          ? width * 0.27
          : Math.max(
              width * 0.295,
              420,
            );

      const radiusY =
        height >= 900
          ? height * 0.475
          : Math.max(
              height * 0.46,
              350,
            );
      const elapsed =
        now - startTime;

      const orbitProgress =
        (elapsed % ORBIT_DURATION) /
        ORBIT_DURATION;

      blobRefs.current.forEach(
        (node, index) => {
          if (!node) {
            return;
          }

          /*
           * 15개 균등 배치
           *
           * 360 / 15 = 24도
           */
          const phase =
            (index /
              ITEM_COUNT) *
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
           * 도형은 회전시키지 않고
           * 궤도 위치만 이동
           */
          node.style.transform = `
            translate3d(
              ${
                x -
                ITEM_SIZE / 2
              }px,
              ${
                y -
                ITEM_SIZE / 2
              }px,
              0
            )
          `;

          /*
           * 아래쪽에 있을수록
           * 앞으로 보이게 처리
           */
          const normalizedY =
            (y -
              (centerY -
                radiusY)) /
            (radiusY * 2);

          node.style.zIndex =
            String(
              Math.round(
                10 +
                  normalizedY *
                    20,
              ),
            );

          node.style.opacity =
            '1';
        },
      );

      animationFrame =
        requestAnimationFrame(
          animate,
        );
    };

    animationFrame =
      requestAnimationFrame(
        animate,
      );

    return () => {
      cancelAnimationFrame(
        animationFrame,
      );
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      id="hero"
    >
      {/* Background Blob */}
      <div
        className={styles.bgBlob}
      >
        <div
          className={
            styles.bgBlobInner
          }
        >
          <div
            style={{
              position: 'absolute',
              inset:
                '-19.98% -2.16% 4.93% -23.64%',
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

      {/* Background Wave */}
      <div
        className={styles.bgWave}
      >
        <div
          style={{
            position: 'absolute',
            inset:
              '-8.16% -12.97%',
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

      {/* Orbit Blobs */}
      <div
        className={
          styles.blobCluster
        }
        aria-hidden="true"
      >
        {Array.from(
          {
            length: ITEM_COUNT,
          },
          (_, index) => {
            const artworkIndex =
              index % 5;

            return (
              <div
                key={index}
                ref={(element) => {
                  blobRefs.current[
                    index
                  ] = element;
                }}
                className={
                  styles.blobItem
                }
              >
                <div
                  className={
                    styles.blobVisual
                  }
                  style={{
                    transform: `scale(${
                      ITEM_SCALES[
                        artworkIndex
                      ]
                    })`,
                  }}
                >
                  <BlobArtwork
                    index={
                      artworkIndex
                    }
                  />
                </div>
              </div>
            );
          },
        )}
      </div>

      {/* Main Text */}
      <div
        className={
          styles.textBlock
        }
      >
        <div
          className={
            styles.headlineGroup
          }
        >
          <p
            className={
              styles.headline
            }
          >
            UIUX DESIGN
            <br />
            PORTFOLIO
          </p>

          <p
            className={
              styles.subtext
            }
          >
            김희은 · UI/UX
            Designer · 2026
          </p>
        </div>

        <a
          href="#works"
          className={
            styles.ctaButton
          }
        >
          <span
            className={
              styles.ctaLabel
            }
          >
            View Projects
          </span>

          <span
            className={
              styles.ctaIcon
            }
          >
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