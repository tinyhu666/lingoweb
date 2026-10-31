# Lingo Web

Official landing page for [Lingo](https://lingo.ink), the AI in-game chat translation client for Windows and macOS.

The site mirrors the client's 1.0 "Arena HUD" design language: the same azure token set and logo, bundled Manrope / Chakra Petch / JetBrains Mono fonts, and a port of the client's looping translation demo, style picker and replayable tutorial.

## Stack

- React 19 + TypeScript + Vite 6
- Tailwind CSS 4 (utilities) on top of a token-based stylesheet in `src/index.css`
- motion for reveal animations
- react-i18next / i18next with `zh`, `en` and `ru` copy in `src/i18n`
- lucide-react icons, `@fontsource` web fonts

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run lint
npm run build
npm run preview
```

## Release data

- `src/lib/constants.ts` holds the bundled client version (`APP_VERSION`), release date and stable download aliases.
- `public/releases/latest-web.json` is the bundled copy of the public release manifest. At build time the GitHub Pages workflow refreshes it from the Tencent COS mirror; the page ignores any manifest older than `APP_VERSION` so it never advertises a superseded release.
- The client screenshots in `src/assets/screens` were captured from the 1.0.0 build in all three UI languages.

## Artwork

`src/assets/backdrops`, `src/assets/games/dota2-cover.jpg` and `src/assets/icons` are derived from the Dota 2 asset pack (Valve promotional art, Liquipedia map renders and item icons). They are used for illustration only and credited in the footer; confirm licensing before reusing them elsewhere.

## Deployment

The repository still includes a GitHub Pages workflow in `.github/workflows/deploy.yml`,
but Tencent Cloud is now the primary production origin.

- Primary production deploy: the main `Lingo` repository runs
  `deploy-tencent-website.yml` and uploads `dist/` to the Tencent Cloud server
- GitHub Pages remains a secondary publish path and should not be treated as the
  authoritative custom-domain source during the `lingo.ink` migration
- Production metadata points to `https://lingo.ink/`
