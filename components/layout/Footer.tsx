import Image from "next/image";
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
        <p className={styles.copyright}>
          {footer.copyright}
        </p> 
        
      </div>
    </footer>
  );
}
