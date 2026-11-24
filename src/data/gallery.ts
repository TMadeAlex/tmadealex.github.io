/*
 * The list of pictures. While it is empty, the gallery does not appear, and the
 * photography page lists the titles of his personal work and links to his site.
 *
 * His photographs are not copied into this repository. Each one is shown from
 * his own site, alexandersaladrigas.com, where he published it, and links back
 * to the page it is on. If he takes one down there, it goes from here too. To
 * take them all off this site, empty the list below (keep the square brackets);
 * nothing of his is left behind in the repository's history but the addresses.
 * They are his: all rights reserved, and outside this repository's licences.
 * PROVENANCE.md lists each one and the page it is on.
 *
 * A picture can also be a file of this repository: put it in public/gallery/
 * first, then write its src as "/gallery/the-file-name.jpg". To add an entry,
 * copy the example at the end, take away the two slashes at the start of each
 * of its lines, and change the words between the quote marks.
 *
 * Sizes that work well, as JPEG or WebP:
 *   the full picture   about 2000 px on its long side
 *   the thumbnail      about 800 px on its long side (optional)
 * The grid shows the thumbnail and loads the full picture only when it is
 * opened, so the page stays quick. Without a thumbnail, the grid uses the full
 * picture.
 *
 * Each picture of someone else's work names its maker in `credit`, with a link
 * back to the page it came from.
 *
 * Give the full picture's width and height in pixels (or any two numbers in
 * the same proportion), and the grid keeps each picture's own shape, uncropped.
 * Without them, the picture sits in a 4 by 5 frame and is cropped to fit.
 */

