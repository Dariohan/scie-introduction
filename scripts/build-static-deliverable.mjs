import {
  access,
  cp,
  mkdir,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const clientRoot = fileURLToPath(new URL("../dist/client/", import.meta.url));
const workerPath = new URL("../dist/server/index.js", import.meta.url);
const outputRoot = fileURLToPath(new URL("../网站成品/", import.meta.url));
const textExtensions = new Set([".css", ".html", ".js", ".json"]);

function normalizeSiteBasePath(value) {
  const trimmed = value?.trim();
  if (!trimmed || trimmed === "/") return "/";
  return `/${trimmed.replace(/^\/+|\/+$/g, "")}/`;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function collectTextFiles(directory) {
  const files = [];
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const target = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectTextFiles(target)));
    else if (textExtensions.has(extname(entry.name))) files.push(target);
  }
  return files;
}

const siteBasePath = normalizeSiteBasePath(process.env.SITE_BASE_PATH);
const sitePrefix = siteBasePath === "/" ? "" : siteBasePath.slice(0, -1);

function addSiteBasePath(source) {
  return source
    .replace(
      /(?<![A-Za-z0-9._/-])\/(assets|media)\//g,
      `${sitePrefix}/$1/`,
    )
    .replace(
      /(?<![A-Za-z0-9._/-])\/(og\.png|favicon\.svg)\b/g,
      `${sitePrefix}/$1`,
    );
}

await access(clientRoot);
await access(workerPath);

workerPath.searchParams.set("static", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerPath.href);
const response = await worker.fetch(
  new Request("http://127.0.0.1/", {
    headers: { accept: "text/html" },
  }),
  {
    ASSETS: {
      fetch: async () => new Response("未找到资源", { status: 404 }),
    },
  },
  {
    waitUntil() {},
    passThroughOnException() {},
  },
);

if (!response.ok) {
  throw new Error(`生成静态首页失败：HTTP ${response.status}`);
}

const html = await response.text();
if (!html.includes('lang="zh-CN"') || !html.includes("深圳国际交流书院")) {
  throw new Error("生成的首页缺少中文站点标识，已停止写入。");
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await cp(clientRoot, outputRoot, { recursive: true });
await writeFile(new URL("../网站成品/index.html", import.meta.url), html, "utf8");
await writeFile(new URL("../网站成品/.nojekyll", import.meta.url), "", "utf8");
await access(join(outputRoot, "og.png"));
await access(join(outputRoot, "favicon.svg"));

const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
if (publicSiteUrl) {
  const normalizedUrl = new URL(publicSiteUrl);
  if (!normalizedUrl.pathname.endsWith("/")) normalizedUrl.pathname += "/";
  const normalizedPublicSiteUrl = normalizedUrl.toString();
  for (const expectedUrl of [
    `${normalizedPublicSiteUrl}og.png`,
    `${normalizedPublicSiteUrl}media/scie-emblem.svg`,
  ]) {
    if (!html.includes(expectedUrl)) {
      throw new Error(`静态首页元数据地址错误：${expectedUrl}`);
    }
  }
}

const textFiles = await collectTextFiles(outputRoot);
for (const file of textFiles) {
  const source = await readFile(file, "utf8");
  const rewritten = addSiteBasePath(source);
  if (rewritten !== source) await writeFile(file, rewritten, "utf8");
}

const publicResourcePattern = new RegExp(
  `(?<![A-Za-z0-9._/-])${escapeRegExp(siteBasePath)}(assets|media)/([A-Za-z0-9._@%+~/-]+)`,
  "g",
);
const unscopedResourcePattern =
  /(?<![A-Za-z0-9._/-])\/(?:assets|media)\//g;
const references = new Set();

for (const file of textFiles) {
  const source = await readFile(file, "utf8");
  if (siteBasePath !== "/" && unscopedResourcePattern.test(source)) {
    throw new Error(`静态文件仍含未加基础路径的资源引用：${file}`);
  }
  for (const match of source.matchAll(publicResourcePattern)) {
    references.add(`${match[1]}/${match[2]}`);
  }
}

if (references.size < 20) {
  throw new Error("静态资源引用数量异常，已停止生成。");
}

for (const relativePath of references) {
  await access(join(outputRoot, relativePath)).catch(() => {
    throw new Error(`静态页面引用的资源不存在：${relativePath}`);
  });
}

const packageJson = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);

console.log(
  `静态成品已生成：${outputRoot}\n项目：${packageJson.name}\n基础路径：${siteBasePath}\n已核对资源：${references.size} 项`,
);
