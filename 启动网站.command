#!/bin/zsh

cd -- "$(dirname -- "$0")" || exit 1
clear

echo "正在启动深圳国际交流书院介绍网站……"

export PATH="/usr/local/bin:/opt/homebrew/bin:$HOME/.volta/bin:$PATH"

if command -v node >/dev/null 2>&1; then
  node scripts/serve-static.mjs
  status=$?
elif command -v python3 >/dev/null 2>&1; then
  echo "未从系统路径找到 Node.js，正在使用 Python 3 备用方式启动。"
  python3 scripts/serve-static.py
  status=$?
else
  echo "未检测到 Node.js 或 Python 3。"
  echo "请安装其中任意一个运行环境后，再次双击本文件。"
  status=1
fi

if [ $status -ne 0 ]; then
  echo ""
  read -k 1 "?启动未完成，按任意键关闭窗口……"
fi

exit $status
