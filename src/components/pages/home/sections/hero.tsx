import { ToolCard } from "@/components/pages/home/components/tool-card";

export function Hero() {
  return (
    <section className="flex w-full flex-1 flex-col items-center justify-center gap-6 text-center sm:gap-8">
      <h1 className="max-w-full font-heading text-4xl font-bold tracking-tight text-foreground sm:text-display">
        <span className="block">Stop your screen from</span>
        <span className="block">
          turning off
          <span className="text-brand">.</span>
        </span>
      </h1>
      <div className="w-full sm:w-auto">
        <ToolCard />
      </div>
    </section>
  );
}
