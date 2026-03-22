import Link from "next/link";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CollectionContent from "@/components/sections/CollectionContent";
import { getCollectionByHandle, getAllCollections } from "@/lib/shopify/api";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const data = await getCollectionByHandle(slug);

    if (!data) {
      return {
        title: "Collection Not Found | The Ultra's Co",
      };
    }

    return {
      title: `${data.collection.name} | The Ultra's Co`,
      description:
        data.collection.description ||
        `Shop our ${data.collection.name} collection.`,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Collection | The Ultra's Co",
    };
  }
}

export default async function CollectionPage({ params }) {
  const { slug } = await params;
  let data = null;

  try {
    data = await getCollectionByHandle(slug);
  } catch (error) {
    console.error("Error fetching collection:", error);
  }

  if (!data) {
    return (
      <>
        <AnnouncementBar />
        <Navbar />
        <main className="px-6 md:px-20 py-20 text-center">
          <h1 className="font-display text-4xl mb-4">Collection Not Found</h1>
          <Link href="/shop" className="text-green hover:underline">
            Back to Shop
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <CollectionContent
        collection={data.collection}
        products={data.products}
      />
      <Footer />
    </>
  );
}

// Optional: Generate static paths for all collections
export async function generateStaticParams() {
  try {
    const collections = await getAllCollections();
    return collections.map((collection) => ({
      slug: collection.id,
    }));
  } catch {
    return [];
  }
}

// Revalidate every hour
export const revalidate = 3600;
