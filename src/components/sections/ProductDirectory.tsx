import { ChevronDown } from "lucide-react";
import ProductMenu from "@/components/ui/ProductMenu";

export default function ProductDirectory() {
  return (
    <section id="product-categories" className="scroll-mt-28 border-y border-[#dce2d5] bg-[#fcfcf8] py-10 sm:py-14">
      <div className="site-container grid gap-8 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-[#687267]">Find your product</p>
          <h2 className="mt-3 text-2xl font-medium tracking-tight text-[#173f35] sm:text-3xl">A closer look at the range.</h2>
          <p className="mt-4 max-w-lg leading-7 text-[#687267]">Explore every product, formulation and concentration in our botanical portfolio.</p>
        </div>
        <details className="group self-start rounded-xl border border-[#dce2d5] bg-[#f5f3ea]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-5 font-semibold text-[#173f35] [&::-webkit-details-marker]:hidden">Browse products &amp; subcategories<ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" /></summary>
          <div className="border-t border-stone-100 p-3 sm:p-4"><ProductMenu /></div>
        </details>
      </div>
    </section>
  );
}
