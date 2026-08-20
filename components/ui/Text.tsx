import type { HTMLAttributes, ReactNode } from "react";

type TextVariant =
  | "body-large"
  | "body"
  | "body-small"
  | "caption";

type TextElement = "p" | "span" | "div";

type TextProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  variant?: TextVariant;
  as?: TextElement;
};

export default function Text({
  children,
  variant = "body",
  as = "p",
  className = "",
  ...props
}: TextProps) {
  const Tag = as;

  return (
    <Tag
      className={`type-${variant} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}