export type PageKey = "home" | "iphone" | "android" | "mac" | "windows";

export type SitePage = {
  key: PageKey;
  path: `/${string}` | "/";
  title: string;
  description: string;
  linkLabel: string;
  operatingSystem: string;
};

export const sitePages: SitePage[] = [
  {
    key: "home",
    path: "/",
    title: "Stop Your Screen from Automatically Turning Off — Free, No Signup",
    description:
      "Stop your screen from automatically turning off in your browser. Free. No login. No downloads.",
    linkLabel: "All devices",
    operatingSystem: "Any",
  },
  {
    key: "iphone",
    path: "/iphone",
    title:
      "Stop Your iPhone Screen from Automatically Turning Off — Free, No Signup",
    description:
      "Stop your iPhone screen from automatically turning off in your browser. Free. No login. No downloads.",
    linkLabel: "iPhone & iPad",
    operatingSystem: "iOS",
  },
  {
    key: "android",
    path: "/android",
    title:
      "Stop Your Phone Screen from Automatically Turning Off — Free, No Signup",
    description:
      "Stop your Android phone screen from automatically turning off in your browser. Free. No login. No downloads.",
    linkLabel: "Android",
    operatingSystem: "Android",
  },
  {
    key: "mac",
    path: "/mac",
    title:
      "Stop Your Mac Screen from Automatically Turning Off — Free, No Signup",
    description:
      "Stop your Mac screen from automatically turning off in your browser. Free. No login. No downloads.",
    linkLabel: "Mac",
    operatingSystem: "macOS",
  },
  {
    key: "windows",
    path: "/windows",
    title:
      "Stop Your Windows Screen from Automatically Turning Off — Free, No Signup",
    description:
      "Stop your Windows screen from automatically turning off in your browser. Free. No login. No downloads.",
    linkLabel: "Windows",
    operatingSystem: "Windows",
  },
];

export const platformPages = sitePages.filter((page) => page.key !== "home");

export function getPageByKey(key: PageKey): SitePage {
  const page = sitePages.find((entry) => entry.key === key);

  if (!page) {
    throw new Error(`Unknown page key: ${key}`);
  }

  return page;
}
