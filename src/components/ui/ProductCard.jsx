"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const getBadgeClass = (badge) => {
    if (badge === "new") return "bg-green text-black";
    if (badge === "hot") return "bg-[#ff4d4d] text-white";
    return "";
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/products/${product.slug}`} className="block group cursor-pointer overflow-hidden">
      {/* Image Container */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative aspect-square bg-mid rounded-lg mb-2 sm:mb-3.5 overflow-hidden"
      >
        {product.badge && (
          <span
            className={`absolute top-2 left-2 sm:top-3 sm:left-3 z-10 text-[9px] sm:text-[10px] font-bold tracking-[0.08em] uppercase px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full ${getBadgeClass(
              product.badge
            )}`}
          >
            {product.badge}
          </span>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
        />
      </motion.div>

      {/* Product Info */}
      <div className="text-[10px] sm:text-[12px] text-gray tracking-[0.06em] uppercase mb-0.5 sm:mb-1">
        {product.category}
      </div>
      <h3 className="text-[12px] sm:text-[14px] font-medium mb-0.5 sm:mb-1 line-clamp-2">{product.name}</h3>
      <div className="font-display text-base sm:text-lg">${product.price}</div>

      {/* Add to Cart Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full mt-2 sm:mt-2.5 border text-[10px] sm:text-[11px] font-semibold tracking-[0.08em] sm:tracking-[0.1em] uppercase py-2 sm:py-2.5 rounded transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
          added
            ? "bg-green border-green text-black"
            : "bg-mid border-border text-white hover:bg-green hover:border-green hover:text-black"
        }`}
        onClick={handleAddToCart}
      >
        <AnimatePresence mode="wait">
          {added ? (
            <motion.span
              key="added"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2"
            >
              <Check size={14} />
              Added!
            </motion.span>
          ) : (
            <motion.span
              key="add"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              Add to Cart
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </Link>
  );
}
