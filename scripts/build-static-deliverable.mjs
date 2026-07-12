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
      /(?<![A-Za-z0-9._/-])\/(og(?:-en)?\.png|favicon\.svg)\b/g,
      `${sitePrefix}/$1`,
    );
}

await access(clientRoot);
await access(workerPath);

workerPath.searchParams.set("static", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerPath.href);
const workerEnvironment = {
  ASSETS: {
    fetch: async () => new Response("Resource not found", { status: 404 }),
  },
};
const workerContext = {
  waitUntil() {},
  passThroughOnException() {},
};

async function renderLanguagePage(language) {
  const response = await worker.fetch(
    new Request(`http://127.0.0.1/${language}`, {
      headers: { accept: "text/html" },
    }),
    workerEnvironment,
    workerContext,
  );

  if (!response.ok) {
    throw new Error(`生成 ${language} 静态页面失败：HTTP ${response.status}`);
  }

  return response.text();
}

const [englishHtml, chineseHtml] = await Promise.all([
  renderLanguagePage("en"),
  renderLanguagePage("zh"),
]);

if (
  !englishHtml.includes('lang="en"') ||
  !englishHtml.includes("Shenzhen College of International Education")
) {
  throw new Error("生成的英文页面缺少英文站点标识，已停止写入。");
}
if (!chineseHtml.includes('lang="zh-CN"') || !chineseHtml.includes("深圳国际交流书院")) {
  throw new Error("生成的中文页面缺少中文站点标识，已停止写入。");
}

const rootRedirectHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="refresh" content="0; url=./en/" />
    <link rel="canonical" href="./en/" />
    <link rel="alternate" hreflang="en" href="./en/" />
    <link rel="alternate" hreflang="zh-CN" href="./zh/" />
    <link rel="alternate" hreflang="x-default" href="./en/" />
    <title>Shenzhen College of International Education</title>
  </head>
  <body>
    <p>
      <a href="./en/">Continue to the English website</a>
      ·
      <a href="./zh/" lang="zh-CN">进入中文网站</a>
    </p>
  </body>
</html>`;

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await cp(clientRoot, outputRoot, { recursive: true });
await mkdir(join(outputRoot, "en"), { recursive: true });
await mkdir(join(outputRoot, "zh"), { recursive: true });
await writeFile(join(outputRoot, "index.html"), rootRedirectHtml, "utf8");
await writeFile(join(outputRoot, "en", "index.html"), englishHtml, "utf8");
await writeFile(join(outputRoot, "zh", "index.html"), chineseHtml, "utf8");
await writeFile(new URL("../网站成品/.nojekyll", import.meta.url), "", "utf8");
await access(join(outputRoot, "og.png"));
await access(join(outputRoot, "og-en.png"));
await access(join(outputRoot, "favicon.svg"));

const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
if (publicSiteUrl) {
  const normalizedUrl = new URL(publicSiteUrl);
  if (!normalizedUrl.pathname.endsWith("/")) normalizedUrl.pathname += "/";
  const normalizedPublicSiteUrl = normalizedUrl.toString();
  for (const expectedUrl of [
    `${normalizedPublicSiteUrl}og.png`,
    `${normalizedPublicSiteUrl}og-en.png`,
    `${normalizedPublicSiteUrl}media/scie-emblem.svg`,
    `${normalizedPublicSiteUrl}en/`,
    `${normalizedPublicSiteUrl}zh/`,
  ]) {
    if (!englishHtml.includes(expectedUrl) && !chineseHtml.includes(expectedUrl)) {
      throw new Error(`静态页面元数据地址错误：${expectedUrl}`);
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
  /(?<![A-Za-z0-9._/-])\/(?:assets|media)\//;
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
  `双语静态成品已生成：${outputRoot}\n项目：${packageJson.name}\n默认语言：en\n语言路由：en、zh\n基础路径：${siteBasePath}\n已核对资源：${references.size} 项`,
);
