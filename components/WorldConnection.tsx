"use client";

import { useEffect, useId, useRef, useState } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import type { SiteContent } from "@/lib/content";

type MotionState = {
  pointerX: number;
  pointerY: number;
  scroll: number;
};

const WORLD_MAP_PATH = "/media/world-map.svg";
const EMBLEM_PATH = "/media/scie-emblem.svg";

type WorldConnectionProps = {
  content: SiteContent["worldConnection"];
  emblemAlt: string;
};

export function WorldConnection({ content, emblemAlt }: WorldConnectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motionRef = useRef<MotionState>({ pointerX: 0, pointerY: 0, scroll: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const svgId = useId().replace(/:/g, "");

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);

    updatePreference();
    media.addEventListener("change", updatePreference);

    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas || reducedMotion) return;

    let disposed = false;
    let teardown: (() => void) | undefined;
    let preloadObserver: IntersectionObserver | undefined;

    const initialiseStars = async () => {
      const THREE = await import("@/lib/three-starfield");
      if (disposed) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;

      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: false,
          powerPreference: "low-power",
        });
      } catch {
        canvas.style.display = "none";
        return;
      }

      const isMobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 40);
      const starGroup = new THREE.Group();
      const starCount = isMobile ? 420 : 1050;
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);
      const warm = new THREE.Color("#dfc18b");
      const cool = new THREE.Color("#a6c5d3");

      for (let index = 0; index < starCount; index += 1) {
        const stride = index * 3;
        const radius = 6 + Math.random() * 9;
        const angle = Math.random() * Math.PI * 2;
        const tint = Math.random() > 0.42 ? warm : cool;

        positions[stride] = Math.cos(angle) * radius;
        positions[stride + 1] = (Math.random() - 0.5) * 12;
        positions[stride + 2] = Math.sin(angle) * radius - 3;
        colors[stride] = tint.r;
        colors[stride + 1] = tint.g;
        colors[stride + 2] = tint.b;
      }

      const textureCanvas = document.createElement("canvas");
      textureCanvas.width = 64;
      textureCanvas.height = 64;
      const context = textureCanvas.getContext("2d");

      if (context) {
        const glow = context.createRadialGradient(32, 32, 0, 32, 32, 32);
        glow.addColorStop(0, "rgba(255,255,255,1)");
        glow.addColorStop(0.18, "rgba(255,255,255,.95)");
        glow.addColorStop(0.48, "rgba(255,255,255,.28)");
        glow.addColorStop(1, "rgba(255,255,255,0)");
        context.fillStyle = glow;
        context.fillRect(0, 0, 64, 64);
      }

      const starTexture = new THREE.CanvasTexture(textureCanvas);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: isMobile ? 0.105 : 0.085,
        map: starTexture,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });
      const stars = new THREE.Points(geometry, material);

      starGroup.add(stars);
      scene.add(starGroup);
      camera.position.z = 7.2;

      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const resize = () => {
        const width = section.clientWidth;
        const height = Math.max(1, window.innerHeight);
        const pixelRatio = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);

        renderer.setPixelRatio(pixelRatio);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(section);
      resize();

      const clock = new THREE.Clock();
      let frame = 0;
      let active = false;

      const draw = () => {
        if (!active || disposed) return;

        const elapsed = clock.getElapsedTime();
        const motion = motionRef.current;
        const targetX = motion.pointerX * 0.18;
        const targetY = motion.pointerY * 0.12;

        camera.position.x += (targetX - camera.position.x) * 0.035;
        camera.position.y += (-targetY - camera.position.y) * 0.035;
        camera.position.z = 7.2 + motion.scroll * 1.15;
        starGroup.rotation.y = elapsed * 0.012 + motion.scroll * 0.16;
        starGroup.rotation.x = motion.pointerY * 0.025;
        starGroup.rotation.z = motion.scroll * -0.055;
        material.opacity = 0.7 - motion.scroll * 0.18;

        renderer.render(scene, camera);
        frame = window.requestAnimationFrame(draw);
      };

      const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !active) {
            active = true;
            clock.start();
            frame = window.requestAnimationFrame(draw);
          } else if (!entry.isIntersecting && active) {
            active = false;
            window.cancelAnimationFrame(frame);
          }
        },
        { rootMargin: "20% 0px" },
      );
      intersectionObserver.observe(section);

      const updatePointer = (event: PointerEvent) => {
        if (isMobile) return;
        motionRef.current.pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
        motionRef.current.pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
      };

      const resetPointer = () => {
        motionRef.current.pointerX = 0;
        motionRef.current.pointerY = 0;
      };

      section.addEventListener("pointermove", updatePointer, { passive: true });
      section.addEventListener("pointerleave", resetPointer, { passive: true });

      teardown = () => {
        active = false;
        window.cancelAnimationFrame(frame);
        section.removeEventListener("pointermove", updatePointer);
        section.removeEventListener("pointerleave", resetPointer);
        intersectionObserver.disconnect();
        resizeObserver.disconnect();
        geometry.dispose();
        material.dispose();
        starTexture.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
      };
    };

    if ("IntersectionObserver" in window) {
      preloadObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          preloadObserver?.disconnect();
          void initialiseStars();
        },
        { rootMargin: "100% 0px" },
      );
      preloadObserver.observe(section);
    } else {
      void initialiseStars();
    }

    return () => {
      disposed = true;
      preloadObserver?.disconnect();
      teardown?.();
    };
  }, [reducedMotion]);

  useEffect(() => {
    const section = sectionRef.current;
    const motion = motionRef.current;
    if (!section || reducedMotion) return;

    let cancelled = false;
    let teardown: (() => void) | undefined;
    let preloadObserver: IntersectionObserver | undefined;

    const initialiseScrollStory = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        const mapStage = section.querySelector<HTMLElement>(".wc-map-stage");
        const emblemDisc = section.querySelector<HTMLElement>(".wc-emblem-disc");
        const mergeScale = () => {
          if (!mapStage || !emblemDisc || mapStage.offsetWidth === 0) return 0.225;
          return (emblemDisc.offsetWidth * 0.57) / mapStage.offsetWidth;
        };
        const mergeY = () => {
          if (!mapStage || !emblemDisc) return 0;
          return (
            emblemDisc.offsetTop -
            mapStage.offsetTop -
            mapStage.offsetHeight * 0.5
          );
        };

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.9,
            invalidateOnRefresh: true,
            onUpdate: ({ progress }) => {
              motion.scroll = progress;
              section.style.setProperty("--wc-scroll", progress.toFixed(3));
            },
          },
        });

        timeline
          // Keep the opening message visible as soon as the pinned chapter enters.
          // A scroll-driven fade-in left the first mobile viewport almost empty.
          .set(".wc-intro", { autoAlpha: 1, y: 0 }, 0)
          .fromTo(
            ".wc-map-stage",
            { autoAlpha: 0.62, scale: 0.91 },
            { autoAlpha: 1, scale: 1, duration: 0.14, ease: "power2.out" },
            0.015,
          )
          .fromTo(
            ".wc-map-image",
            { opacity: 0.2 },
            { opacity: 0.4, duration: 0.13 },
            0.035,
          )
          .fromTo(
            ".wc-city-shenzhen",
            { autoAlpha: 0.28 },
            { autoAlpha: 1, duration: 0.055 },
            0.075,
          )
          .fromTo(
            ".wc-route-base",
            { strokeDashoffset: 1 },
            {
              strokeDashoffset: 0,
              duration: 0.2,
              stagger: 0.035,
              ease: "power1.inOut",
            },
            0.13,
          )
          .fromTo(
            ".wc-city-destination",
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.065, stagger: 0.032 },
            0.19,
          )
          .to(
            ".wc-route-flow",
            { opacity: 0.78, duration: 0.09, stagger: 0.02 },
            0.225,
          )
          .fromTo(
            ".wc-network-caption",
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.09 },
            0.29,
          )
          .to(".wc-intro", { autoAlpha: 0, y: -22, duration: 0.1 }, 0.39)
          .to(".wc-scroll-cue", { autoAlpha: 0, duration: 0.07 }, 0.42)
          .to(
            [".wc-route-flow", ".wc-route-base", ".wc-city-destination", ".wc-city-shenzhen"],
            { opacity: 0, duration: 0.13 },
            0.49,
          )
          .to(".wc-network-caption", { autoAlpha: 0, y: -10, duration: 0.08 }, 0.5)
          .to(".wc-map-halo", { opacity: 0, duration: 0.1 }, 0.48)
          .to(
            ".wc-map-stage",
            {
              scale: mergeScale,
              y: mergeY,
              clipPath: "ellipse(49% 48% at 50% 50%)",
              duration: 0.27,
              ease: "power2.inOut",
            },
            0.5,
          )
          .to(
            ".wc-map-image",
            {
              opacity: 0.82,
              filter:
                "brightness(0) saturate(100%) invert(16%) sepia(15%) saturate(2385%) hue-rotate(302deg) brightness(89%) contrast(88%)",
              duration: 0.2,
            },
            0.54,
          )
          .fromTo(
            ".wc-emblem-disc",
            { autoAlpha: 0, scale: 0.74, rotate: -7 },
            { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.2, ease: "power2.out" },
            0.66,
          )
          .fromTo(
            ".wc-emblem-image",
            { opacity: 0 },
            { opacity: 1, duration: 0.16 },
            0.72,
          )
          .to(
            ".wc-map-image",
            { opacity: 0.34, duration: 0.12 },
            0.76,
          )
          .fromTo(
            ".wc-final-copy > *",
            { autoAlpha: 0, y: 18 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.11,
              stagger: 0.035,
              ease: "power2.out",
            },
            0.8,
          )
          .fromTo(
            ".wc-final-line",
            { scaleX: 0 },
            { scaleX: 1, duration: 0.14, ease: "power2.out" },
            0.85,
          )
          .to(".wc-emblem-aura", { opacity: 0.8, scale: 1.08, duration: 0.12 }, 0.86)
          .to(
            ".wc-map-stage",
            {
              autoAlpha: 0,
              scale: () => mergeScale() * 0.96,
              duration: 0.09,
              ease: "power1.out",
            },
            0.89,
          );
      }, section);

      teardown = () => context.revert();
    };

    if ("IntersectionObserver" in window) {
      preloadObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          preloadObserver?.disconnect();
          void initialiseScrollStory();
        },
        { rootMargin: "120% 0px" },
      );
      preloadObserver.observe(section);
    } else {
      void initialiseScrollStory();
    }

    return () => {
      cancelled = true;
      preloadObserver?.disconnect();
      teardown?.();
      motion.scroll = 0;
      section.style.removeProperty("--wc-scroll");
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className={`world-connection${reducedMotion ? " wc-reduced" : ""}`}
      aria-labelledby={`${svgId}-ending-title`}
    >
      <div className="wc-sticky">
        <canvas ref={canvasRef} className="wc-stars" aria-hidden="true" />
        <div className="wc-ambient" aria-hidden="true" />
        <div className="wc-grid" aria-hidden="true" />
        <div className="wc-vignette" aria-hidden="true" />

        <header className="wc-intro">
          <p className="wc-kicker">
            <span>05</span>
            {content.kicker}
          </p>
          <h2 id={`${svgId}-ending-title`}>
            <span>{content.titleLines[0]}</span>
            <span>{content.titleLines[1]}</span>
          </h2>
          <p className="wc-intro-copy">{content.introCopy}</p>
        </header>

        <div className="wc-map-stage">
          <div className="wc-map-halo" aria-hidden="true" />
          <SmartImage className="wc-map-image" src={WORLD_MAP_PATH} alt="" draggable="false" />

          <svg
            className="wc-routes"
            viewBox="0 0 784 459"
            role="img"
            aria-label={content.routesAria}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id={`${svgId}-route-gradient`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#fff1c8" />
                <stop offset="0.55" stopColor="#d9b672" />
                <stop offset="1" stopColor="#8fc5d2" />
              </linearGradient>
              <filter id={`${svgId}-route-glow`} x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="3.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id={`${svgId}-point-glow`} x="-300%" y="-300%" width="700%" height="700%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g className="wc-route-set" fill="none" pathLength={1}>
              <path
                className="wc-route-base"
                pathLength="1"
                d="M641 225 Q515 45 384 147"
                stroke={`url(#${svgId}-route-gradient)`}
              />
              <path
                className="wc-route-base"
                pathLength="1"
                d="M641 225 Q430 -5 195 163"
                stroke={`url(#${svgId}-route-gradient)`}
              />
              <path
                className="wc-route-base"
                pathLength="1"
                d="M641 225 Q676 143 709 178"
                stroke={`url(#${svgId}-route-gradient)`}
              />
              <path
                className="wc-route-base"
                pathLength="1"
                d="M641 225 Q620 258 639 282"
                stroke={`url(#${svgId}-route-gradient)`}
              />

              <path className="wc-route-flow wc-flow-one" pathLength="1" d="M641 225 Q515 45 384 147" />
              <path className="wc-route-flow wc-flow-two" pathLength="1" d="M641 225 Q430 -5 195 163" />
              <path className="wc-route-flow wc-flow-three" pathLength="1" d="M641 225 Q676 143 709 178" />
              <path className="wc-route-flow wc-flow-four" pathLength="1" d="M641 225 Q620 258 639 282" />
            </g>

            <g transform="translate(641 225)">
              <g className="wc-city wc-city-shenzhen">
                <circle className="wc-city-orbit" r="15" />
                <circle className="wc-city-orbit wc-city-orbit-delay" r="10" />
                <circle
                  className="wc-shenzhen-core"
                  r="4.2"
                  filter={`url(#${svgId}-point-glow)`}
                />
                <text className="wc-city-name wc-city-name-primary" x="-12" y="-13" textAnchor="end">
                  {content.cities.shenzhen}
                </text>
              </g>
            </g>

            <g transform="translate(384 147)">
              <g className="wc-city wc-city-destination">
                <circle className="wc-city-point" r="3" />
                <circle className="wc-city-ring" r="7" />
                <text className="wc-city-name" x="-10" y="-10" textAnchor="end">
                  {content.cities.london}
                </text>
              </g>
            </g>
            <g transform="translate(195 163)">
              <g className="wc-city wc-city-destination">
                <circle className="wc-city-point" r="3" />
                <circle className="wc-city-ring" r="7" />
                <text className="wc-city-name" x="-10" y="-10" textAnchor="end">
                  {content.cities.newYork}
                </text>
              </g>
            </g>
            <g transform="translate(709 178)">
              <g className="wc-city wc-city-destination">
                <circle className="wc-city-point" r="3" />
                <circle className="wc-city-ring" r="7" />
                <text className="wc-city-name" x="-10" y="-10" textAnchor="end">
                  {content.cities.tokyo}
                </text>
              </g>
            </g>
            <g transform="translate(639 282)">
              <g className="wc-city wc-city-destination">
                <circle className="wc-city-point" r="3" />
                <circle className="wc-city-ring" r="7" />
                <text className="wc-city-name" x="11" y="18">
                  {content.cities.singapore}
                </text>
              </g>
            </g>
          </svg>

          <div className="wc-network-caption">
            <span className="wc-network-dot" aria-hidden="true" />
            {content.networkCaption}
          </div>
        </div>

        <div className="wc-emblem-stage">
          <div className="wc-emblem-aura" aria-hidden="true" />
          <div className="wc-emblem-disc">
            <div className="wc-emblem-shine" aria-hidden="true" />
            <SmartImage
              className="wc-emblem-image"
              src={EMBLEM_PATH}
              alt={emblemAlt}
              draggable="false"
            />
          </div>

          <div className="wc-final-copy">
            <p className="wc-final-kicker">{content.finalKicker}</p>
            <h3>{content.finalTitle}</h3>
            <span className="wc-final-line" aria-hidden="true" />
            <p>
              {content.finalLines[0]}
              <br />
              {content.finalLines[1]}
            </p>
          </div>
        </div>

        <div className="wc-scroll-cue" aria-hidden="true">
          <span>{content.scrollCue}</span>
          <i />
        </div>

        <div className="wc-progress-rail" aria-hidden="true">
          <span>{content.progress}</span>
          <i>
            <b />
          </i>
        </div>

        <noscript>
          <div className="wc-noscript">
            <strong>{content.noscriptTitle}</strong>
            <span>{content.noscriptBody}</span>
          </div>
        </noscript>
      </div>

      <style>{`
        .world-connection {
          --wc-ivory: #f4eee3;
          --wc-gold: #d9b879;
          --wc-burgundy: #6f2e38;
          --wc-scroll: 0;
          position: relative;
          min-height: 430vh;
          background: #050707;
          color: var(--wc-ivory);
          isolation: isolate;
        }

        .wc-sticky {
          position: sticky;
          top: 0;
          width: 100%;
          height: 100vh;
          height: 100svh;
          min-height: 560px;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 52%, rgba(57, 48, 35, 0.2), transparent 42%),
            linear-gradient(150deg, #090d0d 0%, #050707 56%, #0d0809 100%);
        }

        .wc-stars,
        .wc-ambient,
        .wc-grid,
        .wc-vignette,
        .wc-emblem-stage {
          position: absolute;
          inset: 0;
        }

        .wc-stars {
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.9;
        }

        .wc-ambient {
          pointer-events: none;
          background:
            radial-gradient(circle at 80% 26%, rgba(111, 46, 56, 0.16), transparent 30%),
            radial-gradient(circle at 22% 72%, rgba(82, 118, 124, 0.1), transparent 32%);
          opacity: calc(0.7 + var(--wc-scroll) * 0.3);
        }

        .wc-grid {
          pointer-events: none;
          opacity: 0.18;
          background-image:
            linear-gradient(rgba(223, 196, 143, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(223, 196, 143, 0.05) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(circle at center, #000 0%, transparent 72%);
          transform: perspective(700px) rotateX(64deg) translateY(58%);
          transform-origin: 50% 100%;
        }

        .wc-vignette {
          pointer-events: none;
          z-index: 12;
          box-shadow: inset 0 0 15vw 3vw rgba(0, 0, 0, 0.82);
        }

        .wc-intro {
          position: absolute;
          z-index: 6;
          top: max(54px, 7.5svh);
          left: 50%;
          width: min(760px, calc(100% - 48px));
          translate: -50% 0;
          text-align: center;
        }

        .wc-kicker,
        .wc-final-kicker {
          margin: 0 0 14px;
          color: var(--wc-gold);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.34em;
        }

        .wc-kicker span {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-right: 12px;
          color: rgba(244, 238, 227, 0.48);
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.12em;
        }

        .wc-kicker span::after {
          width: 28px;
          height: 1px;
          content: "";
          background: rgba(217, 184, 121, 0.55);
        }

        .wc-intro h2 {
          margin: 0;
          color: #f8f3e9;
          font-family: "Noto Serif SC", "Songti SC", STSong, serif;
          font-size: clamp(40px, 5vw, 72px);
          font-weight: 500;
          line-height: 1.08;
          letter-spacing: 0.05em;
          text-wrap: balance;
          text-shadow: 0 8px 34px rgba(0, 0, 0, 0.48);
        }

        .wc-intro h2 span:last-child {
          color: #dfc48f;
        }

        .wc-intro-copy {
          max-width: 520px;
          margin: 16px auto 0;
          color: rgba(244, 238, 227, 0.64);
          font-size: clamp(13px, 1.1vw, 16px);
          line-height: 1.8;
          letter-spacing: 0.08em;
        }

        .wc-map-stage {
          position: absolute;
          z-index: 5;
          top: 54%;
          left: 50%;
          width: min(72vw, 940px);
          aspect-ratio: 784 / 459;
          translate: -50% -50%;
          transform-origin: 50% 50%;
          perspective: 900px;
          clip-path: ellipse(72% 72% at 50% 50%);
          will-change: transform, opacity, clip-path;
        }

        .wc-map-halo {
          position: absolute;
          inset: -22%;
          border-radius: 50%;
          pointer-events: none;
          background: radial-gradient(circle, rgba(217, 184, 121, 0.1), transparent 65%);
          filter: blur(14px);
        }

        .wc-map-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          user-select: none;
          opacity: 0.4;
          filter:
            brightness(0)
            saturate(100%)
            invert(83%)
            sepia(19%)
            saturate(887%)
            hue-rotate(358deg)
            brightness(95%)
            drop-shadow(0 0 16px rgba(217, 184, 121, 0.15));
        }

        .wc-routes {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .wc-route-base {
          stroke-width: 1.25;
          stroke-linecap: round;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          vector-effect: non-scaling-stroke;
          filter: url(#${svgId}-route-glow);
        }

        .wc-route-flow {
          stroke: rgba(255, 247, 220, 0.98);
          stroke-width: 1.7;
          stroke-linecap: round;
          stroke-dasharray: 0.018 0.075;
          vector-effect: non-scaling-stroke;
          opacity: 0;
          animation: wc-route-travel 2.8s linear infinite;
        }

        .wc-flow-two { animation-delay: -0.9s; }
        .wc-flow-three { animation-delay: -1.65s; }
        .wc-flow-four { animation-delay: -2.2s; }

        .wc-city {
          opacity: 0;
          color: #f7dfaa;
        }

        .wc-city-shenzhen {
          opacity: 1;
        }

        .wc-shenzhen-core,
        .wc-city-point {
          fill: #ffe4a8;
        }

        .wc-city-orbit,
        .wc-city-ring {
          fill: none;
          stroke: rgba(245, 211, 148, 0.75);
          stroke-width: 1;
          vector-effect: non-scaling-stroke;
        }

        .wc-city-orbit {
          transform-origin: center;
          animation: wc-city-pulse 2.5s ease-out infinite;
        }

        .wc-city-orbit-delay {
          animation-delay: -1.25s;
        }

        .wc-city-ring {
          opacity: 0.52;
        }

        .wc-city-name {
          fill: rgba(245, 238, 223, 0.78);
          font-family: "Noto Sans SC", "PingFang SC", sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          paint-order: stroke;
          stroke: rgba(5, 7, 7, 0.84);
          stroke-width: 3px;
          stroke-linejoin: round;
        }

        .wc-city-name-primary {
          fill: #f4d496;
          font-size: 12px;
          font-weight: 650;
        }

        .wc-network-caption {
          position: absolute;
          bottom: -34px;
          left: 50%;
          display: flex;
          align-items: center;
          gap: 9px;
          translate: -50% 0;
          color: rgba(244, 238, 227, 0.58);
          font-size: 11px;
          letter-spacing: 0.24em;
          white-space: nowrap;
          opacity: 0;
        }

        .wc-network-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--wc-gold);
          box-shadow: 0 0 10px var(--wc-gold);
          animation: wc-caption-blink 1.6s ease-in-out infinite;
        }

        .wc-emblem-stage {
          z-index: 4;
          pointer-events: none;
        }

        .wc-emblem-aura {
          position: absolute;
          top: 42%;
          left: 50%;
          width: clamp(260px, 38vw, 480px);
          aspect-ratio: 1;
          translate: -50% -50%;
          border: 1px solid rgba(217, 184, 121, 0.16);
          border-radius: 50%;
          opacity: 0;
          background: radial-gradient(circle, rgba(217, 184, 121, 0.1), transparent 64%);
          box-shadow: 0 0 100px rgba(111, 46, 56, 0.17);
        }

        .wc-emblem-aura::before,
        .wc-emblem-aura::after {
          position: absolute;
          border: 1px solid rgba(217, 184, 121, 0.1);
          border-radius: inherit;
          content: "";
        }

        .wc-emblem-aura::before { inset: -9%; }
        .wc-emblem-aura::after { inset: -18%; }

        .wc-emblem-disc {
          position: absolute;
          top: 42%;
          left: 50%;
          display: grid;
          width: clamp(230px, 31vw, 380px);
          aspect-ratio: 1;
          place-items: center;
          translate: -50% -50%;
          transform-origin: center;
          overflow: hidden;
          border: 1px solid rgba(255, 251, 242, 0.62);
          border-radius: 50%;
          background:
            radial-gradient(circle at 36% 28%, #fffdf8 0%, #f6efe3 52%, #e6d7c0 100%);
          box-shadow:
            0 26px 90px rgba(0, 0, 0, 0.48),
            0 0 0 7px rgba(217, 184, 121, 0.045),
            0 0 70px rgba(217, 184, 121, 0.16);
          opacity: 0;
        }

        .wc-emblem-image {
          position: relative;
          z-index: 2;
          display: block;
          width: 91%;
          height: 91%;
          object-fit: contain;
          user-select: none;
          opacity: 0;
          filter:
            brightness(0)
            saturate(100%)
            invert(16%)
            sepia(15%)
            saturate(2385%)
            hue-rotate(302deg)
            brightness(89%)
            contrast(88%);
        }

        .wc-emblem-shine {
          position: absolute;
          z-index: 3;
          inset: -35%;
          pointer-events: none;
          background: linear-gradient(105deg, transparent 38%, rgba(255,255,255,.44) 48%, transparent 58%);
          transform: translateX(-70%) rotate(7deg);
          animation: wc-emblem-shine 7s ease-in-out infinite 1.8s;
        }

        .wc-final-copy {
          position: absolute;
          top: calc(42% + clamp(145px, 18vw, 218px));
          left: 50%;
          width: min(680px, calc(100% - 48px));
          translate: -50% 0;
          text-align: center;
        }

        .wc-final-copy > * {
          opacity: 0;
        }

        .wc-final-kicker {
          margin-bottom: 8px;
          font-size: 11px;
        }

        .wc-final-copy h3 {
          margin: 0;
          color: #f8f3e9;
          font-family: "Noto Serif SC", "Songti SC", STSong, serif;
          font-size: clamp(26px, 3vw, 42px);
          font-weight: 500;
          line-height: 1.25;
          letter-spacing: 0.08em;
          text-wrap: balance;
        }

        .wc-final-line {
          display: block;
          width: 44px;
          height: 1px;
          margin: 16px auto;
          transform-origin: center;
          background: linear-gradient(90deg, transparent, var(--wc-gold), transparent);
        }

        .wc-final-copy > p:last-child {
          margin: 0;
          color: rgba(244, 238, 227, 0.63);
          font-size: clamp(12px, 1vw, 15px);
          line-height: 1.85;
          letter-spacing: 0.08em;
        }

        .wc-scroll-cue {
          position: absolute;
          z-index: 8;
          bottom: 24px;
          left: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 9px;
          translate: -50% 0;
          color: rgba(244, 238, 227, 0.4);
          font-size: 10px;
          letter-spacing: 0.2em;
        }

        .wc-scroll-cue i {
          position: relative;
          display: block;
          width: 1px;
          height: 28px;
          overflow: hidden;
          background: rgba(244, 238, 227, 0.15);
        }

        .wc-scroll-cue i::after {
          position: absolute;
          inset: 0;
          content: "";
          background: linear-gradient(transparent, var(--wc-gold), transparent);
          animation: wc-scroll-guide 1.8s ease-in-out infinite;
        }

        .wc-progress-rail {
          position: absolute;
          z-index: 8;
          top: 50%;
          right: clamp(18px, 2.8vw, 46px);
          display: flex;
          align-items: center;
          gap: 11px;
          translate: 0 -50%;
          writing-mode: vertical-rl;
        }

        .wc-progress-rail > span {
          color: rgba(244, 238, 227, 0.32);
          font-size: 9px;
          letter-spacing: 0.32em;
        }

        .wc-progress-rail > i {
          position: relative;
          display: block;
          width: 1px;
          height: 96px;
          overflow: hidden;
          background: rgba(244, 238, 227, 0.12);
        }

        .wc-progress-rail b {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(var(--wc-gold), rgba(111, 46, 56, 0.8));
          transform: scaleY(var(--wc-scroll));
          transform-origin: top;
        }

        .wc-noscript {
          position: absolute;
          z-index: 20;
          inset: 0;
          display: grid;
          align-content: center;
          justify-items: center;
          gap: 14px;
          padding: 32px;
          text-align: center;
          background: #070909;
        }

        .wc-noscript strong {
          font-family: "Noto Serif SC", "Songti SC", serif;
          font-size: clamp(28px, 5vw, 56px);
          font-weight: 500;
        }

        .wc-noscript span {
          color: rgba(244, 238, 227, 0.62);
          letter-spacing: 0.08em;
        }

        .wc-reduced {
          min-height: 100svh;
        }

        .wc-reduced .wc-stars,
        .wc-reduced .wc-map-stage,
        .wc-reduced .wc-intro,
        .wc-reduced .wc-scroll-cue,
        .wc-reduced .wc-progress-rail {
          display: none;
        }

        .wc-reduced .wc-emblem-aura,
        .wc-reduced .wc-emblem-disc,
        .wc-reduced .wc-emblem-image,
        .wc-reduced .wc-final-copy > * {
          visibility: visible !important;
          opacity: 1 !important;
          transform: none !important;
        }

        @keyframes wc-route-travel {
          to { stroke-dashoffset: -0.93; }
        }

        @keyframes wc-city-pulse {
          0% { opacity: 0.9; transform: scale(0.35); }
          75%, 100% { opacity: 0; transform: scale(1.45); }
        }

        @keyframes wc-caption-blink {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }

        @keyframes wc-emblem-shine {
          0%, 58% { transform: translateX(-70%) rotate(7deg); opacity: 0; }
          68% { opacity: 0.75; }
          82%, 100% { transform: translateX(70%) rotate(7deg); opacity: 0; }
        }

        @keyframes wc-scroll-guide {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @media (max-width: 900px) {
          .wc-map-stage {
            top: 54%;
            width: min(106vw, 790px);
          }

          .wc-progress-rail {
            display: none;
          }

          .wc-intro {
            top: max(52px, 7svh);
          }

          .wc-network-caption {
            bottom: -28px;
          }
        }

        @media (max-width: 600px) {
          .world-connection {
            min-height: 390vh;
          }

          .wc-sticky {
            min-height: 520px;
          }

          .wc-grid {
            background-size: 52px 52px;
            opacity: 0.14;
          }

          .wc-intro {
            top: max(44px, 6.5svh);
            width: calc(100% - 32px);
          }

          .wc-kicker {
            margin-bottom: 11px;
            font-size: 11px;
          }

          .wc-kicker span::after {
            width: 20px;
          }

          .wc-intro h2 {
            font-size: clamp(36px, 11vw, 52px);
            line-height: 1.12;
          }

          .wc-intro-copy {
            max-width: 330px;
            margin-top: 12px;
            font-size: 13px;
            line-height: 1.7;
          }

          .wc-map-stage {
            top: 54%;
            width: 116vw;
          }

          .wc-city-name {
            font-size: 10px;
            letter-spacing: 0.08em;
          }

          .wc-city-name-primary {
            font-size: 11px;
          }

          .wc-route-base {
            stroke-width: 1;
          }

          .wc-route-flow {
            stroke-width: 1.25;
          }

          .wc-network-caption {
            bottom: -22px;
            font-size: 10px;
          }

          .wc-emblem-disc {
            top: 39%;
            width: min(72vw, 300px);
          }

          .wc-emblem-aura {
            top: 39%;
            width: min(84vw, 350px);
          }

          .wc-final-copy {
            top: calc(39% + min(42vw, 174px));
            width: calc(100% - 32px);
          }

          .wc-final-kicker {
            margin-bottom: 7px;
            font-size: 10px;
          }

          .wc-final-copy h3 {
            font-size: clamp(24px, 7.4vw, 32px);
          }

          .wc-final-line {
            margin: 12px auto;
          }

          .wc-final-copy > p:last-child {
            font-size: 13px;
            line-height: 1.75;
          }

          .wc-scroll-cue {
            bottom: max(14px, env(safe-area-inset-bottom));
          }
        }

        @media (max-width: 600px) and (max-height: 650px) and (orientation: landscape) {
          .world-connection {
            min-height: 360vh;
          }

          .wc-sticky {
            min-height: 100svh;
          }

          .wc-intro {
            top: calc(var(--header-height) + 6px);
            width: calc(100% - 48px);
          }

          .wc-kicker {
            margin-bottom: 5px;
            font-size: 10px;
          }

          .wc-intro-copy {
            max-width: 440px;
            margin-top: 6px;
            font-size: 12.5px;
            line-height: 1.45;
          }

          .wc-map-stage {
            top: 58%;
            width: 80vw;
          }

          .wc-network-caption {
            bottom: 18px;
            font-size: 10px;
          }

          .wc-emblem-disc {
            top: 45%;
            width: min(42vh, 168px);
          }

          .wc-emblem-aura {
            top: 45%;
            width: min(50vh, 196px);
          }

          .wc-final-copy {
            top: calc(45% + min(20vh, 64px));
            width: calc(100% - 40px);
          }

          .wc-final-kicker {
            margin-bottom: 4px;
            font-size: 10px;
          }

          .wc-final-copy h3 {
            font-size: clamp(20px, 7vh, 24px);
          }

          .wc-final-line {
            margin: 8px auto;
          }

          .wc-final-copy > p:last-child {
            font-size: 12px;
            line-height: 1.45;
          }

          .wc-scroll-cue {
            display: none;
          }
        }

        @media (max-height: 680px) and (min-width: 601px) {
          .wc-intro {
            top: 34px;
          }

          .wc-intro h2 {
            font-size: clamp(36px, 7vh, 54px);
          }

          .wc-map-stage {
            top: 56%;
            width: min(69vw, 760px);
          }

          .wc-emblem-disc {
            width: min(48vh, 310px);
          }

          .wc-emblem-aura {
            width: min(58vh, 370px);
          }

          .wc-final-copy {
            top: calc(42% + min(26vh, 174px));
          }

          .wc-final-copy h3 {
            font-size: clamp(24px, 5vh, 34px);
          }

          .wc-final-line {
            margin: 10px auto;
          }

          .wc-scroll-cue {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .world-connection {
            min-height: 100svh;
          }

          .world-connection *,
          .world-connection *::before,
          .world-connection *::after {
            scroll-behavior: auto !important;
            animation: none !important;
            transition: none !important;
          }

          .wc-stars,
          .wc-map-stage,
          .wc-intro,
          .wc-scroll-cue,
          .wc-progress-rail {
            display: none !important;
          }

          .wc-emblem-aura,
          .wc-emblem-disc,
          .wc-emblem-image,
          .wc-final-copy > * {
            visibility: visible !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}

export default WorldConnection;
