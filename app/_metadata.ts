import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

function getPublicSiteBase() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configuredUrl) return undefined;

  const siteBase = new URL(configuredUrl);
  if (siteBase.protocol !== "https:" && siteBase.protocol !== "http:") {
    throw new Error("NEXT_PUBLIC_SITE_URL must use http or https.");
  }
  if (!siteBase.pathname.endsWith("/")) siteBase.pathname += "/";
  return siteBase;
}

export function createSiteMetadata(language: Locale): Metadata {
  const copy = getSiteContent(language).metadata;
  const siteBase = getPublicSiteBase();
  const canonicalUrl = siteBase
    ? new URL(`${language}/`, siteBase).toString()
    : undefined;
  const englishUrl = siteBase ? new URL("en/", siteBase).toString() : undefined;
  const chineseUrl = siteBase ? new URL("zh/", siteBase).toString() : undefined;
  const emblemUrl = siteBase
    ? new URL("media/scie-emblem.svg", siteBase).toString()
    : "/media/scie-emblem.svg";
  const socialImageUrl = siteBase
    ? new URL(language === "en" ? "og-en.png" : "og.png", siteBase).toString()
    : undefined;

  return {
    metadataBase: siteBase,
    title: copy.title,
    description: copy.description,
    icons: {
      icon: emblemUrl,
      shortcut: emblemUrl,
    },
    alternates:
      canonicalUrl && englishUrl && chineseUrl
        ? {
            canonical: canonicalUrl,
            languages: {
              en: englishUrl,
              "zh-CN": chineseUrl,
              "x-default": englishUrl,
            },
          }
        : undefined,
    openGraph: {
      title: copy.openGraphTitle,
      description: copy.openGraphDescription,
      locale: copy.openGraphLocale,
      alternateLocale: [language === "en" ? "zh_CN" : "en_GB"],
      type: "website",
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      ...(socialImageUrl
        ? {
            images: [
              {
                url: socialImageUrl,
                width: 1200,
                height: 630,
                alt: copy.imageAlt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.openGraphDescription,
      ...(socialImageUrl ? { images: [socialImageUrl] } : {}),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
