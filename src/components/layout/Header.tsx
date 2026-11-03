"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import ProductNavigation from "@/components/layout/ProductNavigation";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuPath, setMobileMenuPath] = useState<string | null>(null);
  const pathname = usePathname();
  const mobileMenuId = useId();
  const mobileToggle = useRef<HTMLButtonElement>(null);
  const isMobileMenuOpen = mobileMenuPath === pathname;
  const inverse = pathname === "/" && !isScrolled && !isMobileMenuOpen;

  // Keep the menu available until navigation commits; Back starts closed.
  if (mobileMenuPath !== null && mobileMenuPath !== pathname) setMobileMenuPath(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuPath(null);
        mobileToggle.current?.focus();
      }
    };
    const breakpoint = window.matchMedia("(min-width: 1024px)");
    const closeAtBreakpoint = () => setMobileMenuPath(null);
    document.addEventListener("keydown", handleEscape);
    breakpoint.addEventListener("change", closeAtBreakpoint);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      breakpoint.removeEventListener("change", closeAtBreakpoint);
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => href === "/" ? pathname === "/" : !href.startsWith("/#") && pathname.startsWith(href);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300 ${inverse ? "bg-transparent text-white" : "bg-[#f9faf6]/95 text-[#173f35] shadow-[0_1px_0_rgba(23,63,53,0.1)] backdrop-blur-xl"}`}>
      <nav aria-label="Main navigation" className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="flex h-20 items-center justify-between gap-4 lg:h-24">
          <Link href="/" aria-label="Ecobiocides & Botanicals home" className="flex shrink-0 items-center gap-2.5 sm:gap-3">
            <span className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-full bg-white sm:h-12 sm:w-12">
              <Image src={`${basePath}/ecobiosides-logo.png`} alt="" fill priority sizes="48px" className="scale-[1.5] object-cover object-center" />
            </span>
            <span className="block">
              <span className="block text-[15px] font-semibold leading-tight tracking-[-0.04em] sm:text-lg">Ecobiocides</span>
              <span className={`mt-0.5 block text-[9px] font-medium uppercase tracking-[0.15em] sm:text-[10px] ${inverse ? "text-white/80" : "text-[#173f35]/75"}`}>&amp; Botanicals Pvt Ltd</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => link.href === "/products" ? (
              <ProductNavigation key={`${link.href}:${pathname}`} active={isActive(link.href)} inverse={inverse} />
            ) : (
              <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? "page" : undefined} className={`rounded-full px-3 py-2.5 text-[13px] font-medium transition-colors ${inverse ? "text-white/90 hover:bg-white/10 hover:text-white" : "text-[#173f35]/80 hover:bg-[#173f35]/5 hover:text-[#173f35]"} ${isActive(link.href) ? inverse ? "bg-white/10 text-white" : "bg-[#173f35]/5 text-[#173f35]" : ""}`}>{link.label}</Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/#contact" className={`hidden min-h-11 items-center justify-center gap-4 rounded-full px-5 text-sm font-semibold transition-colors sm:inline-flex ${inverse ? "bg-[#d5e6a5] text-[#173f35] hover:bg-white" : "bg-[#173f35] text-white hover:bg-[#245b4b]"}`}>Let’s talk<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
            <button ref={mobileToggle} type="button" onClick={() => setMobileMenuPath(isMobileMenuOpen ? null : pathname)} aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"} aria-expanded={isMobileMenuOpen} aria-controls={mobileMenuId} className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden ${inverse ? "border-white/30 text-white hover:bg-white/10" : "border-[#173f35]/20 text-[#173f35] hover:bg-[#173f35]/5"}`}>
              {isMobileMenuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      <div id={mobileMenuId}>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden border-t border-[#173f35]/10 bg-[#f9faf6] lg:hidden">
            <div className="max-h-[calc(100dvh-5rem)] space-y-1 overflow-y-auto px-5 pb-6 pt-4 sm:px-8" onClick={(event) => {
              const link = event.target instanceof Element ? event.target.closest("a") : null;
              if (!link) return;
              const destination = new URL(link.href, window.location.href);
              if (destination.origin === window.location.origin && destination.pathname.replace(/\/$/, "") === window.location.pathname.replace(/\/$/, "")) setMobileMenuPath(null);
            }}>
              {NAV_LINKS.map((link) => link.href === "/products" ? (
                <ProductNavigation key={`${link.href}:${pathname}`} mobile active={isActive(link.href)} />
              ) : (
                <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? "page" : undefined} className={`block min-h-12 rounded-xl px-4 py-3 text-base font-medium ${isActive(link.href) ? "bg-[#173f35]/5 text-[#173f35]" : "text-[#173f35]/80 hover:bg-[#173f35]/5"}`}>{link.label}</Link>
              ))}
              <div className="pt-4"><Link href="/#contact" className="flex min-h-12 w-full items-center justify-between rounded-full bg-[#173f35] px-5 py-3 text-sm font-semibold text-white">Let’s talk<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </header>
  );
}
