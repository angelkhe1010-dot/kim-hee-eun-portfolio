export type EmailToastStatus = 'success' | 'error';

export interface EmailToastDetail {
  status: EmailToastStatus;
  email: string;
}

export const EMAIL_TOAST_EVENT = 'email-toast';

export function dispatchEmailToast(status: EmailToastStatus, email: string): void {
  window.dispatchEvent(
    new CustomEvent<EmailToastDetail>(EMAIL_TOAST_EVENT, {
      detail: { status, email },
    }),
  );
}
