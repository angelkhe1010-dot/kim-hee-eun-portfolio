import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import styles from './DiscoverySection.module.css';

import sectionBg from '../../assets/images/solpay/discovery/section-bg.jpg';
import contentContinuation from '../../assets/images/solpay/discovery/phone-content-continuation.jpg';
import phoneViewport from '../../assets/images/solpay/discovery/phone-viewport.png';
import eventFinder from '../../assets/images/solpay/discovery/event-finder.png';
import promo from '../../assets/images/solpay/discovery/promo.png';
import promoTooltip from '../../assets/images/solpay/discovery/promo-tooltip.png';
import connector from '../../assets/images/solpay/discovery/connector.svg';

type RevealStyle = CSSProperties & { '--reveal-delay': string };
type TooltipStyle = CSSProperties & { '--tooltip-bob-delay': string };

const GROUP_DELAY_MS = 300;
const GROUP_DURATION_MS = 700;
/*
 * '당겨보세요' 툴팁의 반복 모션은 프로모션 그룹이 완전히 등장한
 * 뒤에 시작해야 한다(요구사항). 프로모션 그룹의 등장 딜레이(그룹
 * 3번째 = 2 * GROUP_DELAY_MS) + 등장 애니메이션 자체 길이만큼
 * 늦춰서 시작한다.
 */
const TOOLTIP_BOB_DELAY_MS = 2 * GROUP_DELAY_MS + GROUP_DURATION_MS;

