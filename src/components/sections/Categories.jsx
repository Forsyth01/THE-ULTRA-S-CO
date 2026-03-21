"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/products";

export default function Categories() {
  return (
    <section
      className="px-4 xs:px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 py-12 sm:py-14 md:py-16 lg:py-20"
      id="shop"
    >
      {/* Header */}
      <div className="flex  sm:flex-row items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10 lg:mb-11">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="block text-[10px] xs:text-[11px] font-semibold tracking-[0.12em] sm:tracking-[0.14em] uppercase text-green mb-1.5 sm:mb-2 md:mb-2.5"
          >
            Shop by Style
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-[28px] xs:text-[32px] sm:text-[36px] md:text-[40px] lg:text-[42px] leading-none tracking-[0.01em]"
          >
            THE COLLECTION
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
            className="text-[11px] sm:text-[12px] font-semibold tracking-[0.1em] uppercase text-gray border-b border-border pb-0.5 hover:text-white hover:border-white transition-colors"
          >
            Shop All →
          </Link>
        </motion.div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 xs:gap-3 sm:gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/collections/${category.id}`}>
              <motion.div
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="relative aspect-[4/5] xs:aspect-[3/4] bg-mid rounded-lg overflow-hidden cursor-pointer group"
              >
                {/* Background Image */}
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 xs:p-5 sm:p-6 pt-12 sm:pt-16 bg-gradient-to-t from-black/85 to-transparent">
                  <h3 className="font-display text-[20px] xs:text-[22px] sm:text-[24px] md:text-[26px] tracking-[0.02em] mb-1 sm:mb-1.5">
                    {category.name.toUpperCase()}
                  </h3>
                  <span className="text-[10px] xs:text-[11px] sm:text-[12px] text-gray tracking-[0.06em] uppercase">
                    {category.count} Styles
                  </span>
                </div>

                {/* Arrow */}
                <div className="absolute top-3 right-3 xs:top-4 xs:right-4 sm:top-5 sm:right-5 w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 bg-green rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-200">
                  <ArrowUpRight
                    size={14}
                    className="text-black sm:w-4 sm:h-4"
                  />
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
