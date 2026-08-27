import ProjectCardChrome from './ProjectCardChrome';
import logo from '../../../assets/images/works/4-smarthome/v2-logo.svg';
import mockup from '../../../assets/images/works/4-smarthome/v2-mockup.png';

const meta = [
  { label: 'PERIOD', value: '2023. 07 ~ 2025. 09' },
  { label: 'Client', value: '대림' },
  { label: 'project', value: 'APP' },
  { label: 'work', value: '디자인' },
];

export default function SmartHomeCard({ variant }: { variant: 'large' | 'small' }) {
  const isLarge = variant === 'large';

  return (
    <ProjectCardChrome
      variant={variant}
      border="gradient"
      theme="light"
      logo={
        <div style={{ position: 'relative', width: isLarge ? 96 : 82.8, height: isLarge ? 24 : 20.7, overflow: 'hidden' }}>
          <img
            src={logo}
            alt="대림"
            style={{
              position: 'absolute',
              left: isLarge ? 2.67 : 2.303,
              top: '50%',
              transform: 'translateY(-50%)',
              width: isLarge ? 80.168 : 69.145,
              height: isLarge ? 10.667 : 9.2,
            }}
          />
        </div>
      }
      title="스마트홈 4.0 App 개발"
      desc={
        <>
          입주민 편의성과 보안을 강화한
          <br />
          아파트 원격관리 앱 서비스 개발
        </>
      }
      meta={meta}
      extra={
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(138.12deg, #ffffff 18.445%, #fff4f3 45.549%, #f1e6e5 72.653%)',
            }}
          />
        </div>
      }
      visual={
        <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
          <img
            src={mockup}
            alt=""
            style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: `${(743.156 / 464) * 100}%`, objectFit: 'cover' }}
          />
        </div>
      }
    />
  );
}
