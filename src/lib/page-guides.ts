import type { PageKey } from "@/lib/pages";

export type GuideBlock = {
  heading: string;
  paragraphs: string[];
};

export type GuideTip = {
  title: string;
  body: string;
};

export type PageGuide = {
  title: string;
  intro: string;
  blocks: GuideBlock[];
  tips: GuideTip[];
};

const homeGuide: PageGuide = {
  title: "What a browser wake lock can and cannot do",
  intro:
    "A screen wake lock is a temporary browser feature: while this tab stays open and the lock is active, the display is asked not to dim or turn off. It is not a system setting change, and it is not a full “never sleep” utility for the whole computer.",
  blocks: [
    {
      heading: "When this tool is the right fit",
      paragraphs: [
        "Use it when you need the screen to stay visible for a while — presentations, monitoring dashboards, reading long documents, remote desktop sessions, or staying marked as active in chat and work apps — without digging through device power menus.",
        "It is especially useful on shared or locked-down devices where you cannot change screen timeout, Auto-Lock, or Energy Saver settings, but you can still open a browser tab.",
      ],
    },
    {
      heading: "Hard limits you should expect",
      paragraphs: [
        "Closing the tab, putting the browser in the background for a long time, or locking the device can end the wake lock. Some phones and company-managed computers still enforce their own lock timers for security.",
        "A screen wake lock keeps the display awake. It does not guarantee that downloads, CPU-heavy jobs, or background apps will keep running if the OS decides to suspend them for other reasons.",
      ],
    },
    {
      heading: "Browser support in plain terms",
      paragraphs: [
        "Modern Chromium browsers (Chrome, Edge, Brave, and many Android browsers) generally support the Screen Wake Lock API. Safari on recent iOS and macOS versions also supports it in more cases than older releases did.",
        "If Start does nothing or the lock drops immediately, try another browser, keep the tab in the foreground, and make sure battery saver / Low Power Mode is not aggressively dimming the display.",
      ],
    },
  ],
  tips: [
    {
      title: "Prefer a dedicated device page",
      body: "iPhone, Android, Mac, Windows, and Linux each have different power menus, browser quirks, and failure modes. Use the matching page when you want platform-specific guidance.",
    },
    {
      title: "Leave the tab visible",
      body: "Wake locks are tied to the page. Switching away for a long time, discarding the tab, or closing the browser ends the session.",
    },
    {
      title: "Use a timer when you can",
      body: "Always On is convenient, but a Custom or preset duration reduces the chance you leave the screen lit overnight by accident.",
    },
  ],
};

const iphoneGuide: PageGuide = {
  title: "iPhone and iPad: wake lock vs Auto-Lock",
  intro:
    "On iOS, “keep screen on” usually means fighting Auto-Lock, Low Power Mode, and Safari’s tab behavior — not rewriting system settings. This page is for temporary, browser-based screen wake without changing Auto-Lock.",
  blocks: [
    {
      heading: "How this differs from changing Auto-Lock",
      paragraphs: [
        "Settings → Display & Brightness → Auto-Lock controls the system default. Keep Screen On does not move that slider. While the wake lock is active in Safari or another supported browser, the display is requested to stay on for this tab only.",
        "When you close the page or the lock ends, your normal Auto-Lock timing applies again. That makes this safer on a shared iPhone than permanently setting Auto-Lock to Never.",
      ],
    },
    {
      heading: "Safari, Chrome, and Low Power Mode",
      paragraphs: [
        "Recent iOS Safari builds support screen wake lock for many use cases, and Chrome on iOS uses WebKit under the hood, so behavior is closer than on Android. Still, Low Power Mode can dim the screen earlier and may make locks feel less reliable.",
        "If the screen still sleeps, turn off Low Power Mode for the session, keep Safari in the foreground, and avoid opening so many tabs that iOS suspends the page.",
      ],
    },
    {
      heading: "What this will not override",
      paragraphs: [
        "Guided Access, Screen Time limits, MDM / supervised device policies, and some Face ID or passcode lock rules can still take over. A browser cannot disable those.",
        "Turning the screen off with the side button, locking the phone, or switching to another app for a long period typically ends the wake lock until you return and start again.",
      ],
    },
  ],
  tips: [
    {
      title: "Keep brightness reasonable",
      body: "An always-on bright panel drains battery quickly on iPhone. Use the shortest timer that covers your task.",
    },
    {
      title: "Prefer Safari for the simplest path",
      body: "If a third-party browser behaves oddly, retry in Safari with this tab alone in the foreground.",
    },
    {
      title: "Presentations and scoreboards",
      body: "For short demos, a 1h or 2h preset is usually enough and avoids leaving the display lit after you walk away.",
    },
  ],
};

