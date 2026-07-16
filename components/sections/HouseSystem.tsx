import { ArrowUpRight } from "lucide-react";
import type { SiteContent } from "@/lib/content";
import { SmartImage } from "@/components/ui/SmartImage";

type HouseSystemProps = {
  content: SiteContent["culture"]["houseSystem"];
};

export function HouseSystem({ content }: HouseSystemProps) {
  return (
    <div className="house-system">
      <div className="house-system__heading reveal-item">
        <span className="kicker">{content.kicker}</span>
        <h3>{content.title}</h3>
        <p>{content.intro}</p>
      </div>

      <div className="house-system__media reveal-item">
        <figure className="house-system__image house-system__image--all">
          <SmartImage
            src="/media/scie-four-houses.webp"
            alt={content.allHousesImage.alt}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </figure>
        <figure className="house-system__image house-system__image--metal">
          <SmartImage
            src="/media/scie-metal-house.webp"
            alt={content.metalImage.alt}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </figure>
      </div>

      <div className="house-system__cards" aria-label={content.cardsAria}>
        {content.houses.map((house) => (
          <article
            className={`house-system__card house-system__card--${house.id} reveal-item`}
            key={house.id}
          >
            <span>{house.element}</span>
            <div>
              <h4>{house.name}</h4>
              <p>{house.identity}</p>
            </div>
            <strong>{house.motto}</strong>
          </article>
        ))}
      </div>

      <div className="house-system__explanation reveal-item">
        <p>{content.body}</p>
      </div>

      <nav className="source-link-grid reveal-item" aria-label={content.linksAria}>
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
