import Section from "@/components/Section";
import Cite, { Quote } from "@/components/Cite";
import { trading } from "@/data/trading";

/**
 * His payouts figure, his code and his sponsors: one line each, in his own
 * words, with where each was read. His own risk note sits right beside them.
 */
export default function Figures() {
  const { figures, risk } = trading;

  return (
    <Section id="figures" title={figures.title} intro={<p>{figures.text}</p>}>
      <dl className="figures">
        {figures.list.map((figure) => (
          <div key={figure.id} className="figure-row">
            <dt>{figure.label}</dt>
            <dd>
              <p className="figure-value">{figure.value}</p>
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

      <div className="risk" role="note" aria-labelledby="risk-title">
        <h3 id="risk-title" className="risk-title">
          {risk.title}
        </h3>
        <Quote quote={risk.his} />
        <p className="risk-plain">{risk.plain}</p>
        <Quote quote={risk.rule} className="risk-rule" />
      </div>
    </Section>
  );
}
