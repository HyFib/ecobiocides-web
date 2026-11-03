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
assert(!/See the portfolio from every angle|id="field-stories"/.test(home), "Removed portfolio and field-story gallery must stay removed");
const homeHero = home.match(/<section id="home"[\s\S]*?<\/section>/)?.[0];
assert(homeHero?.includes('/media/videos/ecobiocides-botanical-keyframe.png'), "Hero requires the original Ecobiocides botanical visual");
assert(existsSync(join(root, "media/videos/ecobiocides-botanical-keyframe.png")), "Missing original hero visual");
assert.equal((home.match(/<video\b/g) || []).length, 0, "The current original-still hero must not load a video");
assert(!homeHero.includes('aria-controls="hero-background-video"'), "The still hero must not show an inactive video control");
assert(!/hero-crop-fields|ecobiocides-botanical-film\.mp4|kriya\.ltd\/assets\//i.test(home), "Borrowed or rejected hero media must not be referenced by the homepage");
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
  assert(!/kriya\.ltd\/assets\//i.test(html), `Borrowed reference media remains in ${file}`);
}
const productGroups = [
  { id: "azagro-ec", slugs: requiredSlugs.filter((slug) => slug.startsWith("azagro-")) },
  { id: "cold-pressed-neem-oil", slugs: ["cold-pressed-neem-oil"] },
  { id: "karanja-oil", slugs: ["karanja-oil"] },
  { id: "neem-activa", slugs: ["neem-activa"] },
  { id: "karanja-activa", slugs: ["karanja-activa"] },
  { id: "azavigr", slugs: ["azavigr"] },
  { id: "biostimulant", slugs: ["nitro-rich"] },
  { id: "neem-grow-granules", slugs: ["neem-grow-granules"] },
  { id: "seaweed-gold-max-granules", slugs: ["seaweed-gold-max-granules"] },
  { id: "neem-karanja-oil-ec", slugs: ["neem-karanja-oil-ec"] },
  { id: "neem-cake", slugs: ["neem-cake"] },
  { id: "azadirachtin-technical-powder", slugs: ["azadirachtin-technical-powder"] },
];
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
for (const html of [home, catalog]) {
  assert(html.includes("Browse products &amp; subcategories"), "Missing page product dropdown");
  for (const slug of requiredSlugs) assert(html.includes(`/products/${slug}/`), `Dropdown missing ${slug}`);
  assert(html.includes('aria-label="Product categories"'), "Missing product category navigation");
  const buttons = [...html.matchAll(/<button\b[^>]*>/g)].map(([tag]) => tag);
  for (const group of productGroups) {
    const trigger = buttons.find((tag) => attribute(tag, "aria-controls")?.endsWith(`-desktop-${group.id}`));
    assert(trigger && /\baria-expanded="(?:true|false)"/.test(trigger), `Missing expandable category button: ${group.id}`);
    const panelId = attribute(trigger, "aria-controls");
    const panel = html.match(new RegExp(`<section\\b(?=[^>]*\\bid="${escapeRegExp(panelId)}")[^>]*>[\\s\\S]*?<\\/section>`))?.[0];
    assert(panel?.includes(`aria-labelledby="${attribute(trigger, "id")}"`), `Category button must label its child pane: ${group.id}`);
    const children = [...panel.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)]
      .map(([, href]) => href.match(/\/products\/([^/#]+)\//)?.[1]).filter(Boolean);
    assert.deepEqual([...new Set(children)].sort(), [...group.slugs].sort(), `Wrong child products in category: ${group.id}`);
    assert(buttons.some((tag) => attribute(tag, "aria-controls")?.endsWith(`-accordion-${group.id}`)), `Missing mobile category button: ${group.id}`);
  }
}
const aboutPreview = home.match(/<section id="about"[\s\S]*?<\/section>/)?.[0];
assert(aboutPreview && !/<img\b|background-image/.test(aboutPreview), "Home About preview must not have a background image");
assert(home.includes("https://maps.google.com/?q=10.042108,77.492966"), "Wrong factory directions");
assert(home.includes("https://maps.google.com/maps?q=10.042108,77.492966&amp;z=16&amp;output=embed"), "Wrong map embed");
for (const period of ["2007-08", "2008-09"]) assert(about.includes(`/media/awards/best-entrepreneur-${period}.jpeg`), `About missing award ${period}`);
for (const copy of ["KARNA OIL MILL", "25 years", "USD 10 million", "Harnessing the Power of Neem"]) assert(about.includes(copy), `About missing source content: ${copy}`);
for (const copy of ["Our core strengths", "Our people &amp; workforce", "Raw material handling", "From Neem to Innovation"]) assert(industries.includes(copy), `Industries missing source content: ${copy}`);
function productSurfaces(html, label) {
  const surfaces = [...html.matchAll(/<div\b[^>]*\bdata-product-image\b[^>]*>[\s\S]*?<\/div>/g)].map(([surface]) => surface);
  assert(surfaces.length > 0, `Missing uniform product image surface: ${label}`);
  for (const surface of surfaces) {
    const openingTag = surface.slice(0, surface.indexOf(">") + 1);
    assert(/\bbg-white\b/.test(openingTag) && openingTag.includes("aspect-[4/5]"), `Product image surface must be white and 4:5: ${label}`);
    for (const [, src] of surface.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) {
      assert(src.startsWith(`${basePath}/media/cutouts/`), `Product photograph must use a background-free cutout: ${label}: ${src}`);
    }
  }
  return surfaces;
}
productSurfaces(home, "homepage");
productSurfaces(catalog, "catalogue");
const awaitingPhotographs = new Set(["neem-activa", "karanja-activa", "nitro-rich"]);
for (const slug of requiredSlugs) {
  const html = readFileSync(join(root, "products", slug, "index.html"), "utf8");
  const [primarySurface] = productSurfaces(html, slug);
  if (awaitingPhotographs.has(slug)) {
    assert(/pack photograph[\s\S]*?coming soon/i.test(primarySurface), `Missing pack photograph placeholder: ${slug}`);
    assert(!/<img\b/.test(primarySurface), `Unphotographed product must not use a substitute photograph: ${slug}`);
    assert(!/Factory photograph|pack image coming soon/i.test(html), `Stale factory-photo disclosure remains: ${slug}`);
  } else {
    const filename = slug === "azavigr" ? "azavigr-1" : slug;
    assert(primarySurface.includes(`/media/cutouts/${filename}.png`), `Wrong primary product cutout: ${slug}`);
    assert(existsSync(join(root, "media/cutouts", `${filename}.png`)), `Missing product cutout: ${slug}`);
  }
}
const azavigr = readFileSync(join(root, "products/azavigr/index.html"), "utf8");
for (const [variant, filename] of [["Azavigr 0.15%", "azavigr-015.png"], ["Azavigr 1%", "azavigr-1.png"]]) {
  assert(azavigr.includes(variant) && azavigr.includes(`/media/cutouts/${filename}`), `Missing photographed Azavigr variant: ${variant}`);
  assert(existsSync(join(root, "media/cutouts", filename)), `Missing Azavigr cutout: ${filename}`);
}
assert.equal(new Set(errors).size, 0, [...new Set(errors)].join("\n"));
console.log(`Verified ${htmlFiles.length} exported HTML files, ${references} local references, 17 product routes, the product hierarchy, awards, canonical URLs and sitemap.`);
