import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Categories from "@/components/sections/Categories";
import Products from "@/components/sections/Products";
import About from "@/components/sections/About";
import SpotifySection from "@/components/sections/SpotifySection";
import { getAllProducts, getAllCollections } from "@/lib/shopify/api";

export default async function Home() {
  // Fetch data from Shopify with error handling
  let products = [];
  let collections = [];

  try {
    [products, collections] = await Promise.all([
      getAllProducts(),
      getAllCollections(),
    ]);
  } catch (error) {
    console.error("Error fetching Shopify data:", error);
    // Continue with empty arrays - page will still render
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Categories categories={collections} />
        <Products products={products} />
        <SpotifySection />
        <About />
      </main>
      <Footer />
    </>
  );
}

// Revalidate every hour
export const revalidate = 3600;
