import { Link } from 'react-router-dom';
import styles from './ResponsiveSection.module.css';

import devices from '../../assets/images/cardapply/responsive/devices.png';
import arrow from '../../assets/images/cardapply/responsive/arrow.svg';

/*
 * Figma에는 이 섹션에 별도의 영문 라벨/타이틀이 없다 -- 데스크톱·모바일
 * 목업 일러스트와 SOL Pay 상세로 이어지는 플로팅 링크만 존재하는 마지막
 * 결과 섹션이라 SectionHeading 없이 그대로 옮긴다.
 *
 * "신한카드 SOLPay 상세보기"는 실제 <Link>로 구현해 메인 포트폴리오의
 * SolPay 썸네일이 쓰는 것과 동일한 라우트(/works/solpay, App.tsx)로
 * 이동시킨다. 텍스트 두 조각이 아니라 링크 하나가 전체 pill 영역을
 * 감싸므로 클릭 영역 전체가 동작하고, 중복 클릭 핸들러도 없다.
 * <Link>는 시맨틱상 실제 <a>라 마우스 클릭과 키보드 Enter 모두 기본
 * 동작으로 지원되며, 라우트 전환 시 스크롤을 맨 위로 되돌리는 처리는
 * App.tsx의 공용 useLayoutEffect가 pathname 변경마다 담당한다.
 */
export default function ResponsiveSection() {
  return (
    <section className={styles.section}>
      <div className={styles.devicesFrame}>
        <img
          src={devices}
          alt="맥북과 아이폰에서 보이는 카드신청 반응형 화면"
          className={styles.devicesImg}
        />
      </div>

      <Link to="/works/solpay" className={styles.pill}>
        <p className={styles.pillText}>신한카드 SOLPay 상세보기</p>
        <img src={arrow} alt="" className={styles.pillArrow} />
      </Link>
    </section>
  );
}
