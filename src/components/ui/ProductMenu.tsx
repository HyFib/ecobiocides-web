"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, ChevronRight, Search, X } from "lucide-react";
import { CATALOG_PRODUCTS, PRODUCT_CATEGORIES, productHref, type CatalogProduct } from "@/lib/products";
import { mediaUrl } from "@/lib/media";

const normalize = (value: string) => value.trim().toLowerCase().replace(/,/g, "");
const matchingGroups = (query: string) => {
  const normalized = normalize(query);
  return PRODUCT_CATEGORIES.map((category) => ({
    ...category,
    products: CATALOG_PRODUCTS.filter((product) => product.categoryId === category.id && `${category.name} ${product.name}`.toLowerCase().replace(/,/g, "").includes(normalized)),
  })).filter((group) => group.products.length > 0);
};

function ProductLink({ product }: { product: CatalogProduct }) {
  return (
    <Link href={productHref(product)} className="group/item flex min-h-16 items-center gap-3 rounded-xl border border-[#e2e7dc] bg-white px-3 py-3 text-[#173f35] transition-colors hover:border-[#a5b89a] hover:bg-[#f5f7ed]">
      {product.image && <Image src={mediaUrl(product.image)} alt="" width={40} height={48} className="h-12 w-10 shrink-0 object-contain" />}
      <span className="min-w-0 flex-1 text-sm font-semibold leading-5">{product.name}</span>
      <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[#6e806b] transition-transform group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5" />
    </Link>
  );
}

export default function ProductMenu({ columns = 1, mobile = false }: { columns?: 1 | 2; mobile?: boolean }) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>(PRODUCT_CATEGORIES[0].id);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const menuId = useId();
  const categoryButtons = useRef(new Map<string, HTMLButtonElement>());
  const accordionButtons = useRef(new Map<string, HTMLButtonElement>());
  const groups = matchingGroups(query);
  const selectedGroup = groups.find((group) => group.id === selectedId) ?? groups[0];
  const count = groups.reduce((total, group) => total + group.products.length, 0);
  const inputId = `${menuId}-search`;

  const updateQuery = (value: string) => {
    setQuery(value);
    const firstMatch = matchingGroups(value)[0];
    setSelectedId(firstMatch?.id ?? PRODUCT_CATEGORIES[0].id);
    setExpandedId(normalize(value) ? firstMatch?.id ?? null : null);
  };

  const moveCategoryFocus = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined;
    if (event.key === "ArrowDown") nextIndex = (index + 1) % groups.length;
    if (event.key === "ArrowUp") nextIndex = (index - 1 + groups.length) % groups.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = groups.length - 1;
    if (nextIndex !== undefined) {
      event.preventDefault();
      categoryButtons.current.get(groups[nextIndex].id)?.focus();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      document.getElementById(`${menuId}-desktop-${groups[index].id}`)?.querySelector<HTMLAnchorElement>("a")?.focus();
    }
  };

  return (
    <div>
      <label htmlFor={inputId} className="sr-only">Search products</label>
      <div className="flex items-center gap-3 rounded-xl border border-[#dce2d5] bg-[#f6f7f0] px-3 focus-within:border-[#647b59] focus-within:ring-2 focus-within:ring-[#d5e6a5]/60">
        <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-[#687c62]" />
        <input id={inputId} type="search" value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Search by product or PPM…" className="min-h-11 min-w-0 flex-1 bg-transparent text-sm text-[#173f35] placeholder:text-[#687267] outline-none!" />
        {query && <button type="button" aria-label="Clear product search" onClick={() => updateQuery("")} className="flex h-10 w-10 items-center justify-center rounded-lg text-[#647458] hover:bg-[#e9eedf]"><X aria-hidden="true" className="h-4 w-4" /></button>}
      </div>
      <p role="status" className="my-3 px-1 text-xs leading-5 text-[#687267]">{count} {count === 1 ? "product" : "products"}{normalize(query) ? " found" : " · Choose a category to explore"}</p>
      {count === 0 ? <p className="rounded-xl bg-[#f5f7ed] px-5 py-8 text-center text-sm leading-6 text-[#687267]">No products found. Try “neem”, “Azagro” or a PPM strength.</p> : <>
        {!mobile && <div className="hidden overflow-hidden rounded-xl border border-[#dce2d5] sm:grid sm:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
          <div className="border-r border-[#dce2d5] bg-[#f5f7ed] p-2">
            <p className="px-3 pb-3 pt-2 text-[10px] font-semibold uppercase tracking-[.14em] text-[#647458]">Product categories</p>
            <p id={`${menuId}-keyboard-hint`} className="sr-only">Use the up and down arrow keys to choose a category. Press Tab or the right arrow key to explore its products.</p>
            <ul aria-label="Product categories" aria-describedby={`${menuId}-keyboard-hint`} className="max-h-[min(48dvh,28rem)] space-y-1 overflow-y-auto overscroll-contain pr-1">
              {groups.map((group, index) => <li key={group.id}>
                <button ref={(element) => { if (element) categoryButtons.current.set(group.id, element); else categoryButtons.current.delete(group.id); }} id={`${menuId}-category-${group.id}`} type="button" tabIndex={selectedGroup.id === group.id ? 0 : -1} aria-expanded={selectedGroup.id === group.id} aria-controls={`${menuId}-desktop-${group.id}`} onClick={() => setSelectedId(group.id)} onFocus={() => setSelectedId(group.id)} onMouseEnter={() => { if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) setSelectedId(group.id); }} onKeyDown={(event) => moveCategoryFocus(event, index)} className={`flex min-h-12 w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-left text-sm font-semibold transition-colors ${selectedGroup.id === group.id ? "bg-[#173f35] text-white" : "text-[#173f35] hover:bg-[#e4ead9]"}`}>
                  <span className="min-w-0 leading-5">{group.name}</span><ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                </button>
              </li>)}
            </ul>
          </div>
          <div className="min-w-0 bg-white p-4 sm:p-5">
            {groups.map((group) => <section key={group.id} id={`${menuId}-desktop-${group.id}`} hidden={selectedGroup.id !== group.id} aria-labelledby={`${menuId}-category-${group.id}`} onKeyDown={(event) => { if (event.key === "ArrowLeft") { event.preventDefault(); categoryButtons.current.get(group.id)?.focus(); } }}>
              <h3 className="text-base font-semibold text-[#173f35]">{group.name}</h3>
              <p className="mb-4 mt-1.5 text-xs leading-5 text-[#687267]">{group.products.length} {group.products.length === 1 ? "product" : "products"} · View details &amp; documentation</p>
              <ul className={`grid max-h-[min(42dvh,24rem)] gap-2 overflow-y-auto overscroll-contain pb-1 pr-1 ${columns === 2 ? "lg:grid-cols-2" : "grid-cols-1"}`}>{group.products.map((product) => <li key={product.slug}><ProductLink product={product} /></li>)}</ul>
            </section>)}
          </div>
        </div>}
        <div className={mobile ? "" : "sm:hidden"} onKeyDown={(event) => {
          if (event.key === "Escape" && expandedId) {
            event.preventDefault();
            event.stopPropagation();
            accordionButtons.current.get(expandedId)?.focus();
            setExpandedId(null);
          }
        }}>
          <ul aria-label="Product categories" className="max-h-[min(52dvh,30rem)] space-y-2 overflow-y-auto overscroll-contain pr-1">
            {groups.map((group) => <li key={group.id} className="overflow-hidden rounded-xl border border-[#dce2d5] bg-[#f5f7ed]">
              <button ref={(element) => { if (element) accordionButtons.current.set(group.id, element); else accordionButtons.current.delete(group.id); }} id={`${menuId}-accordion-category-${group.id}`} type="button" aria-expanded={expandedId === group.id} aria-controls={`${menuId}-accordion-${group.id}`} onClick={() => setExpandedId(expandedId === group.id ? null : group.id)} className="flex min-h-12 w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-[#173f35] hover:bg-[#e7eddd]">
                <span className="flex-1 leading-5">{group.name}</span><span className="text-xs font-normal text-[#647458]">{group.products.length}</span><ChevronDown aria-hidden="true" className={`h-4 w-4 shrink-0 transition-transform ${expandedId === group.id ? "rotate-180" : ""}`} />
              </button>
              <div id={`${menuId}-accordion-${group.id}`} hidden={expandedId !== group.id} aria-labelledby={`${menuId}-accordion-category-${group.id}`} className="px-3 pb-3"><ul className="space-y-2">{group.products.map((product) => <li key={product.slug}><ProductLink product={product} /></li>)}</ul></div>
            </li>)}
          </ul>
        </div>
      </>}
    </div>
  );
}
