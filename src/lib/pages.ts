export type PageKey =
  | "home"
  | "iphone"
  | "android"
  | "mac"
  | "windows"
  | "linux";

export type SitePage = {
  key: PageKey;
  path: `/${string}` | "/";
  title: string;
  description: string;
  operatingSystem: string;
};

export const sitePages: SitePage[] = [
  {
    key: "home",
    path: "/",
    title: "Stop your screen from automatically Turning Off, Free, No Signup",
    description:
      "Keep Screen ON keeps your screen awake so background tasks keep running and you stay online in work apps.",
    operatingSystem: "Any",
  },
  {
    key: "iphone",
    path: "/iphone",
    title: "Stop your iphone from automatically Turning Off, Free, No Signup",
    description:
      "Keep Screen ON keeps your iphone's screen awake so background tasks keep running and you stay online in work apps.",
    operatingSystem: "iOS",
  },
  {
    key: "android",
    path: "/android",
    title: "Stop your phone from automatically Turning Off, Free, No Signup",
    description:
      "Keep Screen ON keeps your phone's screen awake so background tasks keep running and you stay online in work apps.",
    operatingSystem: "Android",
  },
  {
    key: "mac",
    path: "/mac",
    title: "Stop your mac from automatically Turning Off, Free, No Signup",
    description:
      "Keep Screen ON keeps your mac's screen awake so background tasks keep running and you stay online in work apps.",
    operatingSystem: "macOS",
  },
  {
    key: "windows",
    path: "/windows",
    title:
      "Stop your computer from automatically Turning Off, Free, No Signup",
    description:
      "Keep Screen ON keeps your computer's screen awake so background tasks keep running and you stay online in work apps.",
    operatingSystem: "Windows",
  },
  {
    key: "linux",
    path: "/linux",
    title:
      "Stop your computer from automatically Turning Off, Free, No Signup",
    description:
      "Keep Screen ON keeps your computer's screen awake so background tasks keep running and you stay online in work apps.",
    operatingSystem: "Linux",
  },
];

export function getPageByKey(key: PageKey): SitePage {
  const page = sitePages.find((entry) => entry.key === key);

  if (!page) {
    throw new Error(`Unknown page key: ${key}`);
  }

  return page;
}
