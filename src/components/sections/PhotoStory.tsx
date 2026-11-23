import Section from "@/components/Section";
import Cite, { Quote } from "@/components/Cite";
import { photography } from "@/data/photography";

/** The photography story: his own words from the interview, then the biography on his own site. */
export default function PhotoStory() {
  const { story, bio } = photography;

  return (
    <>
      <Section id="story" title={story.title} intro={<p>{story.text}</p>}>
        <ol className="story">
          {story.quotes.map((quote) => (
            <li key={quote.text}>
              <Quote quote={quote} size="large" />
            </li>
          ))}
        </ol>
      </Section>

      <Section id="bio" title={bio.title}>
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
      </Section>
    </>
  );
}
