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
  {
    question: "Is this the same as changing my power settings?",
    answer:
      "No. Power settings change how the device behaves for every app. This tool only requests that the display stay awake while this browser tab keeps an active wake lock.",
  },
  {
    question: "Will it keep downloads or background jobs running?",
    answer:
      "It helps when jobs stall because the screen turned off or the session looked idle. It does not guarantee CPU or network work continues if the operating system suspends the browser or the app for other reasons.",
  },
  {
    question: "Why did the screen still turn off?",
    answer:
      "Battery savers, Low Power Mode, enterprise lock policies, switching away from the tab, or a browser without wake lock support can end or block the lock. Try another modern browser and keep this tab in the foreground.",
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
  {
    question: "Does Low Power Mode affect this?",
    answer:
      "Yes. Low Power Mode can dim the display earlier and make wake locks less reliable. Turn it off for the session if your iPhone still sleeps while the timer is running.",
  },
  {
    question: "Do I need to set Auto-Lock to Never?",
    answer:
      "No. Leave Auto-Lock as you prefer. This page is meant to keep the screen on temporarily without permanently changing Display & Brightness settings.",
  },
  {
    question: "Will locking the iPhone with the side button end it?",
    answer:
      "Yes. Manually locking the device or leaving Safari in the background for a long time typically ends the wake lock until you open the page and start again.",
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
  {
    question: "Could battery optimization stop the wake lock?",
    answer:
      "Yes. OEM battery savers, Adaptive Battery, and “sleeping apps” lists can restrict the browser so the lock drops. Set your browser to unrestricted for the session and keep the tab in the foreground.",
  },
  {
    question: "Is Chrome better than Samsung Internet for this?",
    answer:
      "Chrome usually has the most predictable Screen Wake Lock support. Samsung Internet and other Chromium browsers often work, but if one fails, retry in Chrome with a single open tab.",
  },
  {
    question: "Does this change Adaptive Battery or Display settings?",
    answer:
      "No. Your Android Display timeout and battery settings stay the same. Only the active browser tab requests that the screen stay awake.",
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
  {
    question: "Does closing the MacBook lid end the wake lock?",
    answer:
      "Usually yes for the built-in display, and clamshell setups follow separate macOS rules. A browser wake lock is not a substitute for system sleep inhibitors when the lid is closed.",
  },
  {
    question: "Should I change Battery or Lock Screen settings instead?",
    answer:
      "Only if you want a machine-wide change. This page is for temporary display stay-on without editing Energy or Lock Screen defaults.",
  },
  {
    question: "Does it work better on power adapter than on battery?",
    answer:
      "Often yes. macOS Low Power Mode and battery policies can dim more aggressively. Plug in for long sessions when you can.",
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
  {
    question: "Can this bypass a work PC lock policy?",
    answer:
      "No. Group Policy, Intune, and screensaver lock timeouts can still lock Windows. This tool may keep the display awake, but it cannot remove mandatory security locks.",
  },
  {
    question: "Does it keep an RDP session alive by itself?",
    answer:
      "Not reliably. Keeping the local screen on is separate from remote desktop idle timeouts. You may still need remote-side settings for long unattended RDP work.",
  },
  {
    question: "Edge or Chrome vs Firefox?",
    answer:
      "Edge and Chrome generally offer the most consistent wake lock support on Windows. If Firefox drops the lock, retry the session in Edge or Chrome.",
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
  {
    question: "Is this the same as systemd-inhibit or a DE presentation mode?",
    answer:
      "No. Those tools can block sleep for the whole session. Keep Screen On is install-free and limited to a supporting browser tab, which is enough for many temporary screen-on needs.",
  },
  {
    question: "Why might Flatpak or Snap browsers fail?",
    answer:
      "Sandboxed packages sometimes restrict power-related APIs. If a Flatpak browser fails, try your distribution’s Chromium or Firefox package for that session.",
  },
  {
    question: "Do I need different steps on Wayland vs X11?",
    answer:
      "Usually not. If the screen still blanks, your desktop’s idle settings may be overriding the browser. Temporarily disable blanking once to confirm the API works, then use this page instead of leaving blanking off.",
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
