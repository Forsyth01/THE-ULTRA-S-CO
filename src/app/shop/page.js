import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShopContent from "@/components/sections/ShopContent";
import { getAllProducts } from "@/lib/shopify/api";

export const metadata = {
  title: "Shop All | The Ultra's Co",
  description:
    "Browse our full collection of premium snapbacks, beanies, and bucket hats.",
};

export default async function ShopPage() {
  let products = [];

  try {
    products = await getAllProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
    // Continue with empty array - page will still render
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <ShopContent products={products} />
      </main>
      <Footer />
    </>
  );
}

// Revalidate every hour
export const revalidate = 3600;
