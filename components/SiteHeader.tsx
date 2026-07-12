"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/lib/content";
import { SmartImage } from "@/components/ui/SmartImage";

export function SiteHeader() {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("overview");
  const [progress, setProgress] = useState(0);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - innerHeight;
      setProgress(scrollable > 0 ? (scrollY / scrollable) * 100 : 0);
      setSolid(scrollY > 48);

      const marker = innerHeight * 0.38;
      const current = sections
        .filter((section) => section.getBoundingClientRect().top <= marker)
        .at(-1);
      if (current) setActive(current.id);
    };

    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const main = document.querySelector("main");
    const menuItems = Array.from(
      mobileNavRef.current?.querySelectorAll<HTMLButtonElement>("[data-menu-item]") ?? [],
    );
    const focusable = [menuButtonRef.current, ...menuItems].filter(
      (item): item is HTMLButtonElement => Boolean(item),
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
      const currentIndex = focusable.indexOf(document.activeElement as HTMLButtonElement);
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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`site-header${solid || open ? " site-header--solid" : ""}${active === "future" && !open ? " site-header--future" : ""}`}
      >
        <button
          type="button"
          className="site-brand"
          onClick={() => goTo("overview")}
          aria-label="返回学校概况"
        >
          <SmartImage src="/media/scie-emblem.svg" alt="深圳国际交流书院校徽" />
          <span>
            <strong>深圳国际交流书院</strong>
            <small>立足深圳 · 连接世界</small>
          </span>
        </button>

        <nav className="desktop-nav" aria-label="主导航">
          {navigation.map((item) => (
            <button
              type="button"
              key={item.id}
              className={active === item.id ? "is-active" : ""}
              onClick={() => goTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "关闭导航" : "打开导航"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

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
        aria-label="移动端主导航"
      >
        <div className="mobile-nav__inner">
          <p>选择一段旅程</p>
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
          <small>向下滚动，走进深国交</small>
        </div>
      </div>
    </>
  );
}
