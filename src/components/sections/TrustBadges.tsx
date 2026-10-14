import { Shield, Award, BadgeCheck, Globe } from "lucide-react";
import { COMPANY } from "@/lib/constants";

const trustIndicators = [
  { icon: Shield, label: "ISO 9001 Certified", value: "Quality-led manufacturing" },
  { icon: BadgeCheck, label: "Ecocert Organic", value: "Botanical input expertise" },
  { icon: Award, label: `${COMPANY.experience}+ Years`, value: "Rooted in neem" },
  { icon: Globe, label: "Global Exports", value: "India & international markets" },
];

export default function TrustBadges() {
  return (
    <section aria-label="Company credentials" className="border-y border-stone-200 bg-white py-6 sm:py-7">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-5 gap-y-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {trustIndicators.map((item) => <div key={item.label} className="flex items-center gap-3"><item.icon aria-hidden="true" className="h-6 w-6 shrink-0 text-[#8b7350]" /><div><p className="text-sm font-bold text-slate-900">{item.label}</p><p className="mt-1 text-[11px] leading-5 text-slate-500">{item.value}</p></div></div>)}
      </div>
    </section>
  );
}
