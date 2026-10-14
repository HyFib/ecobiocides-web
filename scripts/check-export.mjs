import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, relative, join, sep } from "node:path";

const root = resolve("out");
assert(existsSync(root), "Run npm run build before checking the export.");
const site = new URL((process.env.NEXT_PUBLIC_SITE_URL || "https://hyfib.github.io/ecobiocides-web").replace(/\/+$/, "") + "/");
const basePath = "/ecobiocides-web";
const htmlFiles = [];
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.name.endsWith(".html")) htmlFiles.push(path);
  }
}
walk(root);
const decode = (value) => value.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"');
const documents = new Map(htmlFiles.map((path) => {
  const html = readFileSync(path, "utf8");
  return [path, { html, ids: new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1])) }];
}));
const errors = [];
let references = 0;
for (const [file, { html }] of documents) {
  const route = relative(root, file).split(sep).join("/").replace(/index\.html$/, "");
  const currentUrl = new URL(route, site);
  for (const [, tag, attrs] of html.matchAll(/<(a|link|img|script|source|video)\b([^>]+)>/gi)) {
    for (const [, attribute, rawValue] of attrs.matchAll(/\b(href|src|poster)="([^"]+)"/g)) {
      const value = decode(rawValue);
      if (/^(data:|mailto:|tel:|blob:)/.test(value)) continue;
      const url = new URL(value, currentUrl);
      if (url.origin !== site.origin) continue;
      // Canonical URLs and exported assets must stay within the configured Pages project.
      const pathname = decodeURIComponent(url.pathname);
      if (!pathname.startsWith(basePath + "/") && pathname !== basePath) {
        errors.push(`${route}: ${tag} ${attribute} escapes the project base path: ${pathname}`);
        continue;
      }
      const localPath = pathname.slice(basePath.length).replace(/^\//, "");
      let target = resolve(root, localPath);
      if (target !== root && !target.startsWith(root + sep)) { errors.push(`${route}: invalid path ${value}`); continue; }
      if (existsSync(target) && statSync(target).isDirectory()) target = join(target, "index.html");
      if (!existsSync(target)) { errors.push(`${route}: missing ${value}`); continue; }
      references++;
      if (tag === "a" && url.hash && documents.has(target) && !documents.get(target).ids.has(decodeURIComponent(url.hash.slice(1)))) {
        errors.push(`${route}: missing anchor ${value}`);
      }
    }
  }
}

