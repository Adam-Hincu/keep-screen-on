"use client";

import * as React from "react";

const CONFETTI_COLORS = [
  "#ff6b6b",
  "#ffd93d",
  "#6bcb77",
  "#4d96ff",
  "#ff6fd8",
  "#ff922b",
  "#845ef7",
  "#20c997",
] as const;

const DEFAULT_PARTICLE_COUNT = 64;
const DEFAULT_ORIGIN = { x: 0.5, y: 0.55 };
const DEFAULT_ANGLE = -Math.PI / 2;
const DEFAULT_SPREAD = Math.PI * 0.85;

export type ConfettiOrigin = { x: number; y: number };

export type ConfettiOptions = {
  particleCount?: number;
  origin?: ConfettiOrigin;
  /** Burst direction in radians. 0 = right, -π/2 = up, π = left. */
  angle?: number;
  /** Cone width in radians. */
  spread?: number;
  onComplete?: () => void;
};

const DESKTOP_MEDIA_QUERY = "(min-width: 640px)";

function isDesktopViewport(): boolean {
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
}

/** Confetti tuned for the email popup: always originates from the card. */
export function getEmailPopupConfettiOptions(
  popupElement: HTMLElement,
): ConfettiOptions {
  const rect = popupElement.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  if (!isDesktopViewport()) {
    return {
      particleCount: 56,
      origin: {
        x: (rect.left + rect.width / 2) / viewportWidth,
        y: (rect.top + rect.height * 0.15) / viewportHeight,
      },
      angle: -Math.PI / 2,
      spread: Math.PI * 0.85,
    };
  }

  return {
    particleCount: 56,
    origin: {
      x: rect.left / viewportWidth,
      y: (rect.top + rect.height * 0.35) / viewportHeight,
    },
    angle: -Math.PI * 0.75,
    spread: Math.PI * 0.55,
  };
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  color: string;
  rotation: number;
  spin: number;
  life: number;
  decay: number;
};

/** Physics tuned for this reference frame duration; motion scales by real elapsed time. */
const REFERENCE_FRAME_MS = 1000 / 60;
const MAX_DELTA_MS = REFERENCE_FRAME_MS * 2;
/** Multiplier on simulation time — higher = snappier burst and shorter lifetime. */
const SPEED = 1.75;

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let particles: Particle[] = [];
let rafId = 0;
let lastFrameTime = 0;
let pendingComplete: (() => void) | undefined;

function readToken(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

function tokenToPx(name: string, fallbackPx: number): number {
  const raw = readToken(name);
  if (!raw) return fallbackPx;

  if (raw.endsWith("rem")) {
    const root = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return parseFloat(raw) * root;
  }

  if (raw.endsWith("px")) return parseFloat(raw);

  return fallbackPx;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function resizeCanvas() {
  if (!canvas || !ctx) return;

  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function ensureCanvas() {
  if (canvas) return;

  canvas = document.createElement("canvas");
  canvas.className = "pointer-events-none fixed inset-0 z-50";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
}

function destroyCanvas() {
  if (!canvas) return;

  window.removeEventListener("resize", resizeCanvas);
  canvas.remove();
  canvas = null;
  ctx = null;
}

function spawnParticles({
  particleCount = DEFAULT_PARTICLE_COUNT,
  origin = DEFAULT_ORIGIN,
  angle = DEFAULT_ANGLE,
  spread = DEFAULT_SPREAD,
}: ConfettiOptions) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const originX = origin.x * width;
  const originY = origin.y * height;
  const sizeBase = tokenToPx("--spacing-3", 12);

  for (let index = 0; index < particleCount; index += 1) {
    const particleAngle = angle + (Math.random() - 0.5) * spread;
    const speed = 12 + Math.random() * 16;

    particles.push({
      x: originX + (Math.random() - 0.5) * tokenToPx("--spacing-16", 64),
      y: originY,
      vx: Math.cos(particleAngle) * speed,
      vy: Math.sin(particleAngle) * speed,
      w: sizeBase * (0.55 + Math.random() * 0.75),
      h: sizeBase * (0.35 + Math.random() * 0.55),
      color:
        CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]!,
      rotation: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.3,
      life: 1,
      decay: 0.005 + Math.random() * 0.006,
    });
  }
}

function tick(now: number) {
  if (!ctx) return;

  const rawDelta = lastFrameTime === 0 ? REFERENCE_FRAME_MS : now - lastFrameTime;
  lastFrameTime = now;
  const dt = (Math.min(rawDelta, MAX_DELTA_MS) / REFERENCE_FRAME_MS) * SPEED;

  const width = window.innerWidth;
  const height = window.innerHeight;
  ctx.clearRect(0, 0, width, height);

  particles = particles.filter((particle) => {
    particle.vy += 0.22 * dt;
    particle.vx *= Math.pow(0.988, dt);
    particle.vy *= Math.pow(0.99, dt);
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.rotation += particle.spin * dt;
    particle.life -= particle.decay * dt;

    if (
      particle.life <= 0 ||
      particle.y > height + tokenToPx("--spacing-5", 20) ||
      particle.y < -tokenToPx("--spacing-16", 64) ||
      particle.x < -tokenToPx("--spacing-16", 64) ||
      particle.x > width + tokenToPx("--spacing-16", 64)
    ) {
      return false;
    }

    ctx!.save();
    ctx!.translate(particle.x, particle.y);
    ctx!.rotate(particle.rotation);
    ctx!.globalAlpha = Math.max(particle.life, 0);
    ctx!.fillStyle = particle.color;
    ctx!.fillRect(
      -particle.w / 2,
      -particle.h / 2,
      particle.w,
      particle.h,
    );
    ctx!.restore();

    return true;
  });

  if (particles.length > 0) {
    rafId = requestAnimationFrame(tick);
    return;
  }

  cancelAnimationFrame(rafId);
  rafId = 0;
  lastFrameTime = 0;
  destroyCanvas();
  pendingComplete?.();
  pendingComplete = undefined;
}

export function fireConfetti(options: ConfettiOptions = {}) {
  if (typeof window === "undefined" || prefersReducedMotion()) {
    options.onComplete?.();
    return;
  }

  ensureCanvas();
  spawnParticles(options);

  pendingComplete = options.onComplete;

  cancelAnimationFrame(rafId);
  lastFrameTime = 0;
  rafId = requestAnimationFrame(tick);
}

type ConfettiProps = ConfettiOptions & {
  active?: boolean;
};

export function Confetti({
  active = false,
  particleCount,
  origin,
  angle,
  spread,
  onComplete,
}: ConfettiProps) {
  const firedRef = React.useRef(false);

  React.useEffect(() => {
    if (!active) {
      firedRef.current = false;
      return;
    }

    if (firedRef.current) return;

    firedRef.current = true;
    fireConfetti({ particleCount, origin, angle, spread, onComplete });
  }, [active, particleCount, origin, angle, spread, onComplete]);

  return null;
}
