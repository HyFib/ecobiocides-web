import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { FEATURED_AZAGRO_RANGE } from "@/lib/products";

export default function AboutPreview() {
  return (
    <section id="about" aria-labelledby="about-preview-heading" className="bg-[#f5f3ea] py-20 sm:py-24">
      <div className="site-container grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div><p className="eyebrow text-[#647458]">Our roots run deep</p><h2 id="about-preview-heading" className="section-title mt-4">From a neem seed.<br />To a lasting purpose.</h2><p className="mt-6 max-w-lg text-base leading-7 text-[#687267]">Our story began with Karna Oil Mill in {COMPANY.founded}. Today, that same understanding of neem shapes the botanical products we make for growers and partners in India and across the world.</p><Link href="/about/" className="mt-7 inline-flex min-h-12 items-center gap-4 border-b border-[#173f35]/40 text-sm font-semibold text-[#173f35] hover:border-[#173f35]">Get to know Ecobiocides<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link></div>
        <div className="grid grid-cols-2 self-center gap-x-7 gap-y-10 border-y border-[#d7ddcf] py-10">
          {[{ value: `${COMPANY.experience}+`, label: "Years of neem expertise" }, { value: String(FEATURED_AZAGRO_RANGE.length).padStart(2, "0"), label: "Azagro EC strengths" }, { value: "$10M", label: "Manufacturing investment" }, { value: "Theni", label: "Our home in Tamil Nadu" }].map((stat) => <div key={stat.label}><p className="text-4xl font-medium tracking-[-.05em] text-[#173f35] sm:text-5xl">{stat.value}</p><p className="mt-3 text-xs leading-5 text-[#687267]">{stat.label}</p></div>)}
        </div>
      </div>
    </section>
  );
}
