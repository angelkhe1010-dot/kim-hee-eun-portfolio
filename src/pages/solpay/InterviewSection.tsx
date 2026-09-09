import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import styles from './InterviewSection.module.css';
import { vw } from './vw';

import quoteBlue from '../../assets/images/solpay/interview/quote-blue.svg';
import quoteWhite from '../../assets/images/solpay/interview/quote-white.svg';

type CardVariant = 'pale' | 'light' | 'blue';

interface QuoteCard {
  quote: string;
  author: string;
  variant: CardVariant;
  left: number;
  top: number;
  faded?: boolean;
}

/*
 * variant 배정은 Figma(node 491:312248)와 다시 대조해 맞춘 값이다.
 * 기존 코드는 결제취소<->카드실적, 받은혜택<->어디서결제 두 쌍의
 * light/pale이 서로 뒤바뀌어 있었고, 양 끝의 faded 카드도 실제로는
 * light가 아니라 pale(#F0F6FF) + opacity 40%였다(위치·순서는 그대로
 * 두고 색상만 Figma 기준으로 수정).
 */
const cards: QuoteCard[] = [
  { quote: '카드 조건과 혜택을\n비교하고 싶어요', author: '한*민, 장기 이용 유저', variant: 'pale', left: -60, top: 373, faded: true },
  { quote: '결제 취소 여부를\n바로 알 수 없어요', author: '한*민, 장기 이용 유저', variant: 'pale', left: 270, top: 373 },
  { quote: '내 카드 실적을\n한눈에 보고 싶어요', author: '한*민, 장기 이용 유저', variant: 'light', left: 600, top: 373 },
  { quote: '어떤 혜택이 나에게 맞는지 모르겠어요', author: '김*주, 신규 유입 사용자', variant: 'blue', left: 930, top: 373 },
  { quote: '내가 사용할 수 있는\n혜택인지 모르겠어요', author: '한*민, 장기 이용 유저', variant: 'blue', left: 480, top: 713 },
  { quote: '원하는 서비스를\n검색할 수 없어요', author: '김*우, 신규 유입 사용자', variant: 'blue', left: 810, top: 713 },
  { quote: '내가 받은 혜택을 한눈에 보고 싶어요', author: '한*민, 장기 이용 유저', variant: 'light', left: 1140, top: 713 },
  { quote: '어디서 어떻게 결제해야 할지 헷갈려요', author: '노*진, 신규 유입 사용자', variant: 'pale', left: 1470, top: 713 },
  { quote: '카드 조건과 혜택을\n비교하고 싶어요', author: '노*진, 신규 유입 사용자', variant: 'pale', left: 1800, top: 713, faded: true },
];

/*
 * 진입 애니메이션 노출 순서는 배경색이 진한 색 -> 옅은 색 순이며,
 * "가장 옅은 단계"는 faded(opacity 0.4) 카드다. 실제 데이터에는
 * pale+faded 조합이 없고 light+faded만 있어서(카드 디자인 자체는
 * 변경하지 않음), faded 여부를 색상 진하기와 별개의 마지막 단계로
 * 취급해 4단계를 만든다: blue(0) -> light(1) -> pale(2) ->
 * faded(3, variant 무관).
 */
const STAGE_ORDER: Record<CardVariant, number> = { blue: 0, light: 1, pale: 2 };
const FADED_STAGE = 3;

function stageOf(card: QuoteCard) {
  return card.faded ? FADED_STAGE : STAGE_ORDER[card.variant];
}

const CARD_STAGGER_MS = 140;

/*
 * DOM 배열 순서가 아니라 색상 단계 -> (같은 단계 안에서는) 화면상
 * 왼쪽에서 오른쪽 순으로 전체 카드를 한 줄로 정렬한 뒤, 그 순서대로
 * 균일하게 140ms씩 늘려 딜레이를 매긴다. 카드 배열/좌표 자체는
 * 그대로 두고 노출 딜레이만 이 순서를 따른다.
 */
const cardDelays: number[] = (() => {
  const order = cards
    .map((card, index) => ({ index, stage: stageOf(card), left: card.left }))
    .sort((a, b) => a.stage - b.stage || a.left - b.left);

  const delays = new Array<number>(cards.length).fill(0);
  order.forEach((c, position) => {
    delays[c.index] = position * CARD_STAGGER_MS;
  });

  return delays;
})();

type RevealStyle = CSSProperties & { '--reveal-delay': string };

export default function InterviewSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [visible, setVisible] = useState(reducedMotion);

  useEffect(() => {
    if (visible) return;

    const el = sectionRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    const visibleRatio = rect.height > 0 ? visibleHeight / rect.height : 0;
    if (visibleRatio >= 0.25) {
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
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  const sectionClassName = [styles.section, visible ? styles.visible : '']
    .filter(Boolean)
    .join(' ');

  return (
    <section className={sectionClassName} data-section="interview" ref={sectionRef}>
      <div className={styles.titleBlock} data-motion="fade-up">
        <p className={styles.eyebrow}>01 USER INTERVIEW</p>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>
            사용자 인터뷰로 발견한
            <br />
            SOL Pay의 주요 불편
          </h2>
          <p className={styles.subtitle}>
            SOL페이 사용자 인터뷰를 통해 반복되는 불편과 사용자의 핵심 니즈를 파악했습니다.
          </p>
        </div>
      </div>

      <div className={styles.cardsArea} data-motion="cards">
        {cards.map((card, index) => (
          <div
            key={`${card.author}-${index}`}
            className={`${styles.cardWrap} ${styles.reveal}`}
            style={
              {
                left: vw(card.left),
                top: vw(card.top),
                '--reveal-delay': `${cardDelays[index]}ms`,
              } as RevealStyle
            }
            data-motion="card"
          >
            <div
              className={`${styles.card} ${styles[`card-${card.variant}`]} ${card.faded ? styles.faded : ''}`}
            >
              <img
                src={card.variant === 'blue' ? quoteWhite : quoteBlue}
                alt=""
                className={styles.quoteIcon}
              />
              <div className={styles.cardText}>
                <p className={styles.quote}>{card.quote}</p>
                <p className={styles.author}>{card.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
