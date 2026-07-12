import type { Metadata } from "next";
import "./globals.css";

const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const publicAsset = (relativePath: string) =>
  publicSiteUrl
    ? new URL(relativePath, publicSiteUrl).toString()
    : `/${relativePath}`;

export const metadata: Metadata = {
  metadataBase: publicSiteUrl ? new URL(publicSiteUrl) : undefined,
  title: "深圳国际交流书院｜立足深圳，连接世界",
  description:
    "走进深圳国际交流书院：学校概况、校园地标、人文特色、美食生活，以及连接世界的未来寄语。",
  icons: {
    icon: publicAsset("media/scie-emblem.svg"),
    shortcut: publicAsset("media/scie-emblem.svg"),
  },
  openGraph: {
    title: "深圳国际交流书院｜立足深圳，连接世界",
    description: "一所学校，生长在深圳的时间里，也连接世界的坐标。",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: publicAsset("og.png"),
        width: 1200,
        height: 630,
        alt: "深圳国际交流书院：立足深圳，连接世界",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "深圳国际交流书院｜立足深圳，连接世界",
    description: "一所学校，生长在深圳的时间里，也连接世界的坐标。",
    images: [publicAsset("og.png")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; base-uri 'self'; connect-src 'self'; font-src 'self' data:; form-action 'none'; frame-src 'none'; img-src 'self' data:; media-src 'self'; object-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; upgrade-insecure-requests"
        />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body>{children}</body>
    </html>
  );
}
