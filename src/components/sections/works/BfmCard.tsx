import ProjectCardChrome from './ProjectCardChrome';
import bgLarge from '../../../assets/images/works/3-bfm/bg-large.svg';
import bgSmall from '../../../assets/images/works/3-bfm/bg-small.svg';
import logoLarge from '../../../assets/images/works/3-bfm/mask-large.png';
import logoSmall from '../../../assets/images/works/3-bfm/mask-small.png';
import shadowLarge from '../../../assets/images/works/3-bfm/shadow-large.svg';
import shadowSmall from '../../../assets/images/works/3-bfm/shadow-small.svg';
import macbookBezel from '../../../assets/images/works/3-bfm/macbook-bezel.png';
import macbookScreen from '../../../assets/images/works/3-bfm/macbook-screen.png';
import macbookFull from '../../../assets/images/works/3-bfm/macbook-full.png';
import tabletMockup from '../../../assets/images/works/3-bfm/tablet-mockup.png';

const meta = [
  { label: 'PERIOD', value: '2023. 02 ~ 2023. 04' },
  { label: 'Client', value: '신한카드' },
  { label: 'project', value: 'PC / MO' },
  { label: 'work', value: '디자인' },
];

export default function BfmCard({ variant }: { variant: 'large' | 'small' }) {
  const isLarge = variant === 'large';
  const logo = isLarge ? logoLarge : logoSmall;

  const shadowDeco = isLarge
    ? { src: shadowLarge, left: 323.42, top: 149.48, width: 364.583, height: 84.325 }
    : { src: shadowSmall, left: 277.21, top: 128.13, width: 312.5, height: 72.279 };

  const bezelShadow = isLarge ? '0px 14.741px 33.168px 0px rgba(0,0,0,0.25)' : '0px 12.635px 28.43px 0px rgba(0,0,0,0.25)';
  const tabletShadow = isLarge ? '0px 2.917px 24.063px 0px rgba(0,0,0,0.3)' : '0px 2.5px 20.625px 0px rgba(0,0,0,0.3)';

  const tablet = isLarge
    ? { left: 513.73, top: 341.98, width: 134.167, height: 283.646, border: 3.646, barTop: 253.02, barHeight: 26.979 }
    : { left: 440.34, top: 293.13, width: 115, height: 243.125, border: 3.125, barTop: 216.87, barHeight: 23.125 };

  return (
    <ProjectCardChrome
      variant={variant}
      bg={isLarge ? bgLarge : bgSmall}
      logo={
        <img
          src={logo}
          alt="신한카드"
          style={{ width: isLarge ? 145.833 : 125, height: isLarge ? 36.458 : 31.25, objectFit: 'contain', objectPosition: 'left center' }}
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
      visual={
        <>
          <img
            src={shadowDeco.src}
            alt=""
            style={{ position: 'absolute', left: shadowDeco.left, top: shadowDeco.top, width: shadowDeco.width, height: shadowDeco.height }}
          />
          <div style={{ position: 'absolute', inset: '30.07% 14.84% 22.81% 10.97%' }}>
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: '#808080' }} />
              <img src={macbookBezel} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'absolute', inset: '0 0 -7.26% 0', overflow: 'hidden' }}>
              <img
                src={macbookScreen}
                alt=""
                style={{ position: 'absolute', left: 0, top: '0.1%', width: '100%', height: '121.62%' }}
              />
            </div>
            <div style={{ position: 'absolute', inset: '-13.97% -12.79% -14.06% -12.79%', boxShadow: bezelShadow }}>
              <img src={macbookFull} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
            </div>
          </div>
          <div style={{ position: 'absolute', left: tablet.left, top: tablet.top, width: tablet.width, height: tablet.height }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                border: `${tablet.border}px solid #000000`,
                borderRadius: 17.5,
                boxShadow: tabletShadow,
                overflow: 'hidden',
              }}
            >
              <img
                src={tabletMockup}
                alt=""
                style={{ position: 'absolute', left: 0, top: '1.02%', width: '100%', height: '159.46%' }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                left: '2.72%',
                right: '2.72%',
                top: tablet.barTop,
                height: tablet.barHeight,
                borderRadius: '5.833px 5.833px 13.125px 13.125px',
                boxShadow: tabletShadow,
                overflow: 'hidden',
              }}
            >
              <img
                src={tabletMockup}
                alt=""
                style={{ position: 'absolute', left: 0, top: '-1449.19%', width: '100%', height: '1551.82%' }}
              />
            </div>
          </div>
        </>
      }
    />
  );
}
