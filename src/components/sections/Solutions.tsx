import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { mediaUrl } from "@/lib/media";

const solutions = [
  { number: "01", title: "Botanical crop protection", copy: "Azadirachtin-based formulations, with five Azagro EC strengths for your crop-care requirements.", image: "/media/story/indian-farmer.webp", href: "/products/#azagro-ec", category: "Azagro EC" },
  { number: "02", title: "Botanical oils", copy: "Cold-pressed neem, karanja and blended oils. Plant-derived ingredients with a purpose.", image: "/images/photos/neem-leaves.jpg", href: "/products/#cold-pressed-neem-oil", category: "Neem & karanja" },
  { number: "03", title: "Soil inputs", copy: "Neem cake, neem granules and seaweed-based inputs. Explore the possibilities beneath your crops.", image: "/media/story/seedling-growth.webp", href: "/products/#neem-cake", category: "Soil & establishment" },
  { number: "04", title: "Technical ingredients", copy: "Neem-derived Azadirachtin technical powder for professional formulation requirements.", image: "/media/factory/processing-tanks.webp", href: "/products/azadirachtin-technical-powder/", category: "For formulators" },
];

export default function Solutions() {
  return (
    <section id="solutions" aria-labelledby="solutions-heading" className="scroll-mt-24 bg-[#f5f3ea] py-20 sm:py-24 lg:py-28">
      <div className="site-container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><p className="eyebrow text-[#647458]">Our solutions</p><h2 id="solutions-heading" className="section-title mt-4 max-w-2xl">Good for your crops.<br />Rooted in possibility.</h2></div>
          <p className="max-w-sm text-base leading-7 text-[#687267]">From the neem seed to the growing field, discover botanical solutions for agriculture and beyond.</p>
        </div>
        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((solution) => <Link key={solution.number} href={solution.href} className="group block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[.25rem] bg-[#dce2d5]">
              <Image src={mediaUrl(solution.image)} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102f24]/75 via-transparent to-[#102f24]/10" />
              <span className="absolute left-5 top-5 text-xs font-medium text-white/85">{solution.number} /</span>
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3"><span className="text-xs font-medium text-white">{solution.category}</span><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/50 text-white transition-colors group-hover:bg-[#d5e6a5] group-hover:text-[#173f35]"><ArrowUpRight aria-hidden="true" className="h-4 w-4" /></span></div>
            </div>
            <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#173f35]">{solution.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[#687267]">{solution.copy}</p>
          </Link>)}
        </div>
      </div>
    </section>
  );
}
