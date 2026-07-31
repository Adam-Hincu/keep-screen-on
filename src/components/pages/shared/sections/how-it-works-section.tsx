import { howItWorksSteps } from "@/lib/how-it-works";

export function HowItWorksSection() {
  return (
    <section className="pb-xl" aria-labelledby="how-it-works-heading">
      <div className="flex flex-col gap-4">
        <h2
          id="how-it-works-heading"
          className="font-heading text-2xl font-semibold tracking-tight text-foreground"
        >
          How it works
        </h2>

        <ol className="grid list-none grid-cols-1 gap-md sm:grid-cols-3">
          {howItWorksSteps.map((step, index) => (
            <li
              key={step}
              className="flex flex-col gap-md rounded-2xl border border-border bg-card p-md"
            >
              <span
                aria-hidden
                className="flex size-icon-md shrink-0 items-center justify-center rounded-full bg-muted font-heading text-sm font-semibold text-muted-foreground"
              >
                {index + 1}
              </span>
              <span className="leading-relaxed text-muted-foreground">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
