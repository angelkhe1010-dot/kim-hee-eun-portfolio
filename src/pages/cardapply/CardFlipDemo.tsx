import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './CardFlipDemo.module.css';
import { useSectionReveal } from './useSectionReveal';

import cardFront from '../../assets/images/cardapply/exploration/flip/card-front.png';
import cardBack from '../../assets/images/cardapply/exploration/flip/card-back.png';
import peekRight from '../../assets/images/cardapply/exploration/flip/peek-right.png';
import checkmark from '../../assets/images/cardapply/exploration/flip/checkmark.svg';
import rotateIcon from '../../assets/images/cardapply/exploration/flip/rotate-icon.svg';

/*
 * 타이밍 상수 (요청한 더 빠른 범위 안에서 고정):
 * - PRESS_DURATION: 버튼 눌림 모션 총 시간(0.14~0.18s 범위) -- 절반은
 *   눌리는 데, 절반은 복원되는 데 쓴다.
 * - ROTATE_DURATION: 카드 3D 회전 시간(0.42~0.5s 범위).
 * - AUTO_DEMO_HOLD: 트리거 후 첫 번째 전환이 시작되기까지 앞면을
 *   보여주는 시간(0.25~0.35s 범위).
 * - LOOP_HOLD: 자동 반복 중 각 면을 계속 보여주는 시간(전환이 끝난
 *   뒤 다음 전환까지의 대기) -- 이번 속도 조정 대상이 아니라 그대로
 *   유지한다.
 * 버튼 눌림과 카드 회전은 같은 이벤트 핸들러에서 동시에 시작해
 * "40ms 이내" 조건을 항상 만족시킨다.
 */
const PRESS_DURATION = 160;
const ROTATE_DURATION = 460;
const AUTO_DEMO_HOLD = 300;
const LOOP_HOLD = 1400;

export default function CardFlipDemo() {
  const { sectionRef, triggered, reducedMotion } = useSectionReveal<HTMLDivElement>();

  const [flipped, setFlipped] = useState(false);
  const [buttonLabel, setButtonLabel] = useState<'뒷면' | '앞면'>('뒷면');
  const [pressed, setPressed] = useState(false);

  const isAnimatingRef = useRef(false);
  const demoStartedRef = useRef(false);
  /*
   * 자동 반복 루프가 계속 진행 중인지. 사용자가 버튼을 직접 누르면
   * false로 내려 루프를 멈춘다 -- 시연이 사용자의 수동 조작과
   * 끝없이 다투지 않도록 한다.
   */
  const autoLoopRef = useRef(true);
  const loopTimerRef = useRef<number | null>(null);

  const flip = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    setPressed(true);
    window.setTimeout(() => setPressed(false), PRESS_DURATION / 2);

    /*
     * 버튼 눌림과 같은 틱에서 바로 카드 회전을 시작해 "버튼이 눌리는
     * 순간과 카드가 뒤집히는 순간의 차이"를 사실상 0ms로 맞춘다.
     */
    setFlipped((prev) => !prev);

    const rotateMs = reducedMotion ? 200 : ROTATE_DURATION;

    /*
     * 버튼 문구는 카드가 약 90도(회전 절반 지점) 돌아간 시점에 바꾼다
     * -- 화면이 정면에서 보이지 않는 순간이라 갑자기 바뀌는 느낌이
     * 없다. 클릭 방지(isAnimatingRef)는 회전이 완전히 끝나는
     * 시점까지 유지해야 하므로 별도 타이머로 분리한다.
     */
    window.setTimeout(() => {
      setButtonLabel((prev) => (prev === '뒷면' ? '앞면' : '뒷면'));
    }, rotateMs / 2);

    window.setTimeout(() => {
      isAnimatingRef.current = false;
    }, rotateMs);

    return rotateMs;
  }, [reducedMotion]);

  /*
   * ref에 담아두는 이유: 아래 콜백이 스스로를 다시 예약하는 재귀
   * 구조라, useCallback 초기화 중에 자기 자신의 이름을 참조하면 TDZ
   * 문제가 생긴다. ref는 이미 존재하는 객체이므로 나중에 실행되는
   * setTimeout 콜백 안에서 `.current`로 최신 함수를 안전하게 꺼내
   * 쓸 수 있다.
   */
  const scheduleNextAutoFlipRef = useRef<(rotateMs: number) => void>(() => {});

  useEffect(() => {
    scheduleNextAutoFlipRef.current = (rotateMs: number) => {
      loopTimerRef.current = window.setTimeout(() => {
        if (!autoLoopRef.current) return;
        const nextRotateMs = flip();
        scheduleNextAutoFlipRef.current(nextRotateMs ?? ROTATE_DURATION);
      }, rotateMs + LOOP_HOLD);
    };
  }, [flip]);

  /*
   * 자동 시연: 카드 모듈 자신의 중앙이 뷰포트 70% 지점에 닿는 순간
   * (useSectionReveal, 01/02 섹션과 동일 로직) 잠시 앞면을 보여준 뒤
   * 뒤집고, 이후 사용자가 직접 조작하기 전까지 앞/뒤를 무한 반복한다.
   * reduced motion에서는 자동 시연 자체를 생략하고 앞면 상태로 고정한다.
   */
  useEffect(() => {
    if (!triggered || reducedMotion || demoStartedRef.current) return;
    demoStartedRef.current = true;

    const timer = window.setTimeout(() => {
      const rotateMs = flip();
      scheduleNextAutoFlipRef.current(rotateMs ?? ROTATE_DURATION);
    }, AUTO_DEMO_HOLD);

    return () => window.clearTimeout(timer);
  }, [triggered, reducedMotion, flip]);

  useEffect(
    () => () => {
      if (loopTimerRef.current) window.clearTimeout(loopTimerRef.current);
    },
    [],
  );

  const handleManualClick = () => {
    autoLoopRef.current = false;
    if (loopTimerRef.current) {
      window.clearTimeout(loopTimerRef.current);
      loopTimerRef.current = null;
    }
    flip();
  };

  return (
    <div className={styles.module} ref={sectionRef}>
      <img src={checkmark} alt="" className={styles.checkmark} />

      <img src={peekRight} alt="" className={styles.peek} />

      <div className={`${styles.flipOuter} ${reducedMotion ? styles.reduced : ''}`}>
        <div className={`${styles.flipInner} ${flipped ? styles.flipped : ''}`}>
          <div
            className={styles.face}
            style={reducedMotion ? { opacity: flipped ? 0 : 1 } : undefined}
          >
            <img src={cardFront} alt="신한카드 처음 카드 앞면" className={styles.faceImg} />
          </div>
          <div
            className={`${styles.face} ${styles.back}`}
            style={reducedMotion ? { opacity: flipped ? 1 : 0 } : undefined}
          >
            <img src={cardBack} alt="신한카드 처음 카드 뒷면" className={styles.faceImg} />
          </div>
        </div>
      </div>

      <p className={styles.name}>신한카드 처음</p>

      <button
        type="button"
        className={`${styles.button} ${pressed ? styles.pressed : ''}`}
        onClick={handleManualClick}
        aria-label={`카드 ${buttonLabel} 보기`}
      >
        <img src={rotateIcon} alt="" className={styles.buttonIcon} />
        <span className={styles.buttonText}>{buttonLabel}</span>
      </button>
    </div>
  );
}
