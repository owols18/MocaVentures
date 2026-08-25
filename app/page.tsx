import AboutSection from "../components/home/AboutSection";
import Hero from "../components/home/Hero";
import styles from "../components/home/Home.module.css";
import VisualBreak from "../components/home/VisualBreak";

export default function Home() {
  return (
    <div className={styles.home}>
      <Hero />
      <AboutSection />
      <VisualBreak />
    </div>
  );
}
