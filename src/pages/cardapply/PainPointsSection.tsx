import { useLayoutEffect, useRef, useState } from 'react';
import styles from './PainPointsSection.module.css';
import SectionHeading from './SectionHeading';
import { useSectionReveal } from './useSectionReveal';
import { vw } from './vw';

const cards = [
  {
    text: '글씨와 입력 영역이 작아 사용하기 불편해요',
    color: '#15243d',
    left: 'calc(50% + 33.18px)',
    top: 377,
    width: 532.35,
    height: 187.562,
    rotate: -7,
  },
  {
    text: '어려운 금융 용어를 이해하기 힘들어요',
    color: '#24334d',
    left: 'calc(50% - 283.25px)',
    top: 495.55,
    width: 479.322,
    height: 178.325,
    rotate: 6.65,
  },
  {
    text: '어디까지 진행했는지 모르겠어요',
    color: '#40506c',
    left: 'calc(50% + 387.14px)',
    top: 498.42,
    width: 418.227,
    height: 168.749,
    rotate: -6.28,
  },
  {
    text: '입력해야 할 정보가 너무 많아요',
    color: '#40506c',
    left: 'calc(50% - 261.47px)',
    top: 737,
    width: 399.057,
    height: 131.695,
    rotate: -0.97,
  },
  {
    text: '필수로 입력할 항목을 구분하기 어려워요',
    color: '#15243d',
    left: 'calc(50% + 231.77px)',
    top: 625.89,
    width: 499.489,
    height: 164.231,
    rotate: 4.63,
  },
  {
    text: '같은 정보를 반복해서 입력해야 해요',
    color: '#15243d',
    left: 'calc(50% + 90.26px)',
    top: 814.67,
    width: 447.11,
    height: 136.542,
    rotate: -1.5,
  },
];

/*
 * 카드 사이 등장 간격(0.12~0.16초 범위의 중간값).
 */
const STAGGER_SEC = 0.14;

export default function PainPointsSection() {
  const { sectionRef, triggered } = useSectionReveal<HTMLElement>();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  /*
   * 배열/DOM 순서가 아니라 실제 화면에 렌더링된 세로 위치(위->아래) 기준
   * 등장 순서. 인덱스는 cards 배열의 원래 인덱스, 값은 그 카드가 몇
   * 번째로 나타나야 하는지(0부터)의 순위. 트리거되는 순간
   * getBoundingClientRect로 실측하므로 데스크톱의 절대좌표 배치든
   * 모바일의 세로 스택이든 화면에 실제로 보이는 순서를 그대로 따른다.
   * useLayoutEffect로 페인트 전에 계산해, order가 정해지기 전 잘못된
   * 순서로 한 프레임 그려지는 깜빡임을 막는다.
   */
  const [order, setOrder] = useState<number[] | null>(null);

  useLayoutEffect(() => {
    if (!triggered || order) return;

    const measured = cardRefs.current.map((el, index) => ({
      index,
      top: el ? el.getBoundingClientRect().top : 0,
    }));

    measured.sort((a, b) => a.top - b.top);

    const nextOrder: number[] = new Array(cards.length).fill(0);
    measured.forEach(({ index }, rank) => {
      nextOrder[index] = rank;
    });

    setOrder(nextOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggered]);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.heading}>
        <SectionHeading
          eyebrow="01 USER PAIN POINTS"
          title={
            <>
              복잡한 정보와 어려운 용어,
              <br />
              카드 신청을 멈추게 하다
            </>
          }
          desc={
            <>
              온라인 카드 신청의 사용자층은 전 연령대로 넓어졌지만, 복잡한 정보 구조와 어려운 금융 용어는
              <br />
              사용자의 이해를 방해하고 신청 과정의 이탈로 이어지고 있었습니다.
            </>
          }
        />
      </div>

      <div className={styles.cards}>
        {cards.map((card, i) => {
          const leftMatch = card.left.match(/calc\(50% ([+-]) ([\d.]+)px\)/);
          const leftPx = leftMatch ? Number(leftMatch[2]) * (leftMatch[1] === '-' ? -1 : 1) : 0;
          const rank = order ? order[i] : i;

          return (
            <div
              key={card.text}
              className={styles.cardWrap}
              style={{
                left: `calc(50% ${leftPx < 0 ? '-' : '+'} ${vw(Math.abs(leftPx))})`,
                top: vw(card.top),
                width: vw(card.width),
                height: vw(card.height),
              }}
            >
              <div
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={`${styles.card} ${triggered ? styles.visible : ''}`}
                style={{
                  background: card.color,
                  ['--card-rotate' as string]: `${card.rotate}deg`,
                  transitionDelay: triggered ? `${rank * STAGGER_SEC}s` : undefined,
                }}
              >
                <p className={styles.cardText}>{card.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
