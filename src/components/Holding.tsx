import { GiftWords } from "@/components/GiftLine";
import { site } from "@/data/site";

/**
 * The holding page: what every address shows if `ready` is set to false in
 * src/data/site.ts. It says a place is being kept, that it was set up as a
 * gift, and that TMade Alex decides what stays. It asks for nothing.
 */
export default function Holding() {
  const { title, lines, gift } = site.holding;
  return (
    <div className="frame page-title">
      <h1 className="display display-quiet">{title}</h1>
      <div className="prose mt-10">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <p className="holding-gift">
        <GiftWords line={gift.line} by={gift.by} linkClass="text-link" />
      </p>
    </div>
  );
}
