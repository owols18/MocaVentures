import type { ReactNode } from "react";

type SiteShellProps = {
  children: ReactNode;
  className?: string;
};

export default function SiteShell({
  children,
  className = "",
}: SiteShellProps) {
  return (
    <div className={`site-shell ${className}`}>
      {children}
    </div>
  );
}