import { cn } from "@/lib/utils";

type PageInsetProps = React.ComponentProps<"div">;

export function PageInset({ className, children, ...props }: PageInsetProps) {
  return (
    <div
      className={cn("flex min-h-full flex-1 flex-col px-lg", className)}
      {...props}
    >
      {children}
    </div>
  );
}
