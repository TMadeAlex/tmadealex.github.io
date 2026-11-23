import Section from "@/components/Section";
import Cite from "@/components/Cite";
import { trading } from "@/data/trading";

/**
 * The names used on his streams, as a tease: each name, where it is heard, and
 * the line it comes from. How any of it works is taught where he teaches.
 */
export default function Names() {
  const { names } = trading;

  return (
    <Section id="names" title={names.title} intro={<p>{names.text}</p>}>
      <ul className="names">
        {names.list.map((entry) => (
          <li key={entry.id} className="name-card">
            <p className="name-heard">{entry.heard}</p>
            <p className="name-word">{entry.name}</p>
            <p className="name-line">
              “{entry.line}”
            </p>
            <p className="name-cite">
              <Cite {...entry.cite} />
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
