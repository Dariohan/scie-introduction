#!/usr/bin/env python3

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Timer
from webbrowser import open as open_browser


HOST = "127.0.0.1"
FIRST_PORT = 4173
LAST_PORT = 4193
ROOT = Path(__file__).resolve().parent.parent / "网站成品"


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format_string, *args):
        return


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
    Timer(0.4, open_browser, args=(url,)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
