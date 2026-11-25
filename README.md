# Orange Global Media

Vue 3 and Vite website for Orange Global Media.

## Development

Use Node.js 24, then install the exact dependencies recorded in `package-lock.json`:

```sh
npm ci
npm run dev
```

## Git submission rules

`.gitignore` excludes `node_modules/`, package-manager caches, local build caches,
logs, `tmp/`, `.vercel/`, coverage, and local environment files. These files are
not committed and will not appear in a fresh clone. Run `npm ci` after cloning
to recreate dependencies locally; keep `package.json` and `package-lock.json`
in Git. Vercel also installs dependencies with `npm ci` during deployment.

Ignore rules do not remove files that Git already tracks. Before committing,
check `git status --short`; use `git rm --cached` for any previously tracked
local-only file that must leave the repository while remaining on disk.

The existing `docs/` production output remains tracked by this project's current
release workflow.

## Production build

```sh
npm run build
```

The production files are generated in `docs/`.

## Vercel deployment

Connect the existing Vercel project `express-glacier-fotrgir` to the GitHub
repository `engugu-web/engugu`, using `main` as the production branch.
Subsequent pushes to `main` trigger production deployments.

Production website: https://express-glacier-fotrgir.vercel.app/

`vercel.json` configures Vite, `npm ci`, `npm run build`, the `docs/` output
directory, and the SPA fallback used by routes such as `/services`.

Figma measurements and verification records are stored in `design/`.
