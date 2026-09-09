import styles from './ResultSection.module.css';

import collage from '../../assets/images/solpay/result/collage.png';

/*
 * 이 섹션은 Figma상 텍스트/카드 없이 회전·중첩 배치된 6개의 실제 앱
 * 스크린샷으로만 구성된 마무리 콜라주다. 각 폰의 정확한 회전각이
 * Figma 메타데이터에 노출되지 않아 임의로 추정해 재현하지 않고,
 * 실제 화면 캡처로 이루어진 콜라주 이미지 그대로 사용했다
 * (다른 섹션의 "섹션 전체 통이미지"와 달리 텍스트/배경을 포함하지
 * 않는 순수 스크린샷 조합이라 이미지 사용이 허용되는 범위에 해당).
 */
export default function ResultSection() {
  return (
    <section className={styles.section} data-section="result">
      <img
        src={collage}
        alt="SOL Pay 리뉴얼 최종 화면 모음"
        className={styles.collage}
        draggable={false}
      />
    </section>
  );
}
