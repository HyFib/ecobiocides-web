import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategory, productHref, type CatalogProduct } from "@/lib/products";
import ProductImage from "@/components/ui/ProductImage";

export default function CatalogProductCard({ product, id }: { product: CatalogProduct; id?: string }) {
  return (
    <article id={id} className="group flex min-w-0 scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-stone-100 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <ProductImage product={product} />
      <div className="flex flex-1 flex-col p-6">
        {product.imageCaption && <p className="mb-3 text-xs leading-5 text-slate-500">{product.imageCaption}</p>}
        {product.categoryId === "biostimulant" && <p className="mb-2 text-sm font-semibold text-slate-600">{getCategory(product.categoryId)?.name}</p>}
        <h3 className="font-display text-2xl font-bold leading-tight text-slate-950"><Link href={productHref(product)} className="hover:underline">{product.name}</Link></h3>
        <p className="mb-6 mt-3 text-base leading-7 text-slate-600">{product.summary}</p>
        <Link href={productHref(product)} className="mt-auto inline-flex min-h-11 items-center gap-2 self-start text-sm font-bold text-slate-800" aria-label={`About ${product.name}`}>About product <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      </div>
    </article>
  );
}
