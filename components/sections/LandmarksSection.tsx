"use client";

import {
  ArrowLeft,
  ArrowRight,
  LoaderCircle,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { useRef, useState } from "react";
import type { SiteContent } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { RednoteLink } from "@/components/ui/RednoteLink";

type VideoStatus = "idle" | "loading" | "playing" | "paused" | "stalled" | "error";

type LandmarksSectionProps = {
  content: SiteContent["landmarks"];
};

export function LandmarksSection({ content }: LandmarksSectionProps) {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [videoStatus, setVideoStatus] = useState<VideoStatus>("idle");
  const videoRef = useRef<HTMLVideoElement>(null);

  const { gallery, video } = content;

  const changeSlide = (direction: number) => {
    setGalleryIndex((current) =>
      (current + direction + gallery.items.length) % gallery.items.length,
    );
  };

  const toggleVideo = async () => {
    const player = videoRef.current;
    if (!player) return;

    if (videoStatus === "error") {
      setVideoStatus("loading");
      player.load();
      try {
        await player.play();
      } catch {
        setVideoStatus("error");
      }
      return;
    }

    if (player.paused) {
      setVideoStatus("loading");
      try {
        await player.play();
      } catch {
        setVideoStatus("error");
      }
    } else {
      player.pause();
    }
  };

  const selected = gallery.items[galleryIndex];
  const isPlaying = videoStatus === "playing";
  const isLoading = videoStatus === "loading" || videoStatus === "stalled";
  const videoButtonLabel =
    videoStatus === "error" ? video.retry : isPlaying ? video.pause : isLoading ? video.loading : video.play;
  const videoStatusLabel =
    videoStatus === "error"
      ? video.error
      : videoStatus === "stalled"
        ? video.stalled
        : videoStatus === "loading"
          ? video.loading
          : "";

  return (
    <section id="landmarks" className="landmarks-section section-dark">
      <div className="section-shell">
        <SectionHeading
          {...content.heading}
          inverted
        />

        <div className="landmark-feature reveal-item">
          <div className="landmark-feature__image">
            <SmartImage
              src="/media/scie-starlight-avenue.webp"
              alt={content.feature.imageAlt}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 900px) 100vw, 64vw"
            />
            <span>{content.feature.badge}</span>
          </div>
          <blockquote>
            <span>“</span>
            <p>{content.feature.quote}</p>
            <footer>{content.feature.source}</footer>
          </blockquote>
        </div>

        <div className="gallery-block">
          <div className="subsection-title subsection-title--light reveal-item">
            <span className="kicker">{gallery.kicker}</span>
            <h3>{gallery.titleLines[0]}<br />{gallery.titleLines[1]}</h3>
          </div>

          <div className="gallery-viewer reveal-item">
            <div className="gallery-stage">
              {gallery.items.map((item, index) => (
                <figure
                  key={item.src}
                  className={galleryIndex === index ? "is-active" : ""}
                  aria-hidden={galleryIndex !== index}
                >
                  <SmartImage
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 90vw, 92vw"
                  />
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
                <span>/ {String(gallery.items.length).padStart(2, "0")}</span>
              </div>
            </div>

            <div className="gallery-controls">
              <button type="button" onClick={() => changeSlide(-1)} aria-label={gallery.previousAria}>
                <ArrowLeft aria-hidden="true" />
              </button>
              <div className="gallery-thumbs" aria-label={gallery.selectorAria}>
                {gallery.items.map((item, index) => (
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
              <button type="button" onClick={() => changeSlide(1)} aria-label={gallery.nextAria}>
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>

          <RednoteLink {...content.rednote} inverted />
        </div>

        <div className="panorama-block">
          <div className="panorama-copy reveal-item">
            <span className="kicker">{content.panorama.kicker}</span>
            <h3>{content.panorama.title}</h3>
            <p>{content.panorama.body}</p>
          </div>

          <figure className="panorama-view reveal-item">
            <SmartImage
              src="/media/scie-campus-walkway.webp"
              alt={content.panorama.imageAlt}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 900px) 100vw, 70vw"
            />
            <figcaption>
              <span>{content.panorama.captionLabel}</span>
              <strong>{content.panorama.captionTitle}</strong>
            </figcaption>
          </figure>
        </div>

        <div className="city-and-video">
          <div className="city-card reveal-item">
            <SmartImage
              className="city-card__backdrop"
              src="/media/scie-shenzhen-night.webp"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <span className="kicker">{content.city.kicker}</span>
            <h3>{content.city.title}</h3>
            <div className="city-landmarks">
              {content.city.places.map((item) => (
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

          <div className={`video-card reveal-item${videoStatus === "error" ? " has-error" : ""}`}>
            <SmartImage
              className="video-card__fallback"
              src="/media/scie-emblem-fallback.jpg"
              alt=""
              aria-hidden="true"
            />
            <video
              id="emblem-motion-study"
              ref={videoRef}
              muted
              playsInline
              loop
              preload="metadata"
              poster="/media/scie-emblem-fallback.jpg"
              onLoadStart={() => setVideoStatus("loading")}
              onLoadedMetadata={() => setVideoStatus((current) => current === "playing" ? current : "idle")}
              onLoadedData={() => setVideoStatus((current) => current === "playing" ? current : "idle")}
              onCanPlay={() => setVideoStatus((current) => current === "playing" ? current : "idle")}
              onPlaying={() => setVideoStatus("playing")}
              onPause={() => setVideoStatus((current) => current === "error" ? current : "paused")}
              onWaiting={() => setVideoStatus("loading")}
              onStalled={() => setVideoStatus("stalled")}
              onError={() => setVideoStatus("error")}
              aria-label={video.aria}
              aria-describedby="emblem-motion-status"
            >
              <source src="/media/emblem-study.mp4" type="video/mp4" />
            </video>
            <div className="video-card__overlay">
              <span>{video.kicker}</span>
              <h3>{video.title}</h3>
              <p>{video.body}</p>
              <span
                id="emblem-motion-status"
                className="video-card__status"
                role="status"
                aria-live="polite"
              >
                {videoStatusLabel}
              </span>
              <button
                type="button"
                onClick={toggleVideo}
                aria-controls="emblem-motion-study"
              >
                {videoStatus === "error" ? (
                  <RotateCcw aria-hidden="true" />
                ) : isLoading ? (
                  <LoaderCircle className="is-spinning" aria-hidden="true" />
                ) : isPlaying ? (
                  <Pause aria-hidden="true" />
                ) : (
                  <Play aria-hidden="true" />
                )}
                {videoButtonLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
