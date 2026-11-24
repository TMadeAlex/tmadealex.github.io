/*
 * La página de fotografía en español. Los títulos y lugares de sus fotos quedan
 * como él los escribe en su sitio. Su biografía viene de su sitio, en inglés, y
 * aquí va traducida.
 */

import { photography as en } from "../photography";

export const photography: typeof en = {
  ...en,
  title: "Fotografía",
  lead: { ...en.lead, translation: "Soy fotógrafo de moda y vivo en Nueva York." },

  story: {
    ...en.story,
    title: "En sus palabras",
    text: "Antes de los gráficos, la cámara. Lo contó en la entrevista ALPHAS.",
    quotes: [
      { ...en.story.quotes[0], translation: "Originalmente soy de Miami, pero me mudé aquí hace poco más de una década" },
      { ...en.story.quotes[1], translation: "Siempre me han atraído las cosas que la gente dice que son imposibles, la verdad." },
      { ...en.story.quotes[2], translation: "He podido viajar por el mundo. He podido trabajar para marcas realmente grandes" },
      { ...en.story.quotes[3], translation: "Si voy a hacer algo, voy con todo." },
    ],
  },

  bio: {
    ...en.bio,
    title: "De su sitio",
    paragraphs: [
      "Alexander Saladrigas nació y creció en Miami, Florida, en una familia de estadounidenses de primera generación que emigró desde Cuba. Atribuye su éxito a la ética de trabajo que aprendió de su familia y al apoyo que le dieron para explorar sus pasiones. De niño siempre destacó en el arte, lo que lo llevó a la fotografía como su forma preferida de expresión creativa. Empezó a considerar la fotografía como carrera en 2013, lo que lo llevó a mudarse a la ciudad de Nueva York en 2014.",
      "Alexander explora actualmente los conceptos de familia y cultura como cubanoamericano y floridano. Está fotografiando su primer libro.",
    ],
    clients: "Sus clientes y su trabajo editorial están en la página Info de su sitio (en inglés).",
  },

  personal: {
    ...en.personal,
    title: "Obra personal",
    text: "Los títulos de abajo son suyos, como los escribe en su sitio. Las fotos viven en su propio sitio, en su página Personal.",
    galleryText: "De la página Personal de su sitio, con sus títulos. Elige una para verla en grande.",
    action: { ...en.personal.action, label: "Verlas en su sitio" },
    credit:
      "Fotografías: Alexander Saladrigas, de la página Personal de su sitio. Todos los derechos reservados: son suyas y no las cubren las licencias de este repositorio.",
  },
};
