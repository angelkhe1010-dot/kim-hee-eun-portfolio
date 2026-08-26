import styles from './Works.module.css';
import chevronLeft from '../../assets/images/works/chevron-left.svg';
import SmartHomeCard from './works/SmartHomeCard';
import SolPayCard from './works/SolPayCard';
import BfmCard from './works/BfmCard';

/*
 * Figma의 캐러셀 트랙(폭 7324px, 7개 인스턴스 = 프로젝트 6개 + 루프용 복제 1개)을
 * 그대로 드래그 가능한 캐러셀로 만드는 작업은 다음 단계(인터랙션 구현)에서 진행한다.
 * 이번 1차 구현에서는 Figma 정적 프레임에 실제로 보이는 초기 상태만 그대로 재현한다:
 * 트랙 오프셋(-1246px) 기준으로 계산했을 때 페이지(1920px) 안에 실제로 보이는 카드는
 * - 왼쪽: 스마트홈 4.0 카드(작은 상태)의 오른쪽 214px만 살짝 보임
 * - 가운데: SOL페이 카드(큰 상태) 전체
 * - 오른쪽: BFM 마이샵 카드(작은 상태)의 왼쪽 214px만 살짝 보임
 * 나머지 3개 프로젝트(카드신청/Data2Technology/헤이비글)는 이 정적 뷰에서는 화면 밖에 있다.
 */

export default function Works() {
  return (
    <section className={styles.works} id="works">
      <div className={styles.titleBlock}>
        <p className={styles.titleHeading}>Selected Works</p>
        <p className={styles.titleSub}>06 Projects · 2023 - 2026</p>
      </div>

      <div className={styles.track}>
        <div className={styles.cardSlot} style={{ left: -986, top: 50 }}>
          <SmartHomeCard variant="small" />
        </div>
        <div className={styles.cardSlot} style={{ left: 260, top: 0 }}>
          <SolPayCard variant="large" />
        </div>
        <div className={styles.cardSlot} style={{ left: 1706, top: 50 }}>
          <BfmCard variant="small" />
        </div>
      </div>

      <div className={styles.pagination}>
        <button type="button" className={styles.iconButton} aria-label="이전 프로젝트">
          <img src={chevronLeft} alt="" className={styles.chevron} />
        </button>
        <span className={`${styles.pageNum} ${styles.pageNumActive}`}>02</span>
        <span className={styles.pageDash}>-</span>
        <span className={`${styles.pageNum} ${styles.pageNumMuted}`}>06</span>
        <button type="button" className={styles.iconButton} aria-label="다음 프로젝트">
          <img src={chevronLeft} alt="" className={`${styles.chevron} ${styles.chevronRight}`} />
        </button>
      </div>
    </section>
  );
}
