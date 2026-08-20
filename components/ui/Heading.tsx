import type { ReactNode } from "react";

type HeadingVariant = "display" | "h1" | "h2" | "h3";
type HeadingLevel = "h1" | "h2" | "h3";

type HeadingProps = {
  children: ReactNode;
  variant?: HeadingVariant;
  level?: HeadingLevel;
  className?: string;
};

export default function Heading({
  children,
  variant = "h2",
  level = "h2",
  className = "",
}: HeadingProps) {
  const Tag = level;

  return (
    <Tag className={`type-${variant} ${className}`}>
      {children}
    </Tag>
  );
}