import Link from "next/link";
import { Play, UsersRound } from "lucide-react";
import Holding from "@/components/Holding";
import Cite, { Quote, citeHref } from "@/components/Cite";
import SessionChart from "@/components/schedule/SessionChart";
import { site } from "@/data/site";
import { home } from "@/data/home";
import { schedule } from "@/data/schedule";
import { gallery } from "@/data/gallery";

/* The front page: who he is and what he does, when he trades live, where to watch, and the two doors. */
export default function HomePage() {
  if (!site.ready) return <Holding />;

  const cover = gallery[0];

  return (
    <>
      <section className="frame hero" aria-labelledby="hero-title">
        <p className="kicker hero-kicker">
          <a href={citeHref(home.kicker)} rel="noopener noreferrer" title="The words on his TRADERMADE banner">
            {home.kicker.text}
          </a>
        </p>
        <h1 id="hero-title" className="display hero-title">
          {site.name}
          <span className="dot dot-hero" aria-hidden="true" />
        </h1>

        <div className="hero-grid">
          <div className="hero-words">
            <p className="hero-lead">{home.lead}</p>
            <p className="hero-second">{home.second}</p>
            <p className="cite-line">
              <Cite {...home.leadSource} dated />
            </p>
            <div className="hero-actions">
              <a href={home.watch.action.href} rel="noopener noreferrer" className="button button-solid">
                <Play aria-hidden="true" className="button-icon" strokeWidth={2} />
                {home.watch.action.label}
              </a>
              <a href={home.community.action.href} rel="noopener noreferrer" className="button button-line">
                <UsersRound aria-hidden="true" className="button-icon" strokeWidth={1.75} />
                {home.community.action.label}
              </a>
            </div>
          </div>

          <div className="hero-chart">
            <h2 className="chart-title">{schedule.words.heading}</h2>
            <SessionChart
              sessions={schedule.sessions}
              days={schedule.days}
              zone={schedule.zone}
              words={schedule.words}
            >
              <span className="session-posted">“{schedule.posted.text}”</span> <Cite {...schedule.posted} dated />
              <span className="session-check">{schedule.words.check}</span>
            </SessionChart>
          </div>
        </div>
      </section>

      <section className="frame where" aria-label="Where to watch and where the community is">
        <div className="where-grid">
          <div className="where-block">
            <h2 className="where-title">{home.watch.title}</h2>
            <p className="where-text">{home.watch.text}</p>
            <Quote quote={home.watch.quote} />
            <a href={home.watch.action.href} rel="noopener noreferrer" className="where-link">
              {home.watch.action.label}
            </a>
          </div>
          <div className="where-block">
            <h2 className="where-title">{home.community.title}</h2>
            <p className="where-text">{home.community.text}</p>
            <Quote quote={home.community.quote} />
            <a href={home.community.action.href} rel="noopener noreferrer" className="where-link">
              {home.community.action.label}
            </a>
          </div>
        </div>
      </section>

      <section className="band on-dark" aria-label="In his words">
        <div className="frame">
          <Quote quote={home.band} size="band" />
        </div>
      </section>

      <nav className="frame doors" aria-label="The two crafts">
        <Link href={home.doors.trading.href} className="door door-trading">
          <span className="door-title">
            {home.doors.trading.title}
            <span className="dot" aria-hidden="true" />
          </span>
          <span className="door-text">{home.doors.trading.text}</span>
          <span className="door-go">{home.doors.trading.label}</span>
        </Link>
        <Link href={home.doors.photography.href} className={`door door-photography ${cover ? "door-has-cover" : ""}`}>
          {cover ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={cover.thumb ?? cover.src} alt="" className="door-cover" loading="lazy" decoding="async" />
          ) : null}
          <span className="door-title">
            {home.doors.photography.title}
            <span className="dot" aria-hidden="true" />
          </span>
          <span className="door-text">{home.doors.photography.text}</span>
          <span className="door-go">{home.doors.photography.label}</span>
        </Link>
      </nav>
    </>
  );
}
