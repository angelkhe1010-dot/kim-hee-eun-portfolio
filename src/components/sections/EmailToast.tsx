import { useEffect, useRef, useState } from 'react';

import styles from './EmailToast.module.css';
import { EMAIL_TOAST_EVENT, type EmailToastDetail } from './emailToastEvent';

const TOAST_VISIBLE_MS = 2800;

/*
 * Header/TopButton과 마찬가지로 ScaleWrapper 바깥(App.tsx)에 렌더링해서
 * 1920 캔버스의 zoom 배율과 무관하게 항상 실제 뷰포트 기준으로 고정되도록 한다.
 * Contact 섹션의 이메일 버튼은 window CustomEvent로 이 컴포넌트를 트리거한다.
 */
export default function EmailToast() {
  const [toast, setToast] = useState<EmailToastDetail | null>(null);
  const [visible, setVisible] = useState(false);

  const hideTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const clearHideTimer = () => {
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };

    const handleToast = (event: Event) => {
      const detail = (event as CustomEvent<EmailToastDetail>).detail;

      // 반복 클릭 시 타이머를 초기화해서 다시 충분히 보이게 한다
      clearHideTimer();

      setToast(detail);
      setVisible(true);

      hideTimerRef.current = window.setTimeout(() => {
        setVisible(false);
      }, TOAST_VISIBLE_MS);
    };

    window.addEventListener(EMAIL_TOAST_EVENT, handleToast);

    return () => {
      window.removeEventListener(EMAIL_TOAST_EVENT, handleToast);
      clearHideTimer();
    };
  }, []);

  return (
    <div
      className={`${styles.toast} ${visible ? styles.visible : ''}`}
      role="status"
      aria-live="polite"
    >
      {toast && (
        <>
          <p className={styles.line1}>{toast.email}</p>
          <p className={styles.line2}>
            {toast.status === 'success' ? '이메일을 복사했어요' : '이메일 복사에 실패했어요'}
          </p>
        </>
      )}
    </div>
  );
}
