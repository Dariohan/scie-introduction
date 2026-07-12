"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { OverviewSection } from "@/components/sections/OverviewSection";
import { LandmarksSection } from "@/components/sections/LandmarksSection";
import { CultureSection } from "@/components/sections/CultureSection";
import { LifeSection } from "@/components/sections/LifeSection";
import { FutureSection } from "@/components/sections/FutureSection";

export function SchoolExperience() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const initialiseMotion = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        gsap.fromTo(
          ".hero .reveal-item",
          { y: 34, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.15,
            stagger: 0.11,
            ease: "power3.out",
            delay: 0.2,
          },
        );

        gsap.utils
          .toArray<HTMLElement>(".reveal-item:not(.hero .reveal-item)")
          .forEach((element) => {
            gsap.fromTo(
              element,
              { y: 42, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 88%",
                  once: true,
                },
              },
            );
          });
      });
      cleanup = () => context.revert();
    };

    void initialiseMotion();
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(scrollY > innerHeight * 1.4);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="site-root">
      <SiteHeader />
      <main>
        <OverviewSection />
        <LandmarksSection />
        <CultureSection />
        <LifeSection />
        <FutureSection />
      </main>
      <button
        type="button"
        className={`back-to-top${showTop ? " is-visible" : ""}`}
        onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="返回页面顶部"
      >
        <ArrowUp aria-hidden="true" />
        <span>回到顶部</span>
      </button>
    </div>
  );
}
