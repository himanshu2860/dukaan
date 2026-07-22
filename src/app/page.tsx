import CategoryShowcase from "@/components/landing/CategoryShowcase";
import FashionMarquee from "@/components/landing/FashionMarquee";
import FeaturedDrops from "@/components/landing/FeaturedDrops";
import FeaturedStores from "@/components/landing/FeaturedStores";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import MarketplaceStory from "@/components/landing/MarketPlaceStory";
import Navbar from "@/components/ui/Navbar";
import SellerCTA from "@/components/landing/SellerCTA";
import Statistics from "@/components/landing/Statistics";
import Testimonials from "@/components/landing/Testimonials";
import TrendingProducts from "@/components/landing/TrendingProducts";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FashionMarquee />
      <CategoryShowcase />
      <MarketplaceStory />
      <FeaturedDrops />
      <TrendingProducts />
      <FeaturedStores />
      <SellerCTA />
      <Statistics />
      <Testimonials />
      <Footer />
    </main>
  );
}
