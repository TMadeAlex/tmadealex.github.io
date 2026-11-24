import { ArrowUpRightIcon, CoinsIcon, MonitorPlayIcon, ShieldCheckIcon, TagIcon, UsersThreeIcon } from "@phosphor-icons/react/ssr";
import Cite from "@/components/Cite";
import SupportPanel from "@/components/SupportPanel";
import CopyCode from "@/components/support/CopyCode";
import { site } from "@/data/site";
import { support } from "@/data/support";
import type { SupportWay } from "@/data/support";

/** The id the window's title carries, so the dialog is named by it. */
export const supportTitleId = "support-title";

const icons = { watch: MonitorPlayIcon, join: UsersThreeIcon, code: TagIcon };

function Way({ way }: { way: SupportWay }) {
  const Icon = icons[way.icon];
  const { action } = way;

  return (
    <li className="support-way">
      <span className="support-icon" aria-hidden="true">
        <Icon weight="duotone" />
      </span>
      <div>
        <p className="support-place">{way.place}</p>
        <h3 className="support-way-title">{way.title}</h3>
        <p className="support-text">{way.text}</p>
        {way.quote ? (
          <figure className="support-quote">
            <blockquote>
              <p>“{way.quote.text}”</p>
            </blockquote>
            <figcaption>
              <Cite source={way.quote.source} at={way.quote.at} />
            </figcaption>
          </figure>
        ) : null}
        {action.kind === "link" ? (
          <a href={action.href} rel="noopener noreferrer" className="button button-line support-action">
            {action.label}
            <ArrowUpRightIcon aria-hidden="true" className="button-icon" />
          </a>
        ) : (
          <CopyCode code={action.code} copyLabel={support.ui.copyCode} copiedLabel={support.ui.codeCopied} />
        )}
      </div>
    </li>
  );
}

/**
 * What the Support window holds: the ways he already offers, each linking to a
 * page of his own, and the crypto part, which shows an address only once Alex
 * has given one in site.ts. Nothing here takes a payment.
 */
export default function SupportWindow() {
  const address = site.supportAddress.trim();
  const network = site.supportNetwork.trim();
  const { ownAddress, network: networkWord, copyAddress, addressCopied, supportHow } = site.ui;

  return (
    <>
      <p className="kicker">{support.kicker}</p>
      <h2 id={supportTitleId} className="support-title">
        {support.title}
        <span className="dot" aria-hidden="true" />
      </h2>
      <p className="support-lead">{support.lead}</p>

      <ul className="support-ways">
        {support.ways.map((way) => (
          <Way key={way.id} way={way} />
        ))}
        <li className="support-way support-way-crypto">
          <span className="support-icon" aria-hidden="true">
            <CoinsIcon weight="duotone" />
          </span>
          <div>
            <p className="support-place">{support.crypto.place}</p>
            <h3 className="support-way-title">{support.crypto.title}</h3>
            {address !== "" && network !== "" ? (
              <div className="mt-3">
                <SupportPanel
                  address={address}
                  network={network}
                  note={site.supportNote.trim()}
                  words={{ ownAddress, network: networkWord, copyAddress, addressCopied, supportHow }}
                />
              </div>
            ) : (
              <p className="support-text">{support.crypto.waiting}</p>
            )}
          </div>
        </li>
      </ul>

      <p className="support-foot">
        <ShieldCheckIcon weight="duotone" aria-hidden="true" />
        <span>{support.foot}</span>
      </p>
    </>
  );
}
