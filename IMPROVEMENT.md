# 网站改进记录

日期：2026-07-12

## 本轮目标

- 将网站从单一中文页面升级为可扩展的中英双语网站。
- 英文设为默认语言，同时保留清晰、可访问的中英文切换。
- 修复校徽视觉视频中途“冻结”的源文件与播放状态问题。
- 保持原有五大章节、图片、校园图纸、GSAP 动效、Three.js 终章与整体视觉风格。
- 改善英文排版、窄屏、平板、手机横屏和视频降级体验。

## 双语架构

- `/`：进入英文默认站点。
- `/en`：完整英文站点。
- `/zh`：完整简体中文站点。
- `lib/content.ts` 保存同构的中英文内容；页面组件只保留一套。
- 服务端按语言路由选择内容，避免在客户端重复维护两套页面。
- 两种语言分别输出 `html lang`、标题、描述、Open Graph locale、canonical 与 hreflang。
- 导航中的 `EN / 中文` 使用真实链接，兼容根路径及 GitHub Pages 子路径。
- 没有写入 Cookie、localStorage 或 sessionStorage。按“零持久化存储”要求，一小时语言记忆功能未实施；用户直接再次访问 `/en` 或 `/zh` 时仍会保持该网址对应的语言。

## 英文内容依据

学校名称、地址、使命、核心价值与历史节点优先根据以下校方英文资料核对，人物故事继续链接校方原文：

