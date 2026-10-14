# Ecobiocides & Botanicals

The production website for Ecobiocides & Botanicals Private Limited, presenting its neem-based Azagro crop-protection range, specialty botanical inputs, technical data sheets, field media, certifications, and company information.

## Local development

```bash
npm ci
npm run dev
```

Open `http://127.0.0.1:3000` in a browser.

## Validation

```bash
npm run lint
npm run build
npm run check:export
```

The production build is a static export written to `out/`.

The export check validates local links, image/video/download references, category
anchors, all 17 product detail routes, award periods, canonical URLs and sitemap
coverage. The same checks run before a GitHub Pages deployment.

## Deployment

GitHub Actions deploys the `main` branch to GitHub Pages. Production builds use the `/ecobiocides-web` base path configured in `next.config.ts`.

Product media is stored under `public/media/`, and downloadable technical data sheets are stored under `public/resources/technical-data-sheets/`.

## Content maintenance

- `src/lib/products.ts`: the current 12-category / 16-product hierarchy, detail-page
  content and the separately retained Azagro 10,000 ppm entry.
- `src/lib/company-content.ts`: company history, manufacturing, workforce and
  historical district awards, based on the supplied September 2026 documents.
- `src/lib/media.ts`: existing Azagro technical-sheet and media references.
- `public/media/awards/`: unchanged original award certificate photographs.

Neem Activa, Karanja Activa and NitroRich currently use technical-enquiry copy.
Do not publish composition, dosage, pack sizes or certification claims for these
products until approved technical documentation and product photographs arrive.

Canonical URLs and the generated sitemap default to
`https://hyfib.github.io/ecobiocides-web/`. Set `NEXT_PUBLIC_SITE_URL` at build
time if the public deployment URL changes. A root/custom-domain deployment also
requires updating the `basePath` and `assetPrefix` in `next.config.ts` and the
base-path assertion in `scripts/check-export.mjs`.

The contact form prepares a `mailto:` draft; it does not send or store enquiries.
The visitor must send the draft from their email app. WhatsApp and direct email
links are provided for product-specific enquiries.

See `docs/repository-review-2026-09-10.md` for the review findings and outstanding
product-owner verification items.
