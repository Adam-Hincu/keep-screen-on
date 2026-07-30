import type { Metadata } from "next";
import { Mac } from "@/components/pages/mac/mac";

export const metadata: Metadata = {
  title: "Keep Mac Screen On — Free Browser Tool",
  description:
    "Keep your Mac screen on and prevent it from turning off. Free browser tool for MacBook, iMac, and desktop Macs — no install, no settings changes.",
};

export default function MacPage() {
  return <Mac />;
}
