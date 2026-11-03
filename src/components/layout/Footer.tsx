"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/products";
import { COMPANY, NAV_LINKS } from "@/lib/constants";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Footer() {
  return (
    <footer className="bg-[#143e32] text-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-7 pt-16 sm:px-8 lg:px-10 lg:pt-20">
        <div className="grid gap-x-10 gap-y-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.3fr_.7fr_1fr_1.1fr]">
          <div>
            <Link href="/" aria-label="Ecobiocides & Botanicals home" className="inline-flex items-center gap-3">
              <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white"><Image src={`${basePath}/ecobiosides-logo.png`} alt="" fill sizes="48px" className="scale-[1.5] object-cover object-center" /></span>
              <span><span className="block text-xl font-semibold tracking-[-0.04em]">Ecobiocides</span><span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.15em] text-white/75">&amp; Botanicals Pvt Ltd</span></span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-7 text-white/70">Neem expertise. Botanical innovation. Thoughtful solutions for the future of agriculture.</p>
            <p className="mt-6 text-xs font-medium text-[#d5e6a5]">Rooted in Theni. Growing since {COMPANY.founded}.</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#d5e6a5]">Explore</h3>
            <ul className="mt-6 space-y-3">{NAV_LINKS.map((link) => <li key={link.href}><Link href={link.href} className="inline-block min-h-6 text-sm text-white/75 transition-colors hover:text-[#d5e6a5]">{link.label}</Link></li>)}</ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#d5e6a5]">Our portfolio</h3>
            <ul className="mt-6 space-y-2.5">{PRODUCT_CATEGORIES.map((category) => <li key={category.id}><Link href={`/products/#${category.id}`} className="inline-block min-h-6 text-sm leading-6 text-white/75 transition-colors hover:text-[#d5e6a5]">{category.name}</Link></li>)}</ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#d5e6a5]">Get in touch</h3>
            <ul className="mt-6 space-y-5 text-sm leading-6 text-white/75">
              <li className="flex gap-3"><Mail aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#d5e6a5]" /><a href={`mailto:${COMPANY.emails[0]}`} className="break-all transition-colors hover:text-[#d5e6a5]">{COMPANY.emails[0]}</a></li>
              <li className="flex gap-3"><Phone aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#d5e6a5]" /><div className="space-y-1">{COMPANY.phones.map((phone) => <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`} className="block transition-colors hover:text-[#d5e6a5]">{phone}</a>)}</div></li>
              <li className="flex gap-3"><MapPin aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#d5e6a5]" /><div><p>{COMPANY.address.street},<br />{COMPANY.address.city} – {COMPANY.address.zip},<br />{COMPANY.address.state}, {COMPANY.address.country}</p><a href={COMPANY.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#d5e6a5] underline underline-offset-4">Factory directions<ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /></a></div></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs leading-6 text-white/65">© {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.</p>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })} className="inline-flex min-h-11 items-center gap-3 text-xs font-medium text-white/75 transition-colors hover:text-[#d5e6a5]">Back to top<ArrowUp aria-hidden="true" className="h-4 w-4" /></button>
        </div>
      </div>
    </footer>
  );
}
