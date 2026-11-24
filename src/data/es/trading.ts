/*
 * La página de trading en español. Sus citas, sus cifras y los nombres de sus
 * estrategias quedan como él los dijo; `translation` es la traducción que se
 * muestra debajo. Las sesiones conservan los nombres de sus streams.
 */

import { trading as en } from "../trading";

const heard = [
  "New York AM Session",
  "Un nombre usado en la Asia Session de su canal",
  "Entrevista ALPHAS",
  "Entrevista ALPHAS",
  "Su Instagram",
  "Entrevista ALPHAS",
];

const lines = [
  "Es parte de la estrategia lunchbox, ¿verdad?",
  "Así que seguimos dentro de Sushi Box.",
  "La número dos es operar con VWAP.",
  "Dejé de intentar atrapar reversiones. Estoy operando continuaciones.",
  "un trade hermoso desde el PO3 de las 10 AM, confirmado con orderflow.",
  "Soy de los que van por base hits.",
];

export const trading: typeof en = {
  ...en,
  lead: { ...en.lead, translation: "Opera futuros con confianza." },

  desk: {
    ...en.desk,
    label: "Su escritorio, dibujado como una pantalla de trading",
    eastern: "Nueva York",
    yours: "Tu hora",
    chartLabel: "Gráfico",
    illustration: "Ilustración",
    illustrationLong:
      "Un gráfico de precios inventado, dibujado por esta página como decoración: velas en movimiento y una línea promedio sobre la ventana de su sesión publicada. No son datos de mercado ni sus operaciones.",
    axis: "Cambio desde que abre la ventana, inventado",
    namesTitle: "En su stream",
    namesNote: "Aquí solo se nombran. Cómo funciona cada uno se enseña en vivo.",
    taught: "Se enseña en vivo en YouTube y en TRADERMADE",
    figuresTitle: "Como él lo dice",
    sessionsTitle: "Sesiones",
    riskTitle: "Riesgo",
    tape: "Sus palabras",
    approach: {
      title: "Llegando al escritorio",
      lines: ["NQ + ES", "NY AM 9:30–11:30 ET · Asia 8–10 p. m. ET", "Gráficos, nombres, cifras"],
      ready: "Listo",
    },
    pills: {
      label: "Elige una pastilla",
      blue: "Pastilla azul",
      red: "Pastilla roja",
      blueLine: "Sus colores: cian sobre noche",
      redLine: "Los del mercado: verde y rojo",
    },
  },

  intro: {
    ...en.intro,
    title: "El trader",
    text: "Opera futuros de NQ y ES en vivo, de lunes a viernes. En sus propias palabras, el tipo de trader que es:",
    quotes: [
      { ...en.intro.quotes[0], translation: "Creo que simplemente me encanta el scalping." },
      { ...en.intro.quotes[1], translation: "Quiero presentarme y hacer lo mismo todos los días." },
    ],
  },

  sessions: {
    title: "Las sesiones",
    text: "Dos al día, como las nombran los títulos de sus streams. Las horas de abajo están en tu propia hora.",
  },

  names: {
    ...en.names,
    title: "Nombres que oirás en el stream",
    text: "Sus streams tienen sus propias palabras. Esta página solo las nombra. Lo que significan se enseña en vivo en YouTube y en TRADERMADE.",
    list: en.names.list.map((entry, i) => ({ ...entry, heard: heard[i], translation: lines[i] })),
  },

  host: {
    ...en.host,
    title: "Del otro lado del escritorio",
    text: "También es anfitrión: Meet the Trader, en el canal de YouTube de FundedNext, donde conversa con otros traders sobre su camino.",
    quote: { ...en.host.quote, translation: "Muy bien, familia, bienvenidos al show. Bienvenidos a Meet the Traders." },
  },

  community: {
    ...en.community,
    text: "Su comunidad, en Whop. Él contó de dónde viene el nombre:",
    quote: {
      ...en.community.quote,
      translation:
        "Ni siquiera juego golf, pero pensé que a la gente que hace trading le gusta el golf, y Tailor Made es una marca grande, así que pensé que Trader Made sonaría bien",
    },
    tiers: [
      { ...en.community.tiers[0], label: "TMADE Free Tier", translation: "Acceso limitado a nuestra comunidad de Discord" },
      {
        ...en.community.tiers[1],
        label: "El plan de pago",
        translation: "Pásate a un plan de pago para ver todo el análisis de trading y el contenido exclusivo.",
      },
    ],
    note: "Unirse, los planes y el pago ocurren todos en Whop. Este sitio no vende nada.",
    action: { ...en.community.action, label: "TRADERMADE en Whop" },
  },

  figures: {
    ...en.figures,
    title: "Como él lo dice",
    text: "Una línea cada una, en sus propias palabras, con dónde se leyó.",
    list: [
      { ...en.figures.list[0], label: "Pagos", translation: "185 mil dólares en pagos" },
      { ...en.figures.list[1], label: "Su código", translation: "Ofertas de prop firms: usa el código TMADE" },
      {
        ...en.figures.list[2],
        label: "Patrocinadores",
        note: "Agradecidos en su stream como patrocinadores, entre otros. Los nombres van escritos como los imprimen los subtítulos automáticos.",
      },
    ],
  },

  risk: {
    ...en.risk,
    title: "Riesgo",
    his: {
      ...en.risk.his,
      translation:
        "Este stream es solo con fines educativos y de entretenimiento y no es asesoría financiera. Operar futuros implica un riesgo sustancial de pérdida y no es adecuado para todos los inversionistas. Los resultados pasados no garantizan resultados futuros.",
    },
    plain:
      "Las cifras de arriba son suyas, tal como las publicó. No son una promesa de los resultados de nadie. Ningún enlace de este sitio le da nada a quien lo creó.",
    rule: { ...en.risk.rule, translation: "todo trader, al entrar en una posición, debería saber dónde tiene que ir su stop." },
  },
};
