import ProjectCardChrome from './ProjectCardChrome';
import bgFigma from '../../../assets/images/works/1-solpay/v2-bg-figma.png';
import logo from '../../../assets/images/works/1-solpay/mask-large.png';
import mockup from '../../../assets/images/works/1-solpay/v2-mockup.png';

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
      theme="light"
      logo={
        <img
          src={logo}
          alt="신한카드"
          style={{ width: isLarge ? 96 : 82.8, height: isLarge ? 24 : 20.7, objectFit: 'contain', objectPosition: 'left center' }}
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
