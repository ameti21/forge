# IndexKit — W3Schools Research Deliverables (Compliance-First)

This repository builds:

1. A deployable static site at [forge.ameti.one](https://forge.ameti.one)
2. A release ZIP containing reports, sample index data (URLs + metadata only), and deployment configs

## Important compliance notes

- W3Schools Terms prohibit spidering/crawling/scraping. This kit ships with fetch tooling **disabled by default**.
- This project does **NOT** redistribute W3Schools tutorial text, images, or code pages.
- Included datasets are representative samples only (URL-level metadata + our own tags).

## Quick start

### Build the static site

```bash
mkdir -p build/site
python3 scripts/build_site.py --out build/site
```

### Build the release ZIP

```bash
chmod +x scripts/make_release.sh
VERSION=0.1.0 BUILD_DATE=$(date -u +%F) ./scripts/make_release.sh
```

## Deploy

- **Vercel** (production): Push to `main` — auto-deploys to forge.ameti.one
- **GitHub Pages**: see `deploy/github/pages.yml`
- **Netlify**: `deploy/netlify.toml` (build: `python3 scripts/build_site.py --out build/site`, publish: `build/site`)
- **VPS (Ubuntu+Nginx)**: see `deploy/nginx/indexkit.conf` + `deploy/systemd`

## Project structure

```
├── README.md
├── LICENSE
├── NOTICE.md / SECURITY.md / PRIVACY.md
├── MANIFEST.json
├── vercel.json
├── reports/          Research deliverables (Markdown)
├── data/
│   ├── samples/      Sample URL-only index + taxonomy
│   └── schemas/      JSON schemas for data validation
├── site/             Static site source (built to build/site)
├── scripts/          Build pipeline + validation
├── deploy/           Host-specific configs + CI workflows
└── legal/            Permission/takedown/DMCA templates
```

## Not affiliated

This project is not affiliated with, endorsed by, or connected to W3Schools.
