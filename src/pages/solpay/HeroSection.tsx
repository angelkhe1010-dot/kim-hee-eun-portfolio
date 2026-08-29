import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './HeroSection.module.css';

import bg from '../../assets/images/works/1-solpay/v2-bg-figma.png';
import logo from '../../assets/images/works/1-solpay/mask-large.png';
import mockup from '../../assets/images/works/1-solpay/v2-mockup.png';
import backIcon from '../../assets/images/detail/back.png';

const meta = [
  { label: '기간', value: '2025. 07 ~ 2026. 06' },
  { label: '사용프로그램', value: 'Figma, Lottie' },
  { label: '작업 범위', value: 'APP' },
];

const participationGroups = [
  {
    name: '메인 화면',
    chips: [
      { name: '혜택 메인', value: '100%' },
      { name: '홈 메인', value: '40%' },
      { name: '카드 메인', value: '30%' },
      { name: '금융 메인', value: '10%' },
    ],
  },
  {
    name: '서브 화면',
    chips: [
      { name: '자산', value: '100%' },
      { name: '전체메뉴·설정', value: '70%' },
      { name: '디스커버', value: '60%' },
      { name: '통합검색', value: '20%' },
    ],
  },
];

export default function HeroSection() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  /*
   * Same scroll-triggered glass background as the main Header
   * (Header.tsx isScrolled / Header.module.css .headerGlass.scrolled).
   */
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`${styles.headerGlass} ${
          isScrolled ? styles.scrolled : ''
        }`}
      />

      <header className={styles.detailHeader}>
        <button
          type="button"
          className={styles.backButton}
          onClick={handleBack}
          aria-label="이전 페이지로 이동"
        >
          <span
            role="img"
            aria-hidden="true"
            className={styles.backIcon}
            style={{
              WebkitMaskImage: `url(${backIcon})`,
              maskImage: `url(${backIcon})`,
            }}
          />
        </button>

        <span className={styles.projectLabel}>Project</span>
      </header>

      <section className={styles.hero}>
        <img
          src={bg}
          alt=""
          className={styles.bg}
        />

        <div className={styles.content}>
          <div
            role="img"
            aria-label="신한카드"
            className={styles.logo}
            style={{
              WebkitMaskImage: `url(${logo})`,
              maskImage: `url(${logo})`,
            }}
          />

          <h1 className={styles.title}>
            NEW 슈퍼SOL, 신한카드 SOL페이
          </h1>

          <p className={styles.desc}>
            UI/UX를 개선하고, 신한카드 홈페이지의 사용성과
            <br />
            디자인 일관성을 강화하는 고도화 작업 진행
          </p>

          <dl className={styles.meta}>
            {meta.map((m) => (
              <div className={styles.metaRow} key={m.label}>
                <dt className={styles.metaLabel}>{m.label}</dt>
                <dd className={styles.metaValue}>{m.value}</dd>
              </div>
            ))}

            <div className={`${styles.metaRow} ${styles.metaRowTop}`}>
              <dt className={styles.metaLabel}>디자인 참여도</dt>
              <dd className={styles.participation}>
                {participationGroups.map((group) => (
                  <div className={styles.participationGroup} key={group.name}>
                    <div className={styles.participationGroupLabel}>
                      <span className={styles.dot} />
                      {group.name}
                    </div>
                    <div className={styles.chipRow}>
                      {group.chips.map((chip) => (
                        <span className={styles.chip} key={chip.name}>
                          <span className={styles.chipName}>{chip.name}</span>
                          <span className={styles.chipValue}>{chip.value}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

                <div className={styles.participationNote}>
                  <span className={styles.dot} />
                  통합 테스트 참여
                </div>
              </dd>
            </div>
          </dl>
        </div>

        <img
          src={mockup}
          alt="SOL Pay 앱 화면"
          className={styles.mockup}
        />
      </section>
    </>
  );
}
