import { ToolCard } from "@/components/ui/custom/tool-card";

export function Hero() {
  return (
    <section className="flex min-h-svh flex-col justify-center py-lg">
      <div className="flex flex-col gap-6 sm:gap-8">
        <h1 className="text-center font-heading text-4xl font-bold tracking-tight text-foreground sm:text-display">
          <span className="block">Stop your Mac from</span>
          <span className="block">
            turning off
            <span className="text-brand">.</span>
          </span>
        </h1>

        <div className="flex flex-col items-center gap-2">
          <ToolCard />
          <p className="text-xs text-muted-foreground">
            Only works while this tab is open.
          </p>
        </div>
      </div>
    </section>
  );
}
