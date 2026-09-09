import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import styles from './NavigationSection.module.css';
import { vw } from './vw';

import phone1 from '../../assets/images/solpay/navigation/phone-1.png';
import phone2 from '../../assets/images/solpay/navigation/phone-2.png';
import phone3 from '../../assets/images/solpay/navigation/phone-3.png';
import iconApptech from '../../assets/images/solpay/navigation/icon-apptech.png';
import iconEvent from '../../assets/images/solpay/navigation/icon-event.png';
import iconCoupon from '../../assets/images/solpay/navigation/icon-coupon.png';

/*
 * `--reveal-index`는 이 모듈 CSS의 순차 노출 애니메이션이 읽는 커스텀
 * 프로퍼티(단계별 delay 계산용). CSSProperties가 커스텀 프로퍼티를
 * 모르기 때문에 인라인 style 타입체크를 통과시키려고 확장한다
 * (AsIsSection.tsx의 MockupStyle과 동일 패턴).
 */
type RevealStyle = CSSProperties & { '--reveal-index': number };
type PhoneStyle = RevealStyle & { '--phone-w': string; '--phone-w-mobile': string };

const quickMenu = [
  { icon: iconApptech, label: '앱테크' },
  { icon: iconEvent, label: '이벤트' },
  { icon: iconCoupon, label: '쿠폰' },
];

/*
 * designWidth는 각 phone PNG를 Figma 프레임(340px, 1920px 기준) 폭에
 * 맞춰 렌더링할 너비다. phone-3는 Figma 캔버스 자체에서 이미 섹션
 * 오른쪽 경계에 잘린 채로 export되어(876px vs phone-1/2의 1122px,
 * 원본 비율 340:720 대비 실측) 그 잘린 비율(876/1122)만큼 좁게
 * 렌더링해야 나머지 두 폰과 동일한 배율로 보인다.
 */
const phones = [
  { src: phone1, alt: 'SOL Pay 이벤트 메인화면', designWidth: 340 },
  { src: phone2, alt: 'SOL Pay 할인·쿠폰 메인화면', designWidth: 340 },
  { src: phone3, alt: 'SOL Pay 앱테크 메인화면', designWidth: (340 * 876) / 1122 },
];

/*
 * 시선 흐름 순서(라벨 -> 제목 -> 본문 -> 퀵메뉴 3개 -> 퀵메뉴 설명 ->
 * 커넥터 -> 휴대폰 3개, 총 11단계) 그대로 --reveal-index로 매겨
 * animation-delay를 계산한다. .section.visible이 붙기 전까지는
 * .reveal 자체의 기본 상태(opacity:0, translateY)가 유지되고, 붙는
 * 순간 각자의 delay만큼 기다렸다가 한 번만 재생된다.
 */
const REVEAL_INDEX = {
  eyebrow: 0,
  title: 1,
  subtitle: 2,
  quickMenu: [3, 4, 5],
  quickMenuText: 6,
  connector: 7,
  phones: [8, 9, 10],
};

export default function NavigationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [visible, setVisible] = useState(reducedMotion);

  useEffect(() => {
    if (visible) return;

    const el = sectionRef.current;
    if (!el) return;

    /*
     * 새로고침 시 이미 섹션이 뷰포트에 상당 부분 들어와 있는 상태라면
     * IntersectionObserver의 비동기 초기 콜백을 기다리지 않고 마운트
     * 시점에 동기적으로 한 번 더 확인해 바로 실행한다.
     */
    const rect = el.getBoundingClientRect();
    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    const visibleRatio = rect.height > 0 ? visibleHeight / rect.height : 0;
    if (visibleRatio >= 0.3) {
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
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  const sectionClassName = [styles.section, visible ? styles.visible : '']
    .filter(Boolean)
    .join(' ');

  return (
    <section className={sectionClassName} data-section="navigation" ref={sectionRef}>
      <div className={styles.textBlock}>
        <p
          className={`${styles.eyebrow} ${styles.reveal}`}
          style={{ '--reveal-index': REVEAL_INDEX.eyebrow } as RevealStyle}
        >
          06 NAVIGATION EXPERIENCE
        </p>
        <h2
          className={`${styles.title} ${styles.reveal}`}
          style={{ '--reveal-index': REVEAL_INDEX.title } as RevealStyle}
        >
          원하는 혜택으로
          <br />
          더 빠르게 이동하도록
        </h2>
        <p
          className={`${styles.subtitle} ${styles.reveal}`}
          style={{ '--reveal-index': REVEAL_INDEX.subtitle } as RevealStyle}
        >
          기존에는 유형별 탭을 이동하며 콘텐츠를 확인해야 했던 구조에서,
          <br />
          다양한 혜택을 한 화면에서 이어서 볼 수 있는 구조로 개선했습니다.
        </p>

        <div className={styles.quickMenuBlock}>
          <div className={styles.quickMenuIconRow}>
            {quickMenu.map((item, index) => (
              <div
                className={`${styles.quickMenuItem} ${styles.reveal}`}
                key={item.label}
                style={{ '--reveal-index': REVEAL_INDEX.quickMenu[index] } as RevealStyle}
              >
                <img src={item.icon} alt="" className={styles.quickMenuIcon} />
                <span className={styles.quickMenuLabel}>{item.label}</span>
              </div>
            ))}
          </div>

          <div
            className={`${styles.quickMenuText} ${styles.reveal}`}
            style={{ '--reveal-index': REVEAL_INDEX.quickMenuText } as RevealStyle}
          >
            <p className={styles.quickMenuTitle}>주요 카테고리로 바로 이동</p>
            <p className={styles.quickMenuDesc}>
              앱테크 · 이벤트 · 쿠폰을 아이콘과 라벨로 구성한 퀵 메뉴로 제공하여,
              <br />
              하나의 페이지에서 콘텐츠를 이어서 확인하면서도 원하는 카테고리로 빠르게 이동할 수
              있도록 했습니다.
            </p>
          </div>
        </div>
      </div>

      <div
        className={`${styles.connector} ${styles.reveal}`}
        aria-hidden="true"
        style={{ '--reveal-index': REVEAL_INDEX.connector } as RevealStyle}
      >
        <span className={styles.connectorDot} />
        <span className={styles.connectorLine} />
      </div>

      <div className={styles.phonesArea}>
        {phones.map((phone, index) => (
          <div
            key={index}
            className={`${styles.phoneFrame} ${styles.reveal} ${styles.revealPhone}`}
            style={
              {
                left: vw(index * 378),
                '--reveal-index': REVEAL_INDEX.phones[index],
                '--phone-w': vw(phone.designWidth),
                '--phone-w-mobile': `${(240 * phone.designWidth) / 340}px`,
              } as PhoneStyle
            }
          >
            <img src={phone.src} alt={phone.alt} className={styles.phoneImg} draggable={false} />
          </div>
        ))}
      </div>
    </section>
  );
}
