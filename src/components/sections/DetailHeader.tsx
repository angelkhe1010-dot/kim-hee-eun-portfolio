import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './DetailHeader.module.css';

import backIcon from '../../assets/images/detail/back.png';

type DetailHeaderProps = {
  /*
   * 히어로 섹션의 ref를 넘기면, 그 히어로 높이를 지나기 전까지는
   * 아이콘/라벨을 흰색으로 두었다가 지나는 순간 검정으로 바꾼다 --
   * 카드신청 상세페이지처럼 진한 색 히어로 위에 헤더가 얹히는
   * 경우다. 넘기지 않으면 SOL Pay 상세페이지처럼 옅은 배경 위에
   * 얹히는 걸 기본으로 보고 항상 고정된 검정(#121212)을 쓴다.
   * 레이아웃/위치/크기/스크롤 유리 배경은 두 경우 모두 완전히
   * 동일하고, 오직 이 아이콘·라벨 색상만 페이지 배경에 맞춰 다르다.
   */
  heroRef?: RefObject<HTMLElement | null>;
};

export default function DetailHeader({ heroRef }: DetailHeaderProps) {
  const navigate = useNavigate();
  const [isGlassScrolled, setIsGlassScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(!heroRef);

  useEffect(() => {
    const handleScroll = () => {
      setIsGlassScrolled(window.scrollY > 20);

      if (heroRef) {
        const heroHeight = heroRef.current?.offsetHeight ?? 0;
        setIsPastHero(window.scrollY > heroHeight - 72);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [heroRef]);

  const handleBack = () => {
    navigate('/#works');
  };

  const isDark = !heroRef || isPastHero;

  return (
    <>
      <div
        className={`${styles.headerGlass} ${
          isGlassScrolled ? styles.scrolled : ''
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
            className={`${styles.backIcon} ${isDark ? styles.dark : ''}`}
            style={{
              WebkitMaskImage: `url(${backIcon})`,
              maskImage: `url(${backIcon})`,
            }}
          />
        </button>

        <span className={`${styles.projectLabel} ${isDark ? styles.dark : ''}`}>
          Project
        </span>
      </header>
    </>
  );
}
