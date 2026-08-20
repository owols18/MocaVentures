import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "text";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const variantClass =
    variant === "primary"
      ? "moca-button-primary"
      : "moca-text-cta";

  return (
    <button
      type={type}
      className={`moca-button-base ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}