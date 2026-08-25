import Link from "next/link";
import type { ReactNode } from "react";

type CTAVariant = "primary" | "project" | "text";

type CTAProps = {
  children: ReactNode;
  href: string;
  variant?: CTAVariant;
  className?: string;
};

export default function CTA({
  children,
  href,
  variant = "primary",
  className = "",
}: CTAProps) {
  const variantClass = {
    primary: "moca-button-primary",
    project: "moca-button-primary moca-button-project",
    text: "moca-text-cta",
  }[variant];

  return (
    <Link
      href={href}
      className={`moca-button-base ${variantClass} ${className}`}
    >
      {children}
    </Link>
  );
}
