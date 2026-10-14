import Hero from "@/components/sections/Hero";
import TrustBadges from "@/components/sections/TrustBadges";
import ProductShowcase from "@/components/sections/ProductShowcase";
import IndustriesPreview from "@/components/sections/IndustriesPreview";
import AboutPreview from "@/components/sections/AboutPreview";
import CertificationsPreview from "@/components/sections/CertificationsPreview";
import ProductDirectory from "@/components/sections/ProductDirectory";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBadges />
      <ProductShowcase />
      <ProductDirectory />
      <IndustriesPreview />
      <AboutPreview />
      <CertificationsPreview />
      <Contact />
    </main>
  );
}
