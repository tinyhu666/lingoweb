# Lingo Web

Official landing page for Lingo, the AI-powered in-game chat translation client for Windows and macOS.

## Stack

- React 19
- TypeScript
- Vite 6
- Tailwind CSS 4
- motion
- react-i18next / i18next
- lucide-react

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

## Deployment

The repository still includes a GitHub Pages workflow in `.github/workflows/deploy.yml`,
but Tencent Cloud is now the primary production origin.

- Primary production deploy: the main `Lingo` repository runs
  `deploy-tencent-website.yml` and uploads `dist/` to the Tencent Cloud server
- GitHub Pages remains a secondary publish path and should not be treated as the
  authoritative custom-domain source during the `lingo.ink` migration
- `public/CNAME` is intentionally not committed anymore; if GitHub Pages still
  shows a custom domain in repository settings, clear it in GitHub before
  pointing `lingo.ink` at Tencent Cloud
- Production metadata still points to `https://lingo.ink/`
