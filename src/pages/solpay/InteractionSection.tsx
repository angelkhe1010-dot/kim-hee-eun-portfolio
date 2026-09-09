import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import styles from './InteractionSection.module.css';
import { vw } from './vw';

import phoneBasic from '../../assets/images/solpay/interaction/phone-basic.png';
import phoneCardsBase from '../../assets/images/solpay/interaction/phone-cards-base.png';
import cardButton from '../../assets/images/solpay/interaction/card-button.png';
import cardHipass from '../../assets/images/solpay/interaction/card-hipass.png';
import cardStarbucks from '../../assets/images/solpay/interaction/card-starbucks.png';

/*
 * `--enter-x`는 이 모듈 CSS의 cardEnter 키프레임이 읽는 커스텀
 * 프로퍼티(지그재그 등장 방향). CSSProperties가 커스텀 프로퍼티를
 * 모르기 때문에 인라인 style 타입체크를 통과시키려고 확장한다
 * (AsIsSection.tsx의 MockupStyle과 동일 패턴).
 */
type CardStyle = CSSProperties & { '--enter-x': string };

interface RevealCard {
  key: string;
  src: string;
  alt: string;
  left: number;
  top: number;
  width: number;
  height: number;
  enterX: string;
}

/*
 * Figma node 468:301899(카드 3장 그룹)의 실측 bounding box(회전 포함,
 * 오른쪽 phoneFrame 기준 좌표) 그대로 -- 각 카드는 이미 회전이 baked-in된
 * PNG라서 별도 rotate()가 필요 없고, 이 left/top/width/height만 정확히
 * 맞추면 Figma 최종 상태와 동일해진다. 등장 순서(= 쌓임 순서, 아래->위)는
 * 버튼 누르기 -> 하이패스 이용하기 -> 스타벅스 아메리카노이며, 배열 순서가
 * 곧 z-index 순서다.
 */
const REVEAL_CARDS: RevealCard[] = [
  {
    key: 'button',
    src: cardButton,
    alt: '버튼 누르기, 최대 10 포인트',
    left: -1.3117,
    top: 20.9356,
    width: 20.7031,
    height: 4.401,
    enterX: '-40px',
  },
  {
    key: 'hipass',
    src: cardHipass,
    alt: '하이패스 이용하기, 최대 2만원 캐시백',
    left: -1.4518,
    top: 17.3486,
    width: 20.7161,
    height: 4.5573,
    enterX: '40px',
  },
  {
    key: 'starbucks',
    src: cardStarbucks,
    alt: '스타벅스 아메리카노, 34% 할인',
    left: -1.2562,
    top: 13.0377,
    width: 20.7943,
    height: 5.2474,
    enterX: '-40px',
  },
];

const CARD_STAGGER_MS = 180;

