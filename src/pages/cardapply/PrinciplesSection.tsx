import styles from './PrinciplesSection.module.css';
import SectionHeading from './SectionHeading';
import { useSectionReveal } from './useSectionReveal';
import arrowDown from '../../assets/images/cardapply/principles/arrow-down.svg';

const pairs = [
  {
    problem: (
      <>
        반복되는 입력과 불필요한 절차로
        <br />
        신청 과정이 길고 복잡해요
      </>
    ),
    badge: 'Simple',
    solution: (
      <>
        불필요한 입력과 동작을 줄여
        <br />
        신청 과정 간소화
      </>
    ),
  },
  {
    problem: (
      <>
        어려운 금융 용어와 복잡한 안내로
        <br />
        정보를 이해하기 어려워요
      </>
    ),
    badge: 'Clear',
    solution: (
      <>
        쉬운 용어와 명확한 단계 안내로
        <br />
        정보 이해도 향상
      </>
    ),
  },
  {
    problem: (
      <>
        작은 글씨와 조작 영역으로
        <br />
        이용에 어려움이 있어요
      </>
    ),
    badge: 'Accessible',
    solution: (
      <>
        <span className={styles.solutionLine}>큰글씨 모드와 충분한 조작 영역으로</span>
        <span className={styles.solutionLine}>전 연령대의 접근성 강화</span>
      </>
    ),
  },
  {
    problem: (
      <>
        화면마다 다른 입력 방식으로
        <br />
        사용 흐름이 일관되지 않아요
      </>
    ),
    badge: 'Consistent',
    solution: (
      <>
        <span className={styles.solutionLine}>카드신청 전용 UI 컴포넌트와 가이드로</span>
        <span className={styles.solutionLine}>일관된 사용 경험 구축</span>
      </>
    ),
  },
];

/*
 * 열(column) 하나 안에서: 화살표 등장 -> ARROW_TO_MODULE_GAP 뒤 흰색
 * 모듈 등장. 다음 열은 이전 열의 흰색 모듈이 "시작된" 시점 기준
 * COLUMN_GAP 뒤에 시작한다. 네 열을 모두 이 값으로 이어 붙이면
 * 전체 인터랙션이 약 2.1~2.2초 안에 끝나 "너무 빠르지도, 3초를 넘기지도
 * 않는" 범위에 들어온다.
 */
const ARROW_TO_MODULE_GAP = 0.2;
const COLUMN_GAP = 0.25;

function columnStartDelay(colIndex: number) {
  return colIndex * (ARROW_TO_MODULE_GAP + COLUMN_GAP);
}

export default function PrinciplesSection() {
  const { sectionRef, triggered } = useSectionReveal<HTMLElement>();

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        <SectionHeading
          eyebrow="02 DESIGN PRINCIPLES"
          title={
            <>
              복잡한 카드 신청을
              <br />
              쉽고 명확하게
            </>
          }
          desc={
            <>
              사용자가 필요한 정보를 빠르게 이해하고,
              <br />
              신청 과정에서 다음 행동을 자연스럽게 선택할 수 있도록 네 가지 설계 원칙을 세웠습니다.
            </>
          }
        />

        <div className={styles.rows}>
          {/* 검은색 문제 모듈 4개는 애니메이션 없이 항상 그대로 표시 */}
          <div className={styles.problems}>
            {pairs.map((pair, i) => {
              const arrowDelay = columnStartDelay(i);

              return (
                <div className={styles.problemCol} key={i}>
                  <div className={styles.problemCard}>
                    <p className={styles.problemText}>{pair.problem}</p>
                  </div>
                  <img
                    src={arrowDown}
                    alt=""
                    className={`${styles.arrow} ${triggered ? styles.visible : ''}`}
                    style={{ transitionDelay: triggered ? `${arrowDelay}s` : undefined }}
                  />
                </div>
              );
            })}
          </div>

          <div className={styles.solutions}>
            {pairs.map((pair, i) => {
              const moduleDelay = columnStartDelay(i) + ARROW_TO_MODULE_GAP;

              return (
                <div
                  className={`${styles.solutionCard} ${triggered ? styles.visible : ''}`}
                  style={{ transitionDelay: triggered ? `${moduleDelay}s` : undefined }}
                  key={i}
                >
                  <span className={styles.solutionBadge}>
                    <span className={styles.solutionBadgeText}>{pair.badge}</span>
                  </span>
                  <p className={styles.solutionText}>{pair.solution}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