export default function DiscoverySection() {
  const sectionRef = useRef<HTMLElement>(null);

  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [visible, setVisible] = useState(reducedMotion);

  /*
   * 개별 이미지가 아니라 섹션 전체를 기준으로, 섹션 상단이 뷰포트의
   * 약 65~70% 지점을 넘어서면 바로 재생한다(04 INTERACTION EXPERIENCE
   * 섹션과 동일한 트리거 방식). rootMargin 하단 -30%가 트리거 판정
   * 영역을 뷰포트 상단 70%로 좁혀서, threshold 0.1과 합쳐지면 섹션
   * 상단이 그 지점을 막 넘어서는 시점에 살짝 이르게 발동한다.
   */
  useEffect(() => {
    if (reducedMotion) return;

    const el = sectionRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.7) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -30% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  const sectionClassName = [styles.section, visible ? styles.visible : '']
    .filter(Boolean)
    .join(' ');

  return (
    <section className={sectionClassName} data-section="discovery" ref={sectionRef}>
      {/*
        Figma 프레임(node 516:332783, 1920x1700) 원점을 그대로 기준
        좌표계로 쓰는 캔버스. bg 이미지(node 521:336588 export)와
        모든 자식 요소가 동일한 vw(px) 좌표계를 공유해야 배경의
        그라디언트/블롭과 카드 그림자의 배경 번짐이 어긋나지 않는다.
      */}
      <div className={styles.canvas}>
        <img src={sectionBg} alt="" className={styles.bg} draggable={false} />

        <div className={styles.titleBlock}>
          <p className={styles.eyebrow}>05 CONTENT EXPERIENCE</p>
          <div className={styles.titleGroup}>
            <h2 className={styles.title}>
              혜택을 찾는 과정도
              <br />
              하나의 경험이 되도록
            </h2>
            <p className={styles.subtitle}>
              긴 화면에서도 콘텐츠가 단조롭게 반복되지 않도록
              <br />
              정보의 성격에 따라 서로 다른 UI 모듈을 구성했습니다.
            </p>
          </div>
        </div>

        {/*
          휴대폰은 Figma 노드를 실제로 열어 두 개의 서로 다른 노드에서
          직접 export한 2개 레이어로 구성한다(더 이상 하나의 통짜
          스크린샷을 임의로 잘라 쓰지 않는다):
          1) contentContinuation -- node 516:332800("Frame 2147239735",
             베젤/헤더/하단내비 없이 실제 스크롤 콘텐츠만 있는 순수
             화면). 베젤이 끝나는 지점 아래로 프레임 없이 자연스럽게
             이어져 나오다 하단에서 배경색으로 페이드아웃돼야 하므로,
             테두리나 둥근 모서리가 전혀 없는 이 노드를 그대로 써야
             한다.
          2) phoneViewport -- node 516:332892("Frame 2147239736").
             베젤 링 + 상단 헤더 + 초기 스크롤 상태 콘텐츠 + 하단
             내비게이션까지 Figma가 이미 합성해 둔 완성된 "정지 상태"
             화면 통짜 이미지. 기기처럼 보여야 하는 부분(둥근 모서리
             검은 프레임)은 오직 이 레이어에만 존재하고, 그 아래
             contentContinuation의 같은 구간을 정확히 덮어 가린다.
          두 레이어 모두 phoneStage 하나를 기준으로 %로 배치해서,
          데스크톱 vw()든 모바일 고정 px든 phoneStage의 너비만 바뀌면
          함께 같은 비율로 스케일된다. 쌓임 순서(contentContinuation
          아래, phoneViewport 위, dailyPointCard 카드 그룹은 그보다도
          위)는 CSS의 .phoneStage/.groupDaily z-index에서 처리한다.
        */}
        <div className={styles.phoneStage}>
          <img
            src={contentContinuation}
            alt="SOL Pay 혜택 화면 스크롤 콘텐츠"
            className={styles.contentContinuation}
            draggable={false}
          />
          <img
            src={phoneViewport}
            alt=""
            className={styles.phoneViewport}
            draggable={false}
          />
        </div>

        <div
          className={`${styles.group} ${styles.groupDaily} ${styles.reveal}`}
          style={{ '--reveal-delay': '0ms' } as RevealStyle}
        >
          {/*
            node 516:333026 -- 아이콘 없이 텍스트 2줄만 있는 카드라
            이미지로 뽑지 않고 실제 배경색(bg-white)+shadow를 그대로
            CSS로 재현했다. 예전 PNG는 카드의 흰 배경까지 함께
            크로마키로 지워져 투명하게 비치는 문제가 있었다.
          */}
          <div className={styles.dailyPointCard}>
            <p className={styles.dailyPointBadge}>지금 2만 4,000명이 참여 중</p>
            <p className={styles.dailyPointTitle}>SOL쏠하게 모이는 데일리 포인트</p>
          </div>
          <div className={styles.captionDaily}>
            <p className={styles.captionTitle}>참여감을 높이는 실시간 정보</p>
            <p className={styles.captionDesc}>
              현재 참여 현황을 상단에 강조해
              <br />
              사용자가 서비스의 활성도를 직관적으로 인지하도록 했습니다.
            </p>
          </div>
        </div>

        <div
          className={`${styles.group} ${styles.groupEvent} ${styles.reveal}`}
          style={{ '--reveal-delay': `${1 * GROUP_DELAY_MS}ms` } as RevealStyle}
        >
          <img
            src={eventFinder}
            alt="내게 맞는 이벤트 찾아보기 UI"
            className={styles.eventFinderImg}
            draggable={false}
          />
          {/* node 516:332889 -- 이벤트 카드와 휴대폰을 잇는 점선 커넥터 */}
          <img src={connector} alt="" className={styles.connectorEvent} draggable={false} />
          <div className={styles.captionEvent}>
            <p className={styles.captionTitle}>한눈에 확인하는 인기 혜택</p>
            <p className={styles.captionDesc}>
              인기 순위를 활용해 사용자의 관심을 유도하고,
              <br />
              순위 아이콘으로 시각적 위계를 명확히 구성해
              <br />
              핵심 혜택을 빠르게 인지할 수 있도록 디자인했습니다.
            </p>
          </div>
        </div>

        <div
          className={`${styles.group} ${styles.groupPromo} ${styles.reveal}`}
          style={{ '--reveal-delay': `${2 * GROUP_DELAY_MS}ms` } as RevealStyle}
        >
          <img
            src={promo}
            alt="제주 리조트 패키지 프로모션 UI"
            className={styles.promoImg}
            draggable={false}
          />
          {/* node 516:332796 -- 휴대폰과 프로모션 카드를 잇는 점선 커넥터 */}
          <img src={connector} alt="" className={styles.connectorPromo} draggable={false} />
          <img
            src={promoTooltip}
            alt="당겨보세요"
            className={`${styles.promoTooltipImg} ${visible ? styles.tooltipBob : ''}`}
            style={{ '--tooltip-bob-delay': `${TOOLTIP_BOB_DELAY_MS}ms` } as TooltipStyle}
            draggable={false}
          />
          <div className={styles.captionPromo}>
            <p className={styles.captionTitle}>화면에 변화를 주는 프로모션 UI</p>
            <p className={styles.captionDesc}>
              반복되는 리스트 사이에 크기와 형태가 다른 UI를 활용해
              <br />
              시각적 리듬을 만들고,
              <br />
              프로모션 콘텐츠가 자연스럽게 주목되도록 구성했습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
