import type { Metadata } from "next";
import Holding from "@/components/Holding";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import Cite, { Quote } from "@/components/Cite";
import SessionChart from "@/components/schedule/SessionChart";
import Names from "@/components/sections/Names";
import Figures from "@/components/sections/Figures";
import { site } from "@/data/site";
import { schedule } from "@/data/schedule";
import { trading } from "@/data/trading";

export const metadata: Metadata = site.ready ? { title: trading.title } : {};

/*
 * Trading: who he is as a trader, his sessions, the names used on stream (as a
 * tease), the community, and lower down his figures, code and sponsors, each
 * one line, sourced, with his risk note beside them.
 */
export default function TradingPage() {
  if (!site.ready) return <Holding />;

  const { intro, sessions, host, community } = trading;

  return (
    <>
      <PageTitle
        title={trading.title}
        lead={
          <>
            <p className="page-lead-big">{trading.lead.text}</p>
            <p className="cite-line">
              <Cite source={trading.lead.source} dated />
            </p>
          </>
        }
      />

      <Section id="trader" title={intro.title} intro={<p>{intro.text}</p>}>
        <div className="quote-pair">
          {intro.quotes.map((quote) => (
            <Quote key={quote.text} quote={quote} size="large" />
          ))}
        </div>
      </Section>

      <Section id="sessions" title={sessions.title} intro={<p>{sessions.text}</p>}>
        <SessionChart sessions={schedule.sessions} days={schedule.days} zone={schedule.zone} words={schedule.words}>
          <span className="session-posted">“{schedule.posted.text}”</span> <Cite {...schedule.posted} dated />
          <span className="session-check">{schedule.words.check}</span>
        </SessionChart>
      </Section>

      <Names />

      <Section id="community" title={community.title} intro={<p>{community.text}</p>}>
        <Quote quote={community.quote} size="large" />
        <dl className="tiers">
          {community.tiers.map((tier) => (
            <div key={tier.label} className="tier">
              <dt>{tier.label}</dt>
              <dd>
                <p>“{tier.value}”</p>
                <p className="cite-line">
                  <Cite {...tier.cite} dated />
                </p>
              </dd>
            </div>
          ))}
        </dl>
        <p className="muted mt-6">{community.note}</p>
        <p className="mt-6">
          <a href={community.action.href} rel="noopener noreferrer" className="button button-solid">
            {community.action.label}
          </a>
        </p>
      </Section>

      <Section id="host" title={host.title} intro={<p>{host.text}</p>}>
        <Quote quote={host.quote} size="large" />
      </Section>

      <Figures />
    </>
  );
}
