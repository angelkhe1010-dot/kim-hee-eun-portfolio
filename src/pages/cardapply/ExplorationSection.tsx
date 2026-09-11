import styles from './ExplorationSection.module.css';
import SectionHeading from './SectionHeading';
import CardFlipDemo from './CardFlipDemo';

import phoneAsIs from '../../assets/images/cardapply/exploration/phone-asis.png';
import phoneToBe from '../../assets/images/cardapply/exploration/phone-tobe.png';

export default function ExplorationSection() {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <SectionHeading
          align="left"
          eyebrow="03 CARD EXPLORATION"
          title={
            <>
              카드 디자인을
              <br />
              더 쉽고 직관적으로 탐색하도록
            </>
          }
          desc={
            <>
              카드의 앞면과 뒷면을 확인할 수 있는 전환 버튼을 추가하고,
              <br />
              좌우 스와이프로 다양한 디자인을 탐색할 수 있도록 개선했습니다.
            </>
          }
        />
      </div>

      <div className={styles.compare}>
        <div className={styles.compareCol}>
          <span className={`${styles.badge} ${styles.badgeAsIs}`}>
            <span className={styles.badgeText}>AS-IS</span>
          </span>
          <img src={phoneAsIs} alt="AS-IS 카드 디자인 선택 화면" className={styles.phoneAsIs} />
        </div>

        <div className={styles.compareCol}>
          <span className={`${styles.badge} ${styles.badgeToBe}`}>
            <span className={styles.badgeText}>TO-BE</span>
          </span>
          <div className={styles.phoneToBeFrame}>
            <img
              src={phoneToBe}
              alt="TO-BE 카드 디자인 선택 화면"
              className={styles.phoneToBe}
            />
          </div>
        </div>
      </div>

      <div className={styles.caption}>
        <CardFlipDemo />

        <div className={styles.captionText}>
          <p className={styles.captionTitle}>명확한 조작으로 편리해진 카드 탐색</p>
          <p className={styles.captionDesc}>
            툴팁에 의존했던 기존 방식을 개선해 앞면·뒷면 전환 버튼을 추가하고,
            <br />
            좌우 스와이프로 다양한 카드 디자인을 직관적으로 탐색할 수 있도록 했습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
