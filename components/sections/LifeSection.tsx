"use client";

import { ArrowLeft, ArrowRight, Maximize2, Utensils } from "lucide-react";
import { useState } from "react";
import {
  dailyMoments,
  foodCards,
  lifestyleGallery,
  rednotePosts,
} from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { RednoteLink } from "@/components/ui/RednoteLink";

const shenzhenFlavours = [
  { name: "粤式早茶", note: "一盅两件，慢下来分享一张桌" },
  { name: "潮汕风味", note: "粿品、卤味与清鲜汤水" },
  { name: "客家滋味", note: "朴实、丰足，也保存迁徙记忆" },
  { name: "滨海鲜味", note: "城市向海，餐桌也感知潮汐" },
] as const;

export function LifeSection() {
  const [activeLife, setActiveLife] = useState(0);

  const changeLife = (direction: number) => {
    setActiveLife((current) =>
      (current + direction + lifestyleGallery.length) % lifestyleGallery.length,
    );
  };

  return (
    <section id="life" className="life-section">
      <div className="section-shell">
        <SectionHeading
          number="04"
          eyebrow="美食与生活"
          title="真正被记住的校园，藏在每一个普通日常里"
          description="一顿午饭、一场排练、一次讨论、一只路过的猫——生活不是学习的间隙，它本身就是成长发生的地方。"
        />

        <div className="food-intro reveal-item">
          <div className="food-intro__copy">
            <Utensils aria-hidden="true" />
            <span className="kicker">食堂特色</span>
            <h3>从一碗热饭开始，照顾好每一个忙碌的日子。</h3>
            <p>
              校园影像记录了中餐食堂与咖啡空间，也呈现主食、轻食、点心与饮品的多样选择。菜单会随实际供应调整，因此这里讲述用餐体验，不设置未经核验的固定招牌菜。
            </p>
          </div>
          <div className="food-intro__line" aria-hidden="true" />
        </div>

        <div className="food-grid">
          {foodCards.map((card, index) => (
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

        <RednoteLink {...rednotePosts.food} />

        <div className="flavours-block reveal-item">
          <div className="flavours-block__heading">
            <span className="kicker">深圳地方风味</span>
            <h3>一座移民城市，<br />把四方味道变成日常。</h3>
            <p>
              深圳没有单一的味觉答案。岭南、潮汕、客家与滨海饮食在这里相遇，也映照出城市开放而包容的性格。
            </p>
          </div>
          <div className="flavour-list">
            {shenzhenFlavours.map((flavour, index) => (
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
            <span className="kicker">校园生活影像</span>
            <h3>一起经历，<br />才会成为共同记忆。</h3>
          </div>

          <div className="lifestyle-gallery reveal-item">
            <div className="lifestyle-stage">
              {lifestyleGallery.map((item, index) => (
                <SmartImage
                  key={item.src}
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className={activeLife === index ? "is-active" : ""}
                />
              ))}
              <div className="lifestyle-stage__shade" />
              <div className="lifestyle-stage__copy" aria-live="polite">
                <span>{lifestyleGallery[activeLife].title}</span>
                <h3>{lifestyleGallery[activeLife].label}</h3>
              </div>
              <div className="lifestyle-stage__controls">
                <button type="button" onClick={() => changeLife(-1)} aria-label="上一张生活照片">
                  <ArrowLeft aria-hidden="true" />
                </button>
                <button type="button" onClick={() => changeLife(1)} aria-label="下一张生活照片">
                  <ArrowRight aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="lifestyle-rail" aria-label="校园生活照片选择">
              {lifestyleGallery.map((item, index) => (
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
            <span className="kicker">校园一日体验</span>
            <h3>从清晨到入夜，<br />每一刻都有自己的节奏。</h3>
            <p>以下为叙事性日程，不代表学校发布的固定作息表。</p>
          </div>

          <div className="daily-content">
            <figure className="schedule-card reveal-item">
              <a
                className="schedule-card__media"
                href="/media/student-timetable-sample.webp"
                target="_blank"
                rel="noreferrer"
                aria-label="打开课表示例原图"
              >
                <SmartImage
                  src="/media/student-timetable-sample.webp"
                  alt="2023至2024学年深国交个人课表示例"
                  loading="lazy"
                  decoding="async"
                />
                <span>
                  <Maximize2 aria-hidden="true" />
                  查看原图
                </span>
              </a>
              <figcaption>
                <span>真实课表示例</span>
                <div>
                  <strong>一周，被课程、午餐与社团共同排布。</strong>
                  <p>
                    图中为2023—2024学年个人课表示例；班级、课程与时段因学生和学期而异。
                  </p>
                </div>
              </figcaption>
            </figure>

            <div className="daily-timeline">
              {dailyMoments.map((moment, index) => (
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