export interface GalleryItem {
  /** A short name with no spaces, different for each picture. */
  id: string;
  /** The full picture: a web address on his own site, or a file of this repository written as "/gallery/the-file-name.jpg". */
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

/*
 * Where his photographs are shown from: the picture host of his own site,
 * alexandersaladrigas.com. `format` asks it for a width: 750w for the grid,
 * 1500w for a tall picture opened large, 2500w for a wide one.
 */
const HIS_SITE = "https://images.squarespace-cdn.com/content/v1/59e6dd62f9a61e35b8cbb284/";
const fromHisSite = (path: string, width: "750w" | "1500w" | "2500w") => `${HIS_SITE}${path}?format=${width}`;

/* Every photograph here is his, from the Personal page of his site, and links back to it. */
const PERSONAL = { text: "Photograph: Alexander Saladrigas", href: "https://www.alexandersaladrigas.com/doc" };

export const gallery: GalleryItem[] = [
  {
    id: "self-portrait",
    src: fromHisSite("1652422122646-GUMFOPLD0BEW5HJKHV43/Motel_SelfPortrait.jpg", "2500w"),
    thumb: fromHisSite("1652422122646-GUMFOPLD0BEW5HJKHV43/Motel_SelfPortrait.jpg", "750w"),
    width: 2000,
    height: 1571,
    title: "Self Portrait",
    caption: "Motel, New York 2020",
    alt: "A motel room in warm late light: a patterned bedspread, a chair and a round table, and on the wall the shadow of the photographer.",
    credit: PERSONAL,
  },
  {
    id: "cuban-sisters",
    src: fromHisSite("1652401526934-JXZH9UJI9FZR98P5UY0P/cuban8.jpg", "1500w"),
    thumb: fromHisSite("1652401526934-JXZH9UJI9FZR98P5UY0P/cuban8.jpg", "750w"),
    width: 1598,
    height: 2000,
    title: "Cuban Sisters",
    caption: "Hialeah Florida 2021",
    alt: "Two women by a window, one in a red dress and large red earrings with her hand on the shoulder of the other, who wears black with a flower in her hair.",
    credit: PERSONAL,
  },
  {
    id: "untitled-upstate",
    src: fromHisSite("1652424284348-4E1TBQHNL1W6UGF9YL18/Alexander_Farma.jpg", "1500w"),
    thumb: fromHisSite("1652424284348-4E1TBQHNL1W6UGF9YL18/Alexander_Farma.jpg", "750w"),
    width: 1571,
    height: 2000,
    title: "“Untitled”",
    caption: "Upstate New York, 2020",
    alt: "A lone windswept pine beside a white farmhouse, with a pile of cut logs in the foreground under a pale sky.",
    credit: PERSONAL,
  },
  {
    id: "los-3-cubanos",
    src: fromHisSite("1652461642417-27BOVEY1QRB8K37TLLCT/cuban9.jpg", "1500w"),
    thumb: fromHisSite("1652461642417-27BOVEY1QRB8K37TLLCT/cuban9.jpg", "750w"),
    width: 1572,
    height: 2000,
    title: "Los 3 Cubanos",
    caption: "Hialeah Florida, 2021",
    alt: "Three men in white shirts sit on a floral sofa set out on a lawn, two of them holding open fans, in front of an orange two-storey apartment building.",
    credit: PERSONAL,
  },
  {
    id: "dads-perris",
    src: fromHisSite("1652462618727-TANHTAPV4UFAKNO5N8OH/000056450006.jpg", "1500w"),
    thumb: fromHisSite("1652462618727-TANHTAPV4UFAKNO5N8OH/000056450006.jpg", "750w"),
    width: 1570,
    height: 2000,
    title: "Dads",
    caption: "Perris California, 2022",
    alt: "A black and white portrait of a man with long braids and a heavy chain necklace, looking straight at the camera.",
    credit: PERSONAL,
  },
  {
    id: "florida-project",
    src: fromHisSite("1658286395746-76YPINVQRQY23290HB6O/FL_Project_BeachBrothers3.jpg", "2500w"),
    thumb: fromHisSite("1658286395746-76YPINVQRQY23290HB6O/FL_Project_BeachBrothers3.jpg", "750w"),
    width: 2000,
    height: 1571,
    title: "Florida Project",
    caption: "New Smyrna Beach, 2022",
    alt: "Two boys on a beach strewn with seaweed, one standing and one sitting, both looking out at the sea.",
    credit: PERSONAL,
  },
  {
    id: "cuban-apt",
    src: fromHisSite("1652463132394-5APIT9JUKQ7ZNE1RCZ0H/cuban_apt.jpg", "2500w"),
    thumb: fromHisSite("1652463132394-5APIT9JUKQ7ZNE1RCZ0H/cuban_apt.jpg", "750w"),
    width: 2000,
    height: 1571,
    title: "Cuban Apt",
    caption: "Hialeah Florida, 2021",
    alt: "The orange front of an apartment building with the words Geneva Apt 37 on it, cars parked below.",
    credit: PERSONAL,
  },
  {
    id: "dads-miami",
    src: fromHisSite("1652402847042-T2K3FK3NW8BT5E73ZD24/Dads1c_final.jpg", "1500w"),
    thumb: fromHisSite("1652402847042-T2K3FK3NW8BT5E73ZD24/Dads1c_final.jpg", "750w"),
    width: 1571,
    height: 2000,
    title: "Dads",
    caption: "Miami Florida, 2021",
    alt: "A man with long locs stands against a beige wall, holding a small girl on his hip while a young boy leans against his leg.",
    credit: PERSONAL,
  },
  {
    id: "fatherless-boy",
    src: fromHisSite("1652401387147-35CBGVUVHYQLU12V9TAO/FL_Project_03a_FS.jpg", "1500w"),
    thumb: fromHisSite("1652401387147-35CBGVUVHYQLU12V9TAO/FL_Project_03a_FS.jpg", "750w"),
    width: 1571,
    height: 2000,
    title: "Fatherless Boy",
    caption: "Orlando Florida 2022",
    alt: "A close portrait of a boy in a grey T-shirt, looking at the camera, with bunting blurred behind him.",
    credit: PERSONAL,
  },
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
