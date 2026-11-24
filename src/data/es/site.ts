/*
 * El sitio en español: las mismas piezas que src/data/site.ts, con sus palabras
 * en español. Las direcciones, los colores y los interruptores vienen del
 * archivo en inglés y no se repiten aquí.
 *
 * Traducción hecha con un asistente de IA (Claude Code), aún sin revisar por
 * TMade Alex. Tú, neutro y cercano, como habla su comunidad.
 */

import { site as en } from "../site";
import type { Site } from "../site";

export const site: Site = {
  ...en,
  language: "es",

  description:
    "TMade Alex: trader de futuros, streamer y anfitrión de TMade, y fotógrafo de moda en Nueva York. Creado como regalo por un miembro de su comunidad.",

  share: {
    home: {
      ...en.share.home,
      path: "/es/",
      image: "/social/og-home-es.png",
      description:
        "Trader de futuros, streamer en vivo y anfitrión de TMade, y fotógrafo de moda en Nueva York. En vivo de lunes a viernes. Creado como regalo por un miembro de su comunidad.",
      alt: "TMade Alex, en sus colores de TRADERMADE: trader de futuros, streamer, educador, animador, anfitrión de TMade y fotógrafo de moda, sobre una línea de velas.",
    },
    trading: {
      ...en.share.trading,
      path: "/es/trading/",
      image: "/social/og-trading-es.png",
      description:
        "Opera futuros con confianza. Sus sesiones en tu propia hora, los nombres que oirás en el stream y sus cifras como él las cuenta.",
      alt: "Trading, con sus palabras “Trade futures with confidence.” junto a un gráfico dibujado como ilustración.",
    },
    photography: {
      ...en.share.photography,
      path: "/es/photography/",
      image: "/social/og-photography-es.png",
      description:
        "Fotógrafo de moda en Nueva York. Alexander Saladrigas: su historia en sus propias palabras y su obra personal, mostrada desde su propio sitio.",
      alt: "Fotografía, de Alexander Saladrigas, con sus palabras “I'm a fashion photographer based in New York.” junto al lente de una cámara.",
    },
    contact: {
      ...en.share.contact,
      path: "/es/contact/",
      image: "/social/og-contact-es.png",
      description: "Cada enlace lleva a una página suya: YouTube, X, Instagram, TRADERMADE en Whop y su fotografía.",
      alt: "Contacto: TMade Alex en YouTube, X, Instagram y Whop.",
    },
  },

  gift: {
    line: "Un miembro de la comunidad de TMade Alex creó este sitio como regalo. Alex decide qué se queda.",
  },

  nav: [
    { href: "/trading/", label: "Trading", icon: "trading" },
    { href: "/photography/", label: "Fotografía", icon: "photography" },
    { href: "/contact/", label: "Contacto", icon: "contact" },
  ],

  explore: {
    label: "Explorar",
    links: [
      { label: "YouTube @TMadeAlex", href: "https://www.youtube.com/@TMadeAlex", icon: "youtube" },
      { label: "TRADERMADE en Whop", href: "https://whop.com/tradermade/", icon: "whop" },
      { label: "X @TMadeAlex", href: "https://x.com/tmadealex", icon: "x" },
      { label: "Instagram @tmadealex", href: "https://www.instagram.com/tmadealex/", icon: "instagram" },
      { label: "alexandersaladrigas.com", href: "https://www.alexandersaladrigas.com/", icon: "camera" },
    ],
  },

  source: {
    ...en.source,
    label: "Código en GitHub",
    short: "Código",
    home: { ...en.source.home, label: "TMadeAlex en GitHub" },
  },

  labels: {
    support: "Apoyar",
    empty: "Aún no hay nada aquí.",
  },

  status: {
    label: "Horario y código",
    next: "Próxima sesión",
    until: "hasta las",
    scheduled: "Programada ahora",
    risk: "No es asesoría financiera",
    riskHref: "/es/trading/#risk",
  },

  look: {
    heading: "Aspecto",
    night: "Noche",
    morning: "Mañana",
    toNight: "Cambiar al aspecto de noche",
    toMorning: "Cambiar al aspecto de mañana",
  },

  party: {
    heading: "Para divertirse",
    name: "PARTY_MODE",
    on: "PARTY_MODE activado",
    off: "PARTY_MODE desactivado",
    hint: "Mayús + P",
  },

  languages: {
    heading: "Idioma",
    other: "English",
    otherShort: "EN",
    otherLabel: "Read this page in English",
    otherLang: "en",
    note: "Traducción hecha con un asistente de IA, aún sin revisar por TMade Alex. Sus citas quedan en inglés, como él las dijo, con la traducción debajo.",
  },

  arrival: {
    label: "Bienvenida",
    step: "Paso {n} de {total}",
    welcome: { title: "Adelante", sub: "El rincón de TMade Alex en internet: el trading, los streams, la fotografía. Primero, tu idioma." },
    look: { title: "Elige tu pantalla", sub: "Noche o mañana, y PARTY_MODE si te provoca. Las dos cosas se cambian cuando quieras desde el menú." },
    go: { title: "¿Por dónde empiezas?", sub: "Elige una puerta. Todo lo demás está a un toque en el menú." },
    english: en.arrival.english,
    spanish: en.arrival.spanish,
    night: "Noche",
    morning: "Mañana",
    party: "PARTY_MODE",
    doors: [
      { id: "trading", title: "El escritorio de trading", line: "Sus sesiones, los nombres de sus streams, sus cifras.", href: "/trading/" },
      { id: "photography", title: "La fotografía", line: "Su historia en sus propias palabras, y su obra personal.", href: "/photography/" },
      { id: "watch", title: "Míralo en vivo", line: "Su canal de YouTube, de lunes a viernes.", href: "https://www.youtube.com/@TMadeAlex" },
      { id: "stay", title: "Quedarme aquí", line: "La página principal, desde arriba.", href: "/" },
    ],
    next: "Siguiente",
    back: "Atrás",
    done: "Vamos",
    skip: "Saltar",
    small: "Creado como regalo por un miembro de su comunidad. Nada aquí es asesoría financiera. Tus elecciones se quedan en este navegador.",
    again: "Ver la bienvenida otra vez",
    againShort: "Bienvenida",
  },

  notFound: {
    kicker: "404",
    title: "No hay sesión en esta dirección",
    line: "Puede que la página se haya movido, o que nunca haya estado aquí.",
    back: "Ir a la página principal",
    box: "Fuera de horario",
  },

  footer: {
    lines: [
      "Cada cifra y cita aquí es de TMade Alex, de sus páginas públicas, leídas el 23 de noviembre de 2026, y enlaza a donde se leyó. Sus citas quedan en inglés, como él las dijo, con una traducción debajo; las de videos son como las imprimen los subtítulos automáticos de YouTube.",
      "Nada en este sitio es asesoría financiera. Operar futuros implica un riesgo sustancial de pérdida.",
      "Sin cookies, sin formularios, sin rastreo. Las imágenes vienen de este sitio, de su propio sitio de fotografía y, para las cuatro tarjetas de video, de YouTube; esos dos ven una visita, como cualquier servidor de imágenes. El aspecto que elijas lo recuerda solo tu propio navegador. Se pide a los buscadores que no lo listen.",
    ],
  },

  ui: {
    skip: "Saltar a la página",
    menu: "Páginas",
    homeWord: "Inicio",
    openMenu: "Abrir el menú",
    closeMenu: "Cerrar el menú",
    toTop: "Volver arriba",
    scrollCue: "Desliza",
    scrollCueLabel: "Bajar por la página",
    home: "TMade Alex, página principal",
    seeIt: "Verlo",
    openPicture: "Abrir la foto",
    pictureCount: "Foto {n} de {total}",
    closePicture: "Cerrar la foto",
    previousPicture: "Foto anterior",
    nextPicture: "Foto siguiente",
    ownAddress: "Mi propia dirección",
    network: "Red",
    copyAddress: "Copiar la dirección",
    addressCopied: "Dirección copiada",
    supportHow:
      "Para enviar algo, pega esta dirección en tu propia billetera. Esta página no se conecta a ninguna billetera, no guarda nada ni recibe pagos. Revisa la dirección antes de enviar, porque una transferencia no se puede deshacer.",
  },
};
