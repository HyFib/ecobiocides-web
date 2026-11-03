const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const mediaUrl = (path: string) => `${basePath}${path}`;

export const COMMON_TARGET_PESTS = [
  "Aphids",
  "Whiteflies",
  "Thrips",
  "Mites",
  "Mealybugs",
  "Caterpillars",
] as const;

export const AZAGRO_RANGE = [
  {
    ppm: "300 PPM",
    active: "0.03% Azadirachtin",
    bottle: "/media/cutouts/azagro-300-ppm.png",
    family: "/media/products/azagro-300-family.webp",
    sheet: "/resources/technical-data-sheets/azagro-300-ppm.docx",
    foliar: "2.5–3 L / acre",
    tone: "from-lime-300 to-emerald-600",
    summary: "A versatile neem-oil EC for routine botanical crop protection programs.",
  },
  {
    ppm: "1500 PPM",
    active: "0.15% Azadirachtin",
    bottle: "/media/cutouts/azagro-1500-ppm.png",
    family: "/media/products/azagro-1500-family.webp",
    sheet: "/resources/technical-data-sheets/azagro-1500-ppm.docx",
    foliar: "0.75–1.5 L / acre",
    tone: "from-emerald-300 to-teal-700",
    summary: "Concentrated anti-feedant, repellent and insect growth regulating action.",
  },
  {
    ppm: "3000 PPM",
    active: "0.30% Azadirachtin",
    bottle: "/media/cutouts/azagro-3000-ppm.png",
    family: "/media/products/azagro-3000-family.webp",
    sheet: "/resources/technical-data-sheets/azagro-3000-ppm.docx",
    foliar: "0.75–1.5 L / acre",
    tone: "from-emerald-400 to-green-800",
    summary: "A premium EC formulation designed for sucking and chewing pest pressure.",
  },
  {
    ppm: "10000 PPM",
    active: "1% Azadirachtin",
    bottle: "/media/cutouts/azagro-10000-ppm.png",
    family: "/media/products/azagro-10000-family-light.webp",
    alternateFamily: "/media/products/azagro-10000-family-storm.webp",
    sheet: "/resources/technical-data-sheets/azagro-10000-ppm.docx",
    foliar: "0.25–0.75 L / acre",
    tone: "from-amber-300 to-emerald-800",
    summary: "High-strength botanical protection for integrated pest management programs.",
  },
  {
    ppm: "30000 PPM",
    active: "3% Azadirachtin",
    bottle: "/media/cutouts/azagro-30000-ppm.png",
    family: "/media/products/azagro-30000-family.webp",
    sheet: "/resources/technical-data-sheets/azagro-30000-ppm.docx",
    foliar: "0.20–0.70 L / acre",
    tone: "from-yellow-300 to-green-950",
    summary: "A powerful concentrated option for demanding crop-protection applications.",
  },
  {
    ppm: "50000 PPM",
    active: "5% Azadirachtin",
    bottle: "/media/cutouts/azagro-50000-ppm.png",
    family: "/media/products/azagro-50000-family.webp",
    sheet: "/resources/technical-data-sheets/azagro-50000-ppm.docx",
    foliar: "0.10–0.15 L / acre",
    tone: "from-cyan-300 to-emerald-950",
    summary: "The most concentrated Azagro formulation in the range for precision use.",
  },
] as const;

export const FIELD_VIDEOS = [
  { src: "/media/videos/field-story-01.mp4", title: "Field story 01", poster: "/media/products/azagro-300-family.webp" },
  { src: "/media/videos/field-story-02.mp4", title: "Field story 02", poster: "/media/products/azagro-1500-family.webp" },
  { src: "/media/videos/field-story-03.mp4", title: "Field story 03", poster: "/media/products/azagro-3000-family.webp" },
  { src: "/media/videos/field-story-04.mp4", title: "Field story 04", poster: "/media/products/azagro-50000-family.webp" },
] as const;
