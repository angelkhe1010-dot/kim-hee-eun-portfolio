import ProjectCardChrome from './ProjectCardChrome';
import styles from './ProjectCard.module.css';
import bgFigma from '../../../assets/images/works/1-solpay/v3-bg.png';
import logo from '../../../assets/images/works/1-solpay/mask-large.png';
import mockup from '../../../assets/images/works/1-solpay/v2-mockup.png';
import chevronRight from '../../../assets/images/works/chevron-right-white.svg';

const meta = [
  { label: 'PERIOD', value: '2025. 07 ~ 2026. 06' },
  { label: 'Client', value: '신한카드' },
  { label: 'project', value: 'APP' },
  { label: 'work', value: '디자인' },
];

export default function SolPayCard({ variant }: { variant: 'large' | 'small' }) {
  const isLarge = variant === 'large';

  return (
    <ProjectCardChrome
      variant={variant}
      border="gradient"
      borderGradientAngle={71.44}
      theme="dark"
      logo={
        <div
          role="img"
          aria-label="신한카드"
          style={{
            width: isLarge ? 96 : 82.8,
            height: isLarge ? 24 : 20.7,
            backgroundColor: '#ffffff',
            WebkitMaskImage: `url(${logo})`,
            maskImage: `url(${logo})`,
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'left center',
            maskPosition: 'left center',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
          }}
        />
      }
      title={
        <>
          NEW 슈퍼SOL,
          <br />
          신한카드 SOL페이
        </>
      }
      desc="UI/UX를 개선하고, 신한카드 홈페이지의 사용성과 디자인 일관성을 강화하는 고도화 작업 진행"
      detailButton={
        <div className={styles.detailButton}>
          <span className={styles.detailButtonText}>상세보기</span>
          <img src={chevronRight} alt="" className={styles.detailButtonIcon} />
        </div>
      }
      meta={meta}
      extra={
        <img
          src={bgFigma}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      }
      visual={
        <img
          src={mockup}
          alt=""
          style={{
            position: 'absolute',
            left: `${(14.51 / 430) * 100}%`,
            top: `${(67 / 464) * 100}%`,
            width: `${(388 / 430) * 100}%`,
            height: `${(382 / 464) * 100}%`,
            objectFit: 'cover',
          }}
        />
      }
    />
  );
}
