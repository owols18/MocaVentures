import AboutSection from "../components/home/AboutSection";
import Hero from "../components/home/Hero";
import HomeImpactSection from "../components/home/HomeImpactSection";
import HomeLetsTalkSection from "../components/home/HomeLetsTalkSection";
import HomePortfolioSection from "../components/home/HomePortfolioSection";
import HomeTeamSection from "../components/home/HomeTeamSection";
import styles from "../components/home/Home.module.css";
import VisualBreak from "../components/home/VisualBreak";

export default function Home() {
  return (
    <div className={styles.home}>
      <Hero />
      <AboutSection />
      <VisualBreak />
      <HomePortfolioSection />
      <HomeTeamSection />
      <HomeImpactSection />
      <HomeLetsTalkSection />
    </div>
  );
}