- [SCIE Mission & Vision](https://www.scie.com.cn/mission-statement/)
- [History of SCIE](https://www.scie.com.cn/our-college/history/)
- [Welcome from the Principal](https://www.scie.com.cn/welcome-from-principal/)
- [From SCIE to Victoria Harbour](https://www.scie.com.cn/from-scie-to-victoria-harbour-my-journalists-journey-of-growth/)
- [Wu Sitong: Be Your Own Coordinate](https://www.scie.com.cn/wu-sitong-in-an-uncertain-world-be-your-own-coordinate/)
- [Minnie: Life is an Endless Journey](https://www.scie.com.cn/minnie-life-is-an-endless-journey/)

网站英文不是逐字直译：官方事实与术语保持一致，叙事文案按国际学校官网语气重新编辑，并避免把未核验信息写成校方事实。

## 英文字体与响应式排版

- 英文使用独立的系统拉丁衬线／无衬线字体栈，不加载外部字体，不增加网络请求。
- 英文标题使用单独的字号、字距和行高上限，避免沿用中文大字规则后遮挡图片。
- 1550px 及以下导航品牌显示 `SCIE` 短名，保留完整校名给辅助技术和页面正文。
- 320px 窄屏使用短品牌名，并收紧价值观控制器，消除横向溢出。
- 手机横屏使用独立首屏排版：英文校名保持两行，完整正文与按钮在 320px 高度内可见。
- 终章英文标题使用独立上限；568×320 横屏重新排列世界地图、校徽与收尾文字，固定区域不再高于视口。
- 终章进入首帧立即显示标题与低亮度世界地图，移除曾经出现的一整屏黑色空白。
- 手机引用区不再使用固定 500px 空白高度；横屏照片、画廊与生活卡片改用视口高度上限。
- 缩小手机端装饰性价值字母，避免英文价值词在字母中间断行，并提高深色区域小标题对比度。
- 新增“跳至主要内容”、更大的语言切换与核心价值点击目标、可读的小字下限和 reduced-motion 兼容。

## 校徽视频修复

### 已确认的根因

原 MP4 并非单纯网络缓冲：10.067 秒媒体中约 5.00–8.93 秒本身包含近 4 秒静止画面，并且 302 帧只有首尾 2 个关键帧。长 GOP 会进一步增加 Safari、移动端恢复播放与循环风险。

### 新文件

- H.264 Main Level 3.1，1280×720，固定 30fps。
- 6.2667 秒，188 帧。
- 7 个关键帧，最大 GOP 29 帧（约 0.967 秒）。
- MP4 faststart 已启用。
- 188/188 帧完整解码通过。
- 原近 4 秒静止段已删除；最长近静止区间约 0.37 秒。

### 播放组件

- 保留 `muted`、`playsInline`、`preload="metadata"` 与循环播放。
- 新增 poster、标准 MP4 source type、加载／卡顿／错误状态、播放拒绝处理及重试入口。
- Node.js 与 Python 备用静态服务器均支持 HTTP Range，便于 Safari 分段读取视频。

## 主要文件

- `app/[lang]/`：语言路由与语言根布局。
- `app/(default)/`：英文默认入口。
- `app/_metadata.ts`、`app/_site-document.tsx`：双语 SEO 与安全响应头。
- `lib/i18n.ts`、`lib/content.ts`：语言类型、默认语言与双语内容。
- `components/`：共享双语组件、语言切换和视频状态处理。
- `app/globals.css`：英文排版与各设备断点优化。
- `scripts/build-static-deliverable.mjs`：生成英文、中文和英文默认入口。
- `scripts/optimize-emblem-video.m`：macOS 校徽视频一次性重编码工具。
- `scripts/serve-static.py`：Python 备用服务器 Range 支持。
- `public/og-en.png`：英文社交分享图。

## 上传前安全处理

- `node_modules/`、`dist/`、`.vinext/`、`.wrangler/`、`网站成品/`、复盘文档与文档截图均由 `.gitignore` 排除，不上传到 GitHub。
- 对全部待提交文本执行凭据特征扫描；未发现私钥、GitHub token、API key 或环境变量文件。
- 所有 `target="_blank"` 链接同时使用 `noopener noreferrer`。
- 页面保留严格来源 CSP；部署工作流默认只有 `contents: read`，发布作业才获得 `pages: write` 与 `id-token: write`。
- Next.js 更新至 16.2.10，Vite 更新至 8.1.4，Cloudflare Vite 插件更新至 1.44.0，Wrangler 更新至 4.110.0。
- PostCSS 统一锁定到 8.5.17；2026-07-12 运行完整 `npm audit --audit-level=low` 的结果为 0 个已知漏洞。
- 依赖更新后使用 `npm ci` 从锁文件重新安装，并重新执行全部构建与测试。

## 验证方式

```bash
npm run lint
npm run typecheck
npm test
npm run build:static
```

浏览器检查范围：1440×1000 桌面、1280×800 笔记本、820×1180 平板、390×844 与 320×568 手机竖屏、568×320 手机横屏；英文默认入口、中英文切换、移动菜单、画廊、价值观、引用区、视频跨越原卡顿点、终章首帧／收尾和 reduced-motion。所有实测尺寸的页面横向溢出均为 0。

## 后续建议

- 正式以校方名义发布前，由校方完成最终中英文审校，并确认图片、人物、视频和品牌素材授权。
- 当前稳定视频约 2.3MB；若后续准备跨平台 FFmpeg 流程，可在保持关键帧结构的前提下进一步压缩到约 1.5–2Mbps。

## 2026-07-13 定向修正

- 校徽动效视频改为完全不透明播放，错误时才显示静态兜底图，消除视频与原背景叠影。
- 英文 House 名称按校方 House System 页面修正为 `Metal, Wood, Water, Fire`；中文继续使用“金木水火”。
- 核心品格轮播依据所提供校园资料改为 `Sincerity, Compassion, Industrious, Enthusiasm`，中文为“真实、同情、勤勉、热忱”；保留另有官方依据的使命宣言与 `Striving to Be the Best`。
- 英文终章标题改为稳定分行，桌面端重新分配文字与地图空间；短横屏采用文字／地图左右分栏，并保持地图与校徽收束中心一致。
- GitHub Pages 根入口现在预渲染完整英文首页并立即进入 `/en/`，不再显示仅含中英文跳转链接的过渡页。