const androidGuide: PageGuide = {
  title: "Android: screen timeout, OEMs, and browser differences",
  intro:
    "Android phones vary a lot by manufacturer. Chrome, Samsung Internet, and other browsers may all support wake lock, but battery savers and adaptive timeouts can still dim the screen unless the tab stays active.",
  blocks: [
    {
      heading: "Screen timeout vs this page",
      paragraphs: [
        "Android’s Display → Screen timeout (wording varies by OEM) sets the default idle delay. Keep Screen On does not edit that value. It requests a wake lock while this tab is open so you do not have to set timeout to the maximum just for one session.",
        "That is useful on work phones where Display settings are restricted, or when you only need the screen awake for a download, cast, or monitoring task.",
      ],
    },
    {
      heading: "Battery optimization and OEM skins",
      paragraphs: [
        "Samsung, Xiaomi, Oppo, and others ship aggressive battery features that can restrict background activity. A screen wake lock is about the display; if Adaptive Battery or a “sleeping apps” list freezes Chrome, the lock can drop when you leave the tab.",
        "If Start works briefly then the screen sleeps, check Battery → battery optimization / unrestricted for your browser, disable power saving for the session, and keep the browser in the foreground.",
      ],
    },
    {
      heading: "Chrome vs Samsung Internet",
      paragraphs: [
        "Chrome on Android generally has solid Screen Wake Lock API support. Samsung Internet and other Chromium-based browsers often work too, but extensions, dark-mode engines, or “power saving” browser modes can interfere.",
        "When in doubt, test in stock Chrome with a single tab. If that works and another browser does not, the issue is browser policy — not your Display timeout setting.",
      ],
    },
  ],
  tips: [
    {
      title: "Plug in for long sessions",
      body: "Keeping an AMOLED or LCD panel lit for hours is hard on battery. Use Always On only when the phone is charging if you can.",
    },
    {
      title: "Avoid gesture-nav accidental exits",
      body: "Accidentally swiping the browser away ends the lock. Pin the app or be careful with the gesture bar during long timers.",
    },
    {
      title: "Tablets work the same way",
      body: "Android tablets use the same wake lock approach; foldables may still dim when folded closed depending on OEM behavior.",
    },
  ],
};

const macGuide: PageGuide = {
  title: "Mac: Energy settings, Safari, and laptop lids",
  intro:
    "On macOS you can prevent display sleep from System Settings, but that changes the machine for every app. A browser wake lock is a lighter, temporary option when you only need the screen on while one page stays open.",
  blocks: [
    {
      heading: "Compared with Energy / Battery settings",
      paragraphs: [
        "System Settings → Lock Screen / Battery (labels depend on your macOS version) control display off and sleep timers. Keep Screen On leaves those alone and only requests that the display stay awake for this browser context.",
        "That is handy on a work Mac where you should not change corporate defaults, or when you want the normal sleep schedule back the moment you close the tab.",
      ],
    },
    {
      heading: "Safari, Chrome, and battery vs power adapter",
      paragraphs: [
        "Safari on recent macOS versions and Chromium browsers commonly support screen wake lock. On battery, macOS may still be more aggressive about dimming; on power adapter, long sessions are usually more stable.",
        "If the lock fails, check that the browser has permission to run normally, Low Power Mode is off, and the tab is not discarded by a memory-saving extension.",
      ],
    },
    {
      heading: "Clamshell mode and external displays",
      paragraphs: [
        "Closing a MacBook lid while using an external monitor follows clamshell rules that are separate from a web wake lock. If the lid is closed and the system sleeps anyway, this page cannot force the machine to stay awake by itself.",
        "For desk setups, leave the lid open or use macOS power settings intended for clamshell use; treat Keep Screen On as display-stay-on for the browser session, not as a replacement for `caffeinate` or system sleep inhibitors.",
      ],
    },
  ],
  tips: [
    {
      title: "Use it for screen sharing",
      body: "When demos or Zoom screen shares drop because the display slept, a timed wake lock on this page is often enough without changing Energy settings permanently.",
    },
    {
      title: "Prefer a duration on battery",
      body: "MacBook panels are bright. Prefer 1h–2h presets over Always On when you are not plugged in.",
    },
    {
      title: "Extensions can steal focus",
      body: "Popup blockers or session managers that reload tabs may clear the wake lock. Pause aggressive extensions if the lock drops early.",
    },
  ],
};

