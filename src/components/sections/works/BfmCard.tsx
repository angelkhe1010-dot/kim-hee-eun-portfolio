import ProjectCardChrome from './ProjectCardChrome';
import bgFigma from '../../../assets/images/works/3-bfm/v2-bg-figma.png';
import logo from '../../../assets/images/works/3-bfm/mask-large.png';
import mockup from '../../../assets/images/works/3-bfm/v2-mockup.png';

const meta = [
  { label: 'PERIOD', value: '2023. 02 ~ 2023. 04' },
  { label: 'Client', value: '신한카드' },
  { label: 'project', value: 'PC / MO' },
  { label: 'work', value: '디자인' },
];

export default function BfmCard({ variant }: { variant: 'large' | 'small' }) {
  const isLarge = variant === 'large';

  return (
    <ProjectCardChrome
      variant={variant}
      border="none"
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
      title="BFM 마이샵"
      desc={
        <>
          신한카드 마이샵 쿠폰을 등록하면
          <br />
          고객님의 소비생활을 바탕으로
          <br />
          맞춤형 할인 혜택 제공하는 서비스
        </>
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
            left: `${(5 / 430) * 100}%`,
            top: 0,
            width: `${(430 / 430) * 100}%`,
            height: '100%',
            objectFit: 'cover',
          }}
        />
      }
    />
  );
}
