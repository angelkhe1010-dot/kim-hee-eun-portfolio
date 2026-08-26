import styles from './Process.module.css';

import iconUnderstand from '../../assets/images/process/icon-understand.svg';
import decoUnderstand from '../../assets/images/process/deco-understand.svg';
import iconDefine from '../../assets/images/process/icon-define.svg';
import decoDefine from '../../assets/images/process/deco-define.svg';
import iconDesign from '../../assets/images/process/icon-design.svg';
import decoDesign from '../../assets/images/process/deco-design.svg';
import iconRefine from '../../assets/images/process/icon-refine.svg';
import decoRefine from '../../assets/images/process/deco-refine.svg';

export default function Process() {
  return (
    <section className={styles.process} id="process">
      <div className={styles.blurRight} />
      <div className={styles.blurCenter} />
      <div className={styles.blurLeft} />

      <div className={styles.titleBlock}>
        <p className={styles.titleHeading}>My Design Approach</p>
        <p className={styles.titleSub}>문제를 이해하고, 더 나은 사용자 경험을 화면으로 구체화합니다.</p>
      </div>

      {/* Understand */}
      <div className={`${styles.card} ${styles.cardGap}`} style={{ left: 160, top: 334 }}>
        <div className={styles.cardInner}>
          <img src={iconUnderstand} alt="" className={styles.cardIcon} />
          <p className={styles.cardTitle}>Understand</p>
          <p className={styles.cardDesc}>사용자와 요구사항 맥락 이해</p>
        </div>
        <img
          src={decoUnderstand}
          alt=""
          style={{ position: 'absolute', left: 215.2, top: 20.81, width: 167.15, height: 170.692 }}
        />
      </div>

      {/* Define */}
      <div className={`${styles.card} ${styles.cardGap}`} style={{ left: 570, top: 374 }}>
        <div className={styles.cardInner}>
          <img src={iconDefine} alt="" className={styles.cardIcon} />
          <p className={styles.cardTitle}>Define</p>
          <p className={styles.cardDesc}>핵심 문제와 개선 방향 정의</p>
        </div>
        <img
          src={decoDefine}
          alt=""
          style={{ position: 'absolute', left: 182.2, top: 32.2, width: 250, height: 100 }}
        />
      </div>

      {/* Design */}
      <div className={styles.card} style={{ left: 980, top: 424 }}>
        <div className={styles.cardInner} style={{ gap: 0 }}>
          <img src={iconDesign} alt="" className={styles.cardIcon} />
          <p className={styles.cardTitle}>Design</p>
          <p className={styles.cardDesc}>사용자 경험 중심의 UI 설계</p>
          <img
            src={decoDesign}
            alt=""
            style={{ position: 'absolute', left: 218.7, top: -147.68, width: 129, height: 193.5 }}
          />
        </div>
      </div>

      {/* Refine */}
      <div className={`${styles.card} ${styles.cardGap}`} style={{ left: 1390, top: 464 }}>
        <div className={styles.cardInner}>
          <img src={iconRefine} alt="" className={styles.cardIcon} />
          <p className={styles.cardTitle}>Refine</p>
          <p className={styles.cardDesc}>피드백 기반 디자인 개선</p>
        </div>
        <img
          src={decoRefine}
          alt=""
          style={{
            position: 'absolute',
            left: 'calc(50% + 125px)',
            top: 'calc(50% - 83.75px)',
            width: 200,
            height: 162.5,
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
    </section>
  );
}
