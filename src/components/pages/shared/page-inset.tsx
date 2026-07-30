import { cn } from "@/lib/utils";

type PageInsetProps = React.ComponentProps<"div">;

export function PageInset({ className, children, ...props }: PageInsetProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[calc(var(--spacing-16)*16)] px-md sm:px-lg",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
