"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  ArrowRight,
  Minus,
  Plus,
  Trash2,
  AlertTriangle,
  X,
  Loader2,
} from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartCount,
    checkoutUrl,
    isLoading,
    isLoaded,
  } = useCart();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  // Show loading state while cart is being fetched
  if (!isLoaded) {
    return (
      <>
        <AnnouncementBar />
        <Navbar />
        <main className="px-6 md:px-20 py-16 min-h-[60vh] flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-green" />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="px-6 md:px-20 py-16 min-h-[60vh]">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-[48px] md:text-[64px] leading-none mb-8"
        >
          YOUR CART
        </motion.h1>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-mid rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={32} className="text-gray" />
            </div>
            <h2 className="font-display text-2xl mb-3">Your cart is empty</h2>
            <p className="text-gray mb-8">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-green font-semibold text-[13px] tracking-[0.08em] uppercase px-8 py-4 rounded hover:opacity-85 transition-opacity"
            >
              <span className="text-black">Continue Shopping</span>
              <ArrowRight size={16} className="text-black" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="border-b border-border pb-4 mb-6 hidden sm:grid grid-cols-12 gap-4 text-[11px] font-semibold tracking-[0.1em] uppercase text-gray">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <div className="space-y-6">
                {cart.map((item, index) => (
                  <motion.div
                    key={item.lineId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-4 items-center py-6 border-b border-border"
                  >
                    {/* Product */}
                    <div className="sm:col-span-6 flex gap-4">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-mid rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <Link
                          href={`/products/${item.slug}`}
                          className="text-[14px] font-medium hover:text-green transition-colors"
                        >
                          {item.name}
                        </Link>
                        {item.variantTitle && (
                          <span className="text-[12px] text-gray">
                            {item.variantTitle}
                          </span>
                        )}
                        <button
                          onClick={() => removeFromCart(item.lineId)}
                          disabled={isLoading}
                          className="flex items-center gap-1 text-[11px] text-gray hover:text-red-500 mt-2 transition-colors sm:hidden disabled:opacity-50"
                        >
                          <Trash2 size={12} />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="sm:col-span-2 flex items-center justify-between sm:justify-center">
                      <span className="text-[11px] text-gray uppercase sm:hidden">
                        Qty:
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            item.quantity > 1
                              ? updateQuantity(item.lineId, item.quantity - 1)
                              : removeFromCart(item.lineId)
                          }
                          disabled={isLoading}
                          className="w-8 h-8 border border-border rounded flex items-center justify-center hover:border-white transition-colors disabled:opacity-50"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-display text-lg w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.lineId, item.quantity + 1)
                          }
                          disabled={isLoading}
                          className="w-8 h-8 border border-border rounded flex items-center justify-center hover:border-white transition-colors disabled:opacity-50"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="sm:col-span-2 flex items-center justify-between sm:justify-end">
                      <span className="text-[11px] text-gray uppercase sm:hidden">
                        Price:
                      </span>
                      <span className="font-display">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Total */}
                    <div className="sm:col-span-2 flex items-center justify-between sm:justify-end gap-4">
                      <span className="text-[11px] text-gray uppercase sm:hidden">
                        Total:
                      </span>
                      <span className="font-display text-green">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.lineId)}
                        disabled={isLoading}
                        className="hidden sm:flex items-center justify-center w-8 h-8 text-gray hover:text-red-500 transition-colors disabled:opacity-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Clear All Button */}
              <div className="mt-8 pt-6 border-t border-border">
                <button
                  onClick={() => setShowClearConfirm(true)}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 font-semibold text-[13px] tracking-[0.06em] uppercase hover:bg-red-500/20 hover:border-red-500/50 transition-all disabled:opacity-50"
                >
                  <Trash2 size={18} />
                  Clear Entire Cart
                </button>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-mid rounded-xl p-6 sticky top-24">
                <h2 className="font-display text-xl mb-6">ORDER SUMMARY</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-[14px]">
                    <span className="text-gray">Items ({cartCount})</span>
                    <span>${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[14px]">
                    <span className="text-gray">Shipping</span>
                    <span className="text-gray text-[13px]">Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between font-display text-xl">
                    <span>Subtotal</span>
                    <span className="text-green">${cartSubtotal.toFixed(2)}</span>
                  </div>
                </div>

                {checkoutUrl ? (
                  <a
                    href={checkoutUrl}
                    className="w-full bg-green py-4 rounded text-[13px] font-semibold tracking-[0.08em] uppercase hover:opacity-85 transition-opacity block text-center"
                  >
                    <span className="text-black">Proceed to Checkout</span>
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full bg-green py-4 rounded text-[13px] font-semibold tracking-[0.08em] uppercase opacity-50 cursor-not-allowed"
                  >
                    <span className="text-black">
                      {isLoading ? "Loading..." : "Checkout Unavailable"}
                    </span>
                  </button>
                )}

                <Link
                  href="/shop"
                  className="block text-center text-[12px] text-gray hover:text-white mt-4 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </main>
      <Footer />

      {/* Clear Cart Confirmation Modal */}
      <AnimatePresence>
        {showClearConfirm && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              onClick={() => setShowClearConfirm(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-mid border border-border rounded-xl p-6 z-50"
            >
              <button
                onClick={() => setShowClearConfirm(false)}
                className="absolute top-4 right-4 text-gray hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <AlertTriangle size={24} className="text-red-500" />
                </div>
                <h3 className="font-display text-xl">CLEAR CART?</h3>
              </div>

              <p className="text-gray text-[14px] mb-6">
                Are you sure you want to remove all {cartCount} item
                {cartCount > 1 ? "s" : ""} from your cart? This action cannot be
                undone.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 py-3 border border-border rounded text-[13px] font-semibold tracking-[0.06em] uppercase hover:border-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearCart}
                  className="flex-1 py-3 bg-red-500 rounded text-[13px] font-semibold tracking-[0.06em] uppercase hover:bg-red-600 transition-colors"
                >
                  Yes, Clear Cart
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
