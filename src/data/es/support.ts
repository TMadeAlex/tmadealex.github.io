/* La ventana de Apoyo en español: las mismas formas de apoyarlo, cada una en una página suya. */

import { support as en } from "../support";
import type { SupportWay } from "../support";

const words: Record<string, Partial<SupportWay> & { translation?: string; actionLabel?: string }> = {
  watch: {
    title: "Míralo operar en vivo",
    text: "De lunes a viernes, en su canal: la New York AM Session y la Asia Session.",
    translation: "Opera futuros con confianza.",
    actionLabel: "Su canal",
  },
  join: {
    title: "Únete a TRADERMADE",
    text: "Su comunidad, con un nivel gratuito y un plan de pago. Unirse y pagar ocurren en Whop.",
    translation: "Acceso limitado a nuestra comunidad de Discord",
    actionLabel: "TRADERMADE en Whop",
  },
  code: {
    place: "Su código",
    title: "Ofertas de prop firms",
    text: "De las descripciones de sus streams.",
    translation: "Ofertas de prop firms: usa el código TMADE",
  },
};

export const support: typeof en = {
  ...en,
  button: "Apoyar",
  kicker: "Apoyo",
  title: "Apoya a TMade Alex",
  lead: "Las formas que él ya ofrece, cada una en una página suya. Nada en este sitio recibe pagos.",

  ways: en.ways.map((way) => {
    const w = words[way.id] ?? {};
    return {
      ...way,
      place: w.place ?? way.place,
      title: w.title ?? way.title,
      text: w.text ?? way.text,
      quote: way.quote ? { ...way.quote, translation: w.translation } : undefined,
      action: way.action.kind === "link" && w.actionLabel ? { ...way.action, label: w.actionLabel } : way.action,
    };
  }),

  crypto: {
    place: "Cripto",
    title: "Directo desde tu propia billetera",
    waiting:
      "Cuando TMade Alex agregue una dirección de billetera propia, aparecerá aquí con un botón para copiarla. Hasta entonces no hay adónde enviar nada.",
  },

  foot: "Este sitio no vende nada, no guarda nada y no se conecta a ninguna billetera. Ningún enlace aquí le da nada a quien lo creó. Nada aquí es asesoría financiera.",

  ui: {
    close: "Cerrar",
    copyCode: "Copiar el código",
    codeCopied: "Código copiado",
  },
};
