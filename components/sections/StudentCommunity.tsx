import { ArrowUpRight } from "lucide-react";
import type { SiteContent } from "@/lib/content";
import { ReferenceFlipCard } from "@/components/ui/ReferenceFlipCard";
import { SmartImage } from "@/components/ui/SmartImage";

type StudentCommunityProps = {
  content: SiteContent["culture"]["community"];
};

export function StudentCommunity({ content }: StudentCommunityProps) {
  return (
    <div className="student-community">
      <div className="student-community__heading reveal-item">
        <span className="kicker">{content.kicker}</span>
        <h3>{content.title}</h3>
        <p>{content.body}</p>
      </div>

      <div className="student-community__layout">
        <a
          className="student-community__image reveal-item"
          href={content.links[0].href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={content.links[0].action}
        >
          <SmartImage
            src="/media/scie-mun-context.webp"
            alt={content.imageAlt}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 900px) 100vw, 62vw"
          />
        </a>

        <div className="student-community__stat reveal-item">
          <ReferenceFlipCard
            eyebrow={content.stat.eyebrow}
            value={content.stat.value}
            title={content.stat.title}
            summary={content.stat.summary}
            backTitle={content.stat.backTitle}
            backBody={content.stat.backBody}
            sourceLabel={content.actions.sourceLabel}
            sourceHref={content.stat.sourceHref}
            viewAction={content.actions.view}
            openAction={content.actions.open}
            returnAction={content.actions.back}
          />
        </div>
      </div>

      <div className="student-community__links reveal-item">
        {content.links.map((link) => (
          <a href={link.href} target="_blank" rel="noopener noreferrer" key={link.href}>
            <span>{link.label}</span>
            <h4>{link.title}</h4>
            <p>{link.body}</p>
            <strong>
              {link.action}
              <ArrowUpRight aria-hidden="true" />
            </strong>
          </a>
        ))}
      </div>
    </div>
  );
}
