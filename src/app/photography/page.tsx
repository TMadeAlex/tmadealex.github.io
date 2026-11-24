import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import Holding from "@/components/Holding";
import Section from "@/components/Section";
import Cite, { Quote } from "@/components/Cite";
import GallerySection from "@/components/sections/GallerySection";
import IrisHero from "@/components/photo/IrisHero";
import FilmRoll from "@/components/photo/FilmRoll";
import { site } from "@/data/site";
import { photography } from "@/data/photography";
import { gallery } from "@/data/gallery";
import type { GalleryItem } from "@/data/gallery";
import type { Quote as QuoteData } from "@/data/sources";

export const metadata: Metadata = site.ready ? { title: photography.title } : {};

type Frame = { kind: "picture"; item: GalleryItem; n: number } | { kind: "words"; quote: QuoteData; n: number };

/* His words between his pictures, for the film roll: two pictures, then a line of his, and so on. */
function frames(): Frame[] {
  const out: Frame[] = [];
  const quotes = photography.story.quotes;
  let n = 0;
  gallery.forEach((item, i) => {
    out.push({ kind: "picture", item, n: (n += 1) });
    const q = quotes[Math.floor(i / 2)];
    if (i % 2 === 1 && q) out.push({ kind: "words", quote: q, n: (n += 1) });
  });
  quotes.slice(Math.ceil(gallery.length / 2)).forEach((quote) => out.push({ kind: "words", quote, n: (n += 1) }));
  if (gallery.length === 0) return quotes.map((quote, i) => ({ kind: "words", quote, n: i + 1 }));
  return out;
}

/*
 * Photography: seen through a lens at the top, then his story in his own words
 * on a roll of film between his pictures, the biography his own site gives, and
 * his personal work laid out as a contact sheet.
 */
export default function PhotographyPage() {
  if (!site.ready) return <Holding />;

  const { story, bio } = photography;

  return (
    <>
      <IrisHero cover={gallery[0]}>
        <div className="kicker">{photography.byline}</div>
        <h1 id="photo-title" className="display">
          {photography.title}
          <span className="dot" aria-hidden="true" />
        </h1>
        <p className="page-lead-big">{photography.lead.text}</p>
        <p className="cite-line">
          <Cite source={photography.lead.source} at={photography.lead.at} dated />
        </p>
        <ul className="inline-links">
          {photography.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} rel="noopener noreferrer" className="text-link">
                {link.label}
                <ArrowUpRightIcon aria-hidden="true" className="text-link-icon" />
              </a>
            </li>
          ))}
        </ul>
      </IrisHero>

      <section className="roll" aria-labelledby="story-title">
        <div className="frame roll-head">
          <h2 id="story-title" className="section-title">
            {story.title}
          </h2>
          <p className="section-intro">{story.text}</p>
        </div>
        <FilmRoll label={story.title}>
          {frames().map((frame) =>
            frame.kind === "picture" ? (
              <div
                key={`p-${frame.item.id}`}
                role="listitem"
                className="roll-frame roll-picture"
                aria-hidden="true"
                style={{ "--ratio": (frame.item.width ?? 4) / (frame.item.height ?? 5) } as CSSProperties}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={frame.item.thumb ?? frame.item.src}
                  alt=""
                  width={frame.item.width}
                  height={frame.item.height}
                  loading="lazy"
                  decoding="async"
                />
                <span className="roll-edge">
                  <span>{frame.n}</span>
                  <span>
                    {frame.item.title} · {frame.item.caption}
                  </span>
                  <span>{frame.n}A</span>
                </span>
              </div>
            ) : (
              <div key={`q-${frame.n}`} role="listitem" className="roll-frame roll-words">
                <Quote quote={frame.quote} size="large" />
                <span className="roll-edge" aria-hidden="true">
                  <span>{frame.n}</span>
                  <span>{photography.byline}</span>
                  <span>{frame.n}A</span>
                </span>
              </div>
            ),
          )}
        </FilmRoll>
      </section>

      <Section id="bio" title={bio.title}>
        <div className="bio-card glass">
          <div className="prose">
            {bio.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="cite-line">
            <Cite {...bio.cite} dated />
          </p>
          <p className="muted mt-4">
            <a href="https://www.alexandersaladrigas.com/contact" rel="noopener noreferrer" className="text-link">
              {bio.clients}
            </a>
          </p>
        </div>
      </Section>

      <GallerySection />
    </>
  );
}
