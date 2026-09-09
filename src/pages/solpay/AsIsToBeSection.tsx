import { useEffect, useRef, useState } from 'react';
import styles from './AsIsToBeSection.module.css';

import homeAsIs from '../../assets/images/solpay/asistobe/home-asis.png';
import homeToBe from '../../assets/images/solpay/asistobe/home-tobe.png';
import benefitAsIs from '../../assets/images/solpay/asistobe/benefit-asis.png';
import benefitToBe from '../../assets/images/solpay/asistobe/benefit-tobe.png';
import paymentAsIs from '../../assets/images/solpay/asistobe/payment-asis.png';
import paymentToBe from '../../assets/images/solpay/asistobe/payment-tobe.png';
import financeAsIs from '../../assets/images/solpay/asistobe/finance-asis.png';
import financeToBe from '../../assets/images/solpay/asistobe/finance-tobe.png';
import cardNew from '../../assets/images/solpay/asistobe/card-new.png';

import iconHomeActive from '../../assets/images/solpay/asistobe/icon-home-active.png';
import iconHomeInactive from '../../assets/images/solpay/asistobe/icon-home-inactive.png';
import iconBenefitActive from '../../assets/images/solpay/asistobe/icon-benefit-active.png';
import iconBenefitInactive from '../../assets/images/solpay/asistobe/icon-benefit-inactive.png';
import iconPaymentActive from '../../assets/images/solpay/asistobe/icon-payment-active.png';
import iconPaymentInactive from '../../assets/images/solpay/asistobe/icon-payment-inactive.png';
import iconFinanceActive from '../../assets/images/solpay/asistobe/icon-finance-active.png';
import iconFinanceInactive from '../../assets/images/solpay/asistobe/icon-finance-inactive.png';
import iconCardActive from '../../assets/images/solpay/asistobe/icon-card-active.png';
import iconCardInactive from '../../assets/images/solpay/asistobe/icon-card-inactive.png';

/*
 * 화면(휴대폰 이미지)과 하단 버튼이 서로 다른 배열/인덱스로 따로
 * 관리되면 둘이 어긋날 수 있어서, 하나의 배열에 라벨/이미지/아이콘을
 * 전부 묶어 currentIndex 하나로만 동기화한다. '카드'는 Figma
 * 원본에도 AS-IS가 없고(신규 기능이라 비교 대상이 없음) 주황색
 * NEW 배지의 단일 휴대폰만 존재해서, asIsImage를 생략해 표현한다.
 */
interface ExperienceItem {
  id: string;
  label: string;
  asIsImage?: string;
  asIsAlt?: string;
  toBeImage: string;
  toBeAlt: string;
  toBeBadgeLabel: string;
  iconActive: string;
  iconInactive: string;
}

const items: ExperienceItem[] = [
  {
    id: 'home',
    label: '홈',
    asIsImage: homeAsIs,
    asIsAlt: '개선 전 마이 화면',
    toBeImage: homeToBe,
    toBeAlt: '개선 후 SOL Pay 홈 화면',
    toBeBadgeLabel: 'TO-BE',
    iconActive: iconHomeActive,
    iconInactive: iconHomeInactive,
  },
  {
    id: 'benefit',
    label: '혜택',
    asIsImage: benefitAsIs,
    asIsAlt: '개선 전 이벤트 화면',
    toBeImage: benefitToBe,
    toBeAlt: '개선 후 SOL Pay 혜택 화면',
    toBeBadgeLabel: 'TO-BE',
    iconActive: iconBenefitActive,
    iconInactive: iconBenefitInactive,
  },
  {
    id: 'payment',
    label: '결제',
    asIsImage: paymentAsIs,
    asIsAlt: '개선 전 결제 화면',
    toBeImage: paymentToBe,
    toBeAlt: '개선 후 SOL Pay 결제 화면',
    toBeBadgeLabel: 'TO-BE',
    iconActive: iconPaymentActive,
    iconInactive: iconPaymentInactive,
  },
  {
    id: 'finance',
    label: '금융',
    asIsImage: financeAsIs,
    asIsAlt: '개선 전 금융 화면',
    toBeImage: financeToBe,
    toBeAlt: '개선 후 SOL Pay 금융 화면',
    toBeBadgeLabel: 'TO-BE',
    iconActive: iconFinanceActive,
    iconInactive: iconFinanceInactive,
  },
  {
    id: 'card',
    label: '카드',
    toBeImage: cardNew,
    toBeAlt: 'SOL Pay 카드 신규 혜택 화면',
    toBeBadgeLabel: 'NEW',
    iconActive: iconCardActive,
    iconInactive: iconCardInactive,
  },
];

