import type { Metadata } from "next";
import Link from "next/link";
import Holding from "@/components/Holding";
import { site } from "@/data/site";

export const metadata: Metadata = site.ready ? { title: site.notFound.title } : {};

/* A wrong address. While the site is not ready it shows the holding page, like every other address. */
export default function NotFound() {
  if (!site.ready) return <Holding />;

  return (
    <div className="frame below-ribbon flex flex-1 flex-col pb-20">
      <h1 className="max-w-[14ch] text-[clamp(2.6rem,8.2vw,5.25rem)] leading-[1.02] tracking-[-0.02em]">
        {site.notFound.title}
      </h1>
      <div className="prose-serif mt-10 text-ink-soft">
        <p>{site.notFound.line}</p>
        <p>
          <Link href="/" className="text-link">
            {site.notFound.back}
          </Link>
        </p>
      </div>
    </div>
  );
}
