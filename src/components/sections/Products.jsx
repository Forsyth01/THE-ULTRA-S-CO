"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";

export default function Products({ products = [] }) {
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="px-6 md:px-20 py-16" id="new-arrivals">
      {/* Header */}
      <div className="flex items-end justify-between mb-11">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-green mb-2.5"
          >
            Most Popular
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-[42px] leading-none tracking-[0.01em]"
          >
            NEW ARRIVALS
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/shop"
            className="text-[12px] font-semibold tracking-[0.1em] uppercase text-gray border-b border-border pb-0.5 hover:text-white hover:border-white transition-colors"
          >
            View All →
          </Link>
        </motion.div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {featuredProducts.map((product, index) => (
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

      {/* Empty State */}
      {featuredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray text-lg">No products available.</p>
        </div>
      )}
    </section>
  );
}
