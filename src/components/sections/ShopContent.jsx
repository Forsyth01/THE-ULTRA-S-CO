"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, Grid, List } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/products";

const filters = ["All", "Snapback", "Beanie", "Bucket Hat"];

export default function ShopContent() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProducts =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <section className="px-6 md:px-20 py-16">
      {/* Header */}
      <div className="mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-[48px] md:text-[64px] leading-none mb-4"
        >
          SHOP ALL
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray text-base max-w-xl"
        >
          Browse our complete collection of premium headwear. From snapbacks to
          beanies to bucket hats — find your perfect match.
        </motion.p>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap items-center gap-4 mb-10"
      >
        <div className="flex items-center gap-2 text-gray mr-4">
          <Filter size={16} />
          <span className="text-[12px] font-semibold tracking-[0.1em] uppercase">
            Filter:
          </span>
        </div>
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`text-[12px] font-semibold tracking-[0.08em] uppercase px-4 py-2 rounded-full transition-all ${
              activeFilter === filter
                ? "bg-green text-black"
                : "bg-mid text-gray hover:text-white border border-border"
            }`}
          >
            {filter}
          </button>
        ))}
        <div className="ml-auto text-[13px] text-gray">
          {filteredProducts.length} Products
        </div>
      </motion.div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray text-lg">No products found.</p>
        </div>
      )}
    </section>
  );
}
