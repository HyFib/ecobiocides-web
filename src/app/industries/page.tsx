"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Flower2, Globe, Leaf, Pill, TreePine, Wheat } from "lucide-react";
import Manufacturing from "@/components/sections/Manufacturing";
import IndustriesHero from "@/components/sections/IndustriesHero";
import { INDUSTRIES } from "@/lib/constants";
import { mediaUrl } from "@/lib/media";

const industryVisuals = [
  "/media/story/regenerative-farm.webp",
  "/media/story/indian-farmer.webp",
  "/media/story/neem-shield.webp",
  "/media/story/seedling-growth.webp",
  "/media/story/botanical-oils.webp",
  "/media/factory/factory-aerial-yard.webp",
] as const;

const iconMap: Record<string, React.ElementType> = {
  wheat: Wheat,
  leaf: Leaf,
  trees: TreePine,
  flower2: Flower2,
  pill: Pill,
  globe: Globe,
};

export default function IndustriesPage() {
  return (
    <main>
      <IndustriesHero />

      <Manufacturing />

      <section id="sectors" className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow text-slate-600">Sector-specific value</p>
              <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">One botanical platform. Multiple pathways to impact.</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">We connect product strength, application format, pack size and technical guidance to the way each customer grows, formulates, stores or distributes.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {INDUSTRIES.map((industry, index) => {
              const Icon = iconMap[industry.icon] || Leaf;
              return (
                <motion.article key={industry.title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }} className="group overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-stone-200 hover:shadow-xl">
                  <div className="relative aspect-[3/2] overflow-hidden bg-stone-50">
                    <Image src={mediaUrl(industryVisuals[index])} alt={index === 5 ? "Original aerial photograph of Ecobiocides production buildings and material-handling yard" : industry.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" />
                    <div className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-800 shadow-lg"><Icon className="h-5 w-5" /></div>
                  </div>
                  <div className="p-6 sm:p-7">
                    <h3 className="font-display text-2xl font-extrabold text-slate-950">{industry.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{industry.description}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f0e6] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="eyebrow text-slate-600">How we support partners</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">From requirement to repeatable supply.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["01", "Define the application", "Share the crop, pest, geography, formulation or storage requirement."],
              ["02", "Match the solution", "Align concentration, format, pack size and technical documentation."],
              ["03", "Plan dependable supply", "Coordinate samples, commercial packs, bulk volumes and delivery expectations."],
            ].map(([step, title, description]) => (
              <article key={step} className="rounded-[1.7rem] border border-black/5 bg-white p-7 shadow-sm">
                <p className="font-display text-4xl font-extrabold text-amber-700">{step}</p>
                <h3 className="mt-6 text-xl font-extrabold text-slate-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-950 py-20 text-white">
        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center justify-between gap-7 px-4 text-center sm:px-6 lg:flex-row lg:text-left">
          <div><p className="eyebrow text-amber-300">Your industry, our technical team</p><h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">Let’s identify the right botanical pathway.</h2></div>
          <Link href="/#contact" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-amber-300 px-7 py-4 text-sm font-extrabold text-slate-950 transition-colors hover:bg-amber-200">Discuss your requirement <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </main>
  );
}
