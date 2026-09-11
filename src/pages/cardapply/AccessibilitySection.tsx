import styles from './AccessibilitySection.module.css';
import SectionHeading from './SectionHeading';

import phoneNormal from '../../assets/images/cardapply/accessibility/phone-normal.png';
import phoneLarge from '../../assets/images/cardapply/accessibility/phone-large.png';
import badgeNormal from '../../assets/images/cardapply/accessibility/badge-normal.png';
import badgeLarge from '../../assets/images/cardapply/accessibility/badge-large.png';

export default function AccessibilitySection() {
  return (
    <section className={styles.section}>
      <div className={styles.textCol}>
        <SectionHeading
          align="left"
          theme="light"
          eyebrow="06 ACCESSIBILITY"
          title={
            <>
              큰 글씨와 충분한 조작 영역으로
              <br />
              전 연령대 모두 편리하게
            </>
          }
          desc="고령층을 포함한 다양한 연령대의 사용자가 편리하게 신청할 수 있도록 글자 크기와 터치 영역을 확대한 큰글씨 모드를 제공했습니다."
        />

        <div className={styles.sub}>
          <p className={styles.subTitle}>화면 최상단에 있는 토글, 언제든 편리하게 전환</p>
          <p className={styles.subDesc}>
            화면 오른쪽 상단에 큰글씨 모드 토글을 배치하고,
            <br />
            글자와 조작 영역을 함께 확대해 더 쉽게 읽고 누를 수 있도록 했습니다.
          </p>
        </div>
      </div>

      <div className={styles.phones}>
        <img
          src={phoneNormal}
          alt="본인이 맞는지 확인할게요 화면 (기본 글자 크기)"
          className={`${styles.phone} ${styles.phoneNormal}`}
        />
        <img
          src={phoneLarge}
          alt="본인이 맞는지 확인할게요 화면 (큰글씨 모드)"
          className={`${styles.phone} ${styles.phoneLarge}`}
        />
      </div>

      <img src={badgeNormal} alt="" className={`${styles.badge} ${styles.badgeNormal}`} />
      <img src={badgeLarge} alt="" className={`${styles.badge} ${styles.badgeLarge}`} />
    </section>
  );
}
