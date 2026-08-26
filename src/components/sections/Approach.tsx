import { useEffect, useRef } from 'react';

import styles from './Approach.module.css';
import blobBg from '../../assets/images/approach/blob-bg.png';
import blobPink from '../../assets/images/approach/blob-pink.png';
import blobLeft from '../../assets/images/approach/blob-left.png';
import blobRight from '../../assets/images/approach/blob-right.png';
import blobStar from '../../assets/images/approach/blob-star.png';
import blobCursor from '../../assets/images/approach/blob-5.png';

interface FloatingBlobConfig {
  ref: React.RefObject<HTMLDivElement | null>;
  radius: number;
  vx: number;
  vy: number;
  mass?: number;
  phase?: number;
}

interface FloatingBody {
  element: HTMLDivElement;

  initialX: number;
  initialY: number;

  x: number;
  y: number;

  width: number;
  height: number;

  radius: number;

  vx: number;
  vy: number;

  mass: number;
  phase: number;
}

function useFloatingBlobs(
  areaRef: React.RefObject<HTMLElement | null>,
  configs: FloatingBlobConfig[],
): void {
  useEffect(() => {
    const area = areaRef.current;

    if (!area) return;

    const bodies: FloatingBody[] = [];

    configs.forEach((config) => {
      const element = config.ref.current;

      if (!element) return;

      bodies.push({
        element,

        initialX: element.offsetLeft,
        initialY: element.offsetTop,

        x: element.offsetLeft,
        y: element.offsetTop,

        width: element.offsetWidth,
        height: element.offsetHeight,

        radius: config.radius,

        vx: config.vx,
        vy: config.vy,

        mass: config.mass ?? 1,
        phase: config.phase ?? 0,
      });
    });

    let previousTime = performance.now();
    let animationId = 0;

    /**
     * 화면 벽 충돌
     */
    const bounceWall = (body: FloatingBody): void => {
      const maxX = area.clientWidth - body.width;
      const maxY = area.clientHeight - body.height;

      if (body.x <= 0) {
        body.x = 0;
        body.vx = Math.abs(body.vx);
      }

      if (body.x >= maxX) {
        body.x = maxX;
        body.vx = -Math.abs(body.vx);
      }

      if (body.y <= 0) {
        body.y = 0;
        body.vy = Math.abs(body.vy);
      }

      if (body.y >= maxY) {
        body.y = maxY;
        body.vy = -Math.abs(body.vy);
      }
    };

    /**
     * 도형끼리 충돌
     */
    const resolveCollision = (
      a: FloatingBody,
      b: FloatingBody,
    ): void => {
      const ax = a.x + a.width / 2;
      const ay = a.y + a.height / 2;

      const bx = b.x + b.width / 2;
      const by = b.y + b.height / 2;

      const dx = bx - ax;
      const dy = by - ay;

      let distance = Math.sqrt(dx * dx + dy * dy);

      const minDistance = a.radius + b.radius;

      if (distance >= minDistance) return;

      if (distance === 0) {
        distance = 0.001;
      }

      const nx = dx / distance;
      const ny = dy / distance;

      /**
       * 겹친 만큼 서로 밀어냄
       */
      const overlap = minDistance - distance;

      const totalMass = a.mass + b.mass;

      const aPush =
        (b.mass / totalMass) * overlap;

      const bPush =
        (a.mass / totalMass) * overlap;

      a.x -= nx * aPush;
      a.y -= ny * aPush;

      b.x += nx * bPush;
      b.y += ny * bPush;

      /**
       * 상대 속도
       */
      const relativeVX = b.vx - a.vx;
      const relativeVY = b.vy - a.vy;

      const velocityAlongNormal =
        relativeVX * nx +
        relativeVY * ny;

      if (velocityAlongNormal > 0) return;

      /**
       * 반발 계수
       */
      const restitution = 0.92;

      const inverseMassA = 1 / a.mass;
      const inverseMassB = 1 / b.mass;

      const impulse =
        (-(1 + restitution) *
          velocityAlongNormal) /
        (inverseMassA + inverseMassB);

      const impulseX = impulse * nx;
      const impulseY = impulse * ny;

      a.vx -= impulseX * inverseMassA;
      a.vy -= impulseY * inverseMassA;

      b.vx += impulseX * inverseMassB;
      b.vy += impulseY * inverseMassB;
    };

    /**
     * Animation Loop
     */
    const animate = (time: number): void => {
      const dt = Math.min(
        (time - previousTime) / 1000,
        0.033,
      );

      previousTime = time;

      bodies.forEach((body) => {
        /**
         * 완전한 직선 운동이 되지 않도록
         * 미세한 흔들림 추가
         */
        body.vx +=
          Math.sin(
            time * 0.0005 + body.phase,
          ) *
          2 *
          dt;

        body.vy +=
          Math.cos(
            time * 0.0006 + body.phase,
          ) *
          2 *
          dt;

        body.x += body.vx * dt;
        body.y += body.vy * dt;

        bounceWall(body);
      });

      /**
       * 모든 도형끼리 충돌 검사
       */
      for (
        let i = 0;
        i < bodies.length;
        i += 1
      ) {
        for (
          let j = i + 1;
          j < bodies.length;
          j += 1
        ) {
          resolveCollision(
            bodies[i],
            bodies[j],
          );
        }
      }

      bodies.forEach((body) => {
        bounceWall(body);

        const translateX =
          body.x - body.initialX;

        const translateY =
          body.y - body.initialY;

        /**
         * 미세한 회전
         */
        const rotation =
          Math.sin(
            time * 0.00035 + body.phase,
          ) * 2;

        body.element.style.transform = `
          translate3d(
            ${translateX}px,
            ${translateY}px,
            0
          )
          rotate(${rotation}deg)
        `;
      });

      animationId =
        requestAnimationFrame(animate);
    };

    animationId =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };

    // 최초 mount 때만 animation 생성
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default function Approach() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const pinkRef =
    useRef<HTMLDivElement>(null);

  const leftRef =
    useRef<HTMLDivElement>(null);

  const cursorRef =
    useRef<HTMLDivElement>(null);

  const rightRef =
    useRef<HTMLDivElement>(null);

  const starRef =
    useRef<HTMLDivElement>(null);

  useFloatingBlobs(sectionRef, [
    {
      ref: pinkRef,
      radius: 105,
      vx: 38,
      vy: 28,
      mass: 1,
      phase: 0,
    },
    {
      ref: leftRef,
      radius: 250,
      vx: 24,
      vy: 30,
      mass: 2.5,
      phase: 1.5,
    },
    {
      ref: cursorRef,
      radius: 120,
      vx: -34,
      vy: 32,
      mass: 1.2,
      phase: 3,
    },
    {
      ref: rightRef,
      radius: 145,
      vx: -28,
      vy: -34,
      mass: 1.5,
      phase: 4.5,
    },

    /**
     * Star
     *
     * 기존 도형들과 다른 방향으로 출발시켜서
     * 자연스럽게 화면 안을 돌아다니도록 설정
     */
    {
      ref: starRef,
      radius: 95,
      vx: -32,
      vy: 26,
      mass: 1,
      phase: 5.8,
    },
  ]);

  return (
    <section
      ref={sectionRef}
      className={styles.approach}
      id="approach"
    >
      {/* Background Glow */}
      <img
        src={blobBg}
        alt=""
        className={`${styles.blob} ${styles.bgGlow}`}
        style={{
          left: 816,
          top: -55,
          width: 1167.35,
          height: 1189.4,
          opacity: 0.22,
          filter: 'blur(43px)',
        }}
      />

      {/* Text */}
      <div className={styles.textBlock}>
        <p className={styles.eyebrow}>
          MY APPROACH
        </p>

        <p className={styles.headline}>
          FROM PROBLEM
          <br />
          TO SOLUTION.
        </p>
      </div>

      {/* Pink */}
      <div
        ref={pinkRef}
        className={`${styles.glass} ${styles.floatingBlob}`}
        style={{
          left: 1064,
          top: 361,
          width: 245,
          height: 253,
        }}
      >
        <div
          className={styles.glassBlur}
          style={{
            backdropFilter:
              'blur(2.5px)',
            WebkitBackdropFilter:
              'blur(2.5px)',
            WebkitMaskImage:
              `url(${blobPink})`,
            maskImage:
              `url(${blobPink})`,
          }}
        />

        <img
          src={blobPink}
          alt=""
          className={styles.glassImg}
          style={{
            opacity: 0.44,
          }}
        />
      </div>

      {/* Left */}
      <div
        ref={leftRef}
        className={`${styles.glass} ${styles.floatingBlob}`}
        style={{
          left: 137,
          top: 95,
          width: 644,
          height: 721,
        }}
      >
        <div
          className={styles.glassBlur}
          style={{
            backdropFilter:
              'blur(6px)',
            WebkitBackdropFilter:
              'blur(6px)',
            WebkitMaskImage:
              `url(${blobLeft})`,
            maskImage:
              `url(${blobLeft})`,
          }}
        />

        <img
          src={blobLeft}
          alt=""
          className={styles.glassImg}
          style={{
            opacity: 0.8,
          }}
        />
      </div>

      {/* Cursor */}
      <div
        ref={cursorRef}
        className={styles.floatingBlob}
        style={{
          left: 785,
          top: 565,
          width: 276,
          height: 345,
        }}
      >
        <img
          src={blobCursor}
          alt=""
          className={styles.floatingImg}
          style={{
            opacity: 0.85,
          }}
        />
      </div>

      {/* Right */}
      <div
        ref={rightRef}
        className={styles.floatingBlob}
        style={{
          left: 1327,
          top: 571,
          width: 340,
          height: 351,
        }}
      >
        <img
          src={blobRight}
          alt=""
          className={styles.floatingImg}
          style={{
            opacity: 0.7,
          }}
        />
      </div>

      {/* Star */}
      <div
        ref={starRef}
        className={styles.floatingBlob}
        style={{
          left: 1510,
          top: 145,
          width: 220,
          height: 220,
        }}
      >
        <img
          src={blobStar}
          alt=""
          className={styles.floatingImg}
          style={{
            opacity: 0.5,
          }}
        />
      </div>
    </section>
  );
}