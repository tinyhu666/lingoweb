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

The repository includes a GitHub Pages workflow in `.github/workflows/deploy.yml`.

- Custom domain: `lingo.ink`
- `public/CNAME` is committed for Pages custom-domain publishing
- Production metadata points to `https://lingo.ink/`
