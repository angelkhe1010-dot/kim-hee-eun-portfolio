import { useEffect, useRef, useState } from 'react';

import styles from './EmailToast.module.css';
import { EMAIL_TOAST_EVENT, type ContactToastDetail } from './emailToastEvent';

const TOAST_VISIBLE_MS = 2800;

/*
 * Header/TopButton과 마찬가지로 ScaleWrapper 바깥(App.tsx)에 렌더링해서
 * 1920 캔버스의 zoom 배율과 무관하게 항상 실제 뷰포트 기준으로 고정되도록 한다.
 * Contact 섹션의 이메일 복사 버튼과 이력서 다운로드 버튼이 같은
 * CustomEvent로 이 컴포넌트를 트리거한다 -- 토스트 컨테이너/모션/타이머를
 * 하나로 공유해야 두 버튼을 연달아 눌러도 토스트가 겹치거나 타이머가
 * 충돌하지 않는다. kind로 이메일(2줄)/이력서(1줄) 콘텐츠만 구분한다.
 */
export default function EmailToast() {
  const [toast, setToast] = useState<ContactToastDetail | null>(null);
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
      const detail = (event as CustomEvent<ContactToastDetail>).detail;

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
      {toast && toast.kind === 'email' && (
        <>
          <p className={styles.line1}>{toast.email}</p>
          <p className={styles.line2}>
            {toast.status === 'success' ? '이메일을 복사했어요' : '이메일 복사에 실패했어요'}
          </p>
        </>
      )}
      {/*
        node 538:336687/336689 -- 이력서 토스트는 Regular 400/20px 한
        줄뿐이라, email의 굵은 line1(600, 이메일 강조용)이 아니라
        line2와 같은 weight/size를 그대로 쓴다.
      */}
      {toast && toast.kind === 'resume' && (
        <p className={styles.line2}>{toast.message}</p>
      )}
    </div>
  );
}
