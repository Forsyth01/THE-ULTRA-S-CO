"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Minus, Plus, ShoppingBag, Heart, Truck, RotateCcw, Shield, Check } from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductPage() {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const product = products.find((p) => p.slug === params.slug);
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

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

  return (
    <>
      <AnnouncementBar />
      <Navbar />
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
              alt={product.name}
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
              Premium quality {product.category.toLowerCase()} crafted for the
              true fans. Features adjustable sizing, breathable materials, and
              our signature UC embroidered logo. Built to last, designed to
              stand out.
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
            <div className="flex gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-3 bg-green font-semibold text-[13px] tracking-[0.08em] uppercase py-4 rounded hover:opacity-85 transition-opacity"
              >
                <AnimatePresence mode="wait">
                  {added ? (
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
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-14 border border-border rounded flex items-center justify-center hover:border-white transition-colors"
              >
                <Heart size={20} />
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
        {relatedProducts.length > 0 && (
          <section className="px-6 md:px-20 py-16 border-t border-border">
            <h2 className="font-display text-[32px] mb-8">YOU MAY ALSO LIKE</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((product, index) => (
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
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
