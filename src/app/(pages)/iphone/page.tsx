import type { Metadata } from "next";
import { Iphone } from "@/components/pages/iphone/iphone";

export const metadata: Metadata = {
  title: "Keep iPhone Screen On — Free Browser Tool",
  description:
    "Keep your iPhone screen on and prevent it from turning off. Free browser tool for iPhone and iPad — no app install, no settings changes.",
};

export default function IphonePage() {
  return <Iphone />;
}
