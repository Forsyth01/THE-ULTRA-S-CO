"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { products, categories } from "@/data/products";

const categoryMap = {
  snapbacks: "Snapback",
  beanies: "Beanie",
  "bucket-hats": "Bucket Hat",
};

export default function CollectionPage() {
  const params = useParams();
  const slug = params.slug;

  const categoryName = categoryMap[slug] || slug;
  const category = categories.find((c) => c.id === slug);
  const filteredProducts = products.filter((p) => p.category === categoryName);

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="px-6 md:px-20 py-16">
        {/* Header */}
        <div className="mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-green mb-2.5"
          >
            Collection
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-[48px] md:text-[64px] leading-none mb-4"
          >
            {category?.name?.toUpperCase() || slug.toUpperCase()}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray text-base max-w-xl"
          >
            Explore our collection of premium {categoryName.toLowerCase()}s.
            Each piece is crafted with attention to detail and built for the
            faithful.
          </motion.p>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray text-lg">No products found in this collection.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
