import { AZAGRO_RANGE } from "./media";

export interface CatalogProduct {
  slug: string;
  name: string;
  categoryId: string;
  summary: string;
  description: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  specifications: readonly { label: string; value: string }[];
  sheet?: string;
  documentationRequired?: boolean;
  legacy?: boolean;
}

export const PRODUCT_CATEGORIES = [
  { id: "azagro-ec", name: "Azagro EC" },
  { id: "cold-pressed-neem-oil", name: "Cold-Pressed Neem Oil" },
  { id: "karanja-oil", name: "Karanja Oil" },
  { id: "neem-activa", name: "Neem Activa" },
  { id: "karanja-activa", name: "Karanja Activa" },
  { id: "azavigr", name: "Azavigr" },
  { id: "biostimulant", name: "Biostimulant" },
  { id: "neem-grow-granules", name: "Neem Grow Granules" },
  { id: "seaweed-gold-max-granules", name: "Seaweed Gold Max Granules" },
  { id: "neem-karanja-oil-ec", name: "Neem Karanja Oil EC" },
  { id: "neem-cake", name: "Neem Cake" },
  { id: "azadirachtin-technical-powder", name: "Azadirachtin Technical Powder" },
] as const;

const azagroProducts: CatalogProduct[] = AZAGRO_RANGE.map((item) => ({
  slug: `azagro-${item.ppm.split(" ")[0]}-ppm`,
  name: `Azagro ${Number(item.ppm.split(" ")[0]).toLocaleString("en-IN")} ppm`,
  categoryId: "azagro-ec",
  summary: item.summary,
  description: `An Azadirachtin-based emulsifiable concentrate in the Azagro EC range. ${item.summary} Product-specific technical documentation is available below; consult the product label and our technical team for application guidance.`,
  image: item.bottle,
  specifications: [
    { label: "Azadirachtin concentration", value: item.ppm },
    { label: "Active content", value: item.active },
    { label: "Formulation", value: "Emulsifiable concentrate (EC)" },
    { label: "Appearance", value: "Brownish liquid with characteristic neem odor" },
    { label: "Water compatibility", value: "Emulsifies in water" },
    { label: "Shelf life", value: "2 years under recommended storage conditions" },
    { label: "Storage", value: "Cool, dry and well-ventilated, away from direct sunlight" },
  ],
  sheet: item.sheet,
  // Preserve the existing product and TDS without adding a sixth item to the owner's new hierarchy.
  legacy: item.ppm === "10000 PPM",
}));

