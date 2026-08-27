import ProjectCardChrome from './ProjectCardChrome';
import bgFigma from '../../../assets/images/works/5-d2t/v2-bg-figma.png';
import screenshot1 from '../../../assets/images/works/5-d2t/v2-screenshot1.png';
import screenshot2 from '../../../assets/images/works/5-d2t/v2-screenshot2.png';

const meta = [
  { label: 'PERIOD', value: '2025. 02 ~ 2025. 05' },
  { label: 'Client', value: '데이터투테크놀로지' },
  { label: 'project', value: 'PC' },
  { label: 'work', value: '디자인' },
];

function pct(px: number, base: number) {
  return `${(px / base) * 100}%`;
}

export default function D2tCard({ variant }: { variant: 'large' | 'small' }) {
  const isLarge = variant === 'large';

  return (
    <ProjectCardChrome
      variant={variant}
      border="none"
      theme="dark"
      logo={
        <div style={{ height: isLarge ? 24 : 20.7, display: 'flex', alignItems: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-pretendard)',
              fontWeight: 600,
              fontSize: isLarge ? 12.706 : 10.959,
              lineHeight: 1.4,
              color: '#ffffff',
              margin: 0,
              whiteSpace: 'nowrap',
            }}
          >
            Data2Technology
          </p>
        </div>
      }
      title={
        <>
          기업용 IT 비지니스
          <br />
          자동차 플랫폼 리뉴얼
        </>
      }
      desc={
        <>
          기업의 IT 비즈니스 운영을 지원하는
          <br />
          자동화 플랫폼의 사용성과 정보 구조를 개선하고,
          <br />
          직관적인 업무 환경으로 리뉴얼한 프로젝트
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
              left: pct(21.42, 430),
              top: pct(116, 464),
              width: pct(260, 430),
              height: pct(146, 464),
              border: '1px solid rgba(255,255,255,0.8)',
              borderRadius: 8,
              boxShadow: '0px 4px 13px 0px rgba(0,0,0,0.3)',
              overflow: 'hidden',
            }}
          >
            <img src={screenshot1} alt="" style={{ position: 'absolute', left: '-0.07%', top: 0, width: '100.15%', height: '100%' }} />
          </div>
          <div
            style={{
              position: 'absolute',
              left: pct(142.42, 430),
              top: pct(236, 464),
              width: pct(260, 430),
              height: pct(146, 464),
              border: '1px solid rgba(255,255,255,0.8)',
              borderRadius: 8,
              boxShadow: '0px 4px 14px 0px rgba(0,0,0,0.3)',
              overflow: 'hidden',
            }}
          >
            <img src={screenshot2} alt="" style={{ position: 'absolute', left: '-0.07%', top: 0, width: '100.15%', height: '100%' }} />
          </div>
        </>
      }
    />
  );
}
