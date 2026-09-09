import styles from './DiscoverySection.module.css';

import contentExperience from '../../assets/images/solpay/discovery/content-experience.webp';

/*
 * 이 섹션은 인터랙션/모션 없이 Figma 노드 472:302299(05 CONTENT
 * EXPERIENCE 프레임, 1920x1700)를 통으로 export한 고해상도 이미지 한
 * 장으로 구성한다. width/height는 실제 프레임 비율 그대로라 aspect-
 * ratio와 함께 로딩 중 레이아웃 이동을 막아준다.
 */
export default function DiscoverySection() {
  return (
    <section className={styles.section} data-section="discovery">
      <img
        src={contentExperience}
        alt="혜택을 찾는 과정도 하나의 경험이 되도록 - 인기 혜택 랭킹으로 관심을 유도하는 리스트, 실시간 참여 현황을 강조한 상단 배너, 반복되는 리스트 사이에 변화를 주는 프로모션 UI로 구성된 SOL Pay 혜택 탐색 화면"
        className={styles.image}
        width={1920}
        height={1700}
        loading="lazy"
        draggable={false}
      />
    </section>
  );
}
