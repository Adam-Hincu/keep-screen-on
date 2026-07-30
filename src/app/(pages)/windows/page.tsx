import type { Metadata } from "next";
import { Windows } from "@/components/pages/windows/windows";

export const metadata: Metadata = {
  title: "Keep Windows Screen On — Free Browser Tool",
  description:
    "Keep your Windows screen on and prevent it from turning off. Free browser tool for Windows laptops and desktops — no install, no settings changes.",
};

export default function WindowsPage() {
  return <Windows />;
}
