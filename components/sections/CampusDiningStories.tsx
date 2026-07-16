import { ArrowUpRight } from "lucide-react";
import type { SiteContent } from "@/lib/content";
import { SmartImage } from "@/components/ui/SmartImage";

type CampusDiningStoriesProps = {
  content: SiteContent["life"]["diningStories"];
};

export function CampusDiningStories({ content }: CampusDiningStoriesProps) {
  return (
    <div className="campus-dining-stories">
      <figure className="campus-dining-stories__drink reveal-item">
        <SmartImage
          src="/media/scie-milk-tea.webp"
          alt={content.drink.alt}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 900px) 100vw, 45vw"
        />
        <figcaption>
          <span className="kicker">{content.drink.kicker}</span>
          <h3>{content.drink.title}</h3>
          <p>{content.drink.body}</p>
        </figcaption>
      </figure>

      <article className="campus-dining-stories__western reveal-item">
        <span className="kicker">{content.western.kicker}</span>
        <h3>{content.western.title}</h3>
        <p>{content.western.body}</p>
        <div className="campus-dining-stories__examples" aria-label={content.western.examplesAria}>
          {content.western.examples.map((example) => <span key={example}>{example}</span>)}
        </div>
        <a
          href={content.western.sourceHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content.western.sourceAction}
          <ArrowUpRight aria-hidden="true" />
        </a>
      </article>
    </div>
  );
}
