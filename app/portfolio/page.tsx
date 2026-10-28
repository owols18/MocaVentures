import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import portfolioContent from "../../content/portfolio.json";
import Heading from "../../components/ui/Heading";
import { getPortfolioCards } from "../../data/projects";
import styles from "./PortfolioPage.module.css";

export const metadata: Metadata = {
  title: portfolioContent.metadata.title,
};

export default function PortfolioPage() {
  const cards = getPortfolioCards(portfolioContent.grid);
  // Any desktop first-row image can be LCP; repeated sources share its loading policy.
  const eagerImageSources = new Set(cards.slice(0, 4).map((card) => card.image.src));

  return (
    <div className={styles.page}>
      <section className={styles.pageHeader} aria-labelledby="portfolio-page-title">
        <Heading level="h1" variant="h2" className={styles.title}>
          <span id="portfolio-page-title">{portfolioContent.pageTitle}</span>
        </Heading>
      </section>
      <ul className={styles.grid} aria-labelledby="portfolio-page-title" role="list">
        {cards.map((card) => {
          const titleId = `portfolio-${card.id}-title`;
          const content = (
            <>
              <Image
                src={card.image.src}
                alt={card.image.alt}
                fill
                sizes="(orientation: landscape) and (max-height: 500px) calc((100vw - 63px) / 2), (min-width: 2560px) 609px, (min-width: 1280px) calc((100vw - 125px) / 4), (min-width: 1024px) calc((100vw - 94px) / 3), (min-width: 768px) calc((100vw - 79px) / 2), calc(100vw - 48px)"
                loading={eagerImageSources.has(card.image.src) ? "eager" : "lazy"}
                className={styles.image}
              />
              <div className={styles.panel}>
                {card.projectName && (
                  <h2 id={titleId} className={styles.projectName}>
                    {card.projectName}
                  </h2>
                )}
                <p className={styles.address}>{card.address}</p>
                <p className={styles.caption}>{card.location}</p>
              </div>
            </>
          );

          return (
            <li key={card.id} className={styles.card}>
              {card.slug ? (
                <Link
                  href={`/portfolio/${encodeURIComponent(card.slug)}`}
                  className={styles.cardContent}
                  aria-labelledby={titleId}
                >
                  {content}
                </Link>
              ) : (
                <div className={styles.cardContent}>{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
