import Hero from "@/components/sections/Hero";
import Solutions from "@/components/sections/Solutions";
import BotanicalApproach from "@/components/sections/BotanicalApproach";
import ProductShowcase from "@/components/sections/ProductShowcase";
import AboutPreview from "@/components/sections/AboutPreview";
import CertificationsPreview from "@/components/sections/CertificationsPreview";
import ProductDirectory from "@/components/sections/ProductDirectory";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Solutions />
      <BotanicalApproach />
      <ProductShowcase title="Botanical expertise. In every product." description="Explore our Azagro range and specialist botanical inputs. Find the right starting point, then talk to our technical team." />
      <ProductDirectory />
      <AboutPreview />
      <CertificationsPreview />
      <Contact />
    </main>
  );
}