const windowsGuide: PageGuide = {
  title: "Windows: power plans, lock screen, and managed PCs",
  intro:
    "Windows separates screen off, sleep, and lock. A browser wake lock mainly targets display sleep while the tab is open. It will not always defeat a domain-enforced lock timeout or a full system sleep policy.",
  blocks: [
    {
      heading: "Screen off vs sleep vs lock",
      paragraphs: [
        "Settings → System → Power & battery (or Power & sleep on older builds) sets when the screen turns off and when the PC sleeps. Keep Screen On does not rewrite those values; it asks the browser to keep the screen awake for this page.",
        "Windows can still show the lock screen on a separate schedule (Win+L, dynamic lock, or policy). If your PC locks every 5 minutes by group policy, a website cannot remove that requirement.",
      ],
    },
    {
      heading: "Edge, Chrome, and Firefox",
      paragraphs: [
        "Edge and Chrome (Chromium) typically support the Screen Wake Lock API well. Firefox support can vary by version; if Start does not hold on Firefox, retry in Edge or Chrome for the session.",
        "Hardware-accelerated video overlays and some full-screen exclusive games can interact oddly with display power — for a simple stay-awake tab, a normal windowed browser works best.",
      ],
    },
    {
      heading: "Work laptops and remote desktop",
      paragraphs: [
        "On company devices, BitLocker-era policies, Intune profiles, or screensaver timeouts may still lock the session. Use this tool for display stay-on when policy allows; escalate to IT if lock timeouts are mandatory.",
        "For Remote Desktop / RDP, keeping the local screen awake is not the same as keeping the remote session alive. You may need both a wake lock locally and remote-side idle settings for long unattended RDP work.",
      ],
    },
  ],
  tips: [
    {
      title: "Presentation and kiosk use",
      body: "A timed lock on this page is a quick alternative to Windows Presentation Mode when you only need one browser window to stay lit.",
    },
    {
      title: "Check “Screen turn off on battery”",
      body: "Laptops often use a short battery display timeout. If the lock feels flaky on battery, plug in or temporarily lengthen the battery display timeout.",
    },
    {
      title: "Close when finished",
      body: "Ending the timer or closing the tab returns you to normal Windows power behavior — no leftover “never sleep” setting to undo.",
    },
  ],
};

const linuxGuide: PageGuide = {
  title: "Linux: browsers, desktops, and idle inhibitors",
  intro:
    "Linux power behavior depends on your desktop (GNOME, KDE, XFCE, etc.), whether you run X11 or Wayland, and which browser you use. A web wake lock is the portable option when you do not want to touch DE settings or run `systemd-inhibit`.",
  blocks: [
    {
      heading: "Desktop idle vs browser wake lock",
      paragraphs: [
        "GNOME Settings → Power, KDE Power Management, and similar panels control blanking and suspend. Keep Screen On leaves those defaults alone and only requests a screen wake lock inside a supporting browser.",
        "That is useful on shared lab machines, immutable OS images, or accounts where you lack permission to change power settings but can still run Firefox or Chromium.",
      ],
    },
    {
      heading: "Chrome, Chromium, Edge, and Firefox",
      paragraphs: [
        "Chromium-based browsers on Linux generally expose the Screen Wake Lock API. Firefox support depends on version and build flags; if the lock does not stick, try Chromium or Google Chrome for that session.",
        "Flatpak or Snap sandboxes occasionally restrict power-related APIs. If a distro-packaged browser works and a sandboxed one does not, prefer the distro package while you need the wake lock.",
      ],
    },
    {
      heading: "Wayland, X11, and stronger alternatives",
      paragraphs: [
        "Most users do not need to think about the display server: if Start keeps the screen on, you are fine. If blanking still happens, your compositor may be ignoring or racing the browser inhibitor.",
        "For system-wide “do not sleep” during compiles or long SSH port-forwards, tools like `systemd-inhibit`, GNOME’s built-in inhibitors, or DE “presentation” modes are stronger than a webpage. Use Keep Screen On when you want something temporary and install-free.",
      ],
    },
  ],
  tips: [
    {
      title: "Laptop lid switches still win",
      body: "Closing the lid usually triggers DE or firmware actions a browser cannot override. Leave the lid open for unattended on-screen tasks.",
    },
    {
      title: "Disable aggressive dimming for the test",
      body: "If the lock fails, temporarily turn off automatic screen blanking once to confirm the browser API works, then rely on this page instead of leaving blanking disabled.",
    },
    {
      title: "One browser window is enough",
      body: "You do not need a special extension. A single foreground tab with an active timer is the intended setup.",
    },
  ],
};

const guidesByPageKey: Record<PageKey, PageGuide> = {
  home: homeGuide,
  iphone: iphoneGuide,
  android: androidGuide,
  mac: macGuide,
  windows: windowsGuide,
  linux: linuxGuide,
};

export function getPageGuide(pageKey: PageKey): PageGuide {
  return guidesByPageKey[pageKey];
}
