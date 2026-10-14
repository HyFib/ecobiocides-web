"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COMPANY_STORY, AWARDS } from "@/lib/company-content";
import { FEATURED_AZAGRO_RANGE } from "@/lib/products";
import { COMPANY } from "@/lib/constants";

export default function AboutPreview() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#f4f0e6]">
      <div className="relative">
        <div className="relative flex items-center py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="mb-3 inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600 backdrop-blur-sm">
                  Our Manufacturing Base
                </span>
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                  Built in Theni. Ready for Global Agriculture.
                </h2>
                <p className="mt-3 max-w-lg text-base leading-relaxed text-slate-600">
                  {COMPANY_STORY.expertise}
                </p>
                <Link
                  href="/about/"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition-all hover:bg-stone-50 hover:shadow-lg hover:gap-3"
                >
                  Our story & facility
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-2 gap-3"
              >
                {[
                  { value: `${COMPANY.experience}+`, label: "Years" },
                  { value: "$10M", label: "Investment" },
                  { value: String(FEATURED_AZAGRO_RANGE.length), label: "Azagro EC strengths" },
                  { value: String(AWARDS.length), label: "District awards" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl bg-white p-4 text-center backdrop-blur-sm"
                  >
                    <p className="text-2xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-slate-500">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
