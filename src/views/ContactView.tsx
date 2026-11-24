import Holding from "@/components/Holding";
import PageTitle from "@/components/PageTitle";
import Contact from "@/components/sections/Contact";
import Support from "@/components/sections/Support";
import { content } from "@/data";
import type { Locale } from "@/i18n/config";

/* Links only. There is no form on this page, or anywhere on the site, and no email address. */
export default function ContactView({ locale }: { locale: Locale }) {
  const { site, contact } = content(locale);
  if (!site.ready) return <Holding />;

  return (
    <div lang={locale === "es" ? "es" : undefined} className="page-lang">
      <PageTitle title={contact.title} lead={<p className="page-lead-big">{contact.lead}</p>} />
      <Contact locale={locale} />
      <Support locale={locale} />
    </div>
  );
}
