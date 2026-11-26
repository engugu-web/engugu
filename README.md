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
repository `engugu-web/orangeGlobalMedia`, using `main` as the production branch.
Subsequent pushes to `main` trigger production deployments.

Production website: https://express-glacier-fotrgir.vercel.app/

`vercel.json` configures Vite, `npm ci`, `npm run build`, the `docs/` output
directory, and the SPA fallback used by routes such as `/services`.

Figma measurements and verification records are stored in `design/`.

## Independent carousel image repository

Homepage carousel images are managed in [orangeGlobalMedia-images](https://github.com/engugu-web/orangeGlobalMedia-images),
with a local checkout at `D:\orangeMidea\engugu-images`. Edit only its `images/`
folder and push `main`. Its Pages workflow creates a filename-sorted manifest
and immutable image URLs. Once that workflow succeeds, refresh the website to
load the new images; no website-code commit or Vercel rebuild is needed.

Vercel proxies `/carousel/*` to that repository's Pages publication. Vite dev
and preview use the same proxy. The original carousel images remain a fallback
when the manifest or initial images fail to load. Twelve fixed frames and the
existing two-second interval remain unchanged regardless of image count.
