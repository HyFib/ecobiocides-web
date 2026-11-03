import Image from "next/image";
import { PackageOpen } from "lucide-react";
import { mediaUrl } from "@/lib/media";
import type { CatalogProduct } from "@/lib/products";

export default function ProductImage({ product, priority = false, sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" }: { product: Pick<CatalogProduct, "name" | "image" | "imageAlt">; priority?: boolean; sizes?: string }) {
  return (
    <div data-product-image className="relative aspect-[4/5] w-full overflow-hidden bg-white">
      {product.image ? <Image src={mediaUrl(product.image)} alt={product.imageAlt ?? product.name} fill priority={priority} sizes={sizes} className="object-contain p-4 sm:p-6" /> : <div role="img" aria-label={`${product.name}: pack photograph coming soon`} className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center text-[#687267]">
        <PackageOpen aria-hidden="true" strokeWidth={1.25} className="h-12 w-12 text-[#a3b29b]" />
        <p className="text-xs font-medium leading-6">Pack photograph<br />coming soon</p>
      </div>}
    </div>
  );
}
