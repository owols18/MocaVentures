import Image from "next/image";
import Link from "next/link";

type BrandMarkProps = {
  className?: string;
  src?: string;
};

export default function BrandMark({
  className = "",
  src = "/logos/moca-ventures-header-logo.svg",
}: BrandMarkProps) {
  return (
    <Link href="/" className={className} aria-label="MOCA Ventures home">
      <Image
        src={src}
        alt=""
        width={713}
        height={239}
        loading="eager"
        aria-hidden="true"
      />
    </Link>
  );
}
