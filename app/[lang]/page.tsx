import { notFound } from "next/navigation";
import { SchoolExperience } from "@/components/SchoolExperience";
import { getSiteContent } from "@/lib/content";
import { isLocale } from "@/lib/i18n";

type LanguagePageProps = {
  params: Promise<{ lang: string }>;
};

export default async function LanguagePage({ params }: LanguagePageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <SchoolExperience locale={lang} content={getSiteContent(lang)} />;
}
