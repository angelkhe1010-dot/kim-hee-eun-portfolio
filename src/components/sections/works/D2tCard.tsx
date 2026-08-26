import ProjectCardChrome from './ProjectCardChrome';
import bgLarge from '../../../assets/images/works/5-d2t/bg-large.svg';
import bgSmall from '../../../assets/images/works/5-d2t/bg-small.svg';
import badgeIconLarge from '../../../assets/images/works/5-d2t/badge-icon-large.svg';
import badgeTxtLarge from '../../../assets/images/works/5-d2t/badge-txt-large.svg';
import badgeOutlineLarge from '../../../assets/images/works/5-d2t/badge-outline-large.svg';
import badgeIcon2Large from '../../../assets/images/works/5-d2t/badge-icon2-large.svg';
import badgeIcon3Large from '../../../assets/images/works/5-d2t/badge-icon3-large.svg';
import badgeIcon5Large from '../../../assets/images/works/5-d2t/badge-icon5-large.svg';
import badgeIconSmall from '../../../assets/images/works/5-d2t/badge-icon-small.svg';
import badgeTxtSmall from '../../../assets/images/works/5-d2t/badge-txt-small.svg';
import badgeOutlineSmall from '../../../assets/images/works/5-d2t/badge-outline-small.svg';
import badgeIcon2Small from '../../../assets/images/works/5-d2t/badge-icon2-small.svg';
import badgeIcon3Small from '../../../assets/images/works/5-d2t/badge-icon3-small.svg';
import badgeIcon5Small from '../../../assets/images/works/5-d2t/badge-icon5-small.svg';
import screenshot1 from '../../../assets/images/works/5-d2t/screenshot-1.png';
import screenshot2 from '../../../assets/images/works/5-d2t/screenshot-2.png';

const meta = [
  { label: 'PERIOD', value: '2025. 02 ~ 2025. 05' },
  { label: 'Client', value: '데이터투테크놀로지' },
  { label: 'project', value: 'PC' },
  { label: 'work', value: '디자인' },
];

const ACCENT = '#6f779c';

function Badge({
  left,
  top,
  size,
  opacity,
  border,
  icon,
  iconW,
  iconH,
}: {
  left: number;
  top: number;
  size: number;
  opacity: number;
  border: number;
  icon?: string;
  iconW?: number;
  iconH?: number;
}) {
  return (
    <div style={{ position: 'absolute', left, top, width: size, height: size, opacity, borderRadius: size * 0.107 }}>
      <div style={{ position: 'absolute', inset: 0, border: `${border}px solid ${ACCENT}`, borderRadius: size * 0.108 }} />
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: size,
          height: size * 0.321,
          border: `${border}px solid ${ACCENT}`,
          borderTopLeftRadius: size * 0.108,
          borderTopRightRadius: size * 0.108,
          borderBottom: 'none',
        }}
      />
      {icon && (
        <img
          src={icon}
          alt=""
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: iconW,
            height: iconH,
          }}
        />
      )}
    </div>
  );
}

export default function D2tCard({ variant }: { variant: 'large' | 'small' }) {
  const isLarge = variant === 'large';
  const s = isLarge ? 1 : 0.857;
  const badgeIcon = isLarge ? badgeIconLarge : badgeIconSmall;
  const badgeTxt = isLarge ? badgeTxtLarge : badgeTxtSmall;
  const badgeOutline = isLarge ? badgeOutlineLarge : badgeOutlineSmall;
  const badgeIcon2 = isLarge ? badgeIcon2Large : badgeIcon2Small;
  const badgeIcon3 = isLarge ? badgeIcon3Large : badgeIcon3Small;
  const badgeIcon5 = isLarge ? badgeIcon5Large : badgeIcon5Small;

  const screenShadow = isLarge ? '0px 2.915px 21.864px 0px rgba(0,0,0,0.25)' : '0px 2.499px 18.741px 0px rgba(0,0,0,0.25)';
  const screenBorder = isLarge ? 2.915 : 2.499;
  const screenRadius = 11.661;
  const screenSize = isLarge ? { w: 437.288, h: 246.339 } : { w: 374.818, h: 211.148 };
  const shot1 = isLarge ? { left: 23.32, top: 155.74 } : { left: 19.99, top: 133.49 };
  const shot2 = isLarge ? { left: 227.39, top: 358.35 } : { left: 194.91, top: 307.16 };

  const badgeSize = 54.968 * s;
  const border = 0.982 * s;

  return (
    <ProjectCardChrome
      variant={variant}
      bg={isLarge ? bgLarge : bgSmall}
      logo={
        <div style={{ height: isLarge ? 36.458 : 31.25, display: 'flex', alignItems: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-pretendard)',
              fontWeight: 600,
              fontSize: isLarge ? 19.301 : 16.54,
              lineHeight: 1.4,
              color: '#121212',
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
          <div
            style={{
              position: 'absolute',
              left: shot1.left,
              top: shot1.top,
              width: screenSize.w,
              height: screenSize.h,
              border: `${screenBorder}px solid #000000`,
              borderRadius: screenRadius,
              boxShadow: screenShadow,
              overflow: 'hidden',
            }}
          >
            <img src={screenshot1} alt="" style={{ position: 'absolute', left: '-0.07%', top: 0, width: '100.15%', height: '100%' }} />
          </div>
          <div
            style={{
              position: 'absolute',
              left: shot2.left,
              top: shot2.top,
              width: screenSize.w,
              height: screenSize.h,
              border: `${screenBorder}px solid #000000`,
              borderRadius: screenRadius,
              boxShadow: screenShadow,
              overflow: 'hidden',
            }}
          >
            <img src={screenshot2} alt="" style={{ position: 'absolute', left: '-0.07%', top: 0, width: '100.15%', height: '100%' }} />
          </div>

          <Badge left={86 * s} top={486.67 * s} size={badgeSize} opacity={0.09} border={border} icon={badgeIcon} iconW={19.631 * s} iconH={19.631 * s + 6.592 * s} />
          <img src={badgeTxt} alt="" style={{ position: 'absolute', left: 86 * s + badgeSize * 0.35, top: 486.67 * s + badgeSize * 0.62, width: 13.742 * s, height: 6.592 * s, opacity: 0.09 }} />
          <img
            src={badgeOutline}
            alt=""
            style={{ position: 'absolute', left: 327.97 * s, top: 614.21 * s, width: badgeSize, height: badgeSize, opacity: 0.15 }}
          />
          <Badge left={580.06 * s} top={252.67 * s} size={badgeSize} opacity={0.25} border={border} icon={badgeIcon2} iconW={19.631 * s} iconH={19.631 * s} />
          <Badge left={393.56 * s} top={115.65 * s} size={badgeSize} opacity={0.25} border={border} icon={badgeIcon3} iconW={16.687 * s} iconH={18.65 * s} />

          <div
            style={{
              position: 'absolute',
              left: 480.92 * s + 7.04 * s,
              top: 307.37 * s + 7.04 * s,
              width: 49.735 * s,
              height: 49.735 * s,
              border: `${border}px solid ${ACCENT}`,
              borderRadius: 7.853 * s,
              transform: 'rotate(-45deg)',
              opacity: 0.28,
            }}
          />
          <img
            src={badgeIcon5}
            alt=""
            style={{
              position: 'absolute',
              left: 480.92 * s + 32.39 * s,
              top: 307.37 * s + 31.9 * s,
              width: 17.668 * s,
              height: 18.65 * s,
              opacity: 0.28,
            }}
          />
        </>
      }
    />
  );
}
