import type { Metadata } from "next";
import "../globals.css";
import { createSiteMetadata } from "@/app/_metadata";
import { SiteDocument } from "@/app/_site-document";
import { defaultLocale } from "@/lib/i18n";

export const metadata: Metadata = createSiteMetadata(defaultLocale);

export default function DefaultLanguageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument language={defaultLocale}>{children}</SiteDocument>;
}
