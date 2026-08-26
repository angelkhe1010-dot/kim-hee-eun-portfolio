import styles from './Experience.module.css';
import timelineLine from '../../assets/images/experience/timeline-line.svg';
import dotActive from '../../assets/images/experience/dot-active.svg';
import dot from '../../assets/images/experience/dot.svg';

const items = [
  { from: '2024. 08', to: 'NOW', company: 'DO SYSTEM', title: 'UIUX Designer', active: true },
  { from: '2023. 02', to: '2024. 07', company: 'OPENOBJECT', title: 'UIUX Designer', active: false },
  { from: '2020. 08', to: '2021. 11', company: 'ELSUPERVISION', title: 'Advertising Designer', active: false },
];

export default function Experience() {
  return (

    <section className={styles.experience} id="experience">
      <div className={styles.wordmark} />

      <div className={styles.titleBlock}>
        <p className={styles.titleHeading}>EXPERIENCE</p>
        <p className={styles.titleSub}>다양한 산업과 서비스를 경험하며 UI/UX 디자인 역량을 쌓아왔습니다.</p>
      </div>

      <div className={styles.timeline}>
        <img src={timelineLine} alt="" className={styles.timelineLine} />
        {items.map((item) => (
          <div className={styles.row} key={item.company}>
            <div className={styles.dotCol}>
              <div className={styles.dotMarker}>
                {item.active ? (
                  <img src={dotActive} alt="" className={styles.dotActive} />
                ) : (
                  <img src={dot} alt="" className={styles.dot} />
                )}
              </div>
            </div>
            <div className={styles.rowText}>
              <div className={styles.dateRow}>
                <span className={styles.dateText}>{item.from}</span>
                <span className={styles.dateDash}>-</span>
                <span className={styles.dateText}>{item.to}</span>
              </div>
              <div className={styles.role}>
                <p className={styles.company}>{item.company}</p>
                <p className={styles.title}>{item.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
