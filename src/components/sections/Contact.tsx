import styles from './Contact.module.css';
import ellipseBlob from '../../assets/images/contact/ellipse-blob.svg';
import connectWordmark from '../../assets/images/contact/connect-wordmark.svg';
import emailArrow from '../../assets/images/contact/email-arrow.svg';

import { dispatchEmailToast } from './emailToastEvent';

const EMAIL = 'kheuni.10@gmail.com';

/*
 * navigator.clipboard는 보안 컨텍스트(https / localhost)와 최신 브라우저에서만
 * 쓸 수 있으므로, 지원하지 않는 환경을 위해 execCommand 기반 fallback을 둔다.
 */
async function copyEmail(): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(EMAIL);
      return true;
    } catch {
      // fall through to legacy fallback
    }
  }

  try {
    const textarea = document.createElement('textarea');

    textarea.value = EMAIL;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-1000px';
    textarea.style.left = '-1000px';

    document.body.appendChild(textarea);

    textarea.select();
    textarea.setSelectionRange(0, EMAIL.length);

    const succeeded = document.execCommand('copy');

    document.body.removeChild(textarea);

    return succeeded;
  } catch {
    return false;
  }
}

export default function Contact() {
  const handleEmailClick = async () => {
    const succeeded = await copyEmail();

    dispatchEmailToast(succeeded ? 'success' : 'error', EMAIL);
  };

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
              <button
                type="button"
                className={`${styles.pill} ${styles.pillButton}`}
                onClick={handleEmailClick}
              >
                <span className={styles.pillLabel}>{EMAIL}</span>
                <img src={emailArrow} alt="" className={styles.pillIcon} />
              </button>
            </div>

            <div className={styles.row}>
              <span className={styles.rowLabel}>ABOUT</span>
              <span className={styles.pill}>
                <span className={styles.pillLabel}>UI/UX Designer · Seoul</span>
              </span>
            </div>

            <div className={styles.row}>
              <span className={styles.rowLabel}>WEB</span>
              <span className={styles.pill}>
                <span className={styles.pillLabel}>kimheeun.com</span>
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
