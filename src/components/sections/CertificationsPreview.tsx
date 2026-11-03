import Link from "next/link";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { CERTIFICATIONS } from "@/lib/constants";

export default function CertificationsPreview() {
  return (
    <section id="certifications" aria-labelledby="certification-preview-heading" className="border-y border-[#dce2d5] bg-[#eaeede] py-16 sm:py-20">
      <div className="site-container">
        <div className="flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow text-[#647458]">Quality & documentation</p><h2 id="certification-preview-heading" className="mt-4 max-w-2xl text-3xl font-medium tracking-[-.04em] text-[#173f35] sm:text-4xl">Care in every process.<br />Confidence in every conversation.</h2></div><Link href="/certifications/" className="inline-flex min-h-12 items-center gap-3 border-b border-[#173f35]/40 text-sm font-semibold text-[#173f35]">View awards & certifications<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link></div>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-[#cdd5c1] pt-9 lg:grid-cols-4">
          {CERTIFICATIONS.map((cert) => <div key={cert.title} className="flex items-start gap-3"><BadgeCheck aria-hidden="true" strokeWidth={1.35} className="h-6 w-6 shrink-0 text-[#5c7350]" /><div><p className="text-sm font-semibold text-[#173f35]">{cert.title}</p><p className="mt-2 text-[10px] font-semibold uppercase tracking-[.12em] text-[#647458]">{cert.category}</p></div></div>)}
        </div>
      </div>
    </section>
  );
}
