import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { mediaUrl } from "@/lib/media";

const stages = [
  { number: "01", title: "Thoughtfully sourced", copy: "Selected neem raw materials. A deep understanding of the botanical source." },
  { number: "02", title: "Carefully developed", copy: "Controlled processing, purposeful formulation and quality-focused practices." },
  { number: "03", title: "Ready for your requirements", copy: "Product documentation and technical guidance for growers and formulation partners." },
];

export default function BotanicalApproach() {
  return (
    <section id="our-approach" aria-labelledby="approach-heading" className="scroll-mt-24 overflow-hidden bg-[#173f35] text-white">
      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-2">
        <div className="relative min-h-[390px] sm:min-h-[500px] lg:min-h-full">
          <Image src={mediaUrl("/media/factory/botanical-processing-line.webp")} alt="Botanical processing equipment at the Ecobiocides manufacturing facility" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102f24]/85 via-transparent to-transparent" />
          <p className="absolute bottom-8 left-6 right-6 flex items-center gap-3 text-xs tracking-wide text-white/90 sm:left-10"><span className="h-1.5 w-1.5 rounded-full bg-[#d5e6a5]" />Our manufacturing facility · Theni, Tamil Nadu</p>
        </div>
        <div className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <p className="eyebrow text-[#d5e6a5]">Nature, with know-how</p>
          <h2 id="approach-heading" className="mt-5 text-4xl font-medium leading-[1.1] tracking-[-0.045em] sm:text-5xl">The power of neem.<br /><span className="text-[#d5e6a5]">The precision of science.</span></h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/75">Traditional neem knowledge meets modern manufacturing. We turn a remarkable natural resource into carefully developed botanical products.</p>
          <div className="mt-9 divide-y divide-white/20 border-y border-white/20">
            {stages.map((stage) => <div key={stage.number} className="flex gap-5 py-5"><span className="pt-1 text-xs text-[#d5e6a5]">{stage.number}</span><div><h3 className="text-base font-semibold">{stage.title}</h3><p className="mt-1.5 max-w-md text-sm leading-6 text-white/70">{stage.copy}</p></div></div>)}
          </div>
          <Link href="/industries/" className="mt-8 inline-flex min-h-12 items-center gap-4 border-b border-[#d5e6a5]/60 text-sm font-semibold text-[#d5e6a5] hover:text-white">Explore our manufacturing<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}
