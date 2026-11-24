<!-- readme-standard: 2026-11-02 -->
<div align="center">

<img src="assets/banner.svg" width="100%" alt="tmadealex.github.io: TMade Alex, futures trader, streamer, photographer. An arch of thirteen stones in cyan lights from both sides inward until its keystone is reached.">

# tmadealex.github.io

*TMade Alex's own website: who he is, when he trades live, his photography, and every link. A gift; he decides what stays.*

[![Site](https://img.shields.io/badge/Site-tmadealex.github.io-34d4d8?style=flat-square)](https://tmadealex.github.io/)
![Status](https://img.shields.io/badge/Status-a_gift,_not_yet_his_word-0c1719?style=flat-square)
![Set up](https://img.shields.io/badge/Set_up-2026--11--23-249094?style=flat-square)
![For](https://img.shields.io/badge/For-TMade_Alex-64748b?style=flat-square)

<img src="assets/icons/map-pin.svg" width="16" height="16" alt=""> **You are here:** TMadeAlex › `tmadealex.github.io` · public · `main` is the working branch

</div>

## <img src="assets/icons/compass.svg" width="24" height="24" alt=""> TL;DR

1. <img src="assets/icons/sprout.svg" width="16" height="16" alt=""> **What this is.** A small website at [tmadealex.github.io](https://tmadealex.github.io/), in TMade Alex's TRADERMADE colours. Four pages: the front page (who he is, when he trades live in each visitor's own time, where to watch free and where the community is), trading, photography and contact.
2. <img src="assets/icons/users-round.svg" width="16" height="16" alt=""> **Who it is for.** TMade Alex. A member of his community set it up as a gift. Every page says so near its top, and says that Alex decides what stays.
3. <img src="assets/icons/footprints.svg" width="16" height="16" alt=""> **Do this first.** Nothing. Everything below is how the site works and who holds the keys. None of it needs doing.

Every figure and quotation on the site is Alex's own, from his public pages, read on 23 November 2026, and links to where it was read. Search engines are asked not to list the site until Alex says otherwise.

## <img src="assets/icons/pencil-line.svg" width="24" height="24" alt=""> Change the words

Every word and every setting lives in one folder, [`src/data`](./src/data). Nothing else needs touching.

| To change | Open this file |
| --- | --- |
| The name, the gift line, the menu, the colours, the footer, the small words on buttons, and the three switches | [`src/data/site.ts`](./src/data/site.ts) |
| The front page | [`src/data/home.ts`](./src/data/home.ts) |
| When he streams (in Eastern time; the site shows each visitor their own time) | [`src/data/schedule.ts`](./src/data/schedule.ts) |
| The trading page: the sessions, the names used on stream, the figures, the risk note | [`src/data/trading.ts`](./src/data/trading.ts) |
| The photography page | [`src/data/photography.ts`](./src/data/photography.ts) |
| The pictures in the photography gallery (the files themselves go in [`public/gallery/`](./public/gallery)) | [`src/data/gallery.ts`](./src/data/gallery.ts) |
| The contact page: links only | [`src/data/contact.ts`](./src/data/contact.ts) |
| Where every figure and quotation was read | [`src/data/sources.ts`](./src/data/sources.ts) |
| Everything above, in Spanish (see *In Spanish* below) | [`src/data/es/`](./src/data/es) |

Three settings in [`site.ts`](./src/data/site.ts) decide what the world sees:

| Switch | Today | What it does |
| --- | --- | --- |
| `ready` | `true` | The pages show. Change it to `false` and every address shows one quiet holding page instead. |
| `indexable` | `false` | Search engines are told not to list the site. Change it to `true` when it should be found. |
| `supportAddress` and `supportNetwork` | empty | The support panel appears only when both are filled in, by Alex: his own address and the network it is on. No helper ever supplies one. While either is empty, the panel is not on the site at all. |

**What is needed first.** A GitHub account, signed in, that is an owner of the [TMadeAlex organisation](https://github.com/orgs/TMadeAlex/people) (or that an owner has given write access to this repository). An owner adds someone from **the organisation's people › Invite member**.

**In the browser, with the pencil.** No program to install:

1. Open the file on GitHub, for example [`src/data/home.ts`](./src/data/home.ts).
2. Press the pencil at the top right of the file (*Edit this file*).
3. Change the words between the quote marks. Leave the quote marks and the commas where they are.
4. Press **Commit changes…**, say in a few words what changed, and press **Commit changes** again.

**To add a picture:**

1. Make the picture about 2000 px on its long side, as a JPEG or WebP, and a second copy about 800 px on its long side for the grid. Give the files short names with no spaces, for example `harbour.jpg` and `harbour-thumb.jpg`.
2. Open [`public/gallery/`](./public/gallery), choose **Add file › Upload files**, drop the files in, and commit.
3. Open [`src/data/gallery.ts`](./src/data/gallery.ts) with the pencil, copy the example, remove its two slashes, and fill it in: `src`, `thumb`, the full picture's `width` and `height` in pixels, `alt` (what the picture shows, for someone who cannot see it) and `credit`.

Only put up a picture that is fine to stay public: see *Undo a change* below.

**In Spanish, the words are kept separately.** Every page has a Spanish twin under `/es/` (for example
[`/es/trading/`](https://tmadealex.github.io/es/trading/)), and a switch in the menu goes between them. A visitor's
first visit opens a short welcome that asks for the language first (English is the default), then the look, then
where to go; anyone can open it again with *Welcome* in the bar at the foot of every page (also in the phone menu
and the links at the end of each page), or with `?arrival=again` on any address.

- The Spanish words live in [`src/data/es/`](./src/data/es), one file beside each English one. **Changing a sentence in
  English does not change the Spanish.** After an English edit, change the same sentence in the matching file in
  `src/data/es/` too, or ask a helper to.
- What carries over by itself: links, pictures, times, and his own words in quotation marks, which stay in his
  English on the Spanish pages with a translation under them. What does not: every translated sentence, and those
  translations. If his payouts figure changes, the Spanish page shows the new figure but the old translation under it
  until `src/data/es/trading.ts` is changed too.
- The Spanish pages say at the top that the translation was made with an AI helper and has not been reviewed by
  TMade Alex. When he (or someone he trusts) has read it, empty `note` under `languages` in
  [`src/data/es/site.ts`](./src/data/es/site.ts) and that line goes away.
- The pictures a shared link shows are drawn in both languages: after changing words, run `npm run build` and then
  `npm run share-cards`, and commit the new pictures in [`public/social/`](./public/social).

## <img src="assets/icons/layers.svg" width="24" height="24" alt=""> His photographs: shown from his own site, never copied here

This repository holds **no image of Alex's**: not his photographs, not his TRADERMADE art. The gallery on the photography page shows nine of his personal photographs **from his own photography site**, at the addresses its Personal page uses, each credited *Photograph: Alexander Saladrigas* and linked back. They are his: all rights reserved, and outside any licence this repository carries. [`PROVENANCE.md`](./PROVENANCE.md) lists each one and where it is.

**Why this way.** Anything pushed to a public repository stays in its history, even after it is deleted. Showing the pictures from his own site means nothing of his is copied into this one: if he takes a picture down there, it goes from here too, and emptying the list in [`src/data/gallery.ts`](./src/data/gallery.ts) takes them all off this site. `scripts/check-links.py` allows pictures from that one host and lists them; anything else that loads from another website still fails it.

## <img src="assets/icons/eye.svg" width="24" height="24" alt=""> See it live

Every change to `main` starts a build. Open the [Actions](../../actions) tab to watch it. It takes about two minutes.

- **A green tick** means the change is live at [tmadealex.github.io](https://tmadealex.github.io/). If the old page still shows, refresh it.
- **A red cross** means the build stopped, usually over a missing quote mark or comma. Nothing breaks: the site that was live stays exactly as it was until a change builds cleanly.

## <img src="assets/icons/history.svg" width="24" height="24" alt=""> Undo a change

Nothing is ever lost. GitHub keeps every version of every file.

That cuts both ways. While this repository is public, anyone can read those earlier versions, and anyone can copy the repository. Words, a picture or an address that were published and then undone stay readable in the history, and making the repository private later does not take back copies already made. So put up only what is fine to stay public.

1. Open the file and press **History** at the top right.
2. Open the version from before the change, and copy the old words.
3. Go back to the file, press the pencil, put the old words back, and commit.

A helper with the repository on a computer can do the same with `git revert <commit>`. That adds a new change that undoes the old one, and erases nothing.

## <img src="assets/icons/key-round.svg" width="24" height="24" alt=""> Who owns this place

The TMadeAlex organisation on GitHub, and everything in it, is kept for TMade Alex, and it is his to own. An owner can change anything, add or remove people, and delete all of it.

The member of his community who set it up (`drasticstatic` on GitHub) is a second owner, with his helpers Alfred (Claude Code) and Littlebird. He is a Littlebird ambassador; there is no link to Littlebird on the site, and no link on the site earns him anything. He is a spare key, so the place never depends on one person.

## <img src="assets/icons/user-round.svg" width="24" height="24" alt=""> Remove the second owner

The spare key can be taken back at any time, with no reason given and no hard feelings.

1. Open [the organisation's people](https://github.com/orgs/TMadeAlex/people).
2. Find `drasticstatic`, open the menu at the end of his row, and choose **Remove from organisation**.
3. Confirm. His helpers work under his account, so there is one name to remove.
4. To be thorough, open the organisation's **Settings › GitHub Apps** and remove any app that is not wanted.

GitHub keeps at least one owner on an organisation, so the last owner cannot be removed by mistake.

## <img src="assets/icons/trash-2.svg" width="24" height="24" alt=""> Take it all down

Three ways, from the lightest to the most final. Each needs only an owner.

1. **Take the site off the web and keep the files.** Two steps, in this order, because the next change to `main` would otherwise publish the site again:
   1. Stop the publishing. Open the [Actions](../../actions) tab, choose **Deploy to GitHub Pages** on the left, open the **…** menu at the top right, and choose **Disable workflow**.
   2. Open **Settings › Pages**, open the menu beside the live address, and choose **Unpublish site**.

   Or, in one step: **Settings › General**, down to the *Danger Zone*, **Change visibility › Make private**. On GitHub's free plan a private repository has no site, so the site comes down with it. To bring the site back later, enable the workflow again (or make the repository public again) and run it from the Actions tab.
2. **Delete this repository.** **Settings › General**, down to the *Danger Zone*, **Delete this repository**. The site goes with it.
3. **Delete the whole organisation.** [The organisation's settings](https://github.com/organizations/TMadeAlex/settings/profile), down to the *Danger zone*, **Delete this organisation**. Every repository in it goes too.

## <img src="assets/icons/shield-check.svg" width="24" height="24" alt=""> What it never does

- No forms, no sign-in, no cookies, no analytics and no trackers. No email address anywhere: the contact page is a list of links to his own pages.
- A visitor's browser asks three places for anything, and only these: this site for its pages, fonts and icons (the fonts, Poppins and JetBrains Mono, the faces of his TRADERMADE banner, are downloaded when the site is built and served from the site itself); his own photography site for his photographs (above); and YouTube for its own thumbnails of the four videos the front page's cards open. Those two picture servers see a visit, as any server a picture comes from does: the visitor's address and the page it was on. The site itself sends nothing about anyone anywhere.
- The look a visitor picks (night, morning, PARTY_MODE) is remembered by their own browser and never sent anywhere.
- It sells nothing. Joining TRADERMADE, its plans and payment all happen on Whop; the site links there.
- It never says a stream is live. It shows when each session is scheduled, in the visitor's own time, and the next scheduled start.
- The support panel, if Alex ever fills it in, shows an address and copies it. It does not connect to a wallet, hold anything, take a payment or mint anything.

## <img src="assets/icons/layers.svg" width="24" height="24" alt=""> How it is built

For a helper, or for the curious. Next.js 16, React 19, Tailwind 4 and TypeScript, written out as plain files and served by GitHub Pages.

```sh
npm ci                              # install, exactly as package-lock.json says
npm run lint
npm run build                       # writes the site to out/
python3 -I scripts/check-links.py   # every link and file in out/ resolves; nothing but the listed pictures loads from elsewhere, and nothing redirects or posts there
```

| Path | What it holds |
| --- | --- |
| [`src/data/`](./src/data) | Every word and setting |
| [`src/app/`](./src/app) | The pages: `/`, `/trading/`, `/photography/`, `/contact/` and the page for a wrong address |
| [`src/components/`](./src/components) | The menu and the status bar (`chrome/`), the front page's layers (`home/`), the trading desk (`trading/`), the lens and the film roll (`photo/`), the candles, crosshair and cursor (`fx/`), the contact sheet and viewer, the support window |
| [`src/lib/sessions.ts`](./src/lib/sessions.ts) | Turns his posted Eastern times into each visitor's own time, with the browser's own clock |
| [`src/app/globals.css`](./src/app/globals.css) | The look. Every colour is mixed from the six values in `site.ts`: night first, and morning, a misty teal that is never plain white |
| [`src/styles/`](./src/styles) | The menu, the front page, the trading desk, the photography page, and what moves (`motion.css`, PARTY_MODE included) |
| [`src/lib/look.ts`](./src/lib/look.ts) | Night, morning and PARTY_MODE: set before the page is drawn, so it never flashes the wrong look |
| [`scripts/check-links.py`](./scripts/check-links.py) | The link check, in plain Python |
| [`scripts/make-share-cards.py`](./scripts/make-share-cards.py) | Draws the picture each page shows when its link is shared, and the phone icons, into [`public/social/`](./public/social) (`npm run build`, then `npm run share-cards`, then commit them) |
| [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) | Builds and publishes on every change to `main` |
| [`AGENTS.md`](./AGENTS.md) | How any AI helper behaves here |

The picture viewer works from the keyboard: Escape closes it, the left and right arrows step through, Home and End go to the first and last, and closing it puts the keyboard back on the picture last shown. On a touch screen, swipe left or right. Motion, from the `motion` package: layers that move at their own speeds as the page scrolls (parallax), panes that lean toward the mouse, a cursor that leaves a wave of little candles, an iris that opens on the photography page, prints that develop, a desk that straightens as it comes up, and glows that breathe. PARTY_MODE (the button at the top, or Shift + P) turns his cyan slowly through every colour and throws a burst of candles. A device set to reduce motion sees all of it standing still, and PARTY_MODE then changes colour only.

## <img src="assets/icons/git-pull-request.svg" width="24" height="24" alt=""> Suggest a change

Noticed something? Open an [issue](../../issues) or a pull request against `main`. Christopher reads them, Alex decides, and a person with the role merges with a merge commit, never a squash. Not on GitHub? Tell Christopher in your own words. Commit subjects start with one gitmoji ([GITMOJI.md](https://github.com/drasticstatic/my-template/blob/main/GITMOJI.md)); run `sh scripts/install-hooks.sh` once per clone.

<sub>The front door follows the living [README standard](https://github.com/drasticstatic/my-template/blob/main/README-STANDARD.md). No licence has been chosen for this repository: that is its owner's to decide. His photographs and art, on the `with-his-art` branch only, are his and outside any licence. Icons: Lucide (ISC). Set up by the drasticstatic lab, as a gift.</sub>
