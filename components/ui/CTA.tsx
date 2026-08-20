import Link from "next/link";
import type { ReactNode } from "react";

type CTAVariant = "primary" | "text";

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
  const variantClass =
    variant === "primary"
      ? "moca-button-primary"
      : "moca-text-cta";

  return (
    <Link
      href={href}
      className={`moca-button-base ${variantClass} ${className}`}
    >
      {children}
    </Link>
  );
}