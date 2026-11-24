import {
  ClockIcon,
  FunctionIcon,
  LockSimpleIcon,
  LockSimpleOpenIcon,
  TrophyIcon,
  WarningIcon,
  WaveSineIcon,
} from "@phosphor-icons/react/ssr";
import Holding from "@/components/Holding";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import Cite, { Quote, Translation } from "@/components/Cite";
import SessionChart from "@/components/schedule/SessionChart";
import CopyCode from "@/components/support/CopyCode";
import RollingText from "@/components/fx/RollingText";
import DeskClock from "@/components/trading/DeskClock";
import DeskRise from "@/components/trading/DeskRise";
import TerminalChart from "@/components/trading/TerminalChart";
import { content } from "@/data";
import type { Locale } from "@/i18n/config";


/*
 * Trading: his desk first, drawn as a trading screen (a made-up chart over his
 * session windows, the names used on his streams as locked indicators, his
 * figures and code with his risk note right beside them, and a tape of his own
 * words), then the trader in his words, the community and the show he hosts.
 */
export default function TradingView({ locale }: { locale: Locale }) {
  const { site, schedule, trading, support } = content(locale);
  if (!site.ready) return <Holding />;

  const { desk, intro, names, figures, risk, host, community } = trading;
  const tape = [...intro.quotes, host.quote, community.quote, risk.rule];

  return (
    <div lang={locale === "es" ? "es" : undefined} className="page-lang">
      <PageTitle
        title={trading.title}
        lead={
          <>
            <p className="page-lead-big">{trading.lead.text}</p>
            <Translation text={trading.lead.translation} />
            <p className="cite-line">
              <Cite source={trading.lead.source} dated />
            </p>
          </>
        }
      />

      <section className="frame desk" aria-label={desk.label}>
        <DeskRise>
          <div className="terminal on-dark">
            <div className="term-bar">
              <span className="term-brand">
                {desk.brand}
                <span className="dot dot-breathe" aria-hidden="true" />
              </span>
              <DeskClock zone={schedule.zone} words={{ eastern: desk.eastern, yours: desk.yours }} />
            </div>

            <div className="term-grid">
              <div className="term-panel term-main">
                <TerminalChart
                  sessions={schedule.sessions}
                  words={{
                    chartLabel: desk.chartLabel,
                    illustration: desk.illustration,
                    illustrationLong: desk.illustrationLong,
                    axis: desk.axis,
                    average: desk.average,
                  }}
                />
              </div>

              <div className="term-panel term-names">
                <h2 className="term-title">
                  <FunctionIcon weight="duotone" aria-hidden="true" />
                  {desk.namesTitle}
                </h2>
                <p className="term-note">{desk.namesNote}</p>
                <ul className="ind-list">
                  {names.list.map((entry) => (
                    <li key={entry.id}>
                      <details className="ind">
                        <summary className="ind-summary">
                          <WaveSineIcon weight="duotone" aria-hidden="true" className="ind-icon" />
                          <span className="ind-name">{entry.name}</span>
                          <span className="ind-heard">{entry.heard}</span>
                          <LockSimpleIcon weight="duotone" aria-hidden="true" className="ind-lock ind-lock-shut" />
                          <LockSimpleOpenIcon weight="duotone" aria-hidden="true" className="ind-lock ind-lock-open" />
                        </summary>
                        <div className="ind-body">
                          <p className="ind-line" lang="en">“{entry.line}”</p>
                          <Translation text={entry.translation} />
                          <p className="ind-cite">
                            <Cite {...entry.cite} />
                          </p>
                          <p className="ind-taught">{desk.taught}</p>
                        </div>
                      </details>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="term-panel term-figures">
                <h2 className="term-title">
                  <TrophyIcon weight="duotone" aria-hidden="true" />
                  {desk.figuresTitle}
                </h2>
                <dl className="figures">
                  {figures.list.map((figure) => (
                    <div key={figure.id} className={`figure-row figure-${figure.id}`}>
                      <dt>{figure.label}</dt>
                      <dd>
                        <p className="figure-value" lang="en">
                          {figure.id === "payouts" ? <RollingText text={figure.value} /> : figure.value}
                        </p>
                        <Translation text={figure.translation} />
                        {figure.id === "code" ? (
                          <CopyCode code="TMADE" copyLabel={support.ui.copyCode} copiedLabel={support.ui.codeCopied} />
                        ) : null}
                        {figure.note ? <p className="figure-note">{figure.note}</p> : null}
                        <p className="figure-cites">
                          {figure.cites.map((cite, i) => (
                            <span key={`${cite.source}-${cite.at ?? i}`}>
                              <Cite {...cite} dated={i === 0} />
                            </span>
                          ))}
                        </p>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="term-panel term-sessions">
                <h2 className="term-title">
                  <ClockIcon weight="duotone" aria-hidden="true" />
                  {desk.sessionsTitle}
                </h2>
                <SessionChart sessions={schedule.sessions} days={schedule.days} zone={schedule.zone} words={schedule.words}>
                  <span className="session-posted">“{schedule.posted.text}”</span> <Cite {...schedule.posted} dated />
                  <Translation text={schedule.posted.translation} />
                  <span className="session-check">{schedule.words.check}</span>
                </SessionChart>
              </div>

              <div className="term-panel term-risk" id="risk" role="note" aria-labelledby="risk-title">
                <h2 id="risk-title" className="term-title">
                  <WarningIcon weight="duotone" aria-hidden="true" />
                  {risk.title}
                </h2>
                <Quote quote={risk.his} />
                <p className="risk-plain">{risk.plain}</p>
                <Quote quote={risk.rule} className="risk-rule" />
              </div>
            </div>

            <div className="term-tape" aria-hidden="true">
              <span className="tape-label">{desk.tape}</span>
              <div className="tape-window">
                <div className="tape-track">
                  {[...tape, ...tape].map((quote, i) => (
                    <span key={`${quote.text}-${i}`} className="tape-item">
                      <span className="tape-up">▲</span> “{quote.text}”
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DeskRise>
      </section>

      <Section id="trader" title={intro.title} intro={<p>{intro.text}</p>}>
        <div className="quote-pair">
          {intro.quotes.map((quote) => (
            <Quote key={quote.text} quote={quote} size="large" />
          ))}
        </div>
      </Section>

      <Section id="community" title={community.title} intro={<p>{community.text}</p>}>
        <Quote quote={community.quote} size="large" />
        <dl className="tiers">
          {community.tiers.map((tier) => (
            <div key={tier.label} className="tier glass">
              <dt>{tier.label}</dt>
              <dd>
                <p lang="en">“{tier.value}”</p>
                <Translation text={tier.translation} />
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
    </div>
  );
}
