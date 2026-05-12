import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import CategorySection from "@/components/home/CategorySection";
import { Bestsellers, PromoBanners, ShopByBond, AboutLegacy } from "@/components/home/HomeSections";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <CategorySection />
      <PromoBanners />
      <Bestsellers />
      <ShopByBond />
      <AboutLegacy />
    </main>
  );
}
