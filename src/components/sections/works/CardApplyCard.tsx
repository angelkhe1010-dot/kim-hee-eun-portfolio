import ProjectCardChrome from './ProjectCardChrome';
import styles from './ProjectCard.module.css';
import bgFigma from '../../../assets/images/works/2-cardapply/v3-bg-figma.png';
import logo from '../../../assets/images/works/2-cardapply/mask-large.png';
import mockup from '../../../assets/images/works/2-cardapply/v3-mockup-transparent.png';
import vectorDecoration from '../../../assets/images/works/2-cardapply/v3-vector-decoration.svg';
import chevronRight from '../../../assets/images/works/chevron-right-white.svg';

const meta = [
  { label: 'PERIOD', value: '2024. 06 ~ 2025. 01' },
  { label: 'Client', value: '신한카드' },
  { label: 'project', value: 'PC / MO' },
  { label: 'work', value: '디자인' },
];

export default function CardApplyCard({ variant }: { variant: 'large' | 'small' }) {
  const isLarge = variant === 'large';

  return (
    <ProjectCardChrome
      variant={variant}
      border="solid"
      borderColor="#dde1e7"
      theme="dark"
      logo={
        <div
          role="img"
          aria-label="신한카드"
          style={{
            width: isLarge ? 96 : 82.8,
            height: isLarge ? 24 : 20.7,
            backgroundColor: '#ffffff',
            WebkitMaskImage: `url(${logo})`,
            maskImage: `url(${logo})`,
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'left center',
            maskPosition: 'left center',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
          }}
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
      /*
       * "상세보기" 캡슐 버튼 자체는 순수 시각 요소다 -- 실제 이동은
       * Works.tsx의 handleCardClick이 카드 슬롯 전체(offset===0 &&
       * id==='cardapply')에서 /works/cardapply로 처리하므로 버튼까지
       * 클릭 버블링으로 함께 동작한다. 배경/테두리 색은 이 카드 전용이라
       * 공유 클래스를 고치는 대신 인라인 스타일로 덮어써 SolPayCard의
       * detailButton에는 영향이 없다.
       */
      detailButton={
        <div
          className={styles.detailButton}
          style={{ background: '#1356f7', borderColor: '#ffffff' }}
        >
          <span className={styles.detailButtonText}>상세보기</span>
          <img src={chevronRight} alt="" className={styles.detailButtonIcon} />
        </div>
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
          {/*
           * Figma node 639:407518 "Vector" -- 노트북/휴대폰 목업 뒤에 깔리는
           * 원형(방패 모양) 장식. 목업보다 먼저 렌더링해 DOM 순서로 뒤에 오게 한다.
           */}
          <img
            src={vectorDecoration}
            alt=""
            style={{ position: 'absolute', inset: '28.66% 3.72% 35.78% 57.91%', pointerEvents: 'none' }}
          />
          <img
            src={mockup}
            alt=""
            style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: `${(464.113 / 464) * 100}%`, objectFit: 'cover' }}
          />
        </>
      }
    />
  );
}
