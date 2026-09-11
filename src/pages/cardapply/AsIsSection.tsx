import styles from './AsIsSection.module.css';
import SectionHeading from './SectionHeading';
import { useSectionReveal } from './useSectionReveal';

import phone1 from '../../assets/images/cardapply/asis/phone1.png';
import phone2 from '../../assets/images/cardapply/asis/phone2.png';
import phone3 from '../../assets/images/cardapply/asis/phone3.png';
import callout1Top from '../../assets/images/cardapply/asis/callouts/callout1-top.png';
import callout1Bottom from '../../assets/images/cardapply/asis/callouts/callout1-bottom.png';
import callout2Img from '../../assets/images/cardapply/asis/callouts/callout2.png';
import callout3Img from '../../assets/images/cardapply/asis/callouts/callout3.png';

/*
 * 모듈 사이 등장 간격(0.18~0.25초 범위). 3개(간격 2번)에 개별 등장
 * 시간(0.6초)까지 더하면 전체가 약 1.04~1.15초 안에 끝나 "한꺼번에
 * 나오지 않으면서도 너무 늘어지지 않는" 범위에 들어온다.
 */
const STAGGER_SEC = 0.22;

export default function AsIsSection() {
  const { sectionRef, triggered } = useSectionReveal<HTMLElement>();

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.heading}>
        <SectionHeading
          eyebrow="04 AS-IS ANALYSIS"
          title={
            <>
              무엇을 선택하고 눌러야 할지
              <br />
              구분하기 어려웠던 신청 화면
            </>
          }
          desc={
            <>
              잦은 드롭다운으로 신청 흐름이 끊겼으며, 입력창·버튼·타이틀·정보 박스에
              <br />
              유사한 라인이 반복되어 조작 가능한 영역을 구분하기 어려웠습니다.
            </>
          }
        />
      </div>

      <div className={styles.phones}>
        <img src={phone1} alt="카드정보 선택 화면" className={`${styles.phone} ${styles.phone1}`} />
        <img src={phone2} alt="카드 신청 화면" className={`${styles.phone} ${styles.phone2}`} />
        <img src={phone3} alt="본인인증 화면" className={`${styles.phone} ${styles.phone3}`} />
      </div>

      <div className={styles.callouts}>
        <div
          className={`${styles.callout} ${styles.callout1} ${triggered ? styles.visible : ''}`}
          style={{ transitionDelay: triggered ? '0s' : undefined }}
        >
          <img src={callout1Top} alt="카드발급 관련 동의사항" className={styles.calloutImg} />
          <img src={callout1Bottom} alt="1원계좌인증이 완료되었습니다" className={styles.calloutImg} />
        </div>

        <div
          className={`${styles.callout} ${styles.callout2} ${triggered ? styles.visible : ''}`}
          style={{ transitionDelay: triggered ? `${1 * STAGGER_SEC}s` : undefined }}
        >
          <img src={callout2Img} alt="카드 브랜드 선택" className={styles.calloutImg} />
        </div>

        <div
          className={`${styles.callout} ${styles.callout3} ${triggered ? styles.visible : ''}`}
          style={{ transitionDelay: triggered ? `${2 * STAGGER_SEC}s` : undefined }}
        >
          <img src={callout3Img} alt="신청인정보 입력" className={styles.calloutImg} />
        </div>
      </div>
    </section>
  );
}
