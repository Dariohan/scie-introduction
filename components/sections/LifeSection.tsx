"use client";

import { ArrowLeft, ArrowRight, Maximize2, Utensils } from "lucide-react";
import { useState } from "react";
import type { SiteContent } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { RednoteLink } from "@/components/ui/RednoteLink";

type LifeSectionProps = {
  content: SiteContent["life"];
};

export function LifeSection({ content }: LifeSectionProps) {
  const [activeLife, setActiveLife] = useState(0);
  const { lifestyle, daily } = content;

  const changeLife = (direction: number) => {
    setActiveLife((current) =>
      (current + direction + lifestyle.items.length) % lifestyle.items.length,
    );
  };

  return (
    <section id="life" className="life-section">
      <div className="section-shell">
        <SectionHeading
          {...content.heading}
        />

        <div className="food-intro reveal-item">
          <div className="food-intro__copy">
            <Utensils aria-hidden="true" />
            <span className="kicker">{content.foodIntro.kicker}</span>
            <h3>{content.foodIntro.title}</h3>
            <p>{content.foodIntro.body}</p>
          </div>
          <div className="food-intro__line" aria-hidden="true" />
        </div>

        <div className="food-grid">
          {content.foodCards.map((card, index) => (
            <article className="food-card reveal-item" key={card.title}>
              <SmartImage
                src={card.src}
                alt={card.title}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 900px) 100vw, 34vw"
              />
              <div className="food-card__shade" />
              <span>0{index + 1}</span>
              <div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </article>
          ))}
        </div>

        <RednoteLink {...content.rednote} />

        <div className="flavours-block reveal-item">
          <div className="flavours-block__heading">
            <span className="kicker">{content.flavours.kicker}</span>
            <h3>{content.flavours.titleLines[0]}<br />{content.flavours.titleLines[1]}</h3>
            <p>{content.flavours.body}</p>
          </div>
          <div className="flavour-list">
            {content.flavours.items.map((flavour, index) => (
              <article key={flavour.name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h4>{flavour.name}</h4>
                <p>{flavour.note}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="lifestyle-block">
          <div className="subsection-title reveal-item">
            <span className="kicker">{lifestyle.kicker}</span>
            <h3>{lifestyle.titleLines[0]}<br />{lifestyle.titleLines[1]}</h3>
          </div>

          <div className="lifestyle-gallery reveal-item">
            <div className="lifestyle-stage">
              {lifestyle.items.map((item, index) => (
                <SmartImage
                  key={item.src}
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 900px) 100vw, 70vw"
                  className={activeLife === index ? "is-active" : ""}
                />
              ))}
              <div className="lifestyle-stage__shade" />
              <div className="lifestyle-stage__copy" aria-live="polite">
                <span>{lifestyle.items[activeLife].title}</span>
                <h3>{lifestyle.items[activeLife].label}</h3>
              </div>
              <div className="lifestyle-stage__controls">
                <button type="button" onClick={() => changeLife(-1)} aria-label={lifestyle.previousAria}>
                  <ArrowLeft aria-hidden="true" />
                </button>
                <button type="button" onClick={() => changeLife(1)} aria-label={lifestyle.nextAria}>
                  <ArrowRight aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="lifestyle-rail" aria-label={lifestyle.selectorAria}>
              {lifestyle.items.map((item, index) => (
                <button
                  type="button"
                  aria-pressed={activeLife === index}
                  key={item.src}
                  className={activeLife === index ? "is-active" : ""}
                  onClick={() => setActiveLife(index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.title}</strong>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="daily-block">
          <div className="subsection-title reveal-item">
            <span className="kicker">{daily.kicker}</span>
            <h3>{daily.titleLines[0]}<br />{daily.titleLines[1]}</h3>
            <p>{daily.disclaimer}</p>
          </div>

          <div className="daily-content">
            <figure className="schedule-card reveal-item">
              <a
                className="schedule-card__media"
                href="/media/student-timetable-sample.webp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={daily.schedule.openAria}
              >
                <SmartImage
                  src="/media/student-timetable-sample.webp"
                  alt={daily.schedule.imageAlt}
                  loading="lazy"
                  decoding="async"
                />
                <span>
                  <Maximize2 aria-hidden="true" />
                  {daily.schedule.viewOriginal}
                </span>
              </a>
              <figcaption>
                <span>{daily.schedule.kicker}</span>
                <div>
                  <strong>{daily.schedule.title}</strong>
                  <p>{daily.schedule.body}</p>
                </div>
              </figcaption>
            </figure>

            <div className="daily-timeline">
              {daily.moments.map((moment, index) => (
                <article className="daily-moment reveal-item" key={moment.marker}>
                  <span className="daily-moment__index">{String(index + 1).padStart(2, "0")}</span>
                  <div className="daily-moment__marker">
                    <i />
                    <span>{moment.marker}</span>
                  </div>
                  <div>
                    <h3>{moment.title}</h3>
                    <p>{moment.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
