import type { CSSProperties } from 'react';
import ProjectCardChrome from './ProjectCardChrome';
import bgLarge from '../../../assets/images/works/1-solpay/bg-large.svg';
import bgSmall from '../../../assets/images/works/1-solpay/bg-small.svg';
import logoLarge from '../../../assets/images/works/1-solpay/mask-large.png';
import logoSmall from '../../../assets/images/works/1-solpay/mask-small.png';
import iphoneMockup from '../../../assets/images/works/1-solpay/iphone-mockup.png';

const meta = [
  { label: 'PERIOD', value: '2025. 07 ~ 2026. 06' },
  { label: 'Client', value: '신한카드' },
  { label: 'project', value: 'APP' },
  { label: 'work', value: '디자인' },
];

const containerStyle: CSSProperties = { containerType: 'size' } as CSSProperties;

export default function SolPayCard({ variant }: { variant: 'large' | 'small' }) {
  const isLarge = variant === 'large';
  const logo = isLarge ? logoLarge : logoSmall;

  return (
    <ProjectCardChrome
      variant={variant}
      bg={isLarge ? bgLarge : bgSmall}
      largeAlt={false}
      logo={
        <img
          src={logo}
          alt="신한카드"
          style={{ width: isLarge ? 145.833 : 125, height: isLarge ? 36.458 : 31.25, objectFit: 'contain', objectPosition: 'left center' }}
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
      visual={
        isLarge ? (
          <>
            <div
              style={{ position: 'absolute', inset: '22.29% 5.84% 12.42% 56.55%', display: 'flex', alignItems: 'center', justifyContent: 'center', ...containerStyle }}
            >
              <div style={{ width: 'hypot(79.9328cqw, 5.43738cqh)', height: 'hypot(-20.0672cqw, 94.5626cqh)', transform: 'rotate(6.85deg)' } as CSSProperties}>
                <div style={{ position: 'relative', width: '100%', height: '100%', boxShadow: '-7.406px 3.703px 22.217px 0px rgba(0,0,0,0.14)' }}>
                  <img src={iphoneMockup} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
            <div
              style={{ position: 'absolute', inset: '13.44% 32.43% 7.7% 8.43%', display: 'flex', alignItems: 'center', justifyContent: 'center', ...containerStyle }}
            >
              <div style={{ width: 'hypot(-54.5157cqw, 16.0436cqh)', height: 'hypot(45.4843cqw, 83.9564cqh)', transform: 'rotate(-21.77deg) scaleX(-1)' } as CSSProperties}>
                <div style={{ position: 'relative', width: '100%', height: '100%', boxShadow: '-7.406px 3.703px 22.217px 0px rgba(0,0,0,0.14)' }}>
                  <img src={iphoneMockup} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              style={{ position: 'absolute', inset: '22.29% 5.84% 12.42% 56.55%', display: 'flex', alignItems: 'center', justifyContent: 'center', ...containerStyle }}
            >
              <div style={{ width: 'hypot(79.9328cqw, 5.43738cqh)', height: 'hypot(-20.0672cqw, 94.5626cqh)', transform: 'rotate(6.85deg)' } as CSSProperties}>
                <div style={{ position: 'relative', width: '100%', height: '100%', boxShadow: '-6.348px 3.174px 19.043px 0px rgba(0,0,0,0.14)' }}>
                  <img src={iphoneMockup} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
            <div
              style={{ position: 'absolute', inset: '13.44% 32.43% 7.7% 8.43%', display: 'flex', alignItems: 'center', justifyContent: 'center', ...containerStyle }}
            >
              <div style={{ width: 'hypot(-54.5157cqw, 16.0436cqh)', height: 'hypot(45.4843cqw, 83.9564cqh)', transform: 'rotate(-21.77deg) scaleX(-1)' } as CSSProperties}>
                <div style={{ position: 'relative', width: '100%', height: '100%', boxShadow: '-6.348px 3.174px 19.043px 0px rgba(0,0,0,0.14)' }}>
                  <img src={iphoneMockup} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </>
        )
      }
    />
  );
}
