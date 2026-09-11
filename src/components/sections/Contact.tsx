import styles from './Contact.module.css';
import ellipseBlob from '../../assets/images/contact/ellipse-blob.svg';
import connectWordmark from '../../assets/images/contact/connect-wordmark.svg';
import emailArrow from '../../assets/images/contact/email-arrow.svg';
import resumeDownloadIcon from '../../assets/images/contact/resume-download-icon.svg';

import { dispatchEmailToast, dispatchResumeToast } from './emailToastEvent';

const EMAIL = 'kheuni.10@gmail.com';

/*
 * public/resume/의 실제 파일명(영문, git/배포 환경에서 안전)과 사용자에게
 * 보여줄 다운로드 파일명(한글)을 분리한다. import.meta.env.BASE_URL을
 * 앞에 붙여서, Vite의 base가 "/"가 아닌 값으로 바뀌어도(서브패스 배포)
 * 항상 올바른 절대 경로를 가리키게 한다.
 */
const RESUME_PDF_URL = `${import.meta.env.BASE_URL}resume/kim-hee-eun-uiux-designer-resume.pdf`;
/*
 * macOS/Windows 양쪽에서 한글 파일명이 깨지지 않도록 유니코드 NFC로
 * 정규화한다 -- 소스 리터럴 자체는 이미 NFC지만, 어느 경로로 이
 * 문자열이 바뀌더라도(예: 다른 도구를 거쳐 NFD로 섞여 들어오는 경우)
 * 항상 안전하도록 실행 시점에도 한 번 더 강제한다.
 */
const RESUME_DOWNLOAD_FILENAME = '김희은_UIUX디자인_이력서.pdf'.normalize('NFC');
const RESUME_TOAST_MESSAGE = '이력서 다운로드를 시작했어요';

/*
 * 같은 출처(same-origin) 정적 파일이라 <a download>만으로 충분하다 --
 * fetch/Blob 없이, 클릭 한 번당 정확히 하나의 다운로드 요청만 발생시키고
 * 페이지 이동/새로고침도 없다. 실제 DOM에 붙여야(document.body에 append)
 * 일부 브라우저(Firefox 등)에서 클릭이 무시되지 않는다.
 */
function downloadResume(): void {
  const link = document.createElement('a');

  link.href = RESUME_PDF_URL;
  link.download = RESUME_DOWNLOAD_FILENAME;
  link.rel = 'noopener';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

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

  const handleResumeClick = () => {
    downloadResume();
    dispatchResumeToast(RESUME_TOAST_MESSAGE);
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
              <span className={styles.rowLabel}>RESUME</span>
              <button
                type="button"
                className={`${styles.pill} ${styles.pillButton}`}
                onClick={handleResumeClick}
              >
                <span className={styles.pillLabel}>이력서 다운받기</span>
                <img src={resumeDownloadIcon} alt="" className={styles.resumeIcon} />
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
            <img
              src={connectWordmark}
              alt=""
              aria-hidden="true"
              className={styles.connectWordmark}
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
