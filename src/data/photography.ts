/*
 * The photography page. The story first, in his own words from the ALPHAS
 * interview; then the biography his own photography site gives; then his
 * personal work. While gallery.ts is empty, the personal work is a list of
 * titles that links to the page of his site where the photographs are.
 */

import type { Cited, Quote } from "./sources";

export interface Work {
  title: string;
  /** The second line, as his site captions it. */
  place: string;
}

export const photography = {
  title: "Photography",
  /* The name his photography is published under, and his own line from the ALPHAS interview. */
  byline: "Alexander Saladrigas",
  lead: { text: "I'm a fashion photographer based in New York.", source: "alphas", at: 95 } as Quote,

  story: {
    title: "In his words",
    text: "Before the charts, the camera. He told the story in the ALPHAS interview.",
    quotes: [
      {
        text: "I originally come from Miami, but I moved here about a little over a decade ago",
        source: "alphas",
        at: 95,
      },
      {
        text: "I've always been drawn towards things that people say is impossible to do to be honest.",
        source: "alphas",
        at: 115,
      },
      {
        text: "I've been able to travel the world. I've been able to work for some really big brands",
        source: "alphas",
        at: 125,
      },
      {
        text: "If I'm going to do something, I go all in on things.",
        source: "alphas",
        at: 221,
      },
    ] as Quote[],
  },

  bio: {
    title: "From his site",
    paragraphs: [
      "Alexander Saladrigas was born and raised in Miami Florida to a family of first generation Americans that emigrated from Cuba. He attributes his success to the work ethic that he learned from his family members and their nurturing of the exploration of his passions. Growing up he always excelled in art which led him to photography as his preferred form of creative expression. He began to consider photography as a career path in 2013 which led to his move to New York City in 2014.",
      "Alexander is currently exploring the concepts of family and culture as a Cuban-American and Floridian. He is in the process of shooting his first book.",
    ],
    cite: { source: "photoInfo" } as Cited,
    clients: "His clients and editorial work are listed on the Info page of his site.",
  },

  personal: {
    title: "Personal work",
    text: "The titles below are his, as his site captions them. The photographs live on his own site, on its Personal page.",
    /* The titles and places, as his Personal page captions them. */
    works: [
      { title: "Self Portrait", place: "Motel, New York 2020" },
      { title: "Cuban Sisters", place: "Hialeah Florida 2021" },
      { title: "“Untitled”", place: "Upstate New York, 2020" },
      { title: "Los 3 Cubanos", place: "Hialeah Florida, 2021" },
      { title: "Dads", place: "Perris California, 2022" },
      { title: "Florida Project", place: "New Smyrna Beach, 2022" },
      { title: "Cuban Apt", place: "Hialeah Florida, 2021" },
      { title: "Dads", place: "Miami Florida, 2021" },
      { title: "Fatherless Boy", place: "Orlando Florida 2022" },
    ] as Work[],
    cite: { source: "photoPersonal" } as Cited,
    action: { label: "See them on his site", href: "https://www.alexandersaladrigas.com/doc" },
    /* Under the gallery, when gallery.ts has pictures. */
    credit:
      "Photographs: Alexander Saladrigas, from the Personal page of his site. All rights reserved: they are his, and are not covered by this repository's licences.",
  },

  links: [
    { label: "alexandersaladrigas.com", href: "https://www.alexandersaladrigas.com/" },
    { label: "Instagram @alexandersaladrigas", href: "https://www.instagram.com/alexandersaladrigas" },
  ],
};
