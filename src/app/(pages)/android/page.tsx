import type { Metadata } from "next";
import { Android } from "@/components/pages/android/android";

export const metadata: Metadata = {
  title: "Keep Android Screen On — Free Browser Tool",
  description:
    "Keep your Android screen on and prevent it from turning off. Free browser tool for Android phones and tablets — no app install, no settings changes.",
};

export default function AndroidPage() {
  return <Android />;
}
