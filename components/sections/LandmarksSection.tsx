"use client";

import {
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
} from "lucide-react";
import { useRef, useState } from "react";
import { campusGallery, cityLandmarks, rednotePosts } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { RednoteLink } from "@/components/ui/RednoteLink";

export function LandmarksSection() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const changeSlide = (direction: number) => {
    setGalleryIndex((current) =>
      (current + direction + campusGallery.length) % campusGallery.length,
    );
  };

  const toggleVideo = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      await video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const selected = campusGallery[galleryIndex];

  return (
    <section id="landmarks" className="landmarks-section section-dark">
      <div className="section-shell">
        <SectionHeading
          number="02"
          eyebrow="地标与风景"
          title="建筑让人向上，风景让时间慢下来"
          description="穿过连廊、台阶与垂直花园，校园以一种独属于深圳的方式，把密度、自然与日常叠在一起。"
          inverted
        />

        <div className="landmark-feature reveal-item">
          <div className="landmark-feature__image">
            <SmartImage
              src="/media/campus-starlight-stairs.jpg"
              alt="星光大道台阶与空中连廊"
              loading="lazy"
              decoding="async"
            />
            <span>标志空间 · 星光大道</span>
          </div>
          <blockquote>
            <span>“</span>
            <p>踏上这段台阶，才能通往教学楼。此时，你永远都在往上走。</p>
            <footer>来自校园素材中的一句话</footer>
          </blockquote>
        </div>

        <div className="gallery-block">
          <div className="subsection-title subsection-title--light reveal-item">
            <span className="kicker">互动影像馆</span>
            <h3>把校园的光，<br />一帧一帧收藏。</h3>
          </div>

          <div className="gallery-viewer reveal-item">
            <div className="gallery-stage">
              {campusGallery.map((item, index) => (
                <figure
                  key={item.src}
                  className={galleryIndex === index ? "is-active" : ""}
                  aria-hidden={galleryIndex !== index}
                >
                  <SmartImage src={item.src} alt={item.title} loading="lazy" decoding="async" />
                </figure>
              ))}
              <div className="gallery-stage__shade" />
              <div className="gallery-stage__copy" aria-live="polite">
                <span>{selected.tag}</span>
                <h3>{selected.title}</h3>
                <p>{selected.caption}</p>
              </div>
              <div className="gallery-stage__count">
                <strong>{String(galleryIndex + 1).padStart(2, "0")}</strong>
                <span>/ {String(campusGallery.length).padStart(2, "0")}</span>
              </div>
            </div>

            <div className="gallery-controls">
              <button type="button" onClick={() => changeSlide(-1)} aria-label="上一张校园照片">
                <ArrowLeft aria-hidden="true" />
              </button>
              <div className="gallery-thumbs" aria-label="校园照片选择">
                {campusGallery.map((item, index) => (
                  <button
                    type="button"
                    aria-pressed={galleryIndex === index}
                    key={item.src}
                    className={galleryIndex === index ? "is-active" : ""}
                    onClick={() => setGalleryIndex(index)}
                  >
                    <SmartImage
                      src={item.src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      sizes="120px"
                    />
                    <span>{item.title}</span>
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => changeSlide(1)} aria-label="下一张校园照片">
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>

          <RednoteLink {...rednotePosts.campus} inverted />
        </div>

        <div className="panorama-block">
          <div className="panorama-copy reveal-item">
            <span className="kicker">校园实景</span>
            <h3>抬头，看见树冠、连廊与天空。</h3>
            <p>
              连廊穿过树冠，阳光落进校园中庭。一张真实照片，保留此刻最完整的空间与光线。
            </p>
          </div>

          <figure className="panorama-view reveal-item">
            <SmartImage
              src="/media/campus-tree-canopy.jpg"
              alt="树荫与空中连廊实景"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <span>校园实景</span>
              <strong>树冠、连廊与天空</strong>
            </figcaption>
          </figure>
        </div>

        <div className="city-and-video">
          <div className="city-card reveal-item">
            <span className="kicker">深圳城市名片</span>
            <h3>校园之外，整座城市都是第二课堂。</h3>
            <div className="city-landmarks">
              {cityLandmarks.map((item) => (
                <article key={item.name}>
                  <span>{item.index}</span>
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="video-card reveal-item">
            <video
              ref={videoRef}
              src="/media/emblem-study.mp4"
              muted
              playsInline
              loop
              preload="metadata"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              aria-label="校徽视觉动效档案"
            />
            <div className="video-card__overlay">
              <span>视觉档案</span>
              <h3>校徽图形演绎</h3>
              <p>这里展示素材中的视觉研究；终章则由实时网页技术重新实现。</p>
              <button type="button" onClick={toggleVideo}>
                {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
                {playing ? "暂停" : "播放"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
