import Section from "@/components/Section";
import SupportPanel from "@/components/SupportPanel";
import { site as siteEn } from "@/data/site";
import { content } from "@/data";
import type { Locale } from "@/i18n/config";

/**
 * True when the support panel is on the site: only when both supportAddress
 * and supportNetwork are filled in, so nobody sends to the wrong network.
 */
export const supportShown = siteEn.supportAddress.trim() !== "" && siteEn.supportNetwork.trim() !== "";

/** The support section. Until both the address and its network are given, it is not on the page at all. */
export default function Support({ locale = "en" }: { locale?: Locale }) {
  if (!supportShown) return null;
  const { site } = content(locale);

  const { ownAddress, network, copyAddress, addressCopied, supportHow } = site.ui;

  return (
    <Section id="support" title={site.labels.support}>
      <SupportPanel
        address={site.supportAddress.trim()}
        network={site.supportNetwork.trim()}
        note={site.supportNote.trim()}
        words={{ ownAddress, network, copyAddress, addressCopied, supportHow }}
      />
    </Section>
  );
}
