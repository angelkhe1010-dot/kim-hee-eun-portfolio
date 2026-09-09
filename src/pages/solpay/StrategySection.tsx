import { useLayoutEffect, useRef, useState } from 'react';
import styles from './StrategySection.module.css';
import bgCoin from '../../assets/images/solpay/strategy/bg-coin.png';
import bgShield from '../../assets/images/solpay/strategy/bg-shield.png';

interface Card {
  title: string;
  desc: string;
}

const cards: Card[] = [
  { title: '# 핵심 현황 통합', desc: '사용자에게 필요한 정보의 현재 상태를 한눈에 파악하도록 설계' },
  { title: '# 상태 중심 피드백', desc: '결제부터 취소, 혜택 적용까지 단계별 처리 상태를 즉각적으로 안내' },
  { title: '# 개인화된 혜택', desc: '사용 가능 여부, 이용 조건을 기준으로 필요한 혜택만 선별하여 제공' },
  { title: '# 목적부터 찾는 탐색', desc: '목적 중심의 검색과 카테고리로 원하는 서비스에 빠르게 연결' },
];

/*
 * 카드 스택은 두 종류로 나뉜다.
 *
 * 1) 장식 카드 2장(middle/back) -- StrategySection.module.css의
 *    .cardStack::before / ::after로 구현된 순수 CSS 레이어다. index나
 *    남은 데이터 개수와 무관하게 항상 렌더링되는 가상 요소라서, 조건부
 *    렌더링이 원천적으로 불가능하고("숨겨지는" 상태 자체가 없음),
 *    JS가 손대지 않으므로 애니메이션 중에도 개수나 위치가 절대
 *    흔들리지 않는다. 내용이 없어 접근성 트리에도 노출되지 않는다.
 *
 * 2) front 카드 -- 텍스트가 있는 유일한 카드. 스크롤 진행도에 따라
 *    현재 문구가 페이드아웃하며 위로 살짝 빠지고(opacity 1->0,
 *    translateY 0->음수), opacity가 0에 가까워진 순간에 다음 문구로
 *    교체한 뒤 아래에서 올라오며 페이드인한다(opacity 0->1,
 *    translateY 양수->0, scale 0.98->1). CSS transition은 쓰지 않고
 *    매 프레임 스크롤 위치의 순수 함수로 계산해서(rAF로만 스로틀),
 *    빠르게 스크롤해도 애니메이션 큐가 밀리거나 문구가 겹친 채로
 *    남는 문제가 생기지 않는다.
 */
const EXIT_PX = 20; // 페이드아웃하며 위로 빠지는 이동량 (16~24px 권장 범위)
const ENTER_PX = 16; // 페이드인하며 올라오는 시작 오프셋

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

export default function StrategySection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const displayedIndexRef = useRef(0);

  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useLayoutEffect(() => {
    if (reducedMotion) return;

    let ticking = false;

    const applyProgress = () => {
      const wrapper = wrapperRef.current;
      const front = frontRef.current;
      if (!wrapper || !front) return;

      const viewportHeight = window.innerHeight;
      const scrollableRange = wrapper.offsetHeight - viewportHeight;
      const rect = wrapper.getBoundingClientRect();

      const progress = scrollableRange > 0 ? clamp01(-rect.top / scrollableRange) : 0;
      const rawIndex = progress * (cards.length - 1);
      const currentIndex = Math.min(Math.floor(rawIndex), cards.length - 1);
      const t = currentIndex === cards.length - 1 ? 0 : rawIndex - currentIndex;

      let displayedIndex: number;
      let opacity: number;
      let translateY: number;
      let scale: number;

      if (t < 0.5) {
        // 전반부: 현재 문구가 페이드아웃하며 위로 빠진다
        const localT = t / 0.5;
        displayedIndex = currentIndex;
        opacity = 1 - localT;
        translateY = -EXIT_PX * localT;
        scale = 1;
      } else {
        // 후반부: (opacity가 이미 0에 닿은 뒤) 다음 문구로 교체하고 아래에서 페이드인
        const localT = (t - 0.5) / 0.5;
        displayedIndex = Math.min(currentIndex + 1, cards.length - 1);
        opacity = localT;
        translateY = ENTER_PX * (1 - localT);
        scale = 0.98 + 0.02 * localT;
      }

      if (displayedIndexRef.current !== displayedIndex) {
        displayedIndexRef.current = displayedIndex;
        if (titleRef.current) titleRef.current.textContent = cards[displayedIndex].title;
        if (descRef.current) descRef.current.textContent = cards[displayedIndex].desc;
      }

      front.style.opacity = String(opacity);
      front.style.transform = `translateX(-50%) translateY(${translateY}px) scale(${scale})`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        applyProgress();
        ticking = false;
      });
    };

    applyProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reducedMotion]);

  const titleBlock = (
    <div className={styles.titleBlock} data-motion="fade-up">
      <p className={styles.eyebrow}>02 UX STRATEGY</p>
      <div className={styles.titleGroup}>
        <h2 className={styles.title}>사용자의 불편을 해결할 UX 방향</h2>
        <p className={styles.subtitle}>
          핵심 정보는 한눈에 보여주고, 원하는 서비스까지 빠르게 연결합니다.
        </p>
      </div>
    </div>
  );

  if (reducedMotion) {
    return (
      <section className={styles.section} data-section="strategy">
        <div className={styles.inner}>
          {titleBlock}

          <div className={styles.reducedList}>
            {cards.map((card) => (
              <div key={card.title} className={styles.cardFace}>
                <p className={styles.cardTitle}>{card.title}</p>
                <p className={styles.cardDesc}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section} data-section="strategy">
      <div className={styles.wrapper} ref={wrapperRef} data-motion="sticky-cards">
        <div className={styles.sticky}>
          {/*
            배경 장식 2장. 스크롤 진행도를 계산하는 useLayoutEffect가 전혀
            건드리지 않는 별도 요소라서, 카드 전환 애니메이션이 진행되는
            동안에도 위치/크기/투명도가 절대 바뀌지 않는다.
          */}
          <div
            className={`${styles.bgDecor} ${styles.bgCoin}`}
            style={{ backgroundImage: `url(${bgCoin})` }}
            aria-hidden="true"
          />
          <div
            className={`${styles.bgDecor} ${styles.bgShield}`}
            style={{ backgroundImage: `url(${bgShield})` }}
            aria-hidden="true"
          />

          <div className={styles.inner}>
            {titleBlock}

            {/*
              cardStack 자체의 ::before(middle) / ::after(back)가 장식 카드
              2장을 담당한다 -- 조건부 렌더링이 아예 불가능한 순수 CSS라서
              index나 전환 상태와 무관하게 항상 정확히 3장(front+2장)이
              보인다.
            */}
            <div className={styles.cardStack} data-motion="card">
              <div ref={frontRef} className={`${styles.cardFace} ${styles.strategyCardFront}`}>
                <p ref={titleRef} className={styles.cardTitle}>
                  {cards[0].title}
                </p>
                <p ref={descRef} className={styles.cardDesc}>
                  {cards[0].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
