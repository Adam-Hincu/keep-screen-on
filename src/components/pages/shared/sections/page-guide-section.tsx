import { getPageGuide } from "@/lib/page-guides";
import type { PageKey } from "@/lib/pages";

type PageGuideSectionProps = {
  pageKey: PageKey;
};

export function PageGuideSection({ pageKey }: PageGuideSectionProps) {
  const guide = getPageGuide(pageKey);

  return (
    <section className="pb-xl" aria-labelledby="page-guide-heading">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2
            id="page-guide-heading"
            className="font-heading text-2xl font-semibold tracking-tight text-foreground"
          >
            {guide.title}
          </h2>
          <p className="leading-relaxed text-muted-foreground">{guide.intro}</p>
        </div>

        {guide.blocks.map((block) => (
          <div key={block.heading} className="flex flex-col gap-4">
            <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
              {block.heading}
            </h3>
            <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
              {block.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
            Practical tips
          </h3>
          <ul className="flex list-none flex-col gap-4">
            {guide.tips.map((tip) => (
              <li key={tip.title} className="flex flex-col gap-2">
                <span className="font-medium text-foreground">{tip.title}</span>
                <span className="leading-relaxed text-muted-foreground">
                  {tip.body}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
