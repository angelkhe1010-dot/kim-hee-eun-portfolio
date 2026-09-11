import styles from './ApplicationSection.module.css';
import SectionHeading from './SectionHeading';
import { useSectionReveal } from './useSectionReveal';

import ellipse1 from '../../assets/images/cardapply/application/ellipse1.svg';
import ellipse2 from '../../assets/images/cardapply/application/ellipse2.svg';
import phone1 from '../../assets/images/cardapply/application/phone1.png';
import phone2Bg from '../../assets/images/cardapply/application/phone2-bg.png';
import phone2Phone from '../../assets/images/cardapply/application/phone2-phone.png';
import phone3 from '../../assets/images/cardapply/application/phone3.png';

/*
 * 텍스트 모듈 3개의 세로 위치 차이가 커서(약 30vw) 좌->우 판정이
 * 애매하므로, Figma에 실제로 작성된 순서(선택 방식 단순화 -> 필요한
 * 정보를 빠르게 입력 -> 명확한 정보 구분)를 그대로 등장 순서로 쓴다.
 * 간격 0.22초 x 2 + 모듈 자신의 0.55초 = 약 0.99초로 "한꺼번에
 * 나오지 않으면서도 너무 늘어지지 않는" 범위에 들어온다.
 */
const STAGGER_SEC = 0.22;

export default function ApplicationSection() {
  const { sectionRef, triggered } = useSectionReveal<HTMLElement>();

  return (
    <section className={styles.section} ref={sectionRef}>
      <img src={ellipse1} alt="" className={`${styles.ellipse} ${styles.ellipse1}`} />
      <img src={ellipse2} alt="" className={`${styles.ellipse} ${styles.ellipse2}`} />

      <div className={styles.column}>
        <SectionHeading
          eyebrow="05 APPLICATION EXPERIENCE"
          title={
            <>
              구분은 명확하게,
              <br />
              신청은 더 간결하게
            </>
          }
          desc={
            <>
              반복되던 드롭다운과 불필요한 라인을 줄이고,
              <br />
              정보의 성격에 따라 입력·선택·버튼 영역을 명확하게 구분했습니다.
            </>
          }
        />

        <div className={styles.phones}>
          <div className={styles.phoneFrame}>
            <img src={phone1} alt="고객님 정보를 알려주세요 화면" className={styles.phoneImg} />
          </div>

          <div className={styles.comboFrame}>
            <img
              src={phone2Bg}
              alt=""
              aria-hidden="true"
              className={styles.comboBg}
            />
            <img
              src={phone2Phone}
              alt="어떤 카드가 필요하신가요 화면"
              className={styles.comboPhone}
            />
          </div>

          <div className={styles.phoneFrame}>
            <img
              src={phone3}
              alt="안전한 카드이용을 위해 정보 확인이 필요해요 화면"
              className={styles.phoneImg}
            />
          </div>
        </div>
      </div>

      <div
        className={`${styles.label} ${styles.label1} ${triggered ? styles.visible : ''}`}
        style={{ transitionDelay: triggered ? '0s' : undefined }}
      >
        <p className={styles.labelText}>선택 방식 단순화</p>
      </div>
      <div
        className={`${styles.label} ${styles.label2} ${triggered ? styles.visible : ''}`}
        style={{ transitionDelay: triggered ? `${STAGGER_SEC}s` : undefined }}
      >
        <p className={styles.labelText}>필요한 정보를 빠르게 입력</p>
      </div>
      <div
        className={`${styles.label} ${styles.label3} ${triggered ? styles.visible : ''}`}
        style={{ transitionDelay: triggered ? `${2 * STAGGER_SEC}s` : undefined }}
      >
        <p className={styles.labelText}>명확한 정보 구분</p>
      </div>
    </section>
  );
}
