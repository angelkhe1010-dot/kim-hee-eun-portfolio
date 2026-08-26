import type { ReactNode } from 'react';
import styles from './ProjectCard.module.css';

type MetaItem = { label: string; value: string };

type Props = {
  variant: 'large' | 'small';
  bg: string;
  bgAlt?: string;
  logo?: ReactNode;
  title: ReactNode;
  desc: ReactNode;
  meta: MetaItem[];
  visual: ReactNode;
  largeAlt?: boolean;
  extra?: ReactNode;
};

export default function ProjectCardChrome({
  variant,
  bg,
  bgAlt = '',
  logo,
  title,
  desc,
  meta,
  visual,
  largeAlt,
  extra,
}: Props) {
  const sizeClass = variant === 'large' ? styles.cardLarge : styles.cardSmall;
  const altClass = variant === 'large' && largeAlt ? styles.cardLargeAlt : '';

  return (
    <div className={`${styles.card} ${sizeClass} ${altClass}`}>
      <img src={bg} alt={bgAlt} className={styles.bg} />
      {extra}
      <div className={styles.row}>
        <div className={styles.detail}>
          <div className={styles.headGroup}>
            <div className={styles.logoWrap}>
              {logo}
              <div className={styles.title}>{title}</div>
            </div>
            <div className={styles.desc}>{desc}</div>
          </div>
          <div className={styles.meta}>
            {meta.map((m) => (
              <div className={styles.metaRow} key={m.label}>
                <span className={styles.metaLabel}>{m.label}</span>
                <span className={styles.metaValue}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.visual}>{visual}</div>
      </div>
      <div className={styles.topNav}>
        <span className={styles.navBadge}>PROJECT</span>
      </div>
    </div>
  );
}
