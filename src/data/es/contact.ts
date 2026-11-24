/* La página de contacto en español: los mismos enlaces, con sus palabras en español. */

import { contact as en } from "../contact";

const notes: Record<string, string> = {
  "Live streams Monday-Friday.": "En vivo de lunes a viernes.",
  "The community: the free tier and the paid plan.": "La comunidad: el nivel gratuito y el plan de pago.",
};

export const contact: typeof en = {
  ...en,
  title: "Contacto",
  lead: "Cada enlace lleva a una página suya. No hay dirección de correo en este sitio.",

  groups: en.groups.map((group) => ({
    ...group,
    title: group.id === "photography" ? "Alexander Saladrigas, fotografía" : group.title,
    links: group.links.map((link) => ({
      ...link,
      place: link.place === "Website" ? "Sitio web" : link.place,
      note: link.note ? notes[link.note] ?? link.note : undefined,
    })),
  })),

  colophon: {
    title: "Sobre este sitio",
    paragraphs: [
      "Un miembro de la comunidad TRADERMADE construyó este sitio como regalo, con dos asistentes de IA: Claude Code y Littlebird (littlebird.ai). Ese miembro es uno de los embajadores de Littlebird. TMade Alex decide qué se queda, qué cambia y si el sitio sigue en línea.",
      "Cada cifra y cita viene de las páginas públicas de Alex, leídas el 23 de noviembre de 2026, y enlaza a donde se leyó. Sus citas quedan en inglés, como él las dijo, con la traducción debajo. Las de videos son como las imprimen los subtítulos automáticos de YouTube.",
      "Esta versión en español la tradujo un asistente de IA (Claude Code) y aún no la ha revisado TMade Alex.",
      "Las fotografías de la página de fotografía se muestran desde su propio sitio, donde él las publicó, y cada una enlaza de vuelta. Las imágenes de las cuatro tarjetas de video de la página principal son las miniaturas de YouTube de esos videos, mostradas desde YouTube. Ninguna está copiada aquí.",
      "Privacidad, sin rodeos: tu navegador le pide a este sitio sus páginas, a su sitio de fotografía sus fotos y a YouTube esas cuatro imágenes de video, y nada más. Esos dos servidores de imágenes ven una visita (tu dirección y la página en la que estabas), como cualquier servidor del que viene una imagen. No hay cookies, ni formularios, ni rastreo, y el sitio no envía nada sobre ti a ninguna parte; el aspecto que elijas (noche, mañana, PARTY_MODE) y tu idioma los recuerda solo tu propio navegador. Se pide a los buscadores que no lo listen.",
      "Ningún enlace de este sitio le da nada a quien lo creó.",
      "Las velas dibujadas en estas páginas, incluidas las del cursor, son decoración inventada por el sitio. No son datos de mercado ni operaciones de nadie.",
    ],
  },
};
