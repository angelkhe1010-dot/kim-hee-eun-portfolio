import styles from './ResponsiveSection.module.css';

import DetailLinkButton from '../../components/sections/DetailLinkButton';
import devices from '../../assets/images/cardapply/responsive/devices.png';

/*
 * Figma에는 이 섹션에 별도의 영문 라벨/타이틀이 없다 -- 데스크톱·모바일
 * 목업 일러스트와 SOL Pay 상세로 이어지는 플로팅 링크만 존재하는 마지막
 * 결과 섹션이라 SectionHeading 없이 그대로 옮긴다.
 *
 * "신한카드 SOLPay 상세보기" 버튼은 SOL Pay 상세페이지의 "신한카드
 * 카드신청 상세보기" 버튼과 완전히 같은 디자인을 쓰는 공용
 * DetailLinkButton이다 -- 라우트(App.tsx의 /works/solpay)와 문구만
 * 다르다.
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

      <DetailLinkButton
        to="/works/solpay"
        label="신한카드 SOLPay 상세보기"
        className={styles.linkButton}
      />
    </section>
  );
}
