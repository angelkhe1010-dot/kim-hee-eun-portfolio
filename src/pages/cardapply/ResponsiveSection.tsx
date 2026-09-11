import styles from './ResponsiveSection.module.css';

import devices from '../../assets/images/cardapply/responsive/devices.png';
import arrow from '../../assets/images/cardapply/responsive/arrow.svg';

/*
 * Figma에는 이 섹션에 별도의 영문 라벨/타이틀이 없다 -- 데스크톱·모바일
 * 목업 일러스트와 SOL Pay 상세로 이어지는 플로팅 링크만 존재하는 마지막
 * 결과 섹션이라 SectionHeading 없이 그대로 옮긴다. 링크는 정적 표시만
 * 하고 실제 이동 동작은 이후 인터랙션 작업에서 추가한다.
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

      <div className={styles.pill}>
        <p className={styles.pillText}>신한카드 SOLPay 상세보기</p>
        <img src={arrow} alt="" className={styles.pillArrow} />
      </div>
    </section>
  );
}
