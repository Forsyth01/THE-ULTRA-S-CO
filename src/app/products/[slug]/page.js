import Link from "next/link";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductDetail from "@/components/sections/ProductDetail";
import { getProductByHandle, getAllProducts } from "@/lib/shopify/api";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const product = await getProductByHandle(slug);

    if (!product) {
      return {
        title: "Product Not Found | The Ultra's Co",
      };
    }

    return {
      title: `${product.name} | The Ultra's Co`,
      description:
        product.description ||
        `Premium ${product.category} crafted for the true fans.`,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Product | The Ultra's Co",
    };
  }
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  let product = null;
  let relatedProducts = [];

  try {
    product = await getProductByHandle(slug);
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  if (!product) {
    return (
      <>
        <AnnouncementBar />
        <Navbar />
        <main className="px-6 md:px-20 py-20 text-center">
          <h1 className="font-display text-4xl mb-4">Product Not Found</h1>
          <Link href="/shop" className="text-green hover:underline">
            Back to Shop
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  // Fetch related products
  try {
    const allProducts = await getAllProducts();
    relatedProducts = allProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  } catch (error) {
    console.error("Error fetching related products:", error);
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <ProductDetail product={product} relatedProducts={relatedProducts} />
      <Footer />
    </>
  );
}

// Optional: Generate static paths for all products
export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch {
    return [];
  }
}

// Revalidate every hour
export const revalidate = 3600;
