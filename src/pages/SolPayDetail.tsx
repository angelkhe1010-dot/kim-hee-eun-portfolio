import styles from './SolPayDetail.module.css';

import TopButton from '../components/sections/TopButton';
import HeroSection from './solpay/HeroSection';

import detailInterview from '../assets/images/detail/detail_interview.png';
import detailStrategy from '../assets/images/detail/detail_strategy.png';
import detailAsIs from '../assets/images/detail/detail_asis.png';
import detail02 from '../assets/images/detail/detail_02.png';
import detail03 from '../assets/images/detail/detail_03.png';
import detail04 from '../assets/images/detail/detail_04.png';
import detail05 from '../assets/images/detail/detail_05.png';
import detailAsIsToBe from '../assets/images/detail/detail_asis_tobe.png';
import detail06 from '../assets/images/detail/detail_06.png';

const detailImages = [
  { src: detailInterview, alt: 'SOL Pay 프로젝트 상세 - 사용자 인터뷰로 발견한 주요 불편' },
  { src: detailStrategy, alt: 'SOL Pay 프로젝트 상세 - 사용자의 불편을 해결할 UX 방향' },
  { src: detailAsIs, alt: 'SOL Pay 프로젝트 상세 - 개선 전(AS-IS) 화면 비교' },
  { src: detail02, alt: 'SOL Pay 프로젝트 상세 - 나의 혜택 현황을 한눈에 확인하도록' },
  { src: detail03, alt: 'SOL Pay 프로젝트 상세 - 다양한 혜택을 더 즐거운 경험으로' },
  { src: detail04, alt: 'SOL Pay 프로젝트 상세 - 혜택을 찾는 과정도 하나의 경험이 되도록' },
  { src: detail05, alt: 'SOL Pay 프로젝트 상세 - 원하는 혜택으로 더 빠르게 이동하도록' },
  { src: detailAsIsToBe, alt: 'SOL Pay 프로젝트 상세 - 개선 전후(AS-IS/TO-BE) 화면 비교' },
  { src: detail06, alt: 'SOL Pay 프로젝트 상세 - 최종 화면 모음' },
];

export default function SolPayDetail() {
  return (
    <main className={styles.detail}>
      <TopButton />

      <HeroSection />

      {detailImages.map(
        ({ src, alt }) => (
          <section
            key={src}
            className={styles.imageSection}
          >
            <img
              src={src}
              alt={alt}
              className={
                styles.detailImage
              }
              draggable={false}
            />
          </section>
        ),
      )}
    </main>
  );
}
