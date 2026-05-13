import Hero from "@/components/home/Hero";
import BannerSection from "@/components/home/BannerSection";
import Marquee from "@/components/home/Marquee";
import CategorySection from "@/components/home/CategorySection";
import { Bestsellers, PromoBanners, AboutLegacy, CustomerFeedback, ReviewsSection } from "@/components/home/HomeSections";
import { getCategories } from "@/lib/actions";

export default async function Home() {
  const categories = await getCategories();

  return (
    <main>
      <Hero />
      <BannerSection />
      <Marquee />
      <CategorySection initialCategories={categories} />
      <PromoBanners />
      <Bestsellers />
      <AboutLegacy />
      <ReviewsSection />
      <CustomerFeedback />
    </main>
  );
}
