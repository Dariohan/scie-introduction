import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { createSiteMetadata } from "@/app/_metadata";
import { SiteDocument } from "@/app/_site-document";
import { isLocale, locales } from "@/lib/i18n";

type LanguageLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LanguageLayoutProps): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? createSiteMetadata(lang) : {};
}

export default async function LanguageLayout({
  children,
  params,
}: LanguageLayoutProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <SiteDocument language={lang}>{children}</SiteDocument>;
}
