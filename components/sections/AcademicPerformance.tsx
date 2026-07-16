import { ArrowUpRight } from "lucide-react";
import type { SiteContent } from "@/lib/content";
import { ReferenceFlipCard } from "@/components/ui/ReferenceFlipCard";
import { SmartImage } from "@/components/ui/SmartImage";

type AcademicPerformanceProps = {
  content: SiteContent["overview"]["academics"];
};

export function AcademicPerformance({ content }: AcademicPerformanceProps) {
  return (
    <div className="academic-performance">
      <div className="academic-performance__heading reveal-item">
        <span className="kicker">{content.kicker}</span>
        <h3>{content.title}</h3>
        <p>{content.intro}</p>
      </div>

      <div className="academic-performance__layout">
        <figure className="academic-performance__image reveal-item">
          <SmartImage
            src="/media/scie-student-display-wall.webp"
            alt={content.imageAlt}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 900px) 100vw, 44vw"
          />
          <figcaption>
            <strong>{content.imageTitle}</strong>
          </figcaption>
        </figure>

        <div className="academic-performance__cards">
          {content.cards.map((card) => (
            <ReferenceFlipCard
              key={card.title}
              eyebrow={card.eyebrow}
              value={card.value}
              title={card.title}
              summary={card.summary}
              backTitle={card.backTitle}
              backBody={card.backBody}
              sourceLabel={content.actions.sourceLabel}
              sourceHref={content.sourceHref}
              viewAction={content.actions.view}
              openAction={content.actions.open}
              returnAction={content.actions.back}
            />
          ))}
        </div>
      </div>

      <a
        className="academic-performance__source"
        href={content.sourceHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.sourceAction}
        <ArrowUpRight aria-hidden="true" />
      </a>
    </div>
  );
}
