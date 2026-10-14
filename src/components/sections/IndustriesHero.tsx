import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, CheckCircle2 } from "lucide-react";
import { mediaUrl } from "@/lib/media";

export default function IndustriesHero() {
  return (
    <section className="overflow-hidden border-b border-stone-200 bg-[#faf8f3] pb-14 pt-32 sm:pb-20 sm:pt-40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-14 lg:px-8">
        <div><p className="eyebrow text-slate-500">Manufacturing & industries</p><h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-[3.65rem]">Neem expertise,<br />from processing<br /><span className="text-[#8b7350]">to people.</span></h1><p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Integrated neem manufacturing, research and a skilled workforce supporting agricultural and horticultural customers in India and international markets.</p><ul className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-slate-700">{["Agriculture", "Botanical formulation", "Bulk and export supply"].map((item) => <li key={item} className="flex items-center gap-2"><CheckCircle2 aria-hidden="true" className="h-4 w-4 text-[#8b7350]" />{item}</li>)}</ul><Link href="#sectors" className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-700">Find your industry<ArrowDownRight aria-hidden="true" className="h-4 w-4" /></Link></div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <figure className="col-span-2 overflow-hidden rounded-2xl border border-stone-200 bg-white"><div className="relative aspect-[16/9]"><Image src={mediaUrl("/media/factory/factory-aerial-yard.webp")} alt="Original aerial photograph of Ecobiocides production buildings and material-handling yard in Theni" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 48vw" /></div><figcaption className="flex justify-between gap-3 px-4 py-3 text-xs font-semibold text-slate-700"><span>Our manufacturing facility</span><span className="text-slate-500">Theni, Tamil Nadu</span></figcaption></figure>
          <figure className="overflow-hidden rounded-2xl border border-stone-200 bg-white"><div className="relative aspect-[4/3]"><Image src={mediaUrl("/media/factory/processing-tanks.webp")} alt="Original photograph of Ecobiocides stainless steel processing tanks" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 24vw" /></div><figcaption className="px-3 py-3 text-xs font-semibold text-slate-700">Controlled botanical processing</figcaption></figure>
          <figure className="overflow-hidden rounded-2xl border border-stone-200 bg-white"><div className="relative aspect-[4/3]"><Image src={mediaUrl("/media/factory/quality-control-lab.webp")} alt="Original photograph of the Ecobiocides quality-control laboratory" fill className="object-contain" sizes="(max-width: 1024px) 50vw, 24vw" /></div><figcaption className="px-3 py-3 text-xs font-semibold text-slate-700">In-house quality control</figcaption></figure>
        </div>
      </div>
    </section>
  );
}
