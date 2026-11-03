"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, X } from "lucide-react";
import ProductMenu from "@/components/ui/ProductMenu";

export default function ProductNavigation({ mobile = false, active = false, inverse = false }: { mobile?: boolean; active?: boolean; inverse?: boolean }) {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const container = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressFocusOpen = useRef(false);
  const pendingNavigation = useRef(false);
  const keyboardInteraction = useRef(false);
  const panelId = useId();

  // Navigation keeps the menu mounted until the new pathname commits.
  if (menuPath !== null && menuPath !== pathname) setMenuPath(null);

  const cancelClose = () => {
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const closeAndRestoreFocus = () => {
    cancelClose();
    pendingNavigation.current = false;
    setMenuPath(null);
    suppressFocusOpen.current = true;
    toggle.current?.focus();
    suppressFocusOpen.current = false;
  };

  useEffect(() => {
    pendingNavigation.current = false;
    return () => { if (closeTimer.current !== null) clearTimeout(closeTimer.current); };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent | FocusEvent) => {
      if (event.target instanceof Node && !container.current?.contains(event.target)) {
        pendingNavigation.current = false;
        setMenuPath(null);
      }
    };
    // Use outside focus, not blur: a null relatedTarget can precede a link click.
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("focusin", closeOutside);
    const breakpoint = window.matchMedia("(min-width: 1024px)");
    const closeAtBreakpoint = () => setMenuPath(null);
    breakpoint.addEventListener("change", closeAtBreakpoint);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("focusin", closeOutside);
      breakpoint.removeEventListener("change", closeAtBreakpoint);
    };
  }, [open]);

  return (
    <div ref={container} className={mobile ? "relative" : "static"} onMouseEnter={() => {
      if (!mobile && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        cancelClose();
        keyboardInteraction.current = false;
        setMenuPath(pathname);
      }
    }} onMouseLeave={() => {
      if (mobile || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      cancelClose();
      closeTimer.current = setTimeout(() => {
        if (pendingNavigation.current || (keyboardInteraction.current && container.current?.contains(document.activeElement))) return;
        setMenuPath(null);
      }, 220);
    }} onPointerDownCapture={() => { keyboardInteraction.current = false; }} onFocusCapture={(event) => {
      cancelClose();
      if (event.target instanceof HTMLElement && event.target.matches(":focus-visible")) keyboardInteraction.current = true;
      if (!mobile && !suppressFocusOpen.current) {
        setMenuPath(pathname);
      }
    }} onClickCapture={(event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      if (destination.pathname.replace(/\/$/, "") !== window.location.pathname.replace(/\/$/, "")) {
        pendingNavigation.current = true;
        cancelClose();
      } else {
        setMenuPath(null);
      }
    }} onKeyDown={(event) => {
      keyboardInteraction.current = true;
      if (event.key === "Escape" && open) {
        event.preventDefault();
        event.stopPropagation();
        closeAndRestoreFocus();
      } else if (event.key === "ArrowDown" && event.target === toggle.current) {
        event.preventDefault();
        setMenuPath(pathname);
        requestAnimationFrame(() => container.current?.querySelector<HTMLInputElement>('input[type="search"]')?.focus());
      }
    }}>
      <div className={`flex items-center rounded-full transition-colors ${open ? "bg-[#f5f3ea] text-[#173f35]" : inverse ? `${active ? "bg-white/10" : ""} text-white/90 hover:bg-white/10 hover:text-white` : `${active ? "bg-[#173f35]/5" : ""} text-[#173f35]/80 hover:bg-[#173f35]/5 hover:text-[#173f35]`}`}>
        <Link href="/products/" aria-current={active ? "page" : undefined} className={`flex min-h-11 items-center font-medium ${mobile ? "flex-1 px-4 py-3 text-base" : "pl-3 pr-1 text-sm"}`}>Products</Link>
        <button ref={toggle} type="button" aria-label={open ? "Close product menu" : "Open product menu"} aria-expanded={open} aria-controls={panelId} onClick={() => { cancelClose(); pendingNavigation.current = false; setMenuPath(open ? null : pathname); }} className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${inverse && !open ? "hover:bg-white/10" : "hover:bg-[#173f35]/10"}`}>
          <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      <div id={panelId} hidden={!open} className={mobile ? "mt-2" : "absolute inset-x-4 top-full z-10 mx-auto max-w-5xl pt-2"}>
        <div className={`overflow-hidden rounded-2xl border border-[#dce2d5] bg-white ${mobile ? "" : "max-h-[calc(100dvh-7rem)] overflow-y-auto shadow-2xl shadow-[#173f35]/15"}`}>
          <div className="flex items-center justify-between gap-3 border-b border-[#dce2d5] bg-[#f5f7ed] px-4 py-4 sm:px-6">
            <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#647458]">Our products</p><p className="mt-1 text-sm text-[#173f35]">Choose a category. Find your botanical solution.</p></div>
            <button type="button" aria-label="Close product dropdown" onClick={closeAndRestoreFocus} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#dce2d5] bg-white text-[#173f35] hover:bg-[#e7eddd]"><X aria-hidden="true" className="h-4 w-4" /></button>
          </div>
          <div className="p-3 sm:p-4"><ProductMenu key={`${pathname}:${open}`} columns={mobile ? 1 : 2} mobile={mobile} /></div>
          <Link href="/products/" className="flex min-h-12 items-center justify-between gap-3 border-t border-[#dce2d5] bg-[#f5f7ed] px-5 py-3 text-sm font-semibold text-[#173f35] hover:bg-[#e7eddd]">View all products<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
        </div>
      </div>
    </div>
  );
}
