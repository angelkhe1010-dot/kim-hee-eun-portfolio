import styles from './AccessibilitySection.module.css';
import SectionHeading from './SectionHeading';
import { useSectionReveal } from './useSectionReveal';

import phoneNormal from '../../assets/images/cardapply/accessibility/phone-normal.png';
import phoneLarge from '../../assets/images/cardapply/accessibility/phone-large.png';

/*
 * 왼쪽 그룹(기본 글자 크기 화면 + OFF 토글)이 먼저, 0.3초(0.25~0.35s
 * 범위) 뒤 오른쪽 그룹(큰글씨 화면 + ON 토글)이 뒤따라 나타난다.
 */
const GROUP_GAP_SEC = 0.3;

export default function AccessibilitySection() {
  const { sectionRef, triggered } = useSectionReveal<HTMLElement>();

  return (
    <section className={styles.section} ref={sectionRef}>
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

      {/* 왼쪽 그룹: 기본 글자 크기 화면 + OFF 토글 */}
      <div
        className={`${styles.group} ${styles.groupNormal} ${triggered ? styles.visible : ''}`}
        style={{ transitionDelay: triggered ? '0s' : undefined }}
      >
        <div className={styles.phoneFrame}>
          <img
            src={phoneNormal}
            alt="본인이 맞는지 확인할게요 화면 (기본 글자 크기)"
            className={styles.phoneImg}
          />
          <div className={styles.phoneFade} />
        </div>

        <div className={styles.toggle}>
          <div className={`${styles.togglePill} ${styles.togglePillOff}`}>
            <span className={`${styles.toggleKnob} ${styles.toggleKnobOff}`} />
            <span className={`${styles.toggleText} ${styles.toggleTextOff}`}>큰글</span>
          </div>
        </div>
      </div>

      {/* 오른쪽 그룹: 큰글씨 화면 + ON 토글 */}
      <div
        className={`${styles.group} ${styles.groupLarge} ${triggered ? styles.visible : ''}`}
        style={{ transitionDelay: triggered ? `${GROUP_GAP_SEC}s` : undefined }}
      >
        <div className={styles.phoneFrame}>
          <img
            src={phoneLarge}
            alt="본인이 맞는지 확인할게요 화면 (큰글씨 모드)"
            className={styles.phoneImg}
          />
          <div className={styles.phoneFade} />
        </div>

        <div className={styles.toggle}>
          <div className={`${styles.togglePill} ${styles.togglePillOn}`}>
            <span className={`${styles.toggleText} ${styles.toggleTextOn}`}>큰글</span>
            <span className={`${styles.toggleKnob} ${styles.toggleKnobOn}`} />
          </div>
        </div>
      </div>
    </section>
  );
}
