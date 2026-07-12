"use client";

import { ArrowDown, Compass, MapPin, Maximize2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { SiteContent } from "@/lib/content";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";

type OverviewSectionProps = {
  content: SiteContent["overview"];
  shared: SiteContent["shared"];
};

export function OverviewSection({ content, shared }: OverviewSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeEvent, setActiveEvent] = useState(0);
  const [activePlan, setActivePlan] = useState(content.campusMap.plans[0].id);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const media = hero.querySelector<HTMLElement>(".hero__media");
        if (!media) return;
        const progress = Math.min(scrollY / innerHeight, 1);
        media.style.transform = `translate3d(0, ${progress * 8}%, 0) scale(${1.04 + progress * 0.05})`;
      });
    };

    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const selectedPlan =
    content.campusMap.plans.find((plan) => plan.id === activePlan) ??
    content.campusMap.plans[0];

  return (
    <section id="overview" className="overview-section">
      <div ref={heroRef} className="hero">
        <div className="hero__media" aria-hidden="true">
          <SmartImage
            src="/media/campus-tree-canopy.jpg"
            alt=""
            fetchPriority="high"
            decoding="async"
            sizes="100vw"
          />
        </div>
        <div className="hero__veil" />
        <div className="hero__grain" />

        <div className="hero__content">
          <div className="hero__eyebrow reveal-item">
            <span />
            <p>{content.hero.eyebrow}</p>
          </div>
          <h1 className="reveal-item">
            {content.hero.titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="hero__lead reveal-item">
            {content.hero.leadLines[0]}
            <br />
            {content.hero.leadLines[1]}
          </p>
          <button
            type="button"
            className="hero__cta reveal-item"
            onClick={() =>
              document
                .getElementById("overview-content")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {content.hero.action}
            <ArrowDown aria-hidden="true" />
          </button>
        </div>

        <div className="hero__coordinates reveal-item">
          <Compass aria-hidden="true" />
          <div>
            <span>{content.hero.coordinatesLabel}</span>
            {content.hero.coordinatesLines.map((line) => (
              <strong key={line}>{line}</strong>
            ))}
          </div>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span>{content.hero.scrollCue}</span>
          <i />
        </div>
      </div>

      <div id="overview-content" className="section-shell overview-content">
        <SectionHeading
          number={content.heading.number}
          eyebrow={content.heading.eyebrow}
          title={content.heading.title}
          description={content.heading.description}
        />

        <div className="location-story reveal-item">
          <div className="location-story__copy">
            <span className="kicker">{content.location.kicker}</span>
            <h3>{content.location.title}</h3>
            <p>{content.location.body}</p>
            <div className="address-line">
              <MapPin aria-hidden="true" />
              <span>{shared.address}</span>
            </div>
          </div>
          <div className="location-story__visual" aria-label={content.location.visualAria}>
            <div className="coordinate-grid" aria-hidden="true" />
            <div className="city-orbit city-orbit--one" />
            <div className="city-orbit city-orbit--two" />
            <div className="city-pulse">
              <span />
              <strong>{content.location.city}</strong>
            </div>
            <div className="location-card">
              <small>{content.location.areaLabel}</small>
              <strong>{content.location.district}</strong>
              <span>{content.location.neighbourhood}</span>
            </div>
          </div>
        </div>

        <div className="stats-grid" aria-label={content.statsAria}>
          {content.stats.map((stat) => (
            <article className="stat-card reveal-item" key={stat.label}>
              <AnimatedCounter
                value={stat.value}
                decimals={stat.decimals}
                suffix={stat.suffix}
              />
              <h3>{stat.label}</h3>
              <p>{stat.note}</p>
            </article>
          ))}
        </div>

        <div className="history-block">
          <div className="subsection-title reveal-item">
            <span className="kicker">{content.history.kicker}</span>
            <h3>
              {content.history.titleLines[0]}
              <br />
              {content.history.titleLines[1]}
            </h3>
          </div>

          <div className="history-experience reveal-item">
            <div className="history-image">
              {content.history.events.map((event, index) => (
                <SmartImage
                  key={event.year}
                  src={event.image}
                  alt={event.title}
                  loading="lazy"
                  decoding="async"
                  className={activeEvent === index ? "is-active" : ""}
                />
              ))}
              <div className="history-image__year">
                {content.history.events[activeEvent].year}
              </div>
            </div>

            <div className="history-timeline" aria-label={content.history.timelineAria}>
              {content.history.events.map((event, index) => (
                <button
                  type="button"
                  aria-pressed={activeEvent === index}
                  className={activeEvent === index ? "is-active" : ""}
                  key={event.year}
                  onClick={() => setActiveEvent(index)}
                >
                  <span>{event.year}</span>
                  <div>
                    <h4>{event.title}</h4>
                    <p>{event.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="campus-map-block">
          <div className="subsection-title reveal-item">
            <span className="kicker">{content.campusMap.kicker}</span>
            <h3>
              {content.campusMap.titleLines[0]}
              <br />
              {content.campusMap.titleLines[1]}
            </h3>
            <p>{content.campusMap.description}</p>
          </div>

          <div className="campus-plan-viewer reveal-item">
            <div className="campus-plan-stage">
              <div className="campus-plan-media">
                {content.campusMap.plans.map((plan) => (
                  <SmartImage
                    key={plan.id}
                    src={plan.src}
                    alt={plan.alt}
                    loading="lazy"
                    decoding="async"
                    className={activePlan === plan.id ? "is-active" : ""}
                    aria-hidden={activePlan !== plan.id}
                  />
                ))}
              </div>
              <div className="campus-plan-stage__meta" aria-live="polite">
                <span>{selectedPlan.label}</span>
                <strong>{selectedPlan.title}</strong>
                <p>{selectedPlan.description}</p>
                <a
                  href={selectedPlan.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${content.campusMap.openOriginalAriaPrefix} ${selectedPlan.title} ${content.campusMap.openOriginalAriaSuffix}`.trim()}
                >
                  <Maximize2 aria-hidden="true" />
                  {shared.viewOriginal}
                </a>
              </div>
            </div>

            <div className="campus-plan-tabs" aria-label={content.campusMap.selectorAria}>
              {content.campusMap.plans.map((plan) => (
                <button
                  type="button"
                  key={plan.id}
                  aria-pressed={activePlan === plan.id}
                  className={activePlan === plan.id ? "is-active" : ""}
                  onClick={() => setActivePlan(plan.id)}
                >
                  <span>{plan.number}</span>
                  <strong>{plan.label}</strong>
                  <small>{plan.title}</small>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
