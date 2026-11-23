# For any AI helper working in this repository

This page is public, and it is written for anyone to read: the owner, a visitor, and any AI helper (Claude Code,
Codex, Copilot, or another) that is asked to work here. If you are a helper, read it before you change anything.

This repository is a person's own small website. It is served by GitHub Pages. The person it speaks for owns it.

## The owner decides

- The owner decides what this site says and what stays on it. You carry out what you are asked, and nothing more.
- Never write about the owner's life, work, beliefs or plans unless the owner gave you those words, or published them
  on a page of his own. Every figure and quotation names where it was read, in `src/data/sources.ts`, and nothing is
  rounded up, inferred or promised. If a section is empty, leave it empty.
- A figure, a code or a partner is one line, lower down, with the risk note beside it. Nothing on the site sells.
- Never turn the site on for the owner. `ready` and `indexable` in `src/data/site.ts` change only when the owner asks.
- If you are unsure what the owner wants, say so and stop. Do not guess, and do not fill the gap.

## Change words only in `src/data`

- Every word and every setting lives in `src/data/`: `site.ts`, `home.ts`, `schedule.ts`, `trading.ts`,
  `photography.ts`, `gallery.ts`, `contact.ts` and `sources.ts`. A change to what the site says is a change to those
  files and nothing else.
- Leave the pages, the components, the styles, the workflow and the scripts alone unless you are asked to change them
  by name. If a request seems to need it, say what you would change and why, before you change it.
- Pictures are files in `public/gallery/`. Never link a picture from another website.
- On `main` there is no image of the owner's. His photographs and art live on the local branch `with-his-art`, which
  is never pushed until he says yes.

## Never add these

- No tracking of any kind: no analytics, no pixels, no fingerprinting, no cookies, no local storage.
- No forms. The contact page is a list of links.
- No third-party scripts, fonts, pictures or frames. A visitor's browser asks this site for files and no other.
  Fonts are built in when the site is built. Icons come from the `lucide-react` package.
- No wallet connection, no custody, no checkout and no minting. The support panel shows the owner's own address and
  a button that copies it. That is all it will ever do.
- No new package without saying which one, why, and what it loads.

## Never ask for a secret

- Never ask anyone for a password, a sign-in code, a recovery code, a private key or a seed phrase. Not to help, not
  to check, not for any reason. Nothing in this repository needs one.
- If someone offers you one, do not read it back, do not store it and do not use it. Say plainly that it should be
  kept private, and that it should be changed if it was shown to anyone.
- Never read, print or commit a `.env` file, a key or a token.

## Run the build before you propose a change

```sh
npm ci
npm run lint
npm run build
python3 -I scripts/check-links.py
```

All four must pass. Say what you ran and what it printed. If something fails, say so: do not hide it and do not
switch a check off to make it pass. Stop a preview server when you are done with it.

## How a change is offered

- Work on a branch and open a pull request against `main`. A person merges it, with a merge commit. Do not merge your
  own work, do not force-push, and do not rewrite history.
- Delete nothing. If something should go, say so and let the owner decide.
- Say in the commit message that an AI helped, and which one. Run `sh scripts/install-hooks.sh` once per clone.
- Write plainly: short sentences, British spelling, no jargon. The owner should be able to read every line you wrote.