// Acceptance criteria transcribed from the owner's handwritten product hierarchy.
const requiredSlugs = [
  "azagro-300-ppm", "azagro-1500-ppm", "azagro-3000-ppm", "azagro-30000-ppm", "azagro-50000-ppm",
  "cold-pressed-neem-oil", "karanja-oil", "neem-activa", "karanja-activa", "azavigr", "nitro-rich",
  "neem-grow-granules", "seaweed-gold-max-granules", "neem-karanja-oil-ec", "neem-cake", "azadirachtin-technical-powder",
  "azagro-10000-ppm", // Existing product documentation is preserved.
];
const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
const catalog = readFileSync(join(root, "products/index.html"), "utf8");
const canonicalUrls = new Set();
for (const slug of requiredSlugs) {
  const path = join(root, "products", slug, "index.html");
  assert(existsSync(path), `Missing product route: ${slug}`);
  const html = readFileSync(path, "utf8");
  assert(catalog.includes(`/products/${slug}/`), `Product is not reachable from catalogue: ${slug}`);
  const expectedCanonical = new URL(`products/${slug}/`, site).href;
  assert(html.includes(`rel="canonical" href="${expectedCanonical}"`), `Wrong canonical: ${slug}`);
  assert(sitemap.includes(`<loc>${expectedCanonical}</loc>`), `Missing sitemap entry: ${slug}`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `Product requires one main heading: ${slug}`);
  canonicalUrls.add(expectedCanonical);
}
assert.equal(canonicalUrls.size, 17);
const nitro = readFileSync(join(root, "products/nitro-rich/index.html"), "utf8");
assert(nitro.includes("Biostimulant") && nitro.includes("NitroRich"), "Biostimulant → NitroRich hierarchy missing");
const certifications = readFileSync(join(root, "certifications/index.html"), "utf8");
for (const period of ["2007–08", "2008–09"]) assert(certifications.includes(period), `Missing award period: ${period}`);
assert(certifications.includes("District Award"), "Award must be identified as a district award");
const home = readFileSync(join(root, "index.html"), "utf8");
assert(!home.includes("Six precise strengths"), "Homepage concentration count is stale");
const about = readFileSync(join(root, "about/index.html"), "utf8");
const industries = readFileSync(join(root, "industries/index.html"), "utf8");
assert(!/See the portfolio from every angle|id="field-stories"|<video\b/.test(home), "Portfolio and four videos must be removed");
assert(!about.includes("Integrated manufacturing campus") && !about.includes("factory-aerial-campus.webp"), "Removed About campus image remains");
assert(about.includes("Connected production areas") && about.includes("factory-aerial-yard.webp"), "Keep the connected production areas on About");
const industryHero = industries.match(/<main><section[\s\S]*?<\/section>/)?.[0];
assert(industryHero?.includes("factory-aerial-yard.webp") && !/background-image/.test(industryHero), "Industries introduction requires an original factory photo beside its content");
const exportCard = [...industries.matchAll(/<article\b[\s\S]*?<\/article>/g)].map(([card]) => card).find((card) => card.includes("Export &amp; Global Trade"));
assert(exportCard?.includes("factory-aerial-yard.webp"), "Export card must use the connected production areas photo");
for (const colour of ["#073b12", "#67a91c", "#00421c", "#f1ca16", "#075e65"]) {
  assert(home.includes(`background-color:${colour}`), `Missing PPM label background ${colour}`);
}
const productShowcase = home.match(/<section id="azagro-range"[\s\S]*?<\/section>/)?.[0];
assert(productShowcase && (productShowcase.match(/<li\b/g) || []).length === 16, "Homepage product strip must contain the current product portfolio");
assert(productShowcase.includes("Next products") && productShowcase.includes("Previous products"), "Product strip requires manual navigation");
for (const [file, { html }] of documents) {
  assert(!/testimonials|complete visual story/i.test(html), `Removed content remains in ${file}`);
}
for (const html of [home, catalog]) {
  assert(html.includes("Browse products &amp; subcategories"), "Missing page product dropdown");
  for (const slug of requiredSlugs) assert(html.includes(`/products/${slug}/`), `Dropdown missing ${slug}`);
  assert(html.includes('<summary') && html.includes('Biostimulant'), "Missing expandable product categories");
}
const aboutPreview = home.match(/<section id="about"[\s\S]*?<\/section>/)?.[0];
assert(aboutPreview && !/<img\b|background-image/.test(aboutPreview), "Home About preview must not have a background image");
assert(home.includes("https://maps.google.com/?q=10.042108,77.492966"), "Wrong factory directions");
assert(home.includes("https://maps.google.com/maps?q=10.042108,77.492966&amp;z=16&amp;output=embed"), "Wrong map embed");
for (const period of ["2007-08", "2008-09"]) assert(about.includes(`/media/awards/best-entrepreneur-${period}.jpeg`), `About missing award ${period}`);
for (const copy of ["KARNA OIL MILL", "25 years", "USD 10 million", "Harnessing the Power of Neem"]) assert(about.includes(copy), `About missing source content: ${copy}`);
for (const copy of ["Our core strengths", "Our people &amp; workforce", "Raw material handling", "From Neem to Innovation"]) assert(industries.includes(copy), `Industries missing source content: ${copy}`);
for (const slug of ["neem-activa", "karanja-activa", "nitro-rich"]) {
  const html = readFileSync(join(root, "products", slug, "index.html"), "utf8");
  assert(html.includes("Factory photograph") && html.includes("pack image coming soon"), `Factory fallback must be labelled: ${slug}`);
}
assert.equal(new Set(errors).size, 0, [...new Set(errors)].join("\n"));
console.log(`Verified ${htmlFiles.length} exported HTML files, ${references} local references, 17 product routes, the product hierarchy, awards, canonical URLs and sitemap.`);
