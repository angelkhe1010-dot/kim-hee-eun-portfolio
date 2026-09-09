import styles from './SolPayDetail.module.css';

import TopButton from '../components/sections/TopButton';
import HeroSection from './solpay/HeroSection';
import InterviewSection from './solpay/InterviewSection';
import StrategySection from './solpay/StrategySection';
import AsIsSection from './solpay/AsIsSection';
import SolutionOverviewSection from './solpay/SolutionOverviewSection';
import InteractionSection from './solpay/InteractionSection';
import DiscoverySection from './solpay/DiscoverySection';
import NavigationSection from './solpay/NavigationSection';
import AsIsToBeSection from './solpay/AsIsToBeSection';
import ResultSection from './solpay/ResultSection';

export default function SolPayDetail() {
  return (
    <main className={styles.detail}>
      <TopButton />

      <HeroSection />
      <InterviewSection />
      <StrategySection />
      <AsIsSection />
      <SolutionOverviewSection />
      <InteractionSection />
      <DiscoverySection />
      <NavigationSection />
      <AsIsToBeSection />
      <ResultSection />
    </main>
  );
}
