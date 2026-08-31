import Image from "next/image";
import Link from "next/link";

export default function BrandMark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={className} aria-label="MOCA Ventures home">
      <Image
        src="/logos/moca-ventures-header-logo.svg"
        alt=""
        width={713}
        height={239}
        aria-hidden="true"
      />
    </Link>
  );
}