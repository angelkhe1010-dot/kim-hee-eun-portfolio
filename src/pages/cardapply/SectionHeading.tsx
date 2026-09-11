import type { ReactNode } from 'react';
import styles from './SectionHeading.module.css';

type Props = {
  eyebrow: string;
  title: ReactNode;
  desc: ReactNode;
  align?: 'center' | 'left';
  theme?: 'dark' | 'light';
};

/*
 * "01 USER PAIN POINTS" 같은 영문 라벨 + 2줄 타이틀 + 설명 문구 구조가
 * 카드신청 상세페이지의 8개 섹션 중 6개에서 반복돼 공통 컴포넌트로 뺐다.
 * align은 가운데/왼쪽 정렬, theme은 흰 배경(dark 텍스트)/파란 배경
 * (light, 흰 텍스트) 섹션 차이를 흡수한다.
 */
export default function SectionHeading({
  eyebrow,
  title,
  desc,
  align = 'center',
  theme = 'dark',
}: Props) {
  const className = [
    styles.heading,
    align === 'left' ? styles.alignLeft : '',
    theme === 'light' ? styles['theme-light'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={className}>
      <p className={styles.eyebrow}>{eyebrow}</p>

      <div className={styles.titleGroup}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.desc}>{desc}</p>
      </div>
    </div>
  );
}
