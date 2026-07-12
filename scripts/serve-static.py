#!/usr/bin/env python3

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from mimetypes import guess_type
from pathlib import Path
from sys import argv
from threading import Timer
from webbrowser import open as open_browser


HOST = "127.0.0.1"
FIRST_PORT = 4173
LAST_PORT = 4193
ROOT = Path(__file__).resolve().parent.parent / "网站成品"


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format_string, *args):
        return

    def _requested_range(self, size):
        value = self.headers.get("Range", "")
        if not value.startswith("bytes=") or "," in value:
            return None
        start_text, separator, end_text = value[6:].partition("-")
        if not separator:
            return None
        try:
            if start_text:
                start = int(start_text)
                end = int(end_text) if end_text else size - 1
            elif end_text:
                suffix_length = int(end_text)
                start = max(size - suffix_length, 0)
                end = size - 1
            else:
                return None
        except ValueError:
            return None
        if start < 0 or end < start or start >= size:
            return None
        return start, min(end, size - 1)

    def _serve_range(self, head_only=False):
        if not self.headers.get("Range"):
            return False

        path = Path(self.translate_path(self.path))
        if not path.is_file():
            return False

        size = path.stat().st_size
        requested_range = self._requested_range(size)
        if requested_range is None:
            self.send_response(416)
            self.send_header("Content-Range", f"bytes */{size}")
            self.send_header("Accept-Ranges", "bytes")
            self.end_headers()
            return True

        start, end = requested_range
        self.send_response(206)
        self.send_header("Content-Type", guess_type(path.name)[0] or "application/octet-stream")
        self.send_header("Content-Length", str(end - start + 1))
        self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
        self.send_header("Accept-Ranges", "bytes")
        self.send_header("Cache-Control", "public, max-age=3600")
        self.end_headers()

        if not head_only:
            remaining = end - start + 1
            with path.open("rb") as source:
                source.seek(start)
                while remaining:
                    chunk = source.read(min(64 * 1024, remaining))
                    if not chunk:
                        break
                    self.wfile.write(chunk)
                    remaining -= len(chunk)
        return True

    def do_GET(self):
        if not self._serve_range():
            super().do_GET()

    def do_HEAD(self):
        if not self._serve_range(head_only=True):
            super().do_HEAD()


def create_server():
    handler = partial(QuietHandler, directory=str(ROOT))
    for port in range(FIRST_PORT, LAST_PORT + 1):
        try:
            return ThreadingHTTPServer((HOST, port), handler), port
        except OSError:
            continue
    raise RuntimeError("端口 4173—4193 均被占用，请关闭其他本地网站后重试。")


def main():
    index_file = ROOT / "index.html"
    if not index_file.is_file():
        raise FileNotFoundError("未找到“网站成品/index.html”，请先运行 npm run build:static。")

    server, port = create_server()
    url = f"http://{HOST}:{port}"
    print(f"\n网站已启动：{url}")
    print("请保持此窗口开启；关闭窗口即可停止网站。\n")
    if "--no-open" not in argv:
        Timer(0.4, open_browser, args=(url,)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
