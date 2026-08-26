import styles from './Hero.module.css';

import bgBlob from '../../assets/images/hero/bg-blob.svg';
import bgWave from '../../assets/images/hero/bg-wave.svg';
import arrowDown from '../../assets/images/hero/arrow-down.svg';
import blob1 from '../../assets/images/hero/blob-1.png';
import blob2 from '../../assets/images/hero/blob-2.png';
import blob3 from '../../assets/images/hero/blob-3.png';
import blob4 from '../../assets/images/hero/blob-4.png';
import blob5 from '../../assets/images/hero/blob-5.png';
import blob6 from '../../assets/images/hero/blob-6.png';

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.bgBlob}>
        <div className={styles.bgBlobInner}>
          <div style={{ position: 'absolute', inset: '-19.98% -2.16% 4.93% -23.64%' }}>
            <img src={bgBlob} alt="" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </div>

      <div className={styles.bgWave}>
        <div style={{ position: 'absolute', inset: '-8.16% -12.97%' }}>
          <img src={bgWave} alt="" style={{ width: '100%', height: '100%' }} />
        </div>
      </div>

      <div className={styles.blobCluster}>
        {/* Frame 2147239603 */}
        <div className={styles.blobItem} style={{ left: 1004, top: 79 }}>
          <div
            style={{
              position: 'absolute',
              left: -195,
              top: -207,
              width: 699.232,
              height: 748.991,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: 476.287, height: 595.504, transform: 'rotate(-152.17deg) scaleY(-1)' }}>
              <img src={blob1} alt="" className={styles.blobImg} style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              left: 50.98,
              top: -18.83,
              width: 313.461,
              height: 311.64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 233.491,
                height: 229.13,
                borderRadius: 105.291,
                overflow: 'hidden',
                transform: 'rotate(-152.17deg) scaleY(-1)',
              }}
            >
              <img
                src={blob2}
                alt=""
                className={styles.blobImg}
                style={{ width: '102.62%', height: '130.74%', left: '-2.62%', top: '-0.02%' }}
              />
            </div>
          </div>
        </div>

        {/* Frame 2147239594 */}
        <div className={styles.blobItem} style={{ left: 674, top: 0 }}>
          <img
            src={blob3}
            alt=""
            className={styles.blobImg}
            style={{ left: -49.67, top: -103.4, width: 428.234, height: 536.8 }}
          />
        </div>

        {/* Frame 2147239597 */}
        <div className={styles.blobItem} style={{ left: 15, top: 203 }}>
          <img
            src={blob4}
            alt=""
            className={styles.blobImg}
            style={{ left: '-27.01%', top: '-44.91%', width: '147.97%', height: '191.22%' }}
          />
        </div>

        {/* Frame 2147239604 */}
        <div className={styles.blobItem} style={{ left: 345, top: 79 }}>
          <div
            style={{
              position: 'absolute',
              left: -171.41,
              top: -172.98,
              width: 706.461,
              height: 751.377,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: 474.864, height: 594.41, transform: 'rotate(29.59deg)' }}>
              <img src={blob5} alt="" className={styles.blobImg} style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
        </div>

        {/* Frame 2147239596 */}
        <div
          className={styles.blobItem}
          style={{
            left: 1333,
            top: 193,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'visible',
          }}
        >
          <div style={{ transform: 'rotate(180deg) scaleY(-1)', width: 330, height: 330, overflow: 'hidden', position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                left: -53.9,
                top: -129.8,
                width: 477.76,
                height: 589.098,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ width: 457.429, height: 573.003, transform: 'rotate(-2.06deg)' }}>
                <img src={blob6} alt="" className={styles.blobImg} style={{ width: '100%', height: '100%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.textBlock}>
        <div className={styles.headlineGroup}>
          <p className={styles.headline}>
            UIUX DESIGN
            <br />
            PORTFOLIO
          </p>
          <p className={styles.subtext}>김희은 · UI/UX Designer · 2026</p>
        </div>
        <button type="button" className={styles.ctaButton}>
          <span className={styles.ctaLabel}>View Projects</span>
          <span className={styles.ctaIcon}>
            <img src={arrowDown} alt="" />
          </span>
        </button>
      </div>

      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <span className={styles.navLogo}>KIM HEEUN</span>
        </div>
        <div className={styles.navRight}>
          <a href="#works" className={styles.navLink}>Portfolio</a>
          <a href="#about" className={styles.navLink}>About</a>
        </div>
      </nav>
    </section>
  );
}
