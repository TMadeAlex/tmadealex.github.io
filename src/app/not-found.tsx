import type { Metadata } from "next";
import Link from "next/link";
import Holding from "@/components/Holding";
import PageTitle from "@/components/PageTitle";
import { site } from "@/data/site";

export const metadata: Metadata = site.ready ? { title: site.notFound.title } : {};

/* A wrong address. While the site is not ready it shows the holding page, like every other address. */
export default function NotFound() {
  if (!site.ready) return <Holding />;

  return (
    <div className="not-found">
      <PageTitle
        kicker={site.notFound.kicker}
        title={site.notFound.title}
        lead={
          <>
            <p className="page-lead-big">{site.notFound.line}</p>
            <p className="mt-8">
              <Link href="/" className="button button-solid">
                {site.notFound.back}
              </Link>
            </p>
          </>
        }
      />
      <div className="frame not-found-chart" aria-hidden="true">
        <span className="session-box not-found-box">
          <span className="session-box-label">{site.notFound.box}</span>
        </span>
      </div>
    </div>
  );
}
