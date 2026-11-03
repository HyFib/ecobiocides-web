import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, FlaskConical, Leaf, Sprout } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import HeroVideo from "@/components/sections/HeroVideo";

const approach = [
  { icon: Leaf, label: "Botanical by nature", detail: "The potential of neem", href: "/about/" },
  { icon: FlaskConical, label: "Refined through science", detail: "Purposeful formulation", href: "/#our-approach" },
  { icon: Sprout, label: "Made for the field", detail: "Explore our solutions", href: "/#solutions" },
];

export default function Hero() {
  return (
    <>
      <section id="home" aria-labelledby="hero-title" className="relative isolate flex min-h-[720px] flex-col justify-center overflow-hidden bg-[#173f35] pt-32 text-white sm:min-h-[790px] lg:min-h-[860px]">
        <HeroVideo />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(12,37,27,.88)_0%,rgba(12,37,27,.66)_45%,rgba(12,37,27,.18)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#102f24]/80 via-transparent to-[#102f24]/25" />
        <div className="site-container w-full pb-32 pt-14 sm:pb-36 sm:pt-20">
          <p className="eyebrow flex items-center gap-3 text-[#e3ebcf]"><span className="h-1.5 w-1.5 rounded-full bg-[#d5e6a5]" />Botanical expertise. Since {COMPANY.founded}.</p>
          <h1 id="hero-title" className="mt-7 max-w-5xl font-display text-[clamp(3.2rem,7.3vw,7rem)] font-medium leading-[1.04] tracking-[-0.06em]">Rooted in nature.<br /><span className="text-[#d5e6a5]">Made for growth.</span></h1>
          <p className="mt-7 max-w-lg text-base leading-7 text-white/85 sm:text-lg sm:leading-8">Neem-based crop protection and botanical inputs.<br className="hidden sm:block" /> Bringing nature’s potential to modern agriculture.</p>
          <div className="mt-10 flex flex-wrap items-center gap-5 sm:gap-8">
            <Link href="/#solutions" className="botanical-button bg-[#d5e6a5] text-[#173f35] hover:bg-white">Explore our solutions<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
            <Link href="/industries/" className="group inline-flex min-h-12 items-center gap-3 border-b border-white/50 py-3 text-sm font-semibold text-white hover:border-white">Inside our manufacturing<ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <div className="site-container flex items-center justify-between gap-5 border-t border-white/25 py-6 text-xs text-white/75">
            <a href="#solutions" className="inline-flex min-h-10 items-center gap-3 font-medium"><ArrowDown aria-hidden="true" className="h-4 w-4" />A better way to grow</a>
            <span className="hidden sm:block">Born in Theni, India. Growing possibilities worldwide.</span>
            <span className="hidden text-[#d5e6a5] sm:inline">Naturally. Precisely.</span>
          </div>
        </div>
      </section>
      <section aria-label="Our botanical approach" className="border-b border-[#dce2d5] bg-[#f5f3ea]">
        <div className="site-container grid divide-y divide-[#dce2d5] md:grid-cols-3 md:divide-x md:divide-y-0">
          {approach.map((item) => <Link key={item.label} href={item.href} className="group flex items-center gap-4 py-6 md:px-7 md:py-8 first:md:pl-0 last:md:pr-0"><item.icon aria-hidden="true" className="h-7 w-7 shrink-0 text-[#446450]" strokeWidth={1.35} /><div className="flex-1"><p className="text-sm font-semibold text-[#173f35] sm:text-base">{item.label}</p><p className="mt-1 text-xs text-[#647267]">{item.detail}</p></div><ArrowUpRight aria-hidden="true" className="h-4 w-4 text-[#446450] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>)}
        </div>
      </section>
    </>
  );
}
