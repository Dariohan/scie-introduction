"use client";

import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useState } from "react";
import type { SiteContent } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { HouseSystem } from "@/components/sections/HouseSystem";
import { StudentCommunity } from "@/components/sections/StudentCommunity";

type CultureSectionProps = {
  content: SiteContent["culture"];
};

export function CultureSection({ content }: CultureSectionProps) {
  const [valueIndex, setValueIndex] = useState(0);

  const activeValue = content.valuesCarousel.values[valueIndex];

  return (
    <section id="culture" className="culture-section">
      <div className="section-shell">
        <SectionHeading
          number={content.heading.number}
          eyebrow={content.heading.eyebrow}
          title={content.heading.title}
          description={content.heading.description}
        />

        <div className="motto-block reveal-item">
          <div className="motto-block__lead">
            <span className="kicker">{content.motto.kicker}</span>
            <p>{content.motto.title}</p>
          </div>
          <div className="motto-block__statement">
            <span>“</span>
            <h3>
              {content.motto.statementLines[0]}
              <br />
              {content.motto.statementLines[1]}
            </h3>
            <p>{content.missionStatement}</p>
            <small>{content.missionSource}</small>
          </div>
        </div>

        <div className="values-block">
          <div className="values-letter reveal-item" aria-hidden="true">
            {content.valuesCarousel.values.map((value, index) => (
              <span key={value.key} className={valueIndex === index ? "is-active" : ""}>
                {value.key}
              </span>
            ))}
          </div>

          <div className="values-carousel reveal-item">
            <Quote aria-hidden="true" />
            <span className="kicker">{content.valuesCarousel.kicker}</span>
            <div className="values-carousel__content" aria-live="polite">
              <h3>{activeValue.title}</h3>
              <blockquote>{activeValue.quote}</blockquote>
              <p>{activeValue.detail}</p>
            </div>
            <div className="values-carousel__controls">
              <button
                type="button"
                aria-label={content.valuesCarousel.previousAria}
                onClick={() =>
                  setValueIndex(
                    (valueIndex - 1 + content.valuesCarousel.values.length) %
                      content.valuesCarousel.values.length,
                  )
                }
              >
                <ArrowLeft aria-hidden="true" />
              </button>
              <div className="values-dots" aria-label={content.valuesCarousel.selectorAria}>
                {content.valuesCarousel.values.map((value, index) => (
                  <button
                    type="button"
                    aria-pressed={valueIndex === index}
                    aria-label={`${content.valuesCarousel.viewAriaPrefix} ${value.title}`.trim()}
                    key={value.key}
                    className={valueIndex === index ? "is-active" : ""}
                    onClick={() => setValueIndex(index)}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label={content.valuesCarousel.nextAria}
                onClick={() =>
                  setValueIndex(
                    (valueIndex + 1) % content.valuesCarousel.values.length,
                  )
                }
              >
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <HouseSystem content={content.houseSystem} />

        <StudentCommunity content={content.community} />

        <div className="expression-block">
          <div className="subsection-title reveal-item">
            <span className="kicker">{content.expression.kicker}</span>
            <h3>
              {content.expression.titleLines[0]}
              <br />
              {content.expression.titleLines[1]}
            </h3>
            <p>{content.expression.description}</p>
          </div>

          <div className="expression-grid">
            {content.expression.items.map((item, index) => (
              <figure
                className={`expression-card expression-card--${index + 1} reveal-item`}
                key={item.src}
              >
                <SmartImage
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  sizes={index === 0
                    ? "(max-width: 900px) 100vw, 58vw"
                    : index === 2
                      ? "(max-width: 640px) 100vw, (max-width: 900px) 50vw, 36vw"
                      : "(max-width: 640px) 100vw, (max-width: 900px) 50vw, 58vw"}
                />
                <figcaption>
                  <span>{item.label}</span>
                  <strong>{item.title}</strong>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="stories-block">
          <div className="subsection-title reveal-item">
            <span className="kicker">{content.stories.kicker}</span>
            <h3>
              {content.stories.titleLines[0]}
              <br />
              {content.stories.titleLines[1]}
            </h3>
            <p>{content.stories.description}</p>
          </div>

          <div className="story-grid">
            {content.stories.items.map((story, index) => (
              <article className="story-card reveal-item" key={story.title}>
                <div className="story-card__image">
                  <SmartImage
                    src={story.image}
                    alt={story.title}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 100vw, (max-width: 900px) 44vw, 30vw"
                  />
                  <span>0{index + 1}</span>
                </div>
                <div className="story-card__copy">
                  <span>{story.type}</span>
                  <small>{story.meta}</small>
                  <h3>{story.title}</h3>
                  <p>{story.description}</p>
                  <a href={story.source} target="_blank" rel="noopener noreferrer">
                    {content.stories.sourceAction}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="alumni-showcase reveal-item">
          <SmartImage
            sizes="100vw"
            src="/media/scie-community-portrait.webp"
            alt={content.alumni.imageAlt}
            loading="lazy"
            decoding="async"
          />
          <div className="alumni-showcase__veil" />
          <div className="alumni-showcase__copy">
            <span>{content.alumni.kicker}</span>
            <h3>{content.alumni.title}</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
