"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { mediaUrl } from "@/lib/media";

export default function Hero() {
  return (
    <section id="home" className="overflow-hidden bg-[#faf8f3] pb-12 pt-32 sm:pb-16 sm:pt-36 lg:pt-40">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:px-8">
        <div>
          <p className="eyebrow flex items-center gap-3 text-slate-600"><span className="h-px w-8 bg-[#bfa987]" />Botanical intelligence since {COMPANY.founded}</p>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.04] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-[4.2rem]">Better crops.<br />Healthier soil.<br /><span className="text-[#8b7350]">From nature.</span></h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">Neem-based crop protection, soil enrichment and botanical inputs. Rooted in Theni. Made for modern agriculture.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#azagro-range" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-slate-700">Explore our products<ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
            <Link href="/industries/" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-stone-300 px-6 py-3.5 text-sm font-bold text-slate-800 hover:bg-white">Inside our factory<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
          </div>
          <div className="mt-9 flex items-start gap-8 border-t border-stone-200 pt-6"><div><p className="text-3xl font-bold tracking-tight text-slate-900">{COMPANY.experience}+</p><p className="mt-1 text-xs text-slate-500">Years of neem expertise</p></div><div><p className="text-3xl font-bold tracking-tight text-slate-900">300–50,000</p><p className="mt-1 text-xs text-slate-500">PPM Azagro formulations</p></div></div>
        </div>
        <div className="relative">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-stone-200 sm:aspect-[6/5]">
            <Image src={mediaUrl("/media/story/indian-farmer.webp")} alt="Farmer tending fields at sunrise" fill priority loading="eager" className="object-cover object-[35%_center]" sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/75 to-transparent" />
            <div className="absolute bottom-7 left-7 right-7 text-white"><p className="eyebrow text-white/70">From nature. For your fields.</p><p className="mt-2 max-w-xs text-2xl font-semibold leading-8">Care that begins<br />with the neem tree.</p></div>
          </div>
          <Link href="/products/azagro-3000-ppm/" className="group absolute right-3 top-5 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/95 p-3 shadow-lg sm:-right-3 sm:top-7">
            <Image src={mediaUrl("/media/products/azagro-3000-bottle.webp")} alt="" width={44} height={60} className="h-16 w-12 object-contain" />
            <div><p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Meet Azagro</p><p className="mt-1 text-sm font-bold text-slate-900">Botanical crop protection</p><p className="mt-1 flex items-center gap-2 text-xs text-slate-600">Explore the range<ArrowUpRight aria-hidden="true" className="h-3 w-3" /></p></div>
          </Link>
        </div>
      </div>
    </section>
  );
}
