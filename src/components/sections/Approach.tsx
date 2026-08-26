import styles from './Approach.module.css';
import blobBg from '../../assets/images/approach/blob-bg.png';
import blobPink from '../../assets/images/approach/blob-pink.png';
import blobLeft from '../../assets/images/approach/blob-left.png';
import blobRight from '../../assets/images/approach/blob-right.png';

export default function Approach() {
  return (
    <section className={styles.approach} id="approach">
      {/* Figma layer order (back → front): bg blob → text → left blob → right blob */}
      <img
        src={blobBg}
        alt=""
        className={styles.blob}
        style={{ left: 804.675, top: -141.3, width: 1190, height: 1362 }}
      />

      <div className={styles.textBlock}>
        <p className={styles.eyebrow}>MY APPROACH</p>
        <p className={styles.headline}>
          FROM PROBLEM
          <br />
          TO SOLUTION.
        </p>
        <img
          src={blobPink}
          alt=""
          className={styles.blob}
          style={{ left: 567, top: 25, width: 245, height: 254 }}
        />
      </div>

      <img
        src={blobLeft}
        alt=""
        className={styles.blob}
        style={{ left: 61, top: 95, width: 644, height: 722 }}
      />

      <img
        src={blobRight}
        alt=""
        className={styles.blob}
        style={{ left: 1454, top: 568, width: 341, height: 352 }}
      />
    </section>
  );
}
