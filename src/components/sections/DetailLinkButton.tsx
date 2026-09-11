import { Link } from 'react-router-dom';

import styles from './DetailLinkButton.module.css';

import arrow from '../../assets/images/detail/arrow.svg';

type DetailLinkButtonProps = {
  to: string;
  label: string;
  /*
   * 각 상세페이지의 실제 배치(절대 위치/모바일 레이아웃)는 페이지마다
   * 다르므로, 위치는 호출하는 쪽의 CSS 모듈 클래스로 넘겨 받는다.
   * 알약(pill) 자체의 크기/배경/테두리/그림자/타이포/화살표 같은
   * 시각 디자인은 이 컴포넌트 하나에만 있고 페이지마다 다시 쓰지
   * 않는다.
   */
  className?: string;
};

/*
 * 카드신청/SOL Pay 두 상세페이지 최하단의 "다른 상세페이지로 이동"
 * 버튼이 공유하는 컴포넌트. <Link> 하나가 알약 전체 영역을 감싸므로
 * 클릭 영역 전체가 동작하고, 시맨틱상 실제 <a>라 마우스 클릭과 키보드
 * Enter 모두 기본 동작으로 지원된다.
 */
export default function DetailLinkButton({
  to,
  label,
  className,
}: DetailLinkButtonProps) {
  return (
    <Link to={to} className={`${styles.pill} ${className ?? ''}`}>
      <p className={styles.pillText}>{label}</p>
      <img src={arrow} alt="" className={styles.pillArrow} />
    </Link>
  );
}
