import type { PageKey } from "@/lib/pages";

export type FaqItem = {
  question: string;
  answer: string;
};

const homeFaq: FaqItem[] = [
  {
    question: "Does this change my screen timeout settings?",
    answer:
      "No. Your screen timeout and power settings stay exactly the same. This tool keeps your screen awake without changing your device settings.",
  },
  {
    question: "Does it stop my screen from locking?",
    answer:
      "It helps keep your screen on and prevents screen sleep while the timer is running. On some devices, security policies or system restrictions may still lock the computer automatically.",
  },
  {
    question: "Can it keep my computer awake?",
    answer:
      "Yes. It helps keep your computer awake so work apps, messaging platforms, remote desktop sessions, dashboards, and similar services are less likely to become inactive because the screen turned off or the computer entered sleep mode.",
  },
  {
    question: "Does it work on phones and computers?",
    answer:
      "Yes. It works on many modern Android phones, iPhones, iPads, Windows PCs, Macs, Chromebooks, laptops, tablets, and desktop computers.",
  },
  {
    question: "Do I need to install anything?",
    answer: "No. Everything runs directly in your browser.",
  },
  {
    question: "What happens if I close the page?",
    answer: "The Screen Wake Lock ends when the page is closed.",
  },
];

const iphoneFaq: FaqItem[] = [
  {
    question: "Does this change my iPhone Auto-Lock settings?",
    answer:
      "No. Your Auto-Lock and power settings stay exactly the same. This tool keeps your iPhone screen awake without changing your device settings.",
  },
  {
    question: "Does it stop my iPhone from locking?",
    answer:
      "It helps keep your iPhone screen on and prevents screen sleep while the timer is running. On some devices, security policies or system restrictions may still lock the iPhone automatically.",
  },
  {
    question: "Can it keep my iPhone awake?",
    answer:
      "Yes. It helps keep your iPhone awake so work apps, messaging platforms, remote desktop sessions, dashboards, and similar services are less likely to become inactive because the screen turned off or the device entered sleep mode.",
  },
  {
    question: "Does it work on iPhone and iPad?",
    answer:
      "Yes. It works on many modern iPhones and iPads in Safari, Chrome, and other supported browsers on iOS and iPadOS.",
  },
  {
    question: "Do I need to install an app?",
    answer: "No. Everything runs directly in your iPhone browser.",
  },
  {
    question: "What happens if I close the page?",
    answer: "The Screen Wake Lock ends when the page is closed.",
  },
];

const androidFaq: FaqItem[] = [
  {
    question: "Does this change my Android screen timeout settings?",
    answer:
      "No. Your screen timeout and power settings stay exactly the same. This tool keeps your Android screen awake without changing your device settings.",
  },
  {
    question: "Does it stop my Android phone from locking?",
    answer:
      "It helps keep your Android screen on and prevents screen sleep while the timer is running. On some devices, security policies or system restrictions may still lock the phone automatically.",
  },
  {
    question: "Can it keep my Android device awake?",
    answer:
      "Yes. It helps keep your Android device awake so work apps, messaging platforms, remote desktop sessions, dashboards, and similar services are less likely to become inactive because the screen turned off or the device entered sleep mode.",
  },
  {
    question: "Does it work on Android phones and tablets?",
    answer:
      "Yes. It works on many modern Android phones and tablets in Chrome, Samsung Internet, and other supported browsers.",
  },
  {
    question: "Do I need to install an app?",
    answer: "No. Everything runs directly in your Android browser.",
  },
  {
    question: "What happens if I close the page?",
    answer: "The Screen Wake Lock ends when the page is closed.",
  },
];

const macFaq: FaqItem[] = [
  {
    question: "Does this change my Mac Energy Saver settings?",
    answer:
      "No. Your Energy Saver and power settings stay exactly the same. This tool keeps your Mac screen awake without changing your device settings.",
  },
  {
    question: "Does it stop my Mac from locking?",
    answer:
      "It helps keep your Mac screen on and prevents screen sleep while the timer is running. On some devices, security policies or system restrictions may still lock the Mac automatically.",
  },
  {
    question: "Can it keep my Mac awake?",
    answer:
      "Yes. It helps keep your Mac awake so work apps, messaging platforms, remote desktop sessions, dashboards, and similar services are less likely to become inactive because the screen turned off or the computer entered sleep mode.",
  },
  {
    question: "Does it work on MacBook and desktop Macs?",
    answer:
      "Yes. It works on MacBook, iMac, Mac mini, Mac Studio, and other modern Macs in Safari, Chrome, Firefox, and other supported browsers.",
  },
  {
    question: "Do I need to install anything?",
    answer: "No. Everything runs directly in your Mac browser.",
  },
  {
    question: "What happens if I close the page?",
    answer: "The Screen Wake Lock ends when the page is closed.",
  },
];

const windowsFaq: FaqItem[] = [
  {
    question: "Does this change my Windows screen timeout settings?",
    answer:
      "No. Your screen timeout and power settings stay exactly the same. This tool keeps your Windows screen awake without changing your device settings.",
  },
  {
    question: "Does it stop my Windows PC from locking?",
    answer:
      "It helps keep your Windows screen on and prevents screen sleep while the timer is running. On some devices, security policies or system restrictions may still lock the computer automatically.",
  },
  {
    question: "Can it keep my Windows computer awake?",
    answer:
      "Yes. It helps keep your Windows PC awake so work apps, messaging platforms, remote desktop sessions, dashboards, and similar services are less likely to become inactive because the screen turned off or the computer entered sleep mode.",
  },
  {
    question: "Does it work on Windows laptops and desktops?",
    answer:
      "Yes. It works on many modern Windows laptops and desktop PCs in Chrome, Edge, Firefox, and other supported browsers.",
  },
  {
    question: "Do I need to install anything?",
    answer: "No. Everything runs directly in your Windows browser.",
  },
  {
    question: "What happens if I close the page?",
    answer: "The Screen Wake Lock ends when the page is closed.",
  },
];

const linuxFaq: FaqItem[] = [
  {
    question: "Does this change my Linux power or screen blanking settings?",
    answer:
      "No. Your power management and screen blanking settings stay exactly the same. This tool keeps your Linux screen awake without changing your device settings.",
  },
  {
    question: "Does it stop my Linux PC from locking?",
    answer:
      "It helps keep your Linux screen on and prevents screen sleep while the timer is running. On some devices, security policies or system restrictions may still lock the computer automatically.",
  },
  {
    question: "Can it keep my computer awake?",
    answer:
      "Yes. It helps keep your computer awake so work apps, messaging platforms, remote desktop sessions, dashboards, and similar services are less likely to become inactive because the screen turned off or the computer entered sleep mode.",
  },
  {
    question: "Does it work on Linux laptops and desktops?",
    answer:
      "Yes. It works on many modern Linux laptops and desktop PCs in Chrome, Firefox, Chromium, Edge, and other supported browsers.",
  },
  {
    question: "Do I need to install anything?",
    answer: "No. Everything runs directly in your Linux browser.",
  },
  {
    question: "What happens if I close the page?",
    answer: "The Screen Wake Lock ends when the page is closed.",
  },
];

const faqByPageKey: Record<PageKey, FaqItem[]> = {
  home: homeFaq,
  iphone: iphoneFaq,
  android: androidFaq,
  mac: macFaq,
  windows: windowsFaq,
  linux: linuxFaq,
};

export function getFaqByPageKey(pageKey: PageKey): FaqItem[] {
  return faqByPageKey[pageKey];
}
