import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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

test("服务端渲染完整中文站点", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="zh-CN"/i);
  assert.match(html, /<title>深圳国际交流书院｜立足深圳，连接世界<\/title>/);
  assert.match(html, /学校概况/);
  assert.match(html, /地标与风景/);
  assert.match(html, /人文与特色/);
  assert.match(html, /美食与生活/);
  assert.match(html, /未来寄语/);
  assert.match(html, /深圳国际交流书院/);
  assert.match(html, /校园总平面导览/);
  assert.match(html, /真实课表示例/);
  assert.match(html, /6KqsnbE3H/);
  assert.match(html, /7gpEZBQlrrG/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("保留终章技术栈、品牌素材与独立组件", async () => {
  const [page, layout, packageJson, worldConnection] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../components/WorldConnection.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /SchoolExperience/);
  assert.match(layout, /lang="zh-CN"/);
  assert.match(layout, /og\.png/);
  assert.match(packageJson, /"three"/);
  assert.match(packageJson, /"gsap"/);
  assert.match(worldConnection, /ScrollTrigger/);
  assert.match(worldConnection, /WebGLRenderer/);
  assert.match(worldConnection, /深圳连接伦敦、纽约、东京与新加坡/);
  assert.match(worldConnection, /prefers-reduced-motion/);

  await Promise.all([
    access(new URL("../public/media/scie-emblem.svg", import.meta.url)),
    access(new URL("../public/media/world-map.svg", import.meta.url)),
    access(new URL("../public/media/campus-tree-canopy.jpg", import.meta.url)),
    access(new URL("../public/media/mobile/campus-tree-canopy.jpg", import.meta.url)),
    access(new URL("../public/media/campus-plan-overview.webp", import.meta.url)),
    access(new URL("../public/media/campus-plan-dining.webp", import.meta.url)),
    access(new URL("../public/media/campus-plan-support.webp", import.meta.url)),
    access(new URL("../public/media/campus-plan-level-two.webp", import.meta.url)),
    access(new URL("../public/media/student-timetable-sample.webp", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);

  const legacyPreviewFiles = await readdir(
    new URL("../app/_sites-preview", import.meta.url),
  ).catch((error) => {
    if (error?.code === "ENOENT") return [];
    throw error;
  });
  assert.deepEqual(legacyPreviewFiles, []);
});
