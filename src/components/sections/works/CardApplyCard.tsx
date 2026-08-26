import type { CSSProperties } from 'react';
import ProjectCardChrome from './ProjectCardChrome';
import bgLarge from '../../../assets/images/works/2-cardapply/bg-large.svg';
import bgSmall from '../../../assets/images/works/2-cardapply/bg-small.svg';
import logoLarge from '../../../assets/images/works/2-cardapply/mask-large.png';
import logoSmall from '../../../assets/images/works/2-cardapply/mask-small.png';
import vectorLarge from '../../../assets/images/works/2-cardapply/vector-large.svg';
import vectorSmall from '../../../assets/images/works/2-cardapply/vector-small.svg';
import macbookMockup from '../../../assets/images/works/2-cardapply/macbook-mockup.png';
import iphoneMockup from '../../../assets/images/works/2-cardapply/iphone-mockup.png';

const meta = [
  { label: 'PERIOD', value: '2024. 06 ~ 2025. 01' },
  { label: 'Client', value: '신한카드' },
  { label: 'project', value: 'PC / MO' },
  { label: 'work', value: '디자인' },
];

const containerStyle: CSSProperties = { containerType: 'size' } as CSSProperties;

export default function CardApplyCard({ variant }: { variant: 'large' | 'small' }) {
  const isLarge = variant === 'large';
  const logo = isLarge ? logoLarge : logoSmall;
  const vector = isLarge ? vectorLarge : vectorSmall;
  const macShadow = isLarge ? '0px 8.887px 12.59px 0px rgba(0,0,0,0.25)' : '0px 7.617px 10.791px 0px rgba(0,0,0,0.25)';
  const phoneShadow = isLarge ? '-7.406px 3.703px 22.217px 0px rgba(0,0,0,0.14)' : '-6.348px 3.174px 19.043px 0px rgba(0,0,0,0.14)';

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
      visual={
        <>
          <img src={vector} alt="" style={{ position: 'absolute', inset: '37.98% 5.88% 24.3% 55.8%', width: 'auto', height: 'auto' }} />
          <div style={{ position: 'absolute', inset: '23% 1.8% 12.96% 1.75%', boxShadow: macShadow, overflow: 'hidden' }}>
            <img
              src={macbookMockup}
              alt=""
              style={{ position: 'absolute', left: '-32.97%', top: '-37.91%', width: '158.28%', height: '176.07%', maxWidth: 'none' }}
            />
          </div>
          <div
            style={{ position: 'absolute', inset: '19.31% 26.51% 35.26% 47.34%', display: 'flex', alignItems: 'center', justifyContent: 'center', ...containerStyle }}
          >
            <div style={{ width: 'hypot(79.9105cqw, 5.43025cqh)', height: 'hypot(-20.0895cqw, 94.5698cqh)', transform: 'rotate(6.85deg)' } as CSSProperties}>
              <div style={{ position: 'relative', width: '100%', height: '100%', boxShadow: phoneShadow }}>
                <img src={iphoneMockup} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </>
      }
    />
  );
}
