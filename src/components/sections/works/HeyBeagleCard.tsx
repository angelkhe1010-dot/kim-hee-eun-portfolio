import ProjectCardChrome from './ProjectCardChrome';
import bgLarge from '../../../assets/images/works/6-heybeagle/bg-large.svg';
import bgSmall from '../../../assets/images/works/6-heybeagle/bg-small.svg';
import logo from '../../../assets/images/works/6-heybeagle/logo.png';
import mainMockup from '../../../assets/images/works/6-heybeagle/main-mockup.png';
import tabletMockup from '../../../assets/images/works/6-heybeagle/tablet-mockup.png';

const meta = [
  { label: 'PERIOD', value: '2023. 10 ~ 2023. 12' },
  { label: 'Client', value: '웜즈' },
  { label: 'project', value: 'PC / MO' },
  { label: 'work', value: '디자인' },
];

export default function HeyBeagleCard({ variant }: { variant: 'large' | 'small' }) {
  const isLarge = variant === 'large';
  const border = isLarge ? 3.646 : 3.125;
  const shadow = isLarge ? '0px 2.917px 24.063px 0px rgba(0,0,0,0.3)' : '0px 2.5px 20.625px 0px rgba(0,0,0,0.3)';

  const main = isLarge
    ? { height: 364.583, top: 'calc(50% + 0.33px)', innerHeight: 1377.137, innerLeft: -3.65, innerTop: -3.65, innerWidth: 583.333 }
    : { height: 312.5, top: 'calc(50% + 0.29px)', innerHeight: 1180.403, innerLeft: -3.12, innerTop: -3.13, innerWidth: 500 };

  const tablet = isLarge ? { height: 339.792, top: 276 } : { height: 291.25, top: 236.57 };

  return (
    <ProjectCardChrome
      variant={variant}
      bg={isLarge ? bgLarge : bgSmall}
      logo={
        <div style={{ position: 'relative', width: isLarge ? 182.292 : 156.25, height: isLarge ? 36.458 : 31.25 }}>
          <img
            src={logo}
            alt="heybeagle"
            style={{
              position: 'absolute',
              left: isLarge ? 6.08 : 5.21,
              top: '50%',
              transform: 'translateY(-50%)',
              width: isLarge ? 170.139 : 145.833,
              height: isLarge ? 27.344 : 23.438,
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
      visual={
        <>
          <div
            style={{
              position: 'absolute',
              left: '12.08%',
              right: '3.18%',
              top: main.top,
              height: main.height,
              transform: 'translateY(-50%)',
              border: `${border}px solid #000000`,
              borderRadius: 17.5,
              boxShadow: shadow,
              overflow: 'hidden',
            }}
          >
            <img
              src={mainMockup}
              alt=""
              style={{
                position: 'absolute',
                left: main.innerLeft,
                top: main.innerTop,
                width: main.innerWidth,
                height: main.innerHeight,
                objectFit: 'cover',
              }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '3.49%',
              right: '73.21%',
              top: tablet.top,
              height: tablet.height,
              border: `${border}px solid #000000`,
              borderRadius: 17.5,
              boxShadow: shadow,
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
