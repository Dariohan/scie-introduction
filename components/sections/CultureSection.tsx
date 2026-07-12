"use client";

import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useState } from "react";
import { cultureStories, values } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";

export function CultureSection() {
  const [valueIndex, setValueIndex] = useState(0);

  const activeValue = values[valueIndex];

  return (
    <section id="culture" className="culture-section">
      <div className="section-shell">
        <SectionHeading
          number="03"
          eyebrow="人文与特色"
          title="教育最终留下的，是一个人面对世界的方式"
          description="知识之外，社会责任、创造力、独立与热情，让独立思考有了温度，也让“追求卓越”不只指向结果。"
        />

        <div className="motto-block reveal-item">
          <div className="motto-block__lead">
            <span className="kicker">学校精神</span>
            <p>追求卓越</p>
            <small>依据校方公开英文校训作中文意译</small>
          </div>
          <div className="motto-block__statement">
            <span>“</span>
            <h3>
              卓越不是把所有人推向同一个终点，
              <br />
              而是让每个人找到值得全力以赴的方向。
            </h3>
          </div>
        </div>

        <div className="values-block">
          <div className="values-letter reveal-item" aria-hidden="true">
            {values.map((value, index) => (
              <span key={value.key} className={valueIndex === index ? "is-active" : ""}>
                {value.key}
              </span>
            ))}
          </div>

          <div className="values-carousel reveal-item">
            <Quote aria-hidden="true" />
            <span className="kicker">学校使命中的四种力量</span>
            <div className="values-carousel__content" aria-live="polite">
              <h3>{activeValue.title}</h3>
              <blockquote>{activeValue.quote}</blockquote>
              <p>{activeValue.detail}</p>
            </div>
            <div className="values-carousel__controls">
              <button
                type="button"
                aria-label="上一条核心价值"
                onClick={() =>
                  setValueIndex((valueIndex - 1 + values.length) % values.length)
                }
              >
                <ArrowLeft aria-hidden="true" />
              </button>
              <div className="values-dots" aria-label="核心价值选择">
                {values.map((value, index) => (
                  <button
                    type="button"
                    aria-pressed={valueIndex === index}
                    aria-label={`查看${value.title}`}
                    key={value.key}
                    className={valueIndex === index ? "is-active" : ""}
                    onClick={() => setValueIndex(index)}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="下一条核心价值"
                onClick={() => setValueIndex((valueIndex + 1) % values.length)}
              >
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="campus-spirit reveal-item">
          <div className="campus-spirit__image">
            <SmartImage
              src="/media/teacher-student-workshop.jpg"
              alt="师生共同参与学院主题活动"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="campus-spirit__copy">
            <span className="kicker">校风所在</span>
            <h3>自主、开放、协作、行动</h3>
            <p>
              这不是校方发布的固定四字校风，而是从学院活动、社团实践、舞台表达与公共讨论中读到的校园气质：允许不同，也要求每个人为选择负责。
            </p>
            <div className="house-stripes" aria-label="金木水火四大学院">
              <span className="house-stripe house-stripe--gold">金</span>
              <span className="house-stripe house-stripe--green">木</span>
              <span className="house-stripe house-stripe--blue">水</span>
              <span className="house-stripe house-stripe--red">火</span>
            </div>
          </div>
        </div>

        <div className="stories-block">
          <div className="subsection-title reveal-item">
            <span className="kicker">名人故事与学生成长</span>
            <h3>不是“标准答案”，<br />而是各自成立的人生。</h3>
            <p>不制造“名人标签”，只依据校方公开档案，记录真实可核验的成长路径。</p>
          </div>

          <div className="story-grid">
            {cultureStories.map((story, index) => (
              <article className="story-card reveal-item" key={story.title}>
                <div className="story-card__image">
                  <SmartImage
                    src={story.image}
                    alt={story.title}
                    loading="lazy"
                    decoding="async"
                  />
                  <span>0{index + 1}</span>
                  <small>{story.imageNote}</small>
                </div>
                <div className="story-card__copy">
                  <span>{story.type}</span>
                  <small>{story.meta}</small>
                  <h3>{story.title}</h3>
                  <p>{story.description}</p>
                  <a href={story.source} target="_blank" rel="noreferrer">
                    查看校方原文
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="alumni-showcase reveal-item">
          <SmartImage
            sizes="100vw"
            src="/media/student-community.jpg"
            alt="校园师生群像"
            loading="lazy"
            decoding="async"
          />
          <div className="alumni-showcase__veil" />
          <div className="alumni-showcase__copy">
            <span>校友群像</span>
            <h3>从这里走出去，去往更大的世界。</h3>
            <p>
              校友分布在不同国家、学科与行业。比目的地更重要的，是继续保持好奇、同理与行动的能力。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
