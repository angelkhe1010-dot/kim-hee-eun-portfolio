import styles from './CardApplyDetail.module.css';

import TopButton from '../components/sections/TopButton';
import HeroSection from './cardapply/HeroSection';
import PainPointsSection from './cardapply/PainPointsSection';
import PrinciplesSection from './cardapply/PrinciplesSection';
import ExplorationSection from './cardapply/ExplorationSection';
import AsIsSection from './cardapply/AsIsSection';
import ApplicationSection from './cardapply/ApplicationSection';
import AccessibilitySection from './cardapply/AccessibilitySection';
import ResponsiveSection from './cardapply/ResponsiveSection';

export default function CardApplyDetail() {
  return (
    <main className={styles.detail}>
      <TopButton />

      <HeroSection />
      <PainPointsSection />
      <PrinciplesSection />
      <ExplorationSection />
      <AsIsSection />
      <ApplicationSection />
      <AccessibilitySection />
      <ResponsiveSection />
    </main>
  );
}
