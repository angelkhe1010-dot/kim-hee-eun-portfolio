import ProjectCardChrome from './ProjectCardChrome';
import bgLarge from '../../../assets/images/works/4-smarthome/bg-large.svg';
import bgSmall from '../../../assets/images/works/4-smarthome/bg-small.svg';
import logoLarge from '../../../assets/images/works/4-smarthome/logo-large.svg';
import logoSmall from '../../../assets/images/works/4-smarthome/logo-small.svg';
import mockup1 from '../../../assets/images/works/4-smarthome/mockup-1.png';
import mockup2 from '../../../assets/images/works/4-smarthome/mockup-2.png';
import mockup3 from '../../../assets/images/works/4-smarthome/mockup-3.png';

const meta = [
  { label: 'PERIOD', value: '2023. 07 ~ 2025. 09' },
  { label: 'Client', value: '대람' },
  { label: 'project', value: 'APP' },
  { label: 'work', value: '디자인' },
];

export default function SmartHomeCard({ variant }: { variant: 'large' | 'small' }) {
  const isLarge = variant === 'large';
  const logo = isLarge ? logoLarge : logoSmall;
  const border = isLarge ? 3.646 : 3.125;
  const shadow = isLarge ? '0px 2.917px 24.063px 0px rgba(0,0,0,0.3)' : '0px 2.5px 20.625px 0px rgba(0,0,0,0.3)';
  const size = isLarge ? { w: 196.875, h: 404.726 } : { w: 168.75, h: 346.908 };

  const items = isLarge
    ? [
        { src: mockup1, left: 25.52, top: 146.91, cover: false },
        { src: mockup2, left: 465.94, top: 146.91, cover: true },
        { src: mockup3, left: 245.73, top: 219.83, cover: false },
      ]
    : [
        { src: mockup1, left: 21.88, top: 125.92, cover: false },
        { src: mockup2, left: 399.38, top: 125.92, cover: true },
        { src: mockup3, left: 210.63, top: 188.42, cover: false },
      ];

  return (
    <ProjectCardChrome
      variant={variant}
      bg={isLarge ? bgLarge : bgSmall}
      largeAlt
      logo={<img src={logo} alt="" style={{ width: isLarge ? 145.833 : 125, height: isLarge ? 36.458 : 31.25 }} />}
      title="스마트홈 4.0 App 개발"
      desc={
        <>
          입주민 편의성과 보안을 강화한
          <br />
          아파트 원격관리 앱 서비스 개발
        </>
      }
      meta={meta}
      visual={
        <>
          {items.map((it, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: it.left,
                top: it.top,
                width: size.w,
                height: size.h,
                border: `${border}px solid #000000`,
                borderRadius: 17.5,
                boxShadow: shadow,
                overflow: 'hidden',
              }}
            >
              {it.cover ? (
                <img
                  src={it.src}
                  alt=""
                  style={{ position: 'absolute', left: '0.08%', top: 0, width: '100.01%', height: '100%' }}
                />
              ) : (
                <img src={it.src} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
            </div>
          ))}
        </>
      }
    />
  );
}
