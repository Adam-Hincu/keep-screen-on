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
    title: "Prevent Your Screen from Automatically Turning Off — Free, No Signup",
    description:
      "Stop your screen from automatically turning off in your browser. Free. No login. No downloads.",
    operatingSystem: "Any",
  },
  {
    key: "iphone",
    path: "/iphone",
    title:
      "Prevent Your iPhone Screen from Automatically Turning Off — Free, No Signup",
    description:
      "Stop your iPhone screen from automatically turning off in your browser. Free. No login. No downloads.",
    operatingSystem: "iOS",
  },
  {
    key: "android",
    path: "/android",
    title:
      "Prevent Your Phone Screen from Automatically Turning Off — Free, No Signup",
    description:
      "Stop your Android phone screen from automatically turning off in your browser. Free. No login. No downloads.",
    operatingSystem: "Android",
  },
  {
    key: "mac",
    path: "/mac",
    title:
      "Prevent Your Mac Screen from Automatically Turning Off — Free, No Signup",
    description:
      "Stop your Mac screen from automatically turning off in your browser. Free. No login. No downloads.",
    operatingSystem: "macOS",
  },
  {
    key: "windows",
    path: "/windows",
    title:
      "Prevent Your Computer Screen from Automatically Turning Off — Free, No Signup",
    description:
      "Stop your Windows screen from automatically turning off in your browser. Free. No login. No downloads.",
    operatingSystem: "Windows",
  },
  {
    key: "linux",
    path: "/linux",
    title:
      "Prevent Your Computer Screen from Automatically Turning Off — Free, No Signup",
    description:
      "Stop your Linux screen from automatically turning off in your browser. Free. No login. No downloads.",
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
