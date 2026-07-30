import type { Metadata } from "next";

import { getPageByKey, type PageKey } from "@/lib/pages";
import { siteConfig } from "@/lib/site";

export function createPageMetadata(pageKey: PageKey): Metadata {
  const page = getPageByKey(pageKey);

  return {
    title: {
      absolute: page.title,
    },
    description: page.description,
    authors: [{ name: siteConfig.author, url: siteConfig.twitterUrl }],
    creator: siteConfig.author,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: page.path,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: page.title,
      description: page.description,
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: getPageByKey("home").title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.defaultDescription,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author, url: siteConfig.twitterUrl }],
  creator: siteConfig.author,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary",
    creator: siteConfig.twitterHandle,
    site: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
  },
};
