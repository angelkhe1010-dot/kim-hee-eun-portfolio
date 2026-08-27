import { useNavigate } from 'react-router-dom';

import styles from './SolPayDetail.module.css';

import detail01 from '../assets/images/detail/detail_01.png';
import detail02 from '../assets/images/detail/detail_02.png';
import detail03 from '../assets/images/detail/detail_03.png';
import detail04 from '../assets/images/detail/detail_04.png';
import detail05 from '../assets/images/detail/detail_05.png';

import backIcon from '../assets/images/detail/back.png';

const detailImages = [
  detail01,
  detail02,
  detail03,
  detail04,
  detail05,
];

export default function SolPayDetail() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <main className={styles.detail}>
      {detailImages.map(
        (image, index) => (
          <section
            key={image}
            className={`${styles.imageSection} ${
              index === 0
                ? styles.firstSection
                : ''
            }`}
          >
            <img
              src={image}
              alt={`SOL Pay 프로젝트 상세 ${
                index + 1
              }`}
              className={
                styles.detailImage
              }
              draggable={false}
            />

            {index === 0 && (
              <button
                type="button"
                className={
                  styles.backButton
                }
                onClick={handleBack}
                aria-label="이전 페이지로 이동"
              >
                <img
                  src={backIcon}
                  alt=""
                  className={
                    styles.backIcon
                  }
                  draggable={false}
                />
              </button>
            )}
          </section>
        ),
      )}
    </main>
  );
}