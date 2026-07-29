import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProducts";
import BestSellerShowcase from "./components/BestSellerShowcase";
import BrandStory from "./components/BrandStory";
import InstagramGallery from "./components/InstagramGallery";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <BestSellerShowcase />
      <BrandStory />
      <InstagramGallery />
      <Footer />
      <FAQ />
    </>
  );
}