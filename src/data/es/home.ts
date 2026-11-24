/*
 * La página principal en español. Sus citas (`text`) quedan en inglés, como él
 * las dijo; `translation` es la traducción que se muestra debajo.
 */

import { home as en } from "../home";

/* Lo que dice cada asiento, en el mismo orden que en inglés. */
const seats = [
  {
    role: "Trader de futuros",
    line: "Futuros de NQ y ES, en vivo, de lunes a viernes: un scalper que opera continuaciones con VWAP y se lleva sus base hits.",
    translation: "Quiero presentarme y hacer lo mismo todos los días.",
    channel: "ALPHAS, en TradersPost",
  },
  {
    role: "Streamer y educador",
    line: "Dos sesiones al día con el chat abierto, enseñando mientras opera. Sus streams se presentan como educativos y de entretenimiento.",
    translation: "Este stream es solo con fines educativos y de entretenimiento",
    channel: "TMade Alex, New York AM Session",
  },
  {
    role: "Anfitrión",
    line: "Anfitrión de TMade, y de Meet the Trader en el canal de YouTube de FundedNext, donde les pregunta a otros traders por su camino.",
    translation: "Muy bien, familia, bienvenidos al show. Bienvenidos a Meet the Traders.",
    channel: "Meet the Trader, en FundedNext",
  },
  {
    role: "Fotógrafo de moda",
    line: "Nacido en Miami, en Nueva York desde 2014. Ha trabajado para grandes marcas y está fotografiando su primer libro sobre familia y cultura.",
    translation: "Soy fotógrafo de moda y vivo en Nueva York.",
    channel: "ALPHAS, en TradersPost",
  },
];

export const home: typeof en = {
  ...en,
  kicker: { ...en.kicker, text: "En vivo de lunes a viernes." },
  kickerTitle: "Traducido de su canal de YouTube",
  labels: {
    where: "Dónde verlo y dónde está la comunidad",
    band: "En sus palabras",
    doors: "Sus dos oficios",
    illustration: "ilustración",
  },
  lead: "Trader de futuros, streamer y anfitrión de TMade.",
  second: "Detrás de la cámara, fotógrafo de moda en Nueva York.",

  turning: ["Trader de futuros", "Streamer en vivo", "Educador", "Animador", "Anfitrión de TMade", "Fotógrafo de moda"],
  turningLabel: "Lo que hace",

  roles: {
    ...en.roles,
    title: "Cuatro asientos, una persona",
    text: "En el escritorio, en el stream, frente a un invitado y detrás de la cámara. Cada uno en sus propias palabras: elige uno para oírselo decir.",
    watch: "Ver en YouTube",
    list: en.roles.list.map((seat, i) => ({
      ...seat,
      role: seats[i].role,
      line: seats[i].line,
      quote: { ...seat.quote, translation: seats[i].translation },
      video: { ...seat.video, channel: seats[i].channel },
    })),
  },

  watch: {
    ...en.watch,
    title: "Míralo operar, gratis",
    text: "Opera futuros de NQ y ES en vivo en YouTube, con el chat abierto. Sus streams lo dicen así:",
    quote: { ...en.watch.quote, translation: "Pásate, haz preguntas en el chat y opera la sesión nocturna con nosotros." },
  },

  community: {
    ...en.community,
    title: "TRADERMADE, la comunidad",
    text: "Su comunidad vive en Whop. El nivel gratuito abre parte del Discord; unirse, los planes y el pago ocurren allí.",
    quote: {
      ...en.community.quote,
      translation:
        "Soy buena onda. No muerdo. Soy súper dulce. Así que, aunque solo quieras entrar a saludar, también lo agradezco.",
    },
    action: { ...en.community.action, label: "TRADERMADE en Whop" },
  },

  band: {
    ...en.band,
    translation:
      "Si vas camino a la rentabilidad, creo que puedes lograrlo. No porque sea fácil, no lo es, y la mayor parte de la pelea no será con el mercado. Será contigo mismo, en los días que nadie ve.",
  },

  doors: {
    trading: {
      ...en.doors.trading,
      title: "Trading",
      text: "Las sesiones, los nombres que oirás en el stream y las cifras como él las cuenta.",
      label: "Abrir la página de trading",
    },
    photography: {
      ...en.doors.photography,
      title: "Fotografía",
      text: "Nacido en Miami, en Nueva York desde 2014: moda, y un primer libro sobre familia y cultura.",
      label: "Abrir la página de fotografía",
    },
  },
};
