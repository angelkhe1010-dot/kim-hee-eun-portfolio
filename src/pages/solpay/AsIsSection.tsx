import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import styles from './AsIsSection.module.css';
import { vw } from './vw';

import mockupQuiz from '../../assets/images/solpay/asis/mockup-quiz.png';
import mockupBenefit from '../../assets/images/solpay/asis/mockup-benefit.png';
import mockupAttendance from '../../assets/images/solpay/asis/mockup-attendance.png';

/*
 * `--mockup-delay`는 MockupItem.module.css의
 * `transition-delay: var(--mockup-delay)`가 읽는 커스텀 프로퍼티.
 * CSSProperties가 커스텀 프로퍼티를 모르기 때문에 인라인 style
 * 타입체크를 통과시키려고 확장한다 (Process.tsx의 CardStyle과 동일 패턴).
 */
type MockupStyle = CSSProperties & { '--mockup-delay': string };

interface Mockup {
  src: string;
  alt: string;
  left: number;
}

/*
 * Figma의 개별 프레임을 각각 그대로 export한 목업. 폰 베젤(border,
 * radius)과 화면 내용, 하단 내비게이션까지 이미지 한 장에 이미 포함돼
 * 있으므로, 예전처럼 스크린샷 조각을 %로 잘라 겹치는 레이어 시스템이
 * 필요 없다 -- 각 목업은 단순히 위치(left)만 갖는 이미지 한 장이다.
 */
const mockups: Mockup[] = [
  { src: mockupQuiz, alt: '기존 SOL페이 퀴즈팡팡 화면', left: 410 },
  { src: mockupBenefit, alt: '기존 SOL페이 혜택 메인 화면', left: 790 },
  { src: mockupAttendance, alt: '기존 SOL페이 출석 미션 화면', left: 1170 },
];

const STAGGER_MS = 180;

export default function AsIsSection() {
  const sentinelRef = useRef<HTMLDivElement>(null);

  /*
   * prefers-reduced-motion이면 렌더 시점에 바로 최종 상태로
   * 초기화한다 (effect 안에서 동기적으로 setState하지 않도록).
   */
  const [visible, setVisible] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  /*
   * 섹션 전체(threshold 기반)가 아니라, 휴대폰 3개 그룹 중앙에 놓인
   * sentinel 하나만 관찰한다. rootMargin의 위/아래 -45%가 뷰포트를
   * 중앙 10%(45%~55%) 구간으로 좁혀서, sentinel이 그 구간에 들어오는
   * 순간에만 -- 즉 콘텐츠 그룹 중심이 화면 중앙 부근에 도달했을 때만
   * -- 콜백이 발생한다. 섹션 아래쪽이 살짝 보이는 시점(sentinel이
   * 아직 뷰포트 하단 밖)에는 교차가 일어나지 않는다. 한 번 등장한
   * 뒤에는 observer를 끊어 재생/역재생을 막는다.
   */
  useEffect(() => {
    if (visible) return;

    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '-45% 0px -45% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <section className={styles.section} data-section="as-is">
      <span className={styles.badge} data-motion="fade-up">AS-IS</span>

      <div className={styles.phoneRow} data-motion="phones">
        <div className={styles.triggerSentinel} ref={sentinelRef} aria-hidden="true" />
        {mockups.map((mockup, index) => (
          <div
            key={mockup.src}
            className={`${styles.phoneMockup} ${visible ? styles.visible : ''}`}
            style={{
              left: vw(mockup.left),
              '--mockup-delay': `${index * STAGGER_MS}ms`,
            } as MockupStyle}
            data-motion="phone"
          >
            <img
              src={mockup.src}
              alt={mockup.alt}
              className={styles.mockupImg}
              width={340}
              height={722}
              draggable={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
