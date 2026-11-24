import Link from "next/link";
import {
  ApertureIcon,
  ArrowRightIcon,
  BroadcastIcon,
  ChartLineUpIcon,
  MicrophoneStageIcon,
  PlayIcon,
  UsersThreeIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react/ssr";
import Holding from "@/components/Holding";
import Cite, { Quote, Translation } from "@/components/Cite";
import { citeHref, timecode } from "@/lib/cite";
import SessionChart from "@/components/schedule/SessionChart";
import CandleField from "@/components/fx/CandleField";
import Crosshair from "@/components/fx/Crosshair";
import TiltPane from "@/components/fx/TiltPane";
import WordReveal from "@/components/fx/WordReveal";
import HeroStage from "@/components/home/HeroStage";
import RoleTicker from "@/components/home/RoleTicker";
import { content } from "@/data";
import { localizeHref } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

const roleIcons = {
  trader: ChartLineUpIcon,
  streamer: BroadcastIcon,
  host: MicrophoneStageIcon,
  photographer: ApertureIcon,
};

/*
 * The front page: who he is (the four seats he sits in), when he trades live,
 * where to watch and where the community is, his line on the road, and the two
 * doors: the desk and the lens.
 */
export default function HomeView({ locale }: { locale: Locale }) {
  const { site, home, schedule, gallery } = content(locale);
  if (!site.ready) return <Holding />;

  const cover = gallery[0];

  return (
    <div lang={locale === "es" ? "es" : undefined} className="page-lang">
      <HeroStage
        labelledBy="hero-title"
        field={<CandleField seed={23} count={84} className="hero-candles" />}
        aside={
          <TiltPane className="hero-pane">
            <h2 className="chart-title">{schedule.words.heading}</h2>
            <SessionChart sessions={schedule.sessions} days={schedule.days} zone={schedule.zone} words={schedule.words}>
              <span className="session-posted">“{schedule.posted.text}”</span> <Cite {...schedule.posted} dated />
              <Translation text={schedule.posted.translation} />
              <span className="session-check">{schedule.words.check}</span>
            </SessionChart>
          </TiltPane>
        }
      >
        <p className="kicker hero-kicker">
          <span className="kicker-dot" aria-hidden="true" />
          <a href={citeHref(home.kicker)} rel="noopener noreferrer" title={home.kickerTitle}>
            {home.kicker.text}
          </a>
        </p>
        <h1 id="hero-title" className="display hero-title">
          <span className="hero-name">{site.name}</span>
          <span className="dot dot-hero" aria-hidden="true" />
        </h1>
        <RoleTicker words={home.turning} label={home.turningLabel} />
        <p className="hero-lead">{home.lead}</p>
        <p className="hero-second">{home.second}</p>
        <p className="cite-line">
          <Cite {...home.leadSource} dated /> · <Cite {...home.secondSource} dated />
        </p>
        <div className="hero-actions">
          <a href={home.watch.action.href} rel="noopener noreferrer" className="button button-solid">
            <PlayIcon weight="duotone" aria-hidden="true" className="button-icon" />
            {home.watch.action.label}
          </a>
          <a href={home.community.action.href} rel="noopener noreferrer" className="button button-glass">
            <UsersThreeIcon weight="duotone" aria-hidden="true" className="button-icon" />
            {home.community.action.label}
          </a>
        </div>
      </HeroStage>

      <section className="frame seats" aria-labelledby="seats-title">
        <div className="seats-head">
          <h2 id="seats-title" className="section-title seats-title">
            {home.roles.title}
          </h2>
          <p className="section-intro">{home.roles.text}</p>
        </div>
        <ul className="seats-list">
          {home.roles.list.map((seat) => {
            const Icon = roleIcons[seat.id];
            const at = seat.quote.at;
            return (
              <li key={seat.id}>
                <a
                  href={citeHref(seat.quote)}
                  rel="noopener noreferrer"
                  className={`seat seat-${seat.id}`}
                  aria-label={`${seat.role}. ${home.roles.watch}: “${seat.quote.text}”, ${seat.video.channel}${at !== undefined ? `, ${timecode(at)}` : ""}.`}
                >
                  <span className="seat-media" aria-hidden="true">
                    <span className="seat-video">
                      {/* YouTube's own thumbnail of the video, shown from YouTube and not copied here. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://i.ytimg.com/vi/${seat.video.id}/${seat.video.picture}.jpg`}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="seat-thumb"
                      />
                      <span className="seat-scrim" />
                      <span className="seat-channel">
                        <YoutubeLogoIcon weight="duotone" />
                        {seat.video.channel}
                      </span>
                      <span className="seat-play">
                        <PlayIcon weight="fill" />
                      </span>
                      {at !== undefined ? <span className="seat-time">{timecode(at)}</span> : null}
                    </span>
                    <span className="seat-art">
                      {seat.id === "trader" ? <CandleField seed={5} count={26} width={260} height={64} line={false} /> : null}
                      {seat.id === "streamer" ? (
                        <span className="seat-wave">
                          {Array.from({ length: 18 }, (_, i) => (
                            <span key={i} style={{ animationDelay: `${(i % 7) * 0.13}s` }} />
                          ))}
                        </span>
                      ) : null}
                      {seat.id === "host" ? <span className="seat-rings" /> : null}
                      {seat.id === "photographer" ? (
                        <span className="seat-finder">
                          <span />
                        </span>
                      ) : null}
                    </span>
                  </span>
                  <span className="seat-icon" aria-hidden="true">
                    <Icon weight="duotone" />
                  </span>
                  <span className="seat-role">{seat.role}</span>
                  <span className="seat-line">{seat.line}</span>
                  <Quote quote={seat.quote} className="seat-quote" plain />
                  <span className="seat-go" aria-hidden="true">
                    <PlayIcon weight="duotone" />
                    {home.roles.watch}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="frame where" aria-label={home.labels.where}>
        <div className="where-grid">
          <div className="where-block glass">
            <span className="where-icon" aria-hidden="true">
              <PlayIcon weight="duotone" />
            </span>
            <h2 className="where-title">{home.watch.title}</h2>
            <p className="where-text">{home.watch.text}</p>
            <Quote quote={home.watch.quote} />
            <a href={home.watch.action.href} rel="noopener noreferrer" className="where-link">
              {home.watch.action.label}
              <ArrowRightIcon aria-hidden="true" className="where-link-icon" />
            </a>
          </div>
          <div className="where-block glass">
            <span className="where-icon" aria-hidden="true">
              <UsersThreeIcon weight="duotone" />
            </span>
            <h2 className="where-title">{home.community.title}</h2>
            <p className="where-text">{home.community.text}</p>
            <Quote quote={home.community.quote} />
            <a href={home.community.action.href} rel="noopener noreferrer" className="where-link">
              {home.community.action.label}
              <ArrowRightIcon aria-hidden="true" className="where-link-icon" />
            </a>
          </div>
        </div>
      </section>

      <section className="band on-dark" aria-label={home.labels.band}>
        <CandleField seed={41} count={60} className="band-candles" />
        <div className="frame">
          <figure className="quote quote-band">
            <blockquote lang="en">
              <p>
                <span className="quote-mark" aria-hidden="true">
                  “
                </span>
                <WordReveal text={home.band.text} />
                <span aria-hidden="true">”</span>
              </p>
            </blockquote>
            <Translation text={home.band.translation} />
            <figcaption>
              <Cite source={home.band.source} at={home.band.at} />
            </figcaption>
          </figure>
        </div>
      </section>

      <nav className="frame doors" aria-label={home.labels.doors}>
        <Link href={localizeHref(locale, home.doors.trading.href)} className="door door-trading on-dark">
          <span className="door-screen" aria-hidden="true">
            <span className="door-tabs">
              <span className="door-tab door-tab-on">NQ</span>
              <span className="door-tab">ES</span>
              <span className="door-tab-note">{home.labels.illustration}</span>
            </span>
            <CandleField seed={7} count={40} width={600} height={240} className="door-candles" />
            <Crosshair />
          </span>
          <span className="door-title">
            {home.doors.trading.title}
            <span className="dot" aria-hidden="true" />
          </span>
          <span className="door-text">{home.doors.trading.text}</span>
          <span className="door-go">
            <ChartLineUpIcon weight="duotone" aria-hidden="true" />
            {home.doors.trading.label}
          </span>
        </Link>

        <Link href={localizeHref(locale, home.doors.photography.href)} className="door door-photography on-dark">
          <span className="door-lens" aria-hidden="true">
            {cover ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={cover.thumb ?? cover.src} alt="" className="door-cover" loading="lazy" decoding="async" />
            ) : null}
            <span className="finder-corner finder-tl" />
            <span className="finder-corner finder-tr" />
            <span className="finder-corner finder-bl" />
            <span className="finder-corner finder-br" />
            <span className="door-af">
              <span className="door-af-dot" />
              AF
            </span>
          </span>
          <span className="door-title">
            {home.doors.photography.title}
            <span className="dot" aria-hidden="true" />
          </span>
          <span className="door-text">{home.doors.photography.text}</span>
          <span className="door-go">
            <ApertureIcon weight="duotone" aria-hidden="true" />
            {home.doors.photography.label}
          </span>
        </Link>
      </nav>
    </div>
  );
}
