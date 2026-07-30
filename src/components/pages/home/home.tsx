import { Hero } from "@/components/pages/home/sections/hero";
import { PageInset } from "@/components/pages/shared/page-inset";

export function Home() {
  return (
    <main className="flex min-h-full flex-1 flex-col">
      <PageInset>
        <Hero />
      </PageInset>
    </main>
  );
}