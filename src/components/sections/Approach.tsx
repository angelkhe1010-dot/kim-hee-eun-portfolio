import styles from './Approach.module.css';
import blobBg from '../../assets/images/approach/blob-bg.png';
import blobPink from '../../assets/images/approach/blob-pink.png';
import blobLeft from '../../assets/images/approach/blob-left.png';
import blobRight from '../../assets/images/approach/blob-right.png';
import blobCursor from '../../assets/images/hero/blob-5.png';

export default function Approach() {
  return (
    <section className={styles.approach} id="approach">
      {/* Figma layer order (back → front): bg glow → text (+ pink blob) → left blob → right blob */}
      <img
        src={blobBg}
        alt=""
        className={styles.blob}
        style={{
          left: 816,
          top: -55,
          width: 1167.35,
          height: 1189.4,
          opacity: 0.22,
          filter: 'blur(43px)',
        }}
      />

      <div className={styles.textBlock}>
        <p className={styles.eyebrow}>MY APPROACH</p>
        <p className={styles.headline}>
          FROM PROBLEM
          <br />
          TO SOLUTION.
        </p>
        <div className={styles.glass} style={{ left: 567, top: 25, width: 245, height: 253 }}>
          <div
            className={styles.glassBlur}
            style={{
              backdropFilter: 'blur(2.5px)',
              WebkitBackdropFilter: 'blur(2.5px)',
              WebkitMaskImage: `url(${blobPink})`,
              maskImage: `url(${blobPink})`,
            }}
          />
          <img src={blobPink} alt="" className={styles.glassImg} />
        </div>
      </div>

      <div className={styles.glass} style={{ left: 137, top: 95, width: 644, height: 721 }}>
        <div
          className={styles.glassBlur}
          style={{
            backdropFilter: 'blur(10.5px)',
            WebkitBackdropFilter: 'blur(10.5px)',
            WebkitMaskImage: `url(${blobLeft})`,
            maskImage: `url(${blobLeft})`,
          }}
        />
        <img src={blobLeft} alt="" className={styles.glassImg} style={{ opacity: 0.55 }} />
      </div>

      {/* pink triangular "cursor" object, reusing Hero's blob-5 asset. The wrapper's box stays at
          Figma's crop-region position/size, but overflow is visible so the triangle's full
          silhouette (rounded corners, outer pink glow) never gets clipped by that box -- only
          the wrapper's own overflow controlled the clipping; the inner img's screen position/
          size/rotation are unchanged. */}
      <div className={styles.glass} style={{ left: 851, top: 648, width: 220, height: 220, overflow: 'visible' }}>
        <img
          src={blobCursor}
          alt=""
          className={styles.blob}
          style={{ left: -66, top: -83, width: 276, height: 345 }}
        />
      </div>

      <img
        src={blobRight}
        alt=""
        className={styles.blob}
        style={{ left: 1327, top: 571, width: 340, height: 351 }}
      />
    </section>
  );
}
