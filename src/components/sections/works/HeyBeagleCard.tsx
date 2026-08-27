import ProjectCardChrome from './ProjectCardChrome';
import bgFigma from '../../../assets/images/works/6-heybeagle/v2-bg-figma.png';
import logo from '../../../assets/images/works/6-heybeagle/v2-logo.png';
import mainMockup from '../../../assets/images/works/6-heybeagle/v2-main-mockup.png';
import tabletMockup from '../../../assets/images/works/6-heybeagle/v2-tablet-mockup.png';

const meta = [
  { label: 'PERIOD', value: '2023. 10 ~ 2023. 12' },
  { label: 'Client', value: '웜즈' },
  { label: 'project', value: 'PC / MO' },
  { label: 'work', value: '디자인' },
];

function pct(px: number, base: number) {
  return `${(px / base) * 100}%`;
}

export default function HeyBeagleCard({ variant }: { variant: 'large' | 'small' }) {
  const isLarge = variant === 'large';

  return (
    <ProjectCardChrome
      variant={variant}
      border="solid"
      borderColor="#e5e5f0"
      theme="light"
      logo={
        <div style={{ position: 'relative', width: isLarge ? 96 : 82.8, height: isLarge ? 24 : 20.7 }}>
          <img
            src={logo}
            alt="heybeagle"
            style={{
              position: 'absolute',
              left: isLarge ? 4 : 3.45,
              top: '50%',
              transform: 'translateY(-50%)',
              width: isLarge ? 112 : 96.6,
              height: isLarge ? 18 : 15.53,
            }}
          />
        </div>
      }
      title={
        <>
          엔터테이너 매칭플랫폼,
          <br />
          헤이비글
        </>
      }
      desc={
        <>
          &apos;헤이비글&apos;은 성공적인 노하우와 전문성,
          <br />
          열린 협업 문화가 조화를 이루어 현재 상용화된 서비스
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
        <>
          <div
            style={{
              position: 'absolute',
              left: '17.91%',
              right: '7.67%',
              top: `calc(50% - ${pct(10, 464)})`,
              height: pct(200, 464),
              transform: 'translateY(-50%)',
              border: '1.5px solid #000000',
              borderRadius: 8,
              boxShadow: '2.824px 3.765px 8.471px 0px rgba(0,0,0,0.2)',
              overflow: 'hidden',
            }}
          >
            <img
              src={mainMockup}
              alt=""
              style={{ position: 'absolute', left: 0, top: 0, width: pct(320.155, 320), height: pct(755.824, 200), objectFit: 'cover' }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: pct(32, 430),
              top: pct(188, 464),
              width: pct(90, 430),
              height: pct(190, 464),
              border: '1.5px solid #000000',
              borderRadius: 8,
              boxShadow: '2.813px 3.75px 8.438px 0px rgba(0,0,0,0.2)',
              overflow: 'hidden',
            }}
          >
            <img
              src={tabletMockup}
              alt=""
              style={{ position: 'absolute', left: '-0.02%', top: 0, width: '100.05%', height: '186.72%' }}
            />
          </div>
        </>
      }
    />
  );
}
