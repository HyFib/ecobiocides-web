import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { mediaUrl } from "@/lib/media";

const sectors = [
  { title: "Agriculture & horticulture", image: "/media/story/indian-farmer.webp", alt: "Farmer tending cultivated fields", copy: "Botanical crop care, from the first planting to harvest." },
  { title: "Formulation & manufacturing", image: "/media/factory/processing-tanks.webp", alt: "Original Ecobiocides stainless steel processing vessels", copy: "Neem expertise and controlled processing for specialist inputs." },
  { title: "Bulk & export partners", image: "/media/factory/factory-aerial-yard.webp", alt: "Original aerial view of Ecobiocides production and storage areas", copy: "Technical guidance and supply for India and international markets." },
] as const;

export default function IndustriesPreview() {
  return (
    <section id="industries" className="bg-[#f4f0e6] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow text-slate-500">Where nature makes a difference</p><h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Rooted in agriculture.<br />Ready for your industry.</h2></div><Link href="/industries/" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-slate-900">Explore our industries<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></div>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {sectors.map((sector) => <Link key={sector.title} href="/industries/" className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg"><div className="relative aspect-[3/2] overflow-hidden"><Image src={mediaUrl(sector.image)} alt={sector.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" /></div><div className="p-5 sm:p-6"><h3 className="flex items-center justify-between gap-3 text-lg font-bold text-slate-900">{sector.title}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></h3><p className="mt-3 text-sm leading-6 text-slate-600">{sector.copy}</p></div></Link>)}
        </div>
      </div>
    </section>
  );
}
