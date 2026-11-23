/*
 * The list of pictures. While it is empty, the gallery does not appear, and the
 * photography page lists the titles of his personal work and links to his site.
 *
 * On main this list stays empty: his photographs are his, and they are added only
 * on the local branch with-his-art, which waits for his word before it goes anywhere.
 *
 * A picture is a file in the folder public/gallery/ of this repository. Put the
 * file there first, then add an entry here. Pictures are never loaded from
 * another website. To add an entry, copy the example, take away the two slashes
 * at the start of each of its lines, and change the words between the quote marks.
 *
 * Sizes that work well, as JPEG or WebP:
 *   the full picture   about 2000 px on its long side
 *   the thumbnail      about 800 px on its long side (optional)
 * The grid shows the thumbnail and loads the full picture only when it is
 * opened, so the page stays quick. Without a thumbnail, the grid uses the full
 * picture.
 *
 * Each picture of someone else's work names its maker in `credit`, with a link
 * back to the page it came from. The photographs here are Alexander
 * Saladrigas's: all rights reserved, outside this repository's licences, and
 * listed in PROVENANCE.md (on the with-his-art branch).
 *
 * Give the full picture's width and height in pixels, and the grid keeps each
 * picture's own shape, uncropped. Without them, the picture sits in a 4 by 5
 * frame and is cropped to fit. (On a Mac, Get Info in the Finder shows the two
 * numbers, under More Info.)
 */

export interface GalleryItem {
  /** A short name with no spaces, different for each picture. */
  id: string;
  /** The full picture, written from the public folder: "/gallery/the-file-name.jpg". */
  src: string;
  /** Optional: a smaller copy for the grid, about 800 px on its long side. */
  thumb?: string;
  /** Optional: the full picture's width and height in pixels, so the grid keeps its shape. */
  width?: number;
  height?: number;
  title: string;
  /** Optional: a sentence shown under the picture when it is opened. */
  caption?: string;
  /** What the picture shows, for someone who cannot see it. */
  alt: string;
  /** Optional: who made it, and the page it came from. Shown when the picture is opened. */
  credit?: { text: string; href: string };
}

export const gallery: GalleryItem[] = [
  // {
  //   id: "an-example",
  //   src: "/gallery/an-example.jpg",
  //   thumb: "/gallery/an-example-thumb.jpg",
  //   width: 1600,
  //   height: 2000,
  //   title: "The name of the picture",
  //   caption: "A sentence about it.",
  //   alt: "What the picture shows, said plainly.",
  //   credit: { text: "Photograph: the maker's name", href: "https://example.org/the-page-it-came-from" },
  // },
];
