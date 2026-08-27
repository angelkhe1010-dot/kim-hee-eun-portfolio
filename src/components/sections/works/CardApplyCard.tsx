import ProjectCardChrome from './ProjectCardChrome';
import bgFigma from '../../../assets/images/works/2-cardapply/v2-bg-figma.png';
import logo from '../../../assets/images/works/2-cardapply/mask-large.png';
import mockup from '../../../assets/images/works/2-cardapply/v2-mockup.png';

const meta = [
  { label: 'PERIOD', value: '2024. 06 ~ 2025. 01' },
  { label: 'Client', value: '신한카드' },
  { label: 'project', value: 'PC / MO' },
  { label: 'work', value: '디자인' },
];

export default function CardApplyCard({ variant }: { variant: 'large' | 'small' }) {
  const isLarge = variant === 'large';

  return (
    <ProjectCardChrome
      variant={variant}
      border="solid"
      borderColor="#dde1e7"
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
          신한카드 온라인 카드신청
          <br />
          디지털 고도화
        </>
      }
      desc={
        <>
          고객의 눈높이에 맞게 직관적이고
          <br />
          편의적인 UI, 차별화된 카드 신청
          <br />
          프로세스로 재구성한 카드신청 구축
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
          style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: `${(464.113 / 464) * 100}%`, objectFit: 'cover' }}
        />
      }
    />
  );
}
