import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './HeroSection.module.css';

import bg from '../../assets/images/cardapply/hero/bg-figma.png';
import logo from '../../assets/images/works/2-cardapply/mask-large.png';
import vector from '../../assets/images/works/2-cardapply/v3-vector-decoration.svg';
import mockup from '../../assets/images/works/2-cardapply/v3-mockup-transparent.png';
import backIcon from '../../assets/images/detail/back.png';

const meta = [
  { label: '기간', value: '2024. 06 ~ 2025. 01' },
  { label: '사용프로그램', value: 'Figma, Lottie' },
  { label: '작업 범위', value: 'PC / MO' },
];

const participationItems = [
  {
    text: '디자이너 2명 참여',
    badge: { name: 'PC / MO', value: '각 50%' },
  },
  { text: '신한카드 디자인 가이드를 기반으로 카드신청 UI 설계' },
  { text: '기존 디자인 가이드 기반 카드신청 UI 및 전용 컴포넌트 설계' },
  { text: '큰글씨 모드 최초 구축 및 접근성 디자인 가이드 제작' },
];

export default function HeroSection() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);

  const [isScrolled, setIsScrolled] = useState(false);

  /*
   * 히어로(진한 파랑)를 벗어나 흰 배경 본문으로 들어가는 시점부터
   * 헤더의 뒤로가기 아이콘/라벨 색을 흰색 -> 검정으로 바꾼다.
   */
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = heroRef.current?.offsetHeight ?? 0;
      setIsScrolled(window.scrollY > heroHeight - 72);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleBack = () => {
    navigate('/#works');
  };

  return (
    <>
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
            className={`${styles.backIcon} ${isScrolled ? styles.scrolled : ''}`}
            style={{
              WebkitMaskImage: `url(${backIcon})`,
              maskImage: `url(${backIcon})`,
            }}
          />
        </button>

        <span className={`${styles.projectLabel} ${isScrolled ? styles.scrolled : ''}`}>
          Project
        </span>
      </header>

      <section className={styles.hero} ref={heroRef}>
        <img src={bg} alt="" className={styles.bg} />

        <div className={styles.row}>
          <div className={styles.detail}>
            <div className={styles.headGroup}>
              <div className={styles.titleGroup}>
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
                  신한카드 온라인 카드신청
                  <br />
                  디지털 고도화
                </h1>
              </div>

              <p className={styles.desc}>
                고객의 눈높이에 맞게 직관적이고 편의적인 UI, 차별화된 카드 신청
                <br />
                프로세스로 재구성한 카드신청 구축
              </p>
            </div>

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
                  {participationItems.map((item) => (
                    <div className={styles.participationGroup} key={item.text}>
                      <div className={styles.participationRow}>
                        <span className={styles.dot} />
                        <span className={styles.participationText}>{item.text}</span>
                      </div>

                      {item.badge && (
                        <span className={styles.badge}>
                          <span className={`${styles.badgeText} ${styles.badgeName}`}>
                            {item.badge.name}
                          </span>
                          <span className={`${styles.badgeText} ${styles.badgeValue}`}>
                            {item.badge.value}
                          </span>
                        </span>
                      )}
                    </div>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          <div className={styles.visual}>
            <img src={vector} alt="" className={styles.vector} />
            <img src={mockup} alt="카드신청 화면" className={styles.mockup} />
          </div>
        </div>
      </section>
    </>
  );
}
