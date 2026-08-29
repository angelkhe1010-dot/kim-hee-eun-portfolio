import styles from './SolPayDetail.module.css';

import TopButton from '../components/sections/TopButton';
import HeroSection from './solpay/HeroSection';

import detail02 from '../assets/images/detail/detail_02.png';
import detail03 from '../assets/images/detail/detail_03.png';
import detail04 from '../assets/images/detail/detail_04.png';
import detail05 from '../assets/images/detail/detail_05.png';
import detail06 from '../assets/images/detail/detail_06.png';

const detailImages = [
  detail02,
  detail03,
  detail04,
  detail05,
  detail06,
];

export default function SolPayDetail() {
  return (
    <main className={styles.detail}>
      <TopButton />

      <HeroSection />

      {detailImages.map(
        (image, index) => (
          <section
            key={image}
            className={styles.imageSection}
          >
            <img
              src={image}
              alt={`SOL Pay 프로젝트 상세 ${
                index + 2
              }`}
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
