import Image from "next/image";
import sharedContent from "../../content/shared.json";
import { site } from "../../data/site";
import styles from "./Footer.module.css";

export default function Footer() {
  const { footer, name } = site;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Image
          className={styles.logo}
          src={footer.logo.src}
          width={footer.logo.width}
          height={footer.logo.height}
          alt={name}
          sizes="(max-width: 767px) 38vw, (max-width: 1023px) 250px, (max-width: 1279px) 285px, (max-width: 1919px) 300px, 370px"
        />
        <Image
          className={styles.certification}
          src={sharedContent.certifications.mwbeNewYork.src}
          width={sharedContent.certifications.mwbeNewYork.width}
          height={sharedContent.certifications.mwbeNewYork.height}
          alt={sharedContent.certifications.mwbeNewYork.alt}
          sizes="(max-width: 767px) 20vw, (max-width: 1023px) 96px, (max-width: 1279px) 104px, (max-width: 1919px) 8vw, 144px"
        />
        <p className={styles.copyright}>
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
