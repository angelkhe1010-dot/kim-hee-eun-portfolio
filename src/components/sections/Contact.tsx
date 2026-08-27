import styles from './Contact.module.css';
import ellipseBlob from '../../assets/images/contact/ellipse-blob.svg';
import connectWordmark from '../../assets/images/contact/connect-wordmark.svg';


export default function Contact() {
  return (
    <section className={styles.contact} id="contact">
      <img src={ellipseBlob} alt="" className={styles.ellipseBlob} />

      <div className={styles.inner}>
        <div className={styles.detail}>
          <div className={styles.heading}>
            <p className={styles.headingTitle}>CONTACT</p>
            <p className={styles.headingSub}>쌓아온 경험을 바탕으로 더 나은 경험을 디자인합니다.</p>
          </div>

          <div className={styles.rows}>
            <div className={styles.row}>
              <span className={styles.rowLabel}>EMAIL</span>
              <span className={styles.rowValue}>kheuni.10@gmail.com</span>
            </div>
            <div className={styles.row}>
              <span className={styles.rowLabel}>ABOUT</span>
              <span className={styles.rowValue}>UI/UX Designer · Seoul</span>
            </div>
            <div className={styles.row}>
              <span className={styles.rowLabel}>WEB</span>
              <span className={styles.rowLinkGroup}>
                <span className={styles.rowValue}>Kimheeun.com</span>
              </span>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.footerRow}>
            <span className={styles.copyright}>© 2026 HEEUN KIM　·　heeunkim.design</span>
            <img src={connectWordmark} alt="" className={styles.connectWordmark} />
          </div>
        </div>
      </div>
    </section>
  );
}
