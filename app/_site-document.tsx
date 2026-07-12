import type { ReactNode } from "react";
import { localeHtmlLang, type Locale } from "@/lib/i18n";

const contentSecurityPolicy =
  "default-src 'self'; base-uri 'self'; connect-src 'self'; font-src 'self' data:; form-action 'none'; frame-src 'none'; img-src 'self' data:; media-src 'self'; object-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; upgrade-insecure-requests";

type SiteDocumentProps = {
  children: ReactNode;
  language: Locale;
};

export function SiteDocument({ children, language }: SiteDocumentProps) {
  return (
    <html lang={localeHtmlLang[language]}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={contentSecurityPolicy} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body>{children}</body>
    </html>
  );
}
