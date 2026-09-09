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

const cards: QuoteCard[] = [
  { quote: '카드 조건과 혜택을\n비교하고 싶어요', author: '한*민, 장기 이용 유저', variant: 'light', left: -60, top: 373, faded: true },
  { quote: '결제 취소 여부를\n바로 알 수 없어요', author: '한*민, 장기 이용 유저', variant: 'light', left: 270, top: 373 },
  { quote: '내 카드 실적을\n한눈에 보고 싶어요', author: '한*민, 장기 이용 유저', variant: 'pale', left: 600, top: 373 },
  { quote: '어떤 혜택이 나에게 맞는지 모르겠어요', author: '김*주, 신규 유입 사용자', variant: 'blue', left: 930, top: 373 },
  { quote: '내가 사용할 수 있는\n혜택인지 모르겠어요', author: '한*민, 장기 이용 유저', variant: 'blue', left: 480, top: 713 },
  { quote: '원하는 서비스를\n검색할 수 없어요', author: '김*우, 신규 유입 사용자', variant: 'blue', left: 810, top: 713 },
  { quote: '내가 받은 혜택을 한눈에 보고 싶어요', author: '한*민, 장기 이용 유저', variant: 'pale', left: 1140, top: 713 },
  { quote: '어디서 어떻게 결제해야 할지 헷갈려요', author: '노*진, 신규 유입 사용자', variant: 'light', left: 1470, top: 713 },
  { quote: '카드 조건과 혜택을\n비교하고 싶어요', author: '노*진, 신규 유입 사용자', variant: 'light', left: 1800, top: 713, faded: true },
];

export default function InterviewSection() {
  return (
    <section className={styles.section} data-section="interview">
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
            className={`${styles.card} ${styles[`card-${card.variant}`]} ${card.faded ? styles.faded : ''}`}
            style={{ left: vw(card.left), top: vw(card.top) }}
            data-motion="card"
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
        ))}
      </div>
    </section>
  );
}
