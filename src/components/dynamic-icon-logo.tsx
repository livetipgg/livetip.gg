import { cn } from "@/lib/utils";

export function DynamicIconLogo({
  lightSrc,
  darkSrc,
  alt,
  className,
  ...props
}) {
  return (
    <>
      <img
        src={lightSrc}
        alt={alt}
        className={cn("hidden dark:block", className)}
        {...props}
      />
      <img
        src={darkSrc}
        alt={alt}
        className={cn("dark:hidden", className)}
        {...props}
      />
    </>
  );
}