export const CATALOG_PRODUCTS: readonly CatalogProduct[] = [
  ...azagroProducts,
  {
    slug: "cold-pressed-neem-oil", name: "Cold-Pressed Neem Oil", categoryId: "cold-pressed-neem-oil",
    summary: "Neem oil obtained by cold pressing selected neem kernels.",
    description: "Cold-Pressed Neem Oil is part of our neem-processing portfolio, alongside Neem Oil, Neem Cake and Azadirachtin-based formulations. Contact our team to discuss agricultural or formulation requirements and the specification for your intended use.",
    image: "/media/cutouts/cold-pressed-neem-oil.png",
    specifications: [{ label: "Source", value: "Neem kernels" }, { label: "Processing", value: "Cold pressing" }, { label: "Form", value: "Oil" }],
  },
  {
    slug: "karanja-oil", name: "Karanja Oil", categoryId: "karanja-oil",
    summary: "A plant-derived oil for botanical formulation requirements.",
    description: "Karanja Oil is available within our botanical oils portfolio. Speak with our technical team about product specifications, suitability for your formulation and supply requirements.",
    image: "/media/cutouts/karanja-oil.png",
    specifications: [{ label: "Product type", value: "Botanical oil" }],
  },
  {
    slug: "neem-activa", name: "Neem Activa", categoryId: "neem-activa",
    summary: "Explore Neem Activa with guidance from our technical team.",
    description: "Neem Activa is part of the Ecobiocides product portfolio. Request product specifications, pack options and application information from our team.",
    specifications: [], documentationRequired: true,
  },
  {
    slug: "karanja-activa", name: "Karanja Activa", categoryId: "karanja-activa",
    summary: "Explore Karanja Activa with guidance from our technical team.",
    description: "Karanja Activa is part of the Ecobiocides product portfolio. Request product specifications, pack options and application information from our team.",
    specifications: [], documentationRequired: true,
  },
  {
    slug: "azavigr", name: "Azavigr", categoryId: "azavigr",
    summary: "The Azavigr range for rice and grain-storage enquiries.",
    description: "The existing Azavigr portfolio includes 0.15% and 1% Azadirachtin product variants. Contact our technical team for the documentation and approved application instructions for the variant relevant to your storage requirement.",
    image: "/media/cutouts/azavigr-1.png", imageAlt: "Azavigr 1% product packaging",
    specifications: [{ label: "Product range", value: "Azavigr" }, { label: "Variants", value: "0.15% and 1% Azadirachtin" }],
  },
  {
    slug: "nitro-rich", name: "NitroRich", categoryId: "biostimulant",
    summary: "NitroRich, in our biostimulant product category.",
    description: "NitroRich is the product in our Biostimulant category. Contact our team for composition, product specifications, pack options and application guidance.",
    specifications: [{ label: "Category", value: "Biostimulant" }], documentationRequired: true,
  },
  {
    slug: "neem-grow-granules", name: "Neem Grow Granules", categoryId: "neem-grow-granules",
    summary: "Neem-based granules for soil-input requirements.",
    description: "Neem Grow Granules is our granular soil-input product. The existing product packaging carries the NeemGrow 3X name. Discuss product composition, pack sizes and application requirements with our team.",
    image: "/media/cutouts/neem-grow-granules.png", imageAlt: "NeemGrow 3X granules packaging",
    specifications: [{ label: "Form", value: "Granules" }, { label: "Packaging name", value: "NeemGrow 3X" }],
  },
  {
    slug: "seaweed-gold-max-granules", name: "Seaweed Gold Max Granules", categoryId: "seaweed-gold-max-granules",
    summary: "A seaweed-based granular product in our soil-input portfolio.",
    description: "Seaweed Gold Max Granules is available for soil-input enquiries. Contact our technical team for the product specification, pack options and application guidance for your requirements.",
    image: "/media/cutouts/seaweed-gold-max-granules.png",
    specifications: [{ label: "Form", value: "Granules" }, { label: "Product range", value: "Seaweed Gold Max" }],
  },
  {
    slug: "neem-karanja-oil-ec", name: "Neem Karanja Oil EC", categoryId: "neem-karanja-oil-ec",
    summary: "Neem and karanja oils combined in an emulsifiable concentrate.",
    description: "Neem Karanja Oil EC brings neem and karanja botanical oils together in an EC formulation. Request the technical specification and application guidance for your intended use from our team.",
    image: "/media/cutouts/neem-karanja-oil-ec.png",
    specifications: [{ label: "Botanical oils", value: "Neem and karanja" }, { label: "Formulation", value: "Emulsifiable concentrate (EC)" }],
  },
  {
    slug: "neem-cake", name: "Neem Cake", categoryId: "neem-cake",
    summary: "An organic soil input from neem seed oil processing.",
    description: "Neem Cake has been part of our manufacturing expertise since the beginnings of Karna Oil Mill. It is an organic material produced during neem seed oil processing and supplied for soil-conditioning requirements. Contact our team for specifications and available forms.",
    image: "/media/cutouts/neem-cake.png",
    specifications: [{ label: "Source", value: "Neem seed oil processing" }, { label: "Product type", value: "Organic soil input" }],
  },
  {
    slug: "azadirachtin-technical-powder", name: "Azadirachtin Technical Powder", categoryId: "azadirachtin-technical-powder",
    summary: "A neem-derived technical ingredient for professional formulators.",
    description: "Azadirachtin Technical Powder is a botanical ingredient derived from neem kernels for professional formulation requirements. Our manufacturing capabilities support Azadirachtin-based product development and supply. Contact the technical team for grade, assay, handling and documentation requirements.",
    image: "/media/cutouts/azadirachtin-technical-powder.png",
    specifications: [{ label: "Botanical source", value: "Azadirachta indica (Neem)" }, { label: "Form", value: "Technical powder" }, { label: "Intended customer", value: "Professional formulators" }],
  },
];

export const CURRENT_PRODUCTS = CATALOG_PRODUCTS.filter((product) => !product.legacy);
export const FEATURED_AZAGRO_RANGE = AZAGRO_RANGE.filter((product) => product.ppm !== "10000 PPM");
export const getProduct = (slug: string) => CATALOG_PRODUCTS.find((product) => product.slug === slug);
export const getCategory = (id: string) => PRODUCT_CATEGORIES.find((category) => category.id === id);
export const productHref = (product: Pick<CatalogProduct, "slug">) => `/products/${product.slug}/`;
