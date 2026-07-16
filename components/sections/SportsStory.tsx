import { ArrowUpRight } from "lucide-react";
import type { SiteContent } from "@/lib/content";
import { SmartImage } from "@/components/ui/SmartImage";

type SportsStoryProps = {
  content: SiteContent["life"]["sports"];
};

export function SportsStory({ content }: SportsStoryProps) {
  return (
    <div className="sports-story">
      <div className="sports-story__heading reveal-item">
        <span className="kicker">{content.kicker}</span>
        <h3>{content.title}</h3>
        <p>{content.body}</p>
      </div>

      <div className="sports-story__media reveal-item">
        <figure className="sports-story__photo sports-story__photo--sprint">
          <SmartImage
            src="/media/scie-sports-sprint.webp"
            alt={content.sprint.alt}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </figure>
        <figure className="sports-story__photo sports-story__photo--stadium">
          <SmartImage
            src="/media/scie-sports-day.webp"
            alt={content.stadium.alt}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </figure>
      </div>

      <nav className="source-link-grid source-link-grid--light reveal-item" aria-label={content.linksAria}>
        {content.links.map((link) => (
          <a href={link.href} target="_blank" rel="noopener noreferrer" key={link.href}>
            <span>{link.label}</span>
            <strong>{link.title}</strong>
            <ArrowUpRight aria-hidden="true" />
          </a>
        ))}
      </nav>
    </div>
  );
}
