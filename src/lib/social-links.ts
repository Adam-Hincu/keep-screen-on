function readSocialUrl(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export const socialLinks = {
  x: readSocialUrl(process.env.NEXT_PUBLIC_X_URL),
  youtube: readSocialUrl(process.env.NEXT_PUBLIC_YOUTUBE_URL),
  discord: readSocialUrl(process.env.NEXT_PUBLIC_DISCORD_URL),
} as const;

export type SocialLinkKey = keyof typeof socialLinks;
