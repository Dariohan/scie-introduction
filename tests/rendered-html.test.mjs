import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("根路径以英文为默认语言", async () => {
  const response = await render("/");
  assert.ok([307, 308].includes(response.status));
  const target = new URL(response.headers.get("location"), "http://localhost");
  assert.equal(target.pathname, "/en");
  assert.equal(target.searchParams.get("entry"), "cover");
});

test("服务端渲染完整英文站点", async () => {
  const response = await render("/en");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="en"/i);
  assert.match(
    html,
    /<title>Shenzhen College of International Education \| From Shenzhen to the World<\/title>/,
  );
  for (const heading of [
    "Our College",
    "Campus &amp; City",
    "People &amp; Culture",
    "Food &amp; Life",
    "Looking Ahead",
  ]) {
    assert.match(html, new RegExp(heading));
  }
  assert.match(html, /SCIE prepares students for future opportunities through a challenging international education/);
  assert.match(html, /Campus masterplan/);
  assert.match(html, /Real timetable example/);
  assert.match(html, /aria-label="Switch website language"/);
  assert.match(html, /href="\.\.\/zh\/#overview"/);
  assert.match(html, /poster="\/media\/scie-emblem-fallback\.jpg"/);
  assert.match(html, /<source src="\/media\/emblem-study\.mp4" type="video\/mp4"/);
  assert.match(html, /<video[^>]*muted=""/i);
  assert.match(html, /<video[^>]*playsinline=""/i);
  assert.match(html, /<video[^>]*loop=""/i);
  assert.doesNotMatch(html, /The emblem in motion|Visual Archive/);
  assert.match(html, /SCIE expressed through four qualities/);
  for (const quality of ["Sincerity", "Compassion", "Industrious", "Enthusiasm"]) {
    assert.match(html, new RegExp(quality));
  }
  assert.match(html, /The four Houses: Metal, Wood, Water and Fire/);
  assert.doesNotMatch(html, /The four Houses: Gold, Wood, Water and Fire/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("服务端渲染完整中文站点", async () => {
  const response = await render("/zh");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="zh-CN"/i);
  assert.match(html, /<title>深圳国际交流书院｜立足深圳，连接世界<\/title>/);
  for (const heading of ["学校概况", "地标与风景", "人文与特色", "美食与生活", "未来寄语"]) {
    assert.match(html, new RegExp(heading));
  }
  assert.match(html, /校园总平面导览/);
  assert.match(html, /真实课表示例/);
  assert.match(html, /aria-label="切换网站语言"/);
  assert.match(html, /href="\.\.\/en\/#overview"/);
  assert.match(html, /6KqsnbE3H/);
  assert.match(html, /7gpEZBQlrrG/);
  assert.match(html, /SCIE 四项核心品格/);
  for (const quality of ["真实", "同情", "勤勉", "热忱"]) {
    assert.match(html, new RegExp(quality));
  }
});

test("保留终章技术栈、双语架构与优化视频", async () => {
  const [
    defaultPage,
    languagePage,
    languageLayout,
    packageJson,
    worldConnection,
    siteHeader,
    staticBuilder,
    content,
    i18n,
    video,
  ] =
    await Promise.all([
      readFile(new URL("../app/(default)/page.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/[lang]/page.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/[lang]/layout.tsx", import.meta.url), "utf8"),
      readFile(new URL("../package.json", import.meta.url), "utf8"),
      readFile(new URL("../components/WorldConnection.tsx", import.meta.url), "utf8"),
      readFile(new URL("../components/SiteHeader.tsx", import.meta.url), "utf8"),
      readFile(new URL("../scripts/build-static-deliverable.mjs", import.meta.url), "utf8"),
      readFile(new URL("../lib/content.ts", import.meta.url), "utf8"),
      readFile(new URL("../lib/i18n.ts", import.meta.url), "utf8"),
      readFile(new URL("../public/media/emblem-study.mp4", import.meta.url)),
    ]);

  assert.match(defaultPage, /permanentRedirect/);
  assert.match(languagePage, /getSiteContent\(lang\)/);
  assert.match(languageLayout, /generateStaticParams/);
  assert.match(languageLayout, /SiteDocument/);
  assert.match(packageJson, /"three"/);
  assert.match(packageJson, /"gsap"/);
  assert.match(worldConnection, /ScrollTrigger/);
  assert.match(worldConnection, /WebGLRenderer/);
  assert.match(worldConnection, /content\.routesAria/);
  assert.match(worldConnection, /prefers-reduced-motion/);
  assert.match(worldConnection, /\.set\("\.wc-intro", \{ autoAlpha: 1, y: 0 \}/);
  assert.doesNotMatch(siteHeader, /localStorage|sessionStorage|document\.cookie/);
  assert.match(siteHeader, /languageViewParameter = "view"/);
  assert.match(siteHeader, /defaultEntryParameter = "entry"/);
  assert.match(siteHeader, /defaultEntryValue = "cover"/);
  assert.match(siteHeader, /history\.scrollRestoration = "manual"/);
  assert.match(siteHeader, /showEnglishCover/);
  assert.match(siteHeader, /sectionProgress\.toFixed\(4\)/);
  assert.match(siteHeader, /history\.replaceState/);
  assert.match(siteHeader, /cleanUrl\.hash = ""/);
  assert.match(siteHeader, /target\.hash = ""/);
  assert.match(staticBuilder, /const rootEnglishHtml = englishHtml/);
  assert.match(staticBuilder, /meta http-equiv="refresh"/);
  assert.match(staticBuilder, /window\.location\.replace/);
  assert.match(staticBuilder, /\.\/en\/\?entry=cover/);
  assert.doesNotMatch(staticBuilder, /const rootRedirectHtml/);
  assert.match(i18n, /defaultLocale: Locale = "en"/);
  assert.match(content, /Shenzhen College of International Education/);
  assert.match(content, /深圳国际交流书院/);
  assert.match(content, /houses: \["Metal", "Wood", "Water", "Fire"\]/);
  assert.match(content, /title: "Sincerity"/);
  assert.ok((await stat(new URL("../public/media/emblem-study.mp4", import.meta.url))).size > 2_000_000);
  assert.equal(
    createHash("sha256").update(video).digest("hex"),
    "636d2d794e30e866ef258880f51c56e699a9f8af558f17346994b8dff5c101ec",
  );

  await Promise.all([
    access(new URL("../public/media/scie-emblem.svg", import.meta.url)),
    access(new URL("../public/media/world-map.svg", import.meta.url)),
    access(new URL("../public/media/scie-campus-hero.webp", import.meta.url)),
    access(new URL("../public/media/mobile/scie-campus-hero.webp", import.meta.url)),
    access(new URL("../public/media/campus-plan-overview.webp", import.meta.url)),
    access(new URL("../public/media/campus-plan-dining.webp", import.meta.url)),
    access(new URL("../public/media/campus-plan-support.webp", import.meta.url)),
    access(new URL("../public/media/campus-plan-level-two.webp", import.meta.url)),
    access(new URL("../public/media/student-timetable-sample.webp", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../public/og-en.png", import.meta.url)),
  ]);

  const legacyPreviewFiles = await readdir(
    new URL("../app/_sites-preview", import.meta.url),
  ).catch((error) => {
    if (error?.code === "ENOENT") return [];
    throw error;
  });
  assert.deepEqual(legacyPreviewFiles, []);
});
