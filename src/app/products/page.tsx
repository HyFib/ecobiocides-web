import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductShowcase from "@/components/sections/ProductShowcase";
import SpecialtyPortfolio from "@/components/sections/SpecialtyPortfolio";
import ProductDirectory from "@/components/sections/ProductDirectory";
import { CURRENT_PRODUCTS, PRODUCT_CATEGORIES, getProduct, productHref } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description: "Explore Azagro EC, botanical oils, Neem Activa, Karanja Activa, Azavigr, NitroRich biostimulant, granules, Neem Cake and Azadirachtin Technical Powder.",
  alternates: { canonical: siteUrl("/products/") },
};

export default function ProductsPage() {
  const azagroProducts = CURRENT_PRODUCTS.filter((product) => product.categoryId === "azagro-ec");
  const additionalProduct = getProduct("azagro-10000-ppm")!;
  return (
    <main>
      <section className="bg-slate-950 pb-14 pt-32 text-white sm:pb-20 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-300">Our products</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-tight sm:text-6xl">Botanical solutions for every stage of agriculture.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">Discover our Azagro EC range, botanical oils, biostimulants and specialist inputs. Explore each product for details and technical enquiries.</p>
          <nav aria-label="Product categories" className="mt-10 border-t border-white/20 pt-7">
            <p className="mb-4 text-sm font-semibold text-amber-200">Browse products</p>
            <ul className="flex flex-wrap gap-2">{PRODUCT_CATEGORIES.map((category) => <li key={category.id}><a href={`#${category.id}`} className="inline-flex min-h-11 items-center rounded-full border border-white/25 px-4 py-2 text-sm font-semibold transition-colors hover:bg-white hover:text-slate-950">{category.name}</a></li>)}</ul>
          </nav>
        </div>
      </section>
      <ProductDirectory />
      <ProductShowcase
        products={azagroProducts}
        id="azagro-ec"
        title="Azagro EC"
        description="Five concentrations: 300, 1,500, 3,000, 30,000 and 50,000 ppm. Each product has its own details and downloadable technical sheet."
        showAllProductsLink={false}
      />
      <div className="bg-[#f5f4f1] pb-10 sm:pb-12">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <p className="rounded-2xl border border-stone-200 bg-white p-5 text-base leading-7 text-slate-950">Looking for Azagro 10,000 ppm? <Link href={productHref(additionalProduct)} className="font-bold underline underline-offset-4">View its product information and technical sheet.</Link></p>
        </div>
      </div>
      <SpecialtyPortfolio showPortfolioLink={false} />
      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold">Discuss your product requirements</h2>
          <p className="mt-4 text-lg leading-8 text-white/80">Our technical team can help with product specifications, documentation and supply enquiries.</p>
          <Link href="/#contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-amber-300 px-7 py-4 font-bold text-slate-950">Contact Ecobiocides <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </main>
  );
}
