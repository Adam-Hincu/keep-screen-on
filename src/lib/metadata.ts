import type { Metadata } from "next";

import { getPageByKey, type PageKey } from "@/lib/pages";
import { siteConfig } from "@/lib/site";

const openGraphImage = {
  url: siteConfig.ogImage.path,
  width: siteConfig.ogImage.width,
  height: siteConfig.ogImage.height,
  alt: siteConfig.ogImage.alt,
  type: siteConfig.ogImage.type,
} as const;

function createOpenGraph({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}): NonNullable<Metadata["openGraph"]> {
  return {
    title,
    description,
    url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [openGraphImage],
  };
}

function createTwitter({
  title,
  description,
}: {
  title: string;
  description: string;
}): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title,
    description,
    creator: siteConfig.twitterHandle,
    site: siteConfig.twitterHandle,
    images: [openGraphImage],
  };
}

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
    openGraph: createOpenGraph({
      title: siteConfig.ogTitle,
      description: page.description,
      url: page.path,
    }),
    twitter: createTwitter({
      title: siteConfig.ogTitle,
      description: page.description,
    }),
    robots: {
      index: true,
      follow: true,
    },
  };
}

const homePage = getPageByKey("home");

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: homePage.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.defaultDescription,
  applicationName: siteConfig.name,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.name,
  },
  authors: [{ name: siteConfig.author, url: siteConfig.twitterUrl }],
  creator: siteConfig.author,
  icons: {
    icon: [
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon.ico", sizes: "any" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: createOpenGraph({
    title: siteConfig.ogTitle,
    description: homePage.description,
    url: "/",
  }),
  twitter: createTwitter({
    title: siteConfig.ogTitle,
    description: homePage.description,
  }),
  robots: {
    index: true,
    follow: true,
  },
};
