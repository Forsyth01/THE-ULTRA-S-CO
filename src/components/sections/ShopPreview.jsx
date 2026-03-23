"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";

export default function ShopPreview({ products = [] }) {
  // Show 6 products for the preview
  const previewProducts = products.slice(0, 6);

  return (
    <section className="px-6 md:px-20 py-16 bg-mid/30">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-green mb-2.5"
        >
          Explore Our Collection
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-[42px] md:text-[52px] leading-none tracking-[0.01em] mb-4"
        >
          SHOP HEADWEAR
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray text-base max-w-2xl mx-auto"
        >
          Premium snapbacks, beanies, and bucket hats designed for the ultras.
          Built to last, designed to stand out.
        </motion.p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5 mb-12">
        {previewProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex justify-center"
      >
        <Link
          href="/shop"
          className="group inline-flex items-center gap-3 bg-green text-black font-semibold text-[13px] tracking-[0.08em] uppercase px-8 py-4 rounded hover:opacity-85 transition-all"
        >
          <span className="text-black">Shop All Products</span>
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          color="black"
          />
        </Link>
      </motion.div>

      {/* Empty State */}
      {previewProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray text-lg">No products available.</p>
        </div>
      )}
    </section>
  );
}
