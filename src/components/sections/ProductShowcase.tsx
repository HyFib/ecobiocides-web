"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { CURRENT_PRODUCTS, productHref, type CatalogProduct } from "@/lib/products";
import { AZAGRO_RANGE } from "@/lib/media";
import ProductImage from "@/components/ui/ProductImage";

const labelColours: Record<string, { backgroundColor: string; color: string }> = {
  "azagro-300-ppm": { backgroundColor: "#073b12", color: "#ffffff" },
  "azagro-1500-ppm": { backgroundColor: "#67a91c", color: "#12200a" },
  "azagro-3000-ppm": { backgroundColor: "#00421c", color: "#ffffff" },
  "azagro-30000-ppm": { backgroundColor: "#f1ca16", color: "#29220a" },
  "azagro-50000-ppm": { backgroundColor: "#075e65", color: "#ffffff" },
};

interface ProductShowcaseProps {
  products?: readonly CatalogProduct[];
  id?: string;
  title?: string;
  description?: string;
  showAllProductsLink?: boolean;
  categoryAnchors?: boolean;
}

export default function ProductShowcase({ products = CURRENT_PRODUCTS, id = "azagro-range", title = "Products", description, showAllProductsLink = true, categoryAnchors = false }: ProductShowcaseProps) {
  const track = useRef<HTMLUListElement>(null);
  const trackId = useId();
  const headingId = `${trackId}-heading`;
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!categoryAnchors) return;
    const alignCategory = () => {
      const element = track.current;
      let category;
      try { category = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      const target = category ? document.getElementById(category) : null;
      if (!element || !target || !element.contains(target)) return;
      setPaused(true);
      element.scrollTo({ left: element.scrollLeft + target.getBoundingClientRect().left - element.getBoundingClientRect().left, behavior: "instant" });
    };
    // Native fragment navigation can land on a card outside the visible row.
    // Align after mount/navigation and keep that selected category in view.
    const frame = window.requestAnimationFrame(alignCategory);
    window.addEventListener("hashchange", alignCategory);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", alignCategory);
    };
  }, [categoryAnchors]);

  const advance = (direction: number) => {
    const element = track.current;
    if (!element) return;
    const step = (element.firstElementChild?.getBoundingClientRect().width ?? 360) + 24;
    const end = element.scrollWidth - element.clientWidth;
    const next = element.scrollLeft + direction * step;
    const wraps = (direction > 0 && element.scrollLeft >= end - 2) || (direction < 0 && element.scrollLeft <= 2);
    const left = wraps ? (direction > 0 ? 0 : end) : Math.min(end, Math.max(0, next));
    element.scrollTo({ left, behavior: reducedMotion || wraps ? "instant" : "smooth" });
  };

  useEffect(() => {
    if (!visible || paused || hovered || focused || reducedMotion) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      const element = track.current;
      if (!element) return;
      const step = (element.firstElementChild?.getBoundingClientRect().width ?? 360) + 24;
      const end = element.scrollWidth - element.clientWidth;
      const next = element.scrollLeft + step;
      const wraps = element.scrollLeft >= end - 2;
      element.scrollTo({ left: wraps ? 0 : Math.min(end, next), behavior: wraps ? "instant" : "smooth" });
    }, 3000);
    return () => window.clearInterval(timer);
  }, [visible, paused, hovered, focused, reducedMotion]);

  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-28 overflow-hidden bg-[#fcfcf8] py-20 sm:py-24">
      <div className="site-container">
        <p className="eyebrow text-[#647458]">The product collection</p>
        <h2 id={headingId} className="section-title mt-4 max-w-3xl">{title}</h2>
        {description && <p className="mt-5 max-w-2xl text-base leading-7 text-[#687267]">{description}</p>}
        <div className="mt-10 sm:mt-12" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
          <ul ref={track} id={trackId} aria-label={title === "Products" ? "Product images and names" : `${title} product images and names`} onPointerDown={() => setPaused(true)} onWheel={() => setPaused(true)} className="hide-scrollbar flex gap-6 overflow-x-auto overscroll-x-contain pb-3 pt-1">
            {products.map((product) => {
              const range = AZAGRO_RANGE.find((item) => `azagro-${item.ppm.split(" ")[0]}-ppm` === product.slug);
              return (
                <li key={product.slug} id={categoryAnchors ? product.categoryId : undefined} className="w-[calc(100%_-_24px)] shrink-0 scroll-mt-28 sm:w-[calc((100%_-_24px)/2)] lg:w-[calc((100%_-_72px)/4)]">
                  <Link href={productHref(product)} aria-label={`View ${product.name} details`} className="group block h-full rounded-sm focus-visible:outline-offset-4">
                    <div className="relative overflow-hidden rounded-sm border border-[#e2e6dc] bg-white">
                      <ProductImage product={product} sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 25vw" />
                      {range && <span style={labelColours[product.slug]} className="absolute left-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-bold">{range.ppm}</span>}
                      <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f3ea] text-[#173f35] transition-colors group-hover:bg-[#d5e6a5]"><ArrowRight aria-hidden="true" className="h-4 w-4" /></span>
                    </div>
                    <div className="pt-5"><p className="text-[10px] font-semibold uppercase tracking-[.12em] text-[#687267]">{range ? "Botanical crop protection" : "Specialist botanical inputs"}</p><h3 className="mt-2 text-lg font-semibold leading-6 tracking-tight text-[#173f35]">{product.name}</h3><p className="mt-3 text-sm leading-6 text-[#687267]">{product.summary}</p></div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#dce2d5] pt-6">
          {showAllProductsLink && <Link href="/products/" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#173f35] hover:text-[#446450]">View all products<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>}
          <div className="ml-auto mr-16 flex gap-2 sm:mr-20">
            {!reducedMotion && <button type="button" aria-label={paused ? "Resume automatic product scrolling" : "Pause automatic product scrolling"} aria-controls={trackId} onClick={() => setPaused(!paused)} className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-white text-slate-700 hover:bg-stone-100">{paused ? <Play aria-hidden="true" className="h-4 w-4" /> : <Pause aria-hidden="true" className="h-4 w-4" />}</button>}
            <button type="button" aria-label="Previous products" aria-controls={trackId} onClick={() => { setPaused(true); advance(-1); }} className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-white text-slate-700 hover:bg-stone-100"><ArrowLeft aria-hidden="true" className="h-4 w-4" /></button>
            <button type="button" aria-label="Next products" aria-controls={trackId} onClick={() => { setPaused(true); advance(1); }} className="flex h-11 w-11 items-center justify-center rounded-full bg-[#173f35] text-white hover:bg-[#2e5847]"><ArrowRight aria-hidden="true" className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
