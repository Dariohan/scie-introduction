import { WorldConnection } from "@/components/WorldConnection";
import { SmartImage } from "@/components/ui/SmartImage";
import type { SiteContent } from "@/lib/content";

type FutureSectionProps = {
  content: SiteContent["future"];
  worldContent: SiteContent["worldConnection"];
  shared: SiteContent["shared"];
};

export function FutureSection({ content, worldContent, shared }: FutureSectionProps) {
  return (
    <section id="future" className="future-section">
      <div className="future-intro section-shell">
        <span className="future-intro__number">{content.intro.number}</span>
        <div>
          <span className="kicker">{content.intro.kicker}</span>
          <h2>
            {content.intro.titleLines[0]}
            <br />
            {content.intro.titleLines[1]}
          </h2>
          <p>{content.intro.body}</p>
        </div>
      </div>

      <WorldConnection content={worldContent} emblemAlt={shared.emblemAlt} />

      <footer className="site-footer">
        <div className="site-footer__brand">
          <SmartImage src="/media/scie-emblem.svg" alt={shared.emblemAlt} />
          <div>
            <strong>{shared.schoolName}</strong>
            <span>{shared.tagline}</span>
          </div>
        </div>
        <div className="site-footer__meta">
          <p>{content.footer.address}</p>
          <p>
            {content.footer.mapCreditBefore}{" "}
            <a
              href={content.footer.mapLicenseHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content.footer.mapLicenseLabel}
            </a>
            {" "}{content.footer.mapCreditAfter}
          </p>
          <p>{content.footer.dataNote}</p>
        </div>
      </footer>
    </section>
  );
}
