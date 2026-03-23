"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  Check,
} from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { useCart } from "@/context/CartContext";

export default function ProductDetail({ product, relatedProducts }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart, isItemLoading } = useCart();
  const sliderRef = useRef(null);

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 300;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const isOutOfStock = product.availableForSale === false;
  const isLoading = isItemLoading(product.variantId);

  // Use images array if available, otherwise fallback to single image
  const images = product.images?.length > 0
    ? product.images
    : [{ url: product.image, alt: product.imageAlt }];

  const handleAddToCart = async () => {
    if (!product.variantId || isLoading || isOutOfStock) return;

    const success = await addToCart(product.variantId, quantity);
    if (success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Breadcrumb */}
      <div className="px-6 md:px-20 py-4">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-[13px] text-gray hover:text-white transition-colors"
        >
          <ChevronLeft size={16} />
          Back to Shop
        </Link>
      </div>

      {/* Product Section */}
      <section className="px-6 md:px-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square bg-mid rounded-2xl overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[selectedImage]?.url || product.image}
                    alt={images[selectedImage]?.alt || product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Badge */}
              {product.badge && (
                <span
                  className={`absolute top-4 left-4 z-10 text-[10px] font-bold tracking-[0.08em] uppercase px-3 py-1.5 rounded-full ${
                    product.badge === "new"
                      ? "bg-green text-black"
                      : "bg-[#ff4d4d] text-white"
                  }`}
                >
                  {product.badge}
                </span>
              )}
            </motion.div>

            {/* Thumbnail Grid */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                      selectedImage === index
                        ? "ring-2 ring-green ring-offset-2 ring-offset-black"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:py-4"
          >
            {/* Category */}
            <p className="text-[12px] text-gray tracking-[0.1em] uppercase mb-3">
              {product.category}
            </p>

            {/* Name */}
            <h1 className="font-display text-[32px] md:text-[40px] leading-[1.1] mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <p className="font-display text-[28px] text-green mb-6">
              ${product.price.toFixed(2)}
            </p>

            {/* Description */}
            {product.description && (
              <p className="text-gray text-[15px] leading-relaxed mb-8">
                {product.description}
              </p>
            )}

            {/* Quantity & Add to Cart */}
            <div className="space-y-4 mb-8">
              {/* Quantity */}
              <div>
                <label className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-gray mb-3">
                  Quantity
                </label>
                <div className="inline-flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-gray hover:text-white transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-display text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-gray hover:text-white transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                whileHover={!isOutOfStock && !isLoading ? { scale: 1.01 } : {}}
                whileTap={!isOutOfStock && !isLoading ? { scale: 0.99 } : {}}
                onClick={handleAddToCart}
                disabled={isLoading || isOutOfStock}
                className={`w-full flex items-center justify-center gap-3 font-semibold text-[13px] tracking-[0.08em] uppercase py-4 rounded-lg transition-all ${
                  isOutOfStock
                    ? "bg-mid border border-border text-gray cursor-not-allowed"
                    : added
                    ? "bg-green"
                    : "bg-green hover:opacity-90"
                }`}
              >
                <AnimatePresence mode="wait">
                  {isOutOfStock ? (
                    <motion.span
                      key="outofstock"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Out of Stock
                    </motion.span>
                  ) : added ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-black"
                    >
                      <Check size={18} />
                      Added to Cart
                    </motion.span>
                  ) : isLoading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-black"
                    >
                      Adding...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-black"
                    >
                      <ShoppingBag size={18} />
                      Add to Cart
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Shipping Info */}
            <div className="flex items-center gap-3 text-[13px] text-gray py-4 border-t border-border">
              <Truck size={18} className="text-green" />
              <span>Free shipping on orders over $60</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="py-16 bg-mid border-t border-border">
          <div className="px-6 md:px-20 flex items-center justify-between mb-8">
            <h2 className="font-display text-[28px]">YOU MAY ALSO LIKE</h2>

            {/* Navigation Arrows - Desktop */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scrollSlider("left")}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-gray hover:text-white hover:border-white transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollSlider("right")}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-gray hover:text-white hover:border-white transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Slider */}
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide px-6 md:px-20 pb-4 snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {relatedProducts.map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-[45%] sm:w-[40%] md:w-[30%] lg:w-[23%] snap-start"
              >
                <ProductCard product={relatedProduct} />
              </motion.div>
            ))}
          </div>

          {/* Swipe hint - Mobile */}
          <p className="md:hidden text-center text-gray text-[12px] mt-4">
            Swipe to see more →
          </p>
        </section>
      )}
    </main>
  );
}
