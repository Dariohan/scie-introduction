import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const host = "127.0.0.1";
const firstPort = 4173;
const lastPort = 4193;
const root = resolve(fileURLToPath(new URL("../网站成品/", import.meta.url)));
const openBrowser = !process.argv.includes("--no-open");

function normalizeSiteBasePath(value) {
  const trimmed = value?.trim();
  if (!trimmed || trimmed === "/") return "/";
  return `/${trimmed.replace(/^\/+|\/+$/g, "")}/`;
}

const siteBasePath = normalizeSiteBasePath(process.env.SITE_BASE_PATH);

const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".png", "image/png"],
  [".webp", "image/webp"],
  [".mp4", "video/mp4"],
  [".woff2", "font/woff2"],
]);

function sendText(response, status, message) {
  response.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  response.end(message);
}

function browserCommand(url) {
  if (process.platform === "darwin") return ["open", [url]];
  if (process.platform === "win32") return ["cmd", ["/c", "start", "", url]];
  return ["xdg-open", [url]];
}

function openInBrowser(url) {
  const [command, args] = browserCommand(url);
  const child = spawn(command, args, {
    detached: true,
    stdio: "ignore",
  });
  child.unref();
}

async function resolveRequestPath(pathname) {
  let sitePath = pathname;
  if (siteBasePath !== "/") {
    const baseWithoutTrailingSlash = siteBasePath.slice(0, -1);
    if (pathname === baseWithoutTrailingSlash) sitePath = "/";
    else if (pathname.startsWith(siteBasePath)) {
      sitePath = pathname.slice(baseWithoutTrailingSlash.length) || "/";
    } else return null;
  }

  let decoded;
  try {
    decoded = decodeURIComponent(sitePath);
  } catch {
    return null;
  }

  const relativePath = decoded.replace(/^\/+/, "") || "index.html";
  let filePath = resolve(root, relativePath);
  if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) return null;

  try {
    const fileStat = await stat(filePath);
    if (fileStat.isDirectory()) filePath = resolve(filePath, "index.html");
    return { filePath, fileStat: await stat(filePath) };
  } catch {
    if (!extname(relativePath)) {
      const fallback = resolve(root, "index.html");
      return { filePath: fallback, fileStat: await stat(fallback) };
    }
    return null;
  }
}

function parseRange(rangeHeader, size) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader ?? "");
  if (!match) return null;

  let start = match[1] ? Number(match[1]) : 0;
  let end = match[2] ? Number(match[2]) : size - 1;

  if (!match[1] && match[2]) {
    const suffixLength = Number(match[2]);
    start = Math.max(size - suffixLength, 0);
    end = size - 1;
  }

  if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end < start || start >= size) {
    return null;
  }

  return { start, end: Math.min(end, size - 1) };
}

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.setHeader("Allow", "GET, HEAD");
    sendText(response, 405, "仅支持读取网站资源。");
    return;
  }

  const url = new URL(request.url ?? "/", `http://${host}`);
  const resolved = await resolveRequestPath(url.pathname);
  if (!resolved) {
    sendText(response, 404, "未找到该资源。");
    return;
  }

  const { filePath, fileStat } = resolved;
  const contentType = mimeTypes.get(extname(filePath).toLowerCase()) ?? "application/octet-stream";
  const headers = {
    "Accept-Ranges": "bytes",
    "Cache-Control": filePath.endsWith("index.html") ? "no-cache" : "public, max-age=3600",
    "Content-Type": contentType,
  };
  const range = parseRange(request.headers.range, fileStat.size);

  if (request.headers.range && !range) {
    response.writeHead(416, {
      ...headers,
      "Content-Range": `bytes */${fileStat.size}`,
    });
    response.end();
    return;
  }

  if (range) {
    response.writeHead(206, {
      ...headers,
      "Content-Length": range.end - range.start + 1,
      "Content-Range": `bytes ${range.start}-${range.end}/${fileStat.size}`,
    });
    if (request.method === "HEAD") response.end();
    else createReadStream(filePath, range).pipe(response);
    return;
  }

  response.writeHead(200, {
    ...headers,
    "Content-Length": fileStat.size,
  });
  if (request.method === "HEAD") response.end();
  else createReadStream(filePath).pipe(response);
});

server.on("clientError", (_error, socket) => {
  socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
});

function listen(port) {
  const onError = (error) => {
    server.off("listening", onListening);
    if (error.code === "EADDRINUSE" && port < lastPort) {
      listen(port + 1);
      return;
    }
    console.error(`网站启动失败：${error.message}`);
    process.exitCode = 1;
  };

  const onListening = () => {
    server.off("error", onError);
    const url = `http://${host}:${port}${siteBasePath === "/" ? "" : siteBasePath}`;
    console.log(`\n网站已启动：${url}`);
    console.log("请保持此窗口开启；关闭窗口即可停止网站。\n");
    if (openBrowser) openInBrowser(url);
  };

  server.once("error", onError);
  server.once("listening", onListening);
  server.listen(port, host);
}

try {
  await stat(resolve(root, "index.html"));
  listen(firstPort);
} catch {
  console.error("未找到“网站成品/index.html”，请先运行 npm run build:static。");
  process.exitCode = 1;
}
