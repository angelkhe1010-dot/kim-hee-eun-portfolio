import type { CSSProperties, ReactNode } from 'react';
import styles from './ProjectCard.module.css';

type MetaItem = { label: string; value: string };

type Props = {
  variant: 'large' | 'small';
  bg?: string;
  bgAlt?: string;
  border?: 'gradient' | 'solid' | 'none';
  borderColor?: string;
  borderGradientAngle?: number;
  theme?: 'light' | 'dark';
  logo?: ReactNode;
  title: ReactNode;
  desc: ReactNode;
  meta: MetaItem[];
  visual: ReactNode;
  largeAlt?: boolean;
  extra?: ReactNode;
  detailButton?: ReactNode;
};

export default function ProjectCardChrome({
  variant,
  bg,
  bgAlt = '',
  border = 'none',
  borderColor,
  borderGradientAngle,
  theme = 'light',
  logo,
  title,
  desc,
  meta,
  visual,
  largeAlt,
  extra,
  detailButton,
}: Props) {
  const sizeClass = variant === 'large' ? styles.cardLarge : styles.cardSmall;
  const altClass = variant === 'large' && largeAlt ? styles.cardLargeAlt : '';
  const borderClass =
    variant === 'large' && border === 'gradient'
      ? styles.borderGradient
      : variant === 'large' && border === 'solid'
        ? styles.borderSolid
        : '';
  const themeClass = theme === 'dark' ? styles.themeDark : '';
  const cssVars: Record<string, string> = {};
  if (borderColor) cssVars['--card-border-color'] = borderColor;
  if (borderGradientAngle !== undefined) cssVars['--border-gradient-angle'] = `${borderGradientAngle}deg`;

  return (
    <div
      className={`${styles.card} ${sizeClass} ${altClass} ${borderClass} ${themeClass}`}
      style={Object.keys(cssVars).length ? (cssVars as CSSProperties) : undefined}
    >
      {bg && <img src={bg} alt={bgAlt} className={styles.bg} />}
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
          {detailButton && (
            <div className={styles.detailButtonSlot}>{detailButton}</div>
          )}
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
