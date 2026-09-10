export type EmailToastStatus = 'success' | 'error';

export interface EmailToastDetail {
  kind: 'email';
  status: EmailToastStatus;
  email: string;
}

/*
 * 이력서 다운로드 토스트. 이메일 토스트와 같은 컴포넌트/컨테이너를
 * 재사용하지만(같은 이벤트를 듣고 같은 .toast 엘리먼트를 그린다),
 * Figma 디자인처럼 한 줄짜리 메시지만 갖는다 -- email/status 두 줄인
 * EmailToastDetail과 구조가 달라 kind로 구분한다.
 */
export interface ResumeToastDetail {
  kind: 'resume';
  message: string;
}

export type ContactToastDetail = EmailToastDetail | ResumeToastDetail;

export const EMAIL_TOAST_EVENT = 'email-toast';

export function dispatchEmailToast(status: EmailToastStatus, email: string): void {
  window.dispatchEvent(
    new CustomEvent<EmailToastDetail>(EMAIL_TOAST_EVENT, {
      detail: { kind: 'email', status, email },
    }),
  );
}

export function dispatchResumeToast(message: string): void {
  window.dispatchEvent(
    new CustomEvent<ResumeToastDetail>(EMAIL_TOAST_EVENT, {
      detail: { kind: 'resume', message },
    }),
  );
}
