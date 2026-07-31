import { ToolCard } from "@/components/ui/custom/tool-card";

type HeroProps = {
  title: string;
};

export function Hero({ title }: HeroProps) {
  return (
    <section className="flex min-h-svh flex-col justify-center py-lg">
      <div className="flex flex-col gap-6 sm:gap-8">
        <h1 className="mx-auto max-w-[calc(var(--spacing-16)*10)] text-center font-heading text-4xl font-bold tracking-tight text-foreground sm:text-display">
          {title}
          <span className="text-brand">.</span>
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
