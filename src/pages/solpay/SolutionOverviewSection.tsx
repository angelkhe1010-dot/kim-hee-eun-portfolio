import { useEffect, useRef, useState } from 'react';
import styles from './SolutionOverviewSection.module.css';
import { vw } from './vw';

import card1 from '../../assets/images/solpay/solution1/card-1.png';
import card2 from '../../assets/images/solpay/solution1/card-2.png';
import card3 from '../../assets/images/solpay/solution1/card-3.png';
import card4 from '../../assets/images/solpay/solution1/card-4.png';
import phoneFrame from '../../assets/images/solpay/solution1/phone-frame.png';
import iconMembership from '../../assets/images/solpay/solution1/icon-membership.png';

interface StripCard {
  src: string;
  left: number;
  imgTop: string;
  imgWidth: string;
  faded?: boolean;
}

const stripCards: StripCard[] = [
  { src: card4, left: -61, imgTop: '-17.46%', imgWidth: '100%', faded: true },
  { src: card1, left: 349, imgTop: '-33.53%', imgWidth: '99.92%' },
  { src: card2, left: 1189, imgTop: '-17.38%', imgWidth: '99.92%' },
  { src: card3, left: 1599, imgTop: '-17.38%', imgWidth: '99.92%', faded: true },
];

export default function SolutionOverviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [visible, setVisible] = useState(reducedMotion);
  const [settled, setSettled] = useState(reducedMotion);

  useEffect(() => {
    if (visible) return;

    const el = sectionRef.current;
    if (!el) return;

    /*
     * 새로고침 시 이미 혜택 현황 모듈이 뷰포트에 40~50% 이상 들어와
     * 있는 상태라면, IntersectionObserver의 비동기 초기 콜백을 기다리지
     * 않고 마운트 시점에 동기적으로 한 번 더 확인해 바로 실행한다 --
     * 레이아웃이 아직 흔들리는 첫 프레임에 옵저버 콜백이 지연/누락돼도
     * 모션이 생략되지 않도록 하는 안전장치.
     */
    const rect = el.getBoundingClientRect();
    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    const visibleRatio = rect.height > 0 ? visibleHeight / rect.height : 0;
    if (visibleRatio >= 0.45) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  /*
   * 진입 애니메이션이 끝나면 .settled 클래스를 붙여 최종 상태(scale(1))를
   * "animation-fill-mode: forwards"가 아니라 일반 CSS 선언으로 못박는다
   * -- animation을 아예 걷어내므로, 이후 어떤 이유로도(스크롤, hover,
   * 리렌더 등) 다시 작아질 여지가 구조적으로 없다. animationend 이벤트에만
   * 의존하면 배경 탭 throttling 등으로 이벤트가 아예 안 올 수도 있어,
   * 애니메이션 길이(800ms)보다 넉넉한 setTimeout을 안전장치로 함께 둔다.
   */
  useEffect(() => {
    if (!visible || settled) return;

    const finish = () => setSettled(true);
    const timer = window.setTimeout(finish, 900);
    const el = innerRef.current;
    el?.addEventListener('animationend', finish);

    return () => {
      window.clearTimeout(timer);
      el?.removeEventListener('animationend', finish);
    };
  }, [visible, settled]);

  const innerClassName = [
    styles.benefitCardInner,
    visible ? styles.visible : '',
    settled ? styles.settled : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={styles.section} data-section="solution-overview" ref={sectionRef}>
      <span className={styles.badge} data-motion="fade-up">TO-BE</span>

      <div className={styles.titleBlock} data-motion="fade-up">
        <p className={styles.eyebrow}>03 CONTENT EXPERIENCE</p>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>
            나의 혜택 현황을
            <br />
            한눈에 확인하도록
          </h2>
          <p className={styles.subtitle}>
            포인트와 받은 혜택 등 주요 정보를 메인 상단에 모아,
            <br />
            사용자가 자신의 혜택 현황을 빠르게 파악할 수 있도록 구성했습니다.
          </p>
        </div>
      </div>

      {/*
        phoneWrap과 benefitCard를 함께 감싸는 래퍼. 데스크톱에서는
        position:static이라 두 자식의 절대 좌표가 그대로 .section
        기준(Figma 원본 좌표)으로 계산되지만, 모바일에서는 phoneWrap이
        static이 되어 더 이상 카드의 위치 기준(containing block) 역할을
        못 하므로 -- 이 래퍼가 position:relative로 바뀌어 카드가 휴대폰
        기준으로 정확히 겹치도록 잡아준다.
      */}
      <div className={styles.phoneStack}>
        <div className={styles.phoneWrap} data-motion="phone">
          <img src={phoneFrame} alt="SOL Pay 혜택 메인 화면" className={styles.phoneScreen} draggable={false} />
        </div>

        {/*
          휴대폰 화면 자체에도 같은 카드가 스크린샷의 일부로 이미 포함돼
          있지만(실제 앱 화면을 그대로 옮긴 트레이스라서), 그 위에 정확히
          같은 자리·크기로 이 카드를 올려 완전한 불투명 배경으로 덮는다.
          이렇게 하면 화면상으로는 항상 이 카드(진짜 React 텍스트 요소,
          애니메이션 가능)만 보이고, 통이미지 안의 것은 가려진다.

          outer(benefitCardWrap)는 위치·크기·휴대폰 중앙 정렬만 담당하고,
          inner(benefitCardInner)는 진입 scale 애니메이션만 담당한다 --
          같은 요소에 "중앙 정렬용 translateX(-50%)"와 "애니메이션용
          scale()"을 함께 쓰면 하나의 transform이 다른 쪽 값을 덮어써
          최종 크기가 틀어질 수 있어, 두 책임을 완전히 분리했다.
        */}
        <div className={styles.benefitCardWrap} data-motion="benefit-card">
          <div ref={innerRef} className={innerClassName}>
            <div className={styles.statsRow}>
              <div className={styles.statCol}>
                <div className={styles.statLabel}>
                  <span>마이신한포인트</span>
                  <span className={styles.chevron} aria-hidden="true">›</span>
                </div>
                <p className={styles.statValue}>83,452P</p>
              </div>

              <span className={styles.statDivider} aria-hidden="true" />

              <div className={styles.statCol}>
                <div className={styles.statLabel}>
                  <span>이번달 받은 혜택</span>
                  <span className={styles.chevron} aria-hidden="true">›</span>
                </div>
                <p className={styles.statValue}>58,320원</p>
              </div>
            </div>

            <span className={styles.hrDivider} aria-hidden="true" />

            <div className={styles.menuRow}>
              <div className={styles.menuItem}>
                <img src={iconMembership} alt="" className={styles.menuIcon} draggable={false} />
                <span>멤버십</span>
              </div>
              <span className={styles.menuDivider} aria-hidden="true" />
              <div className={styles.menuItem}>
                <span>내 쿠폰</span>
              </div>
              <span className={styles.menuDivider} aria-hidden="true" />
              <div className={styles.menuItem}>
                <span>참여한 이벤트</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sideText} data-motion="fade-left">
        <p className={styles.sideTitle}>정보 위계를 고려한 현황판 구성</p>
        <p className={styles.sideDesc}>
          포인트와 받은 혜택을 상단 카드에 구조화하고,
          <br />
          수치와 주요 메뉴의 시각적 위계를 구분해 정보 인지성을 높였습니다.
        </p>
      </div>

      <div className={styles.stripArea} data-motion="strip">
        <div className={styles.stripRow}>
          {stripCards.map((card, index) => (
            <div
              key={index}
              className={`${styles.stripCard} ${card.faded ? styles.faded : ''}`}
              style={{ left: vw(card.left) }}
            >
              <img
                src={card.src}
                alt=""
                className={styles.stripImg}
                style={{ top: card.imgTop, width: card.imgWidth }}
                draggable={false}
              />
            </div>
          ))}
        </div>
        <div className={styles.stripFadeLeft} aria-hidden="true" />
        <div className={styles.stripFadeRight} aria-hidden="true" />
      </div>
    </section>
  );
}
