"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { CURRENT_PRODUCTS, productHref } from "@/lib/products";
import { AZAGRO_RANGE, mediaUrl } from "@/lib/media";

const labelColours: Record<string, { backgroundColor: string; color: string }> = {
  "azagro-300-ppm": { backgroundColor: "#073b12", color: "#ffffff" },
  "azagro-1500-ppm": { backgroundColor: "#67a91c", color: "#12200a" },
  "azagro-3000-ppm": { backgroundColor: "#00421c", color: "#ffffff" },
  "azagro-30000-ppm": { backgroundColor: "#f1ca16", color: "#29220a" },
  "azagro-50000-ppm": { backgroundColor: "#075e65", color: "#ffffff" },
};

export default function ProductShowcase() {
  const track = useRef<HTMLUListElement>(null);
  const trackId = useId();
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
    <section id="azagro-range" aria-labelledby="product-showcase-title" className="scroll-mt-28 overflow-hidden bg-[#f5f4f1] py-14 sm:py-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <h2 id="product-showcase-title" className="text-center font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Products</h2>
        <div className="mt-8 sm:mt-10" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
          <ul ref={track} id={trackId} aria-label="Product images and names" onPointerDown={() => setPaused(true)} onWheel={() => setPaused(true)} className="hide-scrollbar flex gap-6 overflow-x-auto overscroll-x-contain pb-3 pt-1">
            {CURRENT_PRODUCTS.map((product) => {
              const range = AZAGRO_RANGE.find((item) => `azagro-${item.ppm.split(" ")[0]}-ppm` === product.slug);
              const image = range?.family ?? product.image;
              const preservePack = !!range || ["azavigr", "neem-grow-granules", "seaweed-gold-max-granules"].includes(product.categoryId);
              return (
                <li key={product.slug} className="w-[calc(100%_-_24px)] shrink-0 sm:w-[calc((100%_-_24px)/2)] lg:w-[calc((100%_-_48px)/3)]">
                  <Link href={productHref(product)} aria-label={`View ${product.name} details`} className="group relative block aspect-square overflow-hidden rounded-[1.4rem] bg-stone-200 focus-visible:outline-offset-4">
                    {image && <>
                      {preservePack && <Image src={mediaUrl(image)} alt="" aria-hidden="true" fill className="scale-110 object-cover opacity-60 blur-xl" sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw" />}
                      <Image src={mediaUrl(image)} alt={product.imageAlt ?? `${product.name}${range ? " complete pack range" : ""}`} fill className={`transition-transform duration-700 motion-reduce:transition-none ${preservePack ? "object-contain" : "object-cover"} group-hover:scale-[1.025] group-focus-visible:scale-[1.025]`} sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw" />
                    </>}
                    {range && <span style={labelColours[product.slug]} className="absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold shadow-sm">{range.ppm}</span>}
                    {product.imageCaption && <span className="absolute left-4 top-4 max-w-[80%] rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold text-slate-700">Factory photo · Pack image coming soon</span>}
                    <div className="absolute inset-x-0 bottom-0 rounded-t-[1.4rem] bg-gradient-to-t from-[#101811]/95 via-[#101811]/75 to-transparent px-6 pb-6 pt-16 transition-colors duration-300 group-hover:from-[#101811]/95 group-hover:via-[#101811]/85 sm:px-7 sm:pb-7">
                      <h3 className="pr-8 text-xl font-semibold leading-7 text-[#f5d34e] sm:text-2xl sm:leading-8">{product.name}</h3>
                      <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-300 motion-reduce:transition-none group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100 [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100">
                        <div className="min-h-0 overflow-hidden"><div className="flex items-end gap-4 pt-4"><p className="flex-1 text-sm leading-6 text-white/90">{product.summary}</p><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f5d34e] text-slate-950"><ArrowRight aria-hidden="true" className="h-5 w-5" /></span></div></div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <Link href="/products/" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-slate-800 hover:text-slate-950">View all products<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          <div className="flex gap-2">
            {!reducedMotion && <button type="button" aria-label={paused ? "Resume automatic product scrolling" : "Pause automatic product scrolling"} aria-controls={trackId} onClick={() => setPaused(!paused)} className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-white text-slate-700 hover:bg-stone-100">{paused ? <Play aria-hidden="true" className="h-4 w-4" /> : <Pause aria-hidden="true" className="h-4 w-4" />}</button>}
            <button type="button" aria-label="Previous products" aria-controls={trackId} onClick={() => { setPaused(true); advance(-1); }} className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-white text-slate-700 hover:bg-stone-100"><ArrowLeft aria-hidden="true" className="h-4 w-4" /></button>
            <button type="button" aria-label="Next products" aria-controls={trackId} onClick={() => { setPaused(true); advance(1); }} className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-700"><ArrowRight aria-hidden="true" className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
