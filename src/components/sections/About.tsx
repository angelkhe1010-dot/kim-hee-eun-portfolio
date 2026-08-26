import styles from './About.module.css';
import profilePhoto from '../../assets/images/about/profile-photo.jpg';
import bullet from '../../assets/images/about/bullet.svg';

const strengths = ['# 사용자 관점', '# 커뮤니케이션', '# 협업', '# 문제 해결', '# 빠른 실행'];

const designTools = [
  { name: 'Figma', note: 'UI 디자인 · 프로토타입 · 컴포넌트 · Variables' },
  { name: 'Framer', note: '반응형 웹 · 인터랙션' },
  { name: 'Premiere Pro' },
  { name: 'Photoshop' },
  { name: 'Illustrator' },
];

const aiTools = [{ name: 'Claude' }, { name: 'ChatGPT' }];

const education = [
  { date: '2016 - 2020', label: '중부대학교 산업디자인학과' },
  { date: '2015', label: '서울여자고등학교' },
];

const certifications = [
  { date: '2022. 05', label: 'GTQ(그래픽기술자격) 1급' },
  { date: '2021. 06', label: '컬러리스트기사' },
];

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.titleBlock}>
        <p className={styles.titleHeading}>ABOUT ME</p>
        <p className={styles.titleSub}>다양한 경험을 바탕으로 사용성과 완성도를 함께 고민합니다.</p>
      </div>

      <div className={styles.content}>
        <div className={styles.profile}>
          <img src={profilePhoto} alt="김희은" className={styles.profilePhoto} />
          <div className={styles.profileInfo}>
            <p className={styles.profileName}>김희은 / Kim Hee eun</p>
            <p className={styles.profileLine}>UIUX Designer</p>
            <p className={styles.profileLine}>010 - 9813 - 1813</p>
            <p className={styles.profileEmail}>kheuni.10@gmail.com</p>
          </div>
        </div>

        <div className={styles.detail}>
          <div className={styles.col}>
            <div className={styles.block}>
              <p className={styles.blockTitle}>STRENGTHS</p>
              <div className={styles.tags}>
                {strengths.map((s) => (
                  <div className={styles.tag} key={s}>
                    <span className={styles.tagLabel}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.block}>
              <p className={styles.blockTitle}>SKILLS</p>
              <div className={styles.skillsGrid}>
                <div className={styles.skillGroup}>
                  <div className={styles.skillGroupHead}>
                    <span className={styles.bulletWrap}>
                      <img src={bullet} alt="" className={styles.bullet} />
                    </span>
                    <p className={styles.skillGroupTitle}>DESIGN TOOLS</p>
                  </div>
                  <div className={styles.skillList}>
                    {designTools.map((t) => (
                      <div className={styles.skillItem} key={t.name}>
                        <div className={styles.skillRow}>
                          <span>-</span>
                          <span>{t.name}</span>
                        </div>
                        {t.note && <p className={styles.skillNote}>{t.note}</p>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.skillGroup}>
                  <div className={styles.skillGroupHead}>
                    <span className={styles.bulletWrap}>
                      <img src={bullet} alt="" className={styles.bullet} />
                    </span>
                    <p className={styles.skillGroupTitle}>AI TOOLS</p>
                  </div>
                  <div className={styles.skillList}>
                    {aiTools.map((t) => (
                      <div className={styles.skillItem} key={t.name}>
                        <div className={styles.skillRow}>
                          <span>-</span>
                          <span>{t.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.col} ${styles.colRight}`}>
            <div className={styles.block}>
              <p className={styles.blockTitle}>EDUCATION</p>
              <div className={styles.historyList}>
                {education.map((e) => (
                  <div className={styles.historyRow} key={e.label}>
                    <span className={styles.historyDate}>{e.date}</span>
                    <span className={styles.historyLabel}>{e.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.block}>
              <p className={styles.blockTitle}>Certifications</p>
              <div className={styles.historyList}>
                {certifications.map((c) => (
                  <div className={styles.historyRow} key={c.label}>
                    <span className={styles.historyDate}>{c.date}</span>
                    <span className={styles.historyLabel}>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
