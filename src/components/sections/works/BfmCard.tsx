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

  /*
   * The whole mockup group (macbook + phone + MySHOP watermark) is scaled
   * down to 80% as one rigid unit and re-centered in the .visual box, so
   * the laptop/phone size ratio and their overlap stay exactly as designed
   * -- only the group's overall scale and position change.
   */
  const shadowDeco = isLarge
    ? { src: shadowLarge, left: 313.41, top: 135.13, width: 291.71, height: 67.46 }
    : { src: shadowSmall, left: 268.66, top: 115.83, width: 250.04, height: 57.82 };

  const bezelShadow = isLarge ? '0px 11.79px 26.53px 0px rgba(0,0,0,0.25)' : '0px 10.11px 22.74px 0px rgba(0,0,0,0.25)';
  const tabletShadow = isLarge ? '0px 2.334px 19.25px 0px rgba(0,0,0,0.3)' : '0px 2px 16.5px 0px rgba(0,0,0,0.3)';

  const tablet = isLarge
    ? { left: 465.63, top: 289.14, width: 107.33, height: 226.92, border: 2.917, barTop: 202.42, barHeight: 21.58 }
    : { left: 399.13, top: 247.83, width: 92.02, height: 194.5, border: 2.5, barTop: 173.5, barHeight: 18.5 };

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
          <div style={{ position: 'absolute', inset: '26.28% 23.93% 36.03% 16.72%' }}>
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
                borderRadius: 14,
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
                borderRadius: '4.666px 4.666px 10.5px 10.5px',
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