export default function InteractionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  /*
   * 0 = 아직 재생 전(카드는 항상 DOM에 있지만 opacity:0인 시작 상태로
   * 정지). 1 이상 = 재생 횟수 -- 클릭할 때마다 증가시키고 이 값을
   * 카드 컨테이너의 React key로 써서, 빠르게 반복 클릭해도 이전
   * 애니메이션 상태가 남지 않고 DOM이 통째로 새로 마운트되며 깨끗하게
   * 처음부터 다시 재생된다.
   */
  const [playKey, setPlayKey] = useState(reducedMotion ? 1 : 0);
  const hasTriggeredRef = useRef(reducedMotion);

  const play = () => {
    hasTriggeredRef.current = true;
    setPlayKey((k) => k + 1);
  };

  /*
   * 개별 카드/휴대폰이 아니라 섹션 전체를 기준으로, 섹션 상단이
   * 뷰포트의 약 65~70% 지점(위에서부터 70%)에 닿는 순간 바로
   * 재생한다. rootMargin의 하단 -30%가 "뷰포트 아래 30%는 트리거
   * 판정에서 제외"하는 효과라서, threshold와 조합하면 섹션 상단이
   * 그 지점을 넘어서자마자(조금 이르게) 발동한다 -- 이전엔 phonesArea
   * 자체가 40% 보여야 재생돼서 스크롤을 한참 더 내려야 시작됐고, 그때는
   * 이미 화면을 지나쳐 카드가 등장하자마자 스크롤 밖으로 밀려나 보였다.
   */
  useEffect(() => {
    if (reducedMotion || hasTriggeredRef.current) return;

    const el = sectionRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.7) {
      play();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -30% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  const handleReplay = () => {
    if (reducedMotion) return;
    play();
  };

  return (
    <section className={styles.section} data-section="interaction" ref={sectionRef}>
      <div className={styles.textBlock} data-motion="fade-right">
        <div className={styles.titleGroup}>
          <p className={styles.eyebrow}>04 INTERACTION EXPERIENCE</p>
          <h2 className={styles.title}>다양한 혜택을 더 즐거운 경험으로</h2>
        </div>
        <p className={styles.subtitle}>
          포인트부터 이벤트, 할인까지 다양한 콘텐츠를 구성하고,
          <br />
          재미있는 UI 요소를 더해 혜택을 이용하는 과정에 즐거움을 더했습니다.
        </p>

        <div className={styles.pointBlock}>
          <p className={styles.pointLabel}>Interaction Point</p>
          <p className={styles.pointDesc}>
            출근길 혜택 패키지를 터치하면 상황에 맞는 3개의 혜택 카드가
            <br />
            순차적으로 펼쳐지는 인터랙션을 적용했습니다.
            <br />
            <br />
            카드가 한 번에 노출되지 않고 차례로 등장하도록 구성해
            <br />
            다음 혜택에 대한 기대감과 시각적인 재미를 더했습니다.
          </p>
        </div>
      </div>

      <div className={styles.phonesArea} data-motion="phones">
        <div className={styles.phoneFrame} style={{ left: vw(932) }} data-motion="phone">
          <img src={phoneBasic} alt="SOL Pay 혜택 패키지 도착 화면" className={styles.phoneImg} draggable={false} />

          {/*
            "출근길 혜택 패키지 도착!" 헤더 + 선물 일러스트 영역(Figma
            node 468:301662, 왼쪽 phoneFrame 기준 실측 좌표) 위에 얹는
            투명 클릭 히트영역. 화면 자체는 baked-in PNG라 개별 DOM
            요소로 쪼갤 수 없어, 이 영역만 버튼으로 감싸 재생 트리거로
            쓴다.
          */}
          <button
            type="button"
            className={styles.replayHotspot}
            onClick={handleReplay}
            aria-label="출근길 혜택 패키지 도착! 카드 애니메이션 다시 보기"
          />
        </div>

        <div className={styles.phoneFrame} style={{ left: vw(1320) }} data-motion="phone">
          <img src={phoneCardsBase} alt="SOL Pay 혜택 화면" className={styles.phoneImg} draggable={false} />

          {/*
            playKey===0(아직 재생 전)에도 이 컨테이너는 항상 마운트돼
            있고, .card 기본 상태(opacity:0 + 살짝 이동된 transform)로
            정지해 있을 뿐이다 -- display:none이나 조건부 마운트로
            숨기지 않는다. playKey가 1 이상이 되면(스크롤 트리거 또는
            리플레이 클릭) styles.playing이 붙어 cardEnter 애니메이션이
            재생되고, key={playKey}가 매번 바뀌므로 리플레이를 빠르게
            연타해도 이전 애니메이션 상태 없이 처음부터 깨끗하게
            다시 재생된다.
          */}
          <div
            className={`${styles.cardsStack} ${playKey > 0 ? styles.playing : ''}`}
            key={playKey}
            data-motion="reveal-cards"
          >
            {REVEAL_CARDS.map((card, index) => (
              <img
                key={card.key}
                src={card.src}
                alt={card.alt}
                className={`${styles.card} ${styles[`card--${card.key}`]}`}
                style={
                  {
                    left: `${card.left}vw`,
                    top: `${card.top}vw`,
                    width: `${card.width}vw`,
                    height: `${card.height}vw`,
                    zIndex: index + 1,
                    animationDelay: reducedMotion ? undefined : `${index * CARD_STAGGER_MS}ms`,
                    '--enter-x': card.enterX,
                  } as CardStyle
                }
                draggable={false}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
