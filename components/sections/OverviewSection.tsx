"use client";

import { ArrowDown, Compass, MapPin, Maximize2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { campusPlans, historyEvents, schoolStats } from "@/lib/content";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";

export function OverviewSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeEvent, setActiveEvent] = useState(0);
  const [activePlan, setActivePlan] =
    useState<(typeof campusPlans)[number]["id"]>(campusPlans[0].id);

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
    campusPlans.find((plan) => plan.id === activePlan) ?? campusPlans[0];

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
            <p>中国 · 深圳 · 福田</p>
          </div>
          <h1 className="reveal-item">
            <span>深圳国际</span>
            <span>交流书院</span>
          </h1>
          <p className="hero__lead reveal-item">
            在一座向海而生的城市，
            <br />
            学会认识世界，也准备改变世界。
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
            开始探索
            <ArrowDown aria-hidden="true" />
          </button>
        </div>

        <div className="hero__coordinates reveal-item">
          <Compass aria-hidden="true" />
          <div>
            <span>校园坐标</span>
            <strong>中国 · 深圳</strong>
            <strong>福田 · 安托山</strong>
          </div>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span>继续向下</span>
          <i />
        </div>
      </div>

      <div id="overview-content" className="section-shell overview-content">
        <SectionHeading
          number="01"
          eyebrow="学校概况"
          title="一所学校，生长在深圳的时间里"
          description="从水围到安托山，从一间间教室到连接世界的坐标，二十余年的变化最终沉淀为一种持续向上的姿态。"
        />

        <div className="location-story reveal-item">
          <div className="location-story__copy">
            <span className="kicker">地理位置</span>
            <h3>在福田，靠近城市，也保留一座绿色校园的呼吸。</h3>
            <p>
              校园位于深圳市福田区安托山六路3号。城市的开放、速度与多元，不只是背景，也成为学习经验的一部分。
            </p>
            <div className="address-line">
              <MapPin aria-hidden="true" />
              <span>广东省深圳市福田区安托山六路3号</span>
            </div>
          </div>
          <div className="location-story__visual" aria-label="深圳与世界坐标示意">
            <div className="coordinate-grid" aria-hidden="true" />
            <div className="city-orbit city-orbit--one" />
            <div className="city-orbit city-orbit--two" />
            <div className="city-pulse">
              <span />
              <strong>深圳</strong>
            </div>
            <div className="location-card">
              <small>所在区域</small>
              <strong>福田区</strong>
              <span>安托山</span>
            </div>
          </div>
        </div>

        <div className="stats-grid" aria-label="学校数据">
          {schoolStats.map((stat) => (
            <article className="stat-card reveal-item" key={stat.label}>
              <AnimatedCounter
                value={stat.value}
                decimals={"decimals" in stat ? stat.decimals : 0}
                suffix={stat.suffix}
              />
              <h3>{stat.label}</h3>
              <p>{stat.note}</p>
            </article>
          ))}
        </div>

        <div className="history-block">
          <div className="subsection-title reveal-item">
            <span className="kicker">历史沿革</span>
            <h3>时间不是年表，<br />而是一代代人的共同记忆。</h3>
          </div>

          <div className="history-experience reveal-item">
            <div className="history-image">
              {historyEvents.map((event, index) => (
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
                {historyEvents[activeEvent].year}
              </div>
            </div>

            <div className="history-timeline" aria-label="学校历史时间轴">
              {historyEvents.map((event, index) => (
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
            <span className="kicker">校园空间导览</span>
            <h3>沿着真实图纸，<br />读懂一座立体校园。</h3>
            <p>点击下方选项切换校园空间图；不同图纸的比例与方向均依原图保留。</p>
          </div>

          <div className="campus-plan-viewer reveal-item">
            <div className="campus-plan-stage">
              <div className="campus-plan-media">
                {campusPlans.map((plan) => (
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
                  rel="noreferrer"
                  aria-label={`打开${selectedPlan.title}原图`}
                >
                  <Maximize2 aria-hidden="true" />
                  查看原图
                </a>
              </div>
            </div>

            <div className="campus-plan-tabs" aria-label="校园空间图选择">
              {campusPlans.map((plan) => (
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