const TRANSITION_MS = 400;

export default function AsIsToBeSection() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const timeoutRef = useRef<number | undefined>(undefined);

  /*
   * index state는 리렌더가 끝나야 갱신되므로, 같은 이벤트 루프 안에서
   * 화살표/버튼이 연속으로 여러 번 눌리면(빠른 연타) goTo 안의
   * `index` 클로저가 아직 이전 값을 가리켜 계산이 어긋난다. 항상
   * 최신 값을 동기적으로 들고 있는 ref를 별도로 두고, 다음 인덱스
   * 계산은 이 ref 기준으로만 한다.
   */
  const indexRef = useRef(0);

  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    return () => window.clearTimeout(timeoutRef.current);
  }, []);

  const goTo = (nextIndex: number) => {
    const current = indexRef.current;
    if (nextIndex === current) return;
    indexRef.current = nextIndex;

    if (!reducedMotion) {
      window.clearTimeout(timeoutRef.current);
      setPrevIndex(current);
      timeoutRef.current = window.setTimeout(() => {
        setPrevIndex(null);
      }, TRANSITION_MS);
    }

    setIndex(nextIndex);
  };

  const goNext = () => goTo((indexRef.current + 1) % items.length);
  const goPrev = () => goTo((indexRef.current - 1 + items.length) % items.length);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goNext();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goPrev();
    }
  };

  const current = items[index];
  const previous = prevIndex !== null ? items[prevIndex] : null;

  const hasAsIs = current.asIsImage !== undefined;
  const prevHasAsIs = previous?.asIsImage !== undefined;

  return (
    <section className={styles.section} data-section="as-is-to-be" onKeyDown={handleKeyDown}>
      <button
        type="button"
        className={`${styles.navButton} ${styles.navButtonLeft}`}
        aria-label="이전 화면 보기"
        onClick={goPrev}
      >
        <ChevronIcon className={styles.navButtonIcon} />
      </button>
      <button
        type="button"
        className={`${styles.navButton} ${styles.navButtonRight}`}
        aria-label="다음 화면 보기"
        onClick={goNext}
      >
        <ChevronIcon className={styles.navButtonIcon} />
      </button>

      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.phonePair}>
            {hasAsIs && (
              <div className={styles.phoneColumn}>
                <span className={`${styles.badge} ${styles.badgeAsIs}`}>AS-IS</span>
                <div className={styles.phoneStage}>
                  {previous && prevHasAsIs && previous.asIsImage && (
                    <img
                      key={`prev-asis-${previous.id}`}
                      src={previous.asIsImage}
                      alt=""
                      aria-hidden="true"
                      className={`${styles.phoneImg} ${styles.phoneImgPrev}`}
                      draggable={false}
                    />
                  )}
                  <img
                    key={`asis-${current.id}`}
                    src={current.asIsImage}
                    alt={current.asIsAlt}
                    className={`${styles.phoneImg} ${styles.phoneImgCurrent}`}
                    draggable={false}
                  />
                </div>
              </div>
            )}

            <div className={styles.phoneColumn}>
              <span
                className={`${styles.badge} ${
                  current.toBeBadgeLabel === 'NEW' ? styles.badgeNew : styles.badgeToBe
                }`}
              >
                {current.toBeBadgeLabel}
              </span>
              <div className={styles.phoneStage}>
                {previous && (
                  <img
                    key={`prev-tobe-${previous.id}`}
                    src={previous.toBeImage}
                    alt=""
                    aria-hidden="true"
                    className={`${styles.phoneImg} ${styles.phoneImgPrev}`}
                    draggable={false}
                  />
                )}
                <img
                  key={`tobe-${current.id}`}
                  src={current.toBeImage}
                  alt={current.toBeAlt}
                  className={`${styles.phoneImg} ${styles.phoneImgCurrent}`}
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomNav} role="group" aria-label="SOL Pay 화면 종류 선택">
          {items.map((item, itemIndex) => {
            const active = itemIndex === index;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                aria-label={item.label}
                className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
                onClick={() => goTo(itemIndex)}
              >
                <img
                  src={active ? item.iconActive : item.iconInactive}
                  alt=""
                  className={styles.navIcon}
                />
                <span className={`${styles.navLabel} ${active ? styles.navLabelActive : ''}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 9.98169 17.4878" fill="none" aria-hidden="true">
      <path
        d="M9.98169 1.23779L2.47559 8.7439L9.98169 16.25L8.7439 17.4878L0 8.7439L8.7439 0L9.98169 1.23779Z"
        fill="currentColor"
      />
    </svg>
  );
}
