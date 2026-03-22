"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  RotateCcw,
  Shield,
  Check,
} from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { useCart } from "@/context/CartContext";

export default function ProductDetail({ product, relatedProducts }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart, isItemLoading } = useCart();

  const isOutOfStock = product.availableForSale === false;
  const isLoading = isItemLoading(product.variantId);

  const handleAddToCart = async () => {
    if (!product.variantId || isLoading || isOutOfStock) return;

    const success = await addToCart(product.variantId, quantity);
    if (success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <main>
      {/* Breadcrumb */}
      <div className="px-6 md:px-20 py-6 border-b border-border">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-[13px] text-gray hover:text-white transition-colors"
        >
          <ChevronLeft size={16} />
          Back to Shop
        </Link>
      </div>

      {/* Product Section */}
      <section className="px-6 md:px-20 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-square bg-mid rounded-xl overflow-hidden"
        >
          <Image
            src={product.image}
            alt={product.imageAlt || product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {product.badge && (
            <span
              className={`inline-block text-[10px] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-4 ${
                product.badge === "new"
                  ? "bg-green text-black"
                  : "bg-[#ff4d4d] text-white"
              }`}
            >
              {product.badge}
            </span>
          )}

          <div className="text-[12px] text-gray tracking-[0.06em] uppercase mb-2">
            {product.category}
          </div>

          <h1 className="font-display text-[36px] md:text-[42px] leading-tight mb-4">
            {product.name}
          </h1>

          <div className="font-display text-[32px] text-green mb-6">
            ${product.price}
          </div>

          <p className="text-gray text-[15px] leading-relaxed mb-8">
            {product.description ||
              `Premium quality ${product.category?.toLowerCase() || "headwear"} crafted for the
              true fans. Features adjustable sizing, breathable materials, and
              our signature UC embroidered logo. Built to last, designed to
              stand out.`}
          </p>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-[11px] font-semibold tracking-[0.12em] uppercase mb-3">
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border border-border rounded flex items-center justify-center hover:border-white transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="font-display text-xl w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border border-border rounded flex items-center justify-center hover:border-white transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="mb-8">
            <motion.button
              whileHover={!isOutOfStock ? { scale: 1.02 } : {}}
              whileTap={!isOutOfStock ? { scale: 0.98 } : {}}
              onClick={handleAddToCart}
              disabled={isLoading || isOutOfStock}
              className={`w-full flex items-center justify-center gap-3 font-semibold text-[13px] tracking-[0.08em] uppercase py-4 rounded transition-opacity ${
                isOutOfStock
                  ? "bg-gray/30 cursor-not-allowed"
                  : "bg-green hover:opacity-85 disabled:opacity-50"
              }`}
            >
              <AnimatePresence mode="wait">
                {isOutOfStock ? (
                  <motion.span
                    key="outofstock"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-gray"
                  >
                    Out of Stock
                  </motion.span>
                ) : added ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-black"
                  >
                    <Check size={18} />
                    Added to Cart!
                  </motion.span>
                ) : isLoading ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-black"
                  >
                    Adding...
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-black"
                  >
                    <ShoppingBag size={18} />
                    Add to Cart
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Features */}
          <div className="space-y-4 pt-8 border-t border-border">
            <div className="flex items-center gap-3 text-[13px] text-gray">
              <Truck size={18} />
              <span>Free shipping on orders over $60</span>
            </div>
            <div className="flex items-center gap-3 text-[13px] text-gray">
              <RotateCcw size={18} />
              <span>30-day hassle-free returns</span>
            </div>
            <div className="flex items-center gap-3 text-[13px] text-gray">
              <Shield size={18} />
              <span>1-year quality guarantee</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="px-6 md:px-20 py-16 border-t border-border">
          <h2 className="font-display text-[32px] mb-8">YOU MAY ALSO LIKE</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {relatedProducts.map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={relatedProduct} />
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
