"use client";

import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type CorridorJourneyProps = {
  aria: string;
  playAria: string;
  pauseAria: string;
  retryAria: string;
};

type PlaybackState = "idle" | "playing" | "paused" | "error";

export function CorridorJourney({
  aria,
  playAria,
  pauseAria,
  retryAria,
}: CorridorJourneyProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playback, setPlayback] = useState<PlaybackState>("idle");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          if (!video.paused || video.error) return;
          if (video.ended) video.currentTime = 0;
          video.muted = true;
          video.defaultMuted = true;
          video.playsInline = true;
          void video.play().catch(() => setPlayback(video.error ? "error" : "paused"));
          return;
        }

        if (!video.paused) video.pause();
      },
      { threshold: [0, 0.4, 0.8] },
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (!video.paused) {
      video.pause();
      return;
    }

    if (video.ended || playback === "error") {
      video.currentTime = 0;
      if (playback === "error") video.load();
    }

    try {
      video.muted = true;
      video.defaultMuted = true;
      await video.play();
    } catch {
      setPlayback(video.error ? "error" : "paused");
    }
  };

  const buttonAria = playback === "error"
    ? retryAria
    : playback === "playing"
      ? pauseAria
      : playAria;

  return (
    <div className={`corridor-journey reveal-item${playback === "error" ? " has-error" : ""}`}>
      <video
        ref={videoRef}
        muted
        playsInline
        preload="metadata"
        poster="/media/scie-corridor-poster.webp"
        aria-label={aria}
        onPlaying={() => setPlayback("playing")}
        onPause={() => setPlayback((current) => current === "error" ? current : "paused")}
        onEnded={() => setPlayback("paused")}
        onError={() => setPlayback("error")}
      >
        <source
          src="/media/scie-corridor-journey-mobile.mp4"
          media="(max-width: 720px)"
          type="video/mp4"
        />
        <source src="/media/scie-corridor-journey.mp4" type="video/mp4" />
      </video>
      <button
        type="button"
        className="corridor-journey__control"
        onClick={togglePlayback}
        aria-label={buttonAria}
      >
        {playback === "error" ? (
          <RotateCcw aria-hidden="true" />
        ) : playback === "playing" ? (
          <Pause aria-hidden="true" />
        ) : (
          <Play aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
