"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { CURRENT_PRODUCTS, productHref } from "@/lib/products";
import { mediaUrl } from "@/lib/media";

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
    const step = (element.firstElementChild?.getBoundingClientRect().width ?? 220) + 20;
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
      const step = (element.firstElementChild?.getBoundingClientRect().width ?? 220) + 20;
      const end = element.scrollWidth - element.clientWidth;
      const next = element.scrollLeft + step;
      const wraps = element.scrollLeft >= end - 2;
      element.scrollTo({ left: wraps ? 0 : Math.min(end, next), behavior: wraps ? "instant" : "smooth" });
    }, 3600);
    return () => window.clearInterval(timer);
  }, [visible, paused, hovered, focused, reducedMotion]);

  return (
    <section id="azagro-range" aria-labelledby="product-showcase-title" className="scroll-mt-28 bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><p className="eyebrow text-slate-500">Explore our products</p><h2 id="product-showcase-title" className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Small inputs. A world of possibility.</h2><p className="mt-3 max-w-xl text-base leading-7 text-slate-600">Neem formulations, botanical oils and soil inputs. Find your next solution.</p></div>
          <Link href="/products/" className="inline-flex min-h-11 items-center gap-2 border-b border-slate-300 text-sm font-bold text-slate-900 transition-colors hover:border-slate-900">View all products<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
        </div>
        <div className="mt-8" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
          <ul ref={track} id={trackId} aria-label="Product images and names" onPointerDown={() => setPaused(true)} onWheel={() => setPaused(true)} className="hide-scrollbar flex gap-5 overflow-x-auto overscroll-x-contain pb-4 pt-2">
            {CURRENT_PRODUCTS.map((product) => (
              <li key={product.slug} className="w-[200px] shrink-0 sm:w-[230px]">
                <Link href={productHref(product)} className="group block rounded-2xl border border-stone-200 bg-white p-3 transition-colors hover:border-slate-400">
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-[#f6f5f1]">
                    {product.image && <Image src={mediaUrl(product.image)} alt={product.imageAlt ?? product.name} fill className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.035]" sizes="230px" />}
                    {product.imageCaption && <span className="absolute bottom-2 left-2 right-2 rounded-md bg-white/95 px-2 py-1 text-[10px] font-medium text-slate-600">Factory photo · Pack image coming soon</span>}
                  </div>
                  <h3 style={labelColours[product.slug]} className="mt-4 flex min-h-12 items-center justify-between gap-2 rounded-lg px-2 text-sm font-bold leading-5 text-slate-900">{product.name}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 opacity-60" /></h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="text-xs text-slate-500">Swipe or use the arrows to explore.</p>
          <div className="flex gap-2">
            {!reducedMotion && <button type="button" aria-label={paused ? "Resume automatic product scrolling" : "Pause automatic product scrolling"} aria-controls={trackId} onClick={() => setPaused(!paused)} className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 text-slate-700 hover:bg-stone-100">{paused ? <Play aria-hidden="true" className="h-4 w-4" /> : <Pause aria-hidden="true" className="h-4 w-4" />}</button>}
            <button type="button" aria-label="Previous products" aria-controls={trackId} onClick={() => { setPaused(true); advance(-1); }} className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 text-slate-700 hover:bg-stone-100"><ArrowLeft aria-hidden="true" className="h-4 w-4" /></button>
            <button type="button" aria-label="Next products" aria-controls={trackId} onClick={() => { setPaused(true); advance(1); }} className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-700"><ArrowRight aria-hidden="true" className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
