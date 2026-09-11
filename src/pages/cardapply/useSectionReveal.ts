import { useEffect, useRef, useState } from 'react';

/*
 * 카드신청 상세페이지의 스크롤 등장 인터랙션 섹션들이 공유하는 트리거
 * 훅(01 USER PAIN POINTS에서 처음 쓴 로직을 그대로 옮김). 섹션의 세로
 * 중앙이 뷰포트 높이의 70% 지점까지 올라온 순간 한 번만 true가 된다.
 * IntersectionObserver의 threshold/rootMargin 버킷으로 근사하는 대신
 * getBoundingClientRect로 직접 계산해 시작 지점을 정확히 맞춘다.
 *
 * - 조건을 만족하는 순간부터 다시 false로 되돌리지 않는다(페이지 방문 중
 *   최초 1회만 실행, 새로고침해야 재실행).
 * - prefers-reduced-motion 사용자는 트리거를 기다리지 않고 즉시 true.
 */
export function useSectionReveal<T extends HTMLElement = HTMLElement>() {
  const sectionRef = useRef<T>(null);

  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const [triggered, setTriggered] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const shouldReveal = () => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      return sectionCenter <= window.innerHeight * 0.7;
    };

    if (shouldReveal()) {
      setTriggered(true);
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        ticking = false;

        if (shouldReveal()) {
          setTriggered(true);
          window.removeEventListener('scroll', handleScroll);
          window.removeEventListener('resize', handleScroll);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return { sectionRef, triggered, reducedMotion };
}
