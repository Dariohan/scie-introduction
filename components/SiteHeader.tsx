"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import type { SiteContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
  content: SiteContent;
};

const readingMarkerRatio = 0.38;
const languageViewParameter = "view";
const defaultEntryParameter = "entry";
const defaultEntryValue = "cover";

export function SiteHeader({ locale, content }: SiteHeaderProps) {
  const navigation = content.navigation;
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(navigation[0]?.id ?? "overview");
  const [progress, setProgress] = useState(0);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    let frame = 0;

    const updateScrollState = () => {
      const scrollable = document.documentElement.scrollHeight - innerHeight;
      setProgress(scrollable > 0 ? (scrollY / scrollable) * 100 : 0);
      setSolid(scrollY > 48);

      const marker = innerHeight * readingMarkerRatio;
      const current = sections
        .filter((section) => section.getBoundingClientRect().top <= marker)
        .at(-1);
      if (current) setActive(current.id);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        updateScrollState();
      });
    };

    updateScrollState();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [navigation]);

  useEffect(() => {
    const entryUrl = new URL(location.href);
    if (
      locale !== "en" ||
      entryUrl.searchParams.get(defaultEntryParameter) !== defaultEntryValue
    ) {
      return;
    }

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    const previousScrollRestoration = history.scrollRestoration;
    let cleanedUrl = false;
    let restoredScrollPolicy = false;

    const showEnglishCover = () => {
      root.style.scrollBehavior = "auto";
      scrollTo({ top: 0, left: 0, behavior: "auto" });
      root.style.scrollBehavior = previousScrollBehavior;

      if (!cleanedUrl) {
        entryUrl.searchParams.delete(defaultEntryParameter);
        entryUrl.hash = "";
        history.replaceState(
          history.state,
          "",
          `${entryUrl.pathname}${entryUrl.search}`,
        );
        cleanedUrl = true;
      }
    };

    const restoreScrollPolicy = () => {
      if (restoredScrollPolicy) return;
      history.scrollRestoration = previousScrollRestoration;
      restoredScrollPolicy = true;
    };

    history.scrollRestoration = "manual";
    showEnglishCover();
    const frame = requestAnimationFrame(showEnglishCover);
    const timer = window.setTimeout(() => {
      showEnglishCover();
      restoreScrollPolicy();
    }, 320);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      restoreScrollPolicy();
    };
  }, [locale]);

  useEffect(() => {
    const encodedPosition = new URLSearchParams(location.search).get(
      languageViewParameter,
    );
    if (!encodedPosition) return;

    const [sectionId, progressText] = encodedPosition.split(":");
    const sectionExists = navigation.some((item) => item.id === sectionId);
    const sectionProgress = Number(progressText);
    if (!sectionExists || !Number.isFinite(sectionProgress)) return;

    let cleanedUrl = false;
    const restoreReadingPosition = () => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const clampedProgress = Math.min(1, Math.max(0, sectionProgress));
      const marker = innerHeight * readingMarkerRatio;
      const targetScroll =
        section.offsetTop + section.offsetHeight * clampedProgress - marker;
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      scrollTo({ top: Math.max(0, targetScroll), behavior: "auto" });
      requestAnimationFrame(() => {
        root.style.scrollBehavior = previousScrollBehavior;
      });

      if (!cleanedUrl) {
        const cleanUrl = new URL(location.href);
        cleanUrl.searchParams.delete(languageViewParameter);
        cleanUrl.hash = "";
        history.replaceState(
          history.state,
          "",
          `${cleanUrl.pathname}${cleanUrl.search}`,
        );
        cleanedUrl = true;
      }
    };

    const frame = requestAnimationFrame(restoreReadingPosition);
    const timer = window.setTimeout(restoreReadingPosition, 320);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [navigation]);

  useEffect(() => {
    if (!open) return;

    const main = document.querySelector("main");
    const menuItems = Array.from(
      mobileNavRef.current?.querySelectorAll<HTMLElement>("[data-menu-item]") ?? [],
    );
    const focusable = [menuButtonRef.current, ...menuItems].filter(
      (item): item is HTMLElement => Boolean(item),
    );
    const frame = requestAnimationFrame(() => menuItems[0]?.focus());

    main?.setAttribute("inert", "");
    main?.setAttribute("aria-hidden", "true");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) return;
      const currentIndex = focusable.indexOf(document.activeElement as HTMLElement);
      const nextIndex = event.shiftKey
        ? currentIndex <= 0
          ? focusable.length - 1
          : currentIndex - 1
        : currentIndex === focusable.length - 1
          ? 0
          : currentIndex + 1;

      event.preventDefault();
      focusable[nextIndex].focus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      main?.removeAttribute("inert");
      main?.removeAttribute("aria-hidden");
    };
  }, [open]);

  const goTo = (id: string) => {
    if (open) requestAnimationFrame(() => menuButtonRef.current?.focus());
    setOpen(false);
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  };

  const languageHref = (language: Locale) => `../${language}/#${active}`;

  const getReadingPosition = () => {
    const marker = scrollY + innerHeight * readingMarkerRatio;
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];
    const current =
      sections.filter((section) => section.offsetTop <= marker).at(-1) ?? sections[0];

    if (!current) return { sectionId: active, progress: 0 };
    const progress = Math.min(
      1,
      Math.max(0, (marker - current.offsetTop) / Math.max(1, current.offsetHeight)),
    );
    return { sectionId: current.id, progress };
  };

  const changeLanguage = (
    event: MouseEvent<HTMLAnchorElement>,
    language: Locale,
    mobile: boolean,
  ) => {
    if (mobile) setOpen(false);
    if (
      language === locale ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      if (language === locale) event.preventDefault();
      return;
    }

    event.preventDefault();
    const { sectionId, progress: sectionProgress } = getReadingPosition();
    const target = new URL(event.currentTarget.href);
    target.searchParams.set(
      languageViewParameter,
      `${sectionId}:${sectionProgress.toFixed(4)}`,
    );
    target.hash = "";
    location.assign(target.toString());
  };

  const languageSwitcher = (mobile = false) => (
    <nav
      className={`language-switcher${mobile ? " language-switcher--mobile" : ""}`}
      aria-label={content.header.languageSwitcherAria}
    >
      <a
        className={`language-switcher__link${locale === "en" ? " is-active" : ""}`}
        href={languageHref("en")}
        hrefLang="en"
        lang="en"
        aria-label={content.header.englishName}
        aria-current={locale === "en" ? "page" : undefined}
        data-menu-item={mobile ? "" : undefined}
        onClick={(event) => changeLanguage(event, "en", mobile)}
      >
        {content.header.englishLabel}
      </a>
      <span aria-hidden="true">/</span>
      <a
        className={`language-switcher__link${locale === "zh" ? " is-active" : ""}`}
        href={languageHref("zh")}
        hrefLang="zh-CN"
        lang="zh-CN"
        aria-label={content.header.chineseName}
        aria-current={locale === "zh" ? "page" : undefined}
        data-menu-item={mobile ? "" : undefined}
        onClick={(event) => changeLanguage(event, "zh", mobile)}
      >
        {content.header.chineseLabel}
      </a>
    </nav>
  );

  return (
    <>
      <header
        className={`site-header${solid || open ? " site-header--solid" : ""}${active === "future" && !open ? " site-header--future" : ""}`}
      >
        <button
          type="button"
          className="site-brand"
          onClick={() => goTo("overview")}
          aria-label={content.header.brandAria}
        >
          <SmartImage src="/media/scie-emblem.svg" alt={content.shared.emblemAlt} />
          <span>
            <strong data-short-name={content.shared.schoolAbbreviation}>
              {content.shared.schoolName}
            </strong>
            <small>{content.shared.tagline}</small>
          </span>
        </button>

        <nav className="desktop-nav" aria-label={content.header.desktopNavigationAria}>
          {navigation.map((item) => (
            <button
              type="button"
              key={item.id}
              className={active === item.id ? "is-active" : ""}
              aria-current={active === item.id ? "location" : undefined}
              onClick={() => goTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="site-header__actions">
          {languageSwitcher()}
          <button
            ref={menuButtonRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={
              open
                ? content.header.closeNavigationAria
                : content.header.openNavigationAria
            }
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        <div className="reading-progress" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
      </header>

      <div
        ref={mobileNavRef}
        id="mobile-navigation"
        className={`mobile-nav${open ? " is-open" : ""}`}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label={content.header.mobileNavigationAria}
      >
        <div className="mobile-nav__inner">
          <p>{content.header.mobileIntro}</p>
          {navigation.map((item, index) => (
            <button
              key={item.id}
              type="button"
              data-menu-item
              onClick={() => goTo(item.id)}
            >
              <span>0{index + 1}</span>
              {item.label}
            </button>
          ))}
          {languageSwitcher(true)}
          <small>{content.header.mobileOutro}</small>
        </div>
      </div>
    </>
  );
}
