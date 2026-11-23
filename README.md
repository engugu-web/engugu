# Orange Global Media

Vue 3 and Vite website for Orange Global Media.

## Development

```sh
npm ci
npm run dev
```

## Production build

```sh
npm run build
```

The production files are generated in `docs/`.

## Vercel deployment

Connect the existing Vercel project `express-glacier-fotrgir` to the GitHub
repository `engugu-web/engugu`, using `main` as the production branch.
Subsequent pushes to `main` trigger production deployments.

`vercel.json` configures Vite, `npm ci`, `npm run build`, the `docs/` output
directory, and the SPA fallback used by routes such as `/services`.

Figma measurements and verification records are stored in `design/`.
