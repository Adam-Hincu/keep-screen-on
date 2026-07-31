const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://keepscreenon.vercel.app";

export const siteConfig = {
  name: "Keep Screen On",
  url: siteUrl.replace(/\/$/, ""),
  author: "Adam Hincu",
  copyright: "Adam Hincu",
  locale: "en_US",
  language: "en",
  twitterHandle: "@AdamHincu",
  twitterUrl: "https://x.com/AdamHincu",
  defaultDescription:
    "Stop your screen from automatically turning off in your browser. Free. No login. No downloads.",
  themeColor: "#ebebeb",
  darkThemeColor: "#1a1a1a",
  backgroundColor: "#ffffff",
  ogImage: {
    path: "/images/og.png",
    width: 1200,
    height: 630,
    alt: "Keep Screen On — Stop your screen from automatically turning off.",
    type: "image/png",
  },
} as const;
