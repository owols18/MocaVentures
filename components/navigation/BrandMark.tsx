import Link from "next/link";

export default function BrandMark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={className} aria-label="MOCA Ventures home">
      <span aria-hidden="true">MOCA VENTURES</span>
    </Link>
  );
}
