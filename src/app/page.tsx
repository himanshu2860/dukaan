import CategoryShowcase from "@/components/landing/CategoryShowcase";
import FashionMarquee from "@/components/landing/FashionMarquee";
import Hero from "@/components/landing/Hero";
import MarketplaceStory from "@/components/landing/MarketPlaceStory";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FashionMarquee />
      <CategoryShowcase />
      <MarketplaceStory />
    </main>
  );
}
