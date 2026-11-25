"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Info, Loader2, ShoppingBag } from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";

const SHIPPING_OPTIONS = [
  { id: "standard", label: "Standard", detail: "5–7 business days", price: 5.95 },
  { id: "express", label: "Express", detail: "1–2 business days", price: 14.95 },
];
const FREE_SHIPPING_THRESHOLD = 75;

const inputClass =
  "w-full bg-black border border-border rounded px-4 py-3 text-[14px] placeholder:text-gray focus:border-green outline-none transition-colors";

function Field({ label, className = "", ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-gray mb-2">
        {label}
      </span>
      <input className={inputClass} {...props} />
    </label>
  );
}

function getShippingCost(optionId, subtotal) {
  if (optionId === "standard" && subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return SHIPPING_OPTIONS.find((o) => o.id === optionId).price;
}

export default function CheckoutPage() {
  const { cart, cartSubtotal, checkoutUrl, clearCart, isLoaded } = useCart();
  const [shippingOption, setShippingOption] = useState("standard");
  const [isPlacing, setIsPlacing] = useState(false);
  const [order, setOrder] = useState(null);

  const shippingCost = getShippingCost(shippingOption, cartSubtotal);
  const total = cartSubtotal + shippingCost;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    setIsPlacing(true);
    setTimeout(() => {
      setOrder({
        number: `UC-${Math.floor(10000 + Math.random() * 90000)}`,
        email: form.get("email"),
        name: `${form.get("firstName")} ${form.get("lastName")}`,
        address: [form.get("address"), form.get("apartment"), form.get("city"), form.get("state"), form.get("zip")]
          .filter(Boolean)
          .join(", "),
        items: cart,
        subtotal: cartSubtotal,
        shipping: shippingCost,
        total,
        shippingLabel: SHIPPING_OPTIONS.find((o) => o.id === shippingOption).label,
      });
      clearCart();
      setIsPlacing(false);
      window.scrollTo({ top: 0 });
    }, 1200);
  };

  let content;

  if (!isLoaded) {
    content = (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-green" />
      </div>
    );
  } else if (order) {
    content = (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center"
      >
        <CheckCircle2 size={56} className="text-green mx-auto mb-6" />
        <h1 className="font-display text-[40px] md:text-[56px] leading-none mb-4">
          ORDER CONFIRMED
        </h1>
        <p className="text-gray mb-2">
          Thanks, {order.name.split(" ")[0]}. Your order{" "}
          <span className="text-white font-semibold">#{order.number}</span> is in.
        </p>
        <p className="text-gray text-[14px] mb-10">
          A confirmation would normally be sent to {order.email}.
        </p>

        <div className="bg-mid rounded-xl p-6 text-left mb-8">
          <div className="space-y-4 mb-6">
            {order.items.map((item) => (
              <div key={item.lineId} className="flex items-center gap-4">
                <div className="relative w-16 h-16 bg-black rounded-lg overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1 text-[14px]">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-gray text-[12px]">Qty {item.quantity}</div>
                </div>
                <div className="font-display">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-4 space-y-2 text-[14px]">
            <div className="flex justify-between">
              <span className="text-gray">Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray">Shipping ({order.shippingLabel})</span>
              <span>{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between font-display text-xl pt-2">
              <span>Total</span>
              <span className="text-green">${order.total.toFixed(2)}</span>
            </div>
          </div>
          <div className="border-t border-border mt-4 pt-4 text-[13px] text-gray">
            Shipping to {order.address}
          </div>
        </div>

        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-green font-semibold text-[13px] tracking-[0.08em] uppercase px-8 py-4 rounded hover:opacity-85 transition-opacity"
        >
          <span className="text-black">Continue Shopping</span>
          <ArrowRight size={16} className="text-black" />
        </Link>
      </motion.div>
    );
  } else if (cart.length === 0) {
    content = (
      <div className="text-center py-20">
        <div className="w-20 h-20 bg-mid rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={32} className="text-gray" />
        </div>
        <h1 className="font-display text-2xl mb-3">Your cart is empty</h1>
        <Link href="/shop" className="text-green hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  } else if (checkoutUrl) {
    // Shopify is back online — send the shopper to the real checkout
    content = (
      <div className="text-center py-20">
        <a
          href={checkoutUrl}
          className="inline-flex items-center gap-2 bg-green font-semibold text-[13px] tracking-[0.08em] uppercase px-8 py-4 rounded hover:opacity-85 transition-opacity"
        >
          <span className="text-black">Continue to Secure Checkout</span>
          <ArrowRight size={16} className="text-black" />
        </a>
      </div>
    );
  } else {
    content = (
      <>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-[48px] md:text-[64px] leading-none mb-8"
        >
          CHECKOUT
        </motion.h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-10"
          >
            <section>
              <h2 className="font-display text-xl mb-5">CONTACT</h2>
              <Field label="Email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
            </section>

            <section>
              <h2 className="font-display text-xl mb-5">DELIVERY</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="First name" name="firstName" autoComplete="given-name" required />
                <Field label="Last name" name="lastName" autoComplete="family-name" required />
                <Field label="Address" name="address" autoComplete="address-line1" className="sm:col-span-2" required />
                <Field
                  label="Apartment, suite (optional)"
                  name="apartment"
                  autoComplete="address-line2"
                  className="sm:col-span-2"
                />
                <Field label="City" name="city" autoComplete="address-level2" required />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="State" name="state" autoComplete="address-level1" required />
                  <Field label="ZIP" name="zip" autoComplete="postal-code" required />
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl mb-5">SHIPPING</h2>
              <div className="space-y-3">
                {SHIPPING_OPTIONS.map((option) => {
                  const cost = getShippingCost(option.id, cartSubtotal);
                  return (
                    <label
                      key={option.id}
                      className={`flex items-center gap-4 border rounded-lg px-4 py-4 cursor-pointer transition-colors ${
                        shippingOption === option.id ? "border-green" : "border-border hover:border-gray"
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping"
                        value={option.id}
                        checked={shippingOption === option.id}
                        onChange={() => setShippingOption(option.id)}
                        className="accent-green"
                      />
                      <div className="flex-1">
                        <div className="text-[14px] font-medium">{option.label}</div>
                        <div className="text-[12px] text-gray">{option.detail}</div>
                      </div>
                      <div className="font-display">{cost === 0 ? "FREE" : `$${cost.toFixed(2)}`}</div>
                    </label>
                  );
                })}
              </div>
              {cartSubtotal < FREE_SHIPPING_THRESHOLD && (
                <p className="text-[12px] text-gray mt-3">
                  Free standard shipping on orders over ${FREE_SHIPPING_THRESHOLD}.
                </p>
              )}
            </section>

            <section>
              <h2 className="font-display text-xl mb-5">PAYMENT</h2>
              <div className="flex gap-3 border border-border rounded-lg p-4 text-[13px] text-gray">
                <Info size={18} className="text-green shrink-0 mt-0.5" />
                <p>
                  Demo store: online payment is switched off, so no card details are needed and
                  nothing is charged. Placing an order shows the confirmation step only.
                </p>
              </div>
            </section>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-mid rounded-xl p-6 sticky top-24">
              <h2 className="font-display text-xl mb-6">ORDER SUMMARY</h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.lineId} className="flex items-center gap-3">
                    <div className="relative w-14 h-14 bg-black rounded-lg overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                      <span className="absolute top-0.5 right-0.5 bg-green text-black text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 text-[13px] leading-snug">{item.name}</div>
                    <div className="font-display text-[14px]">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-3 text-[14px] mb-4">
                <div className="flex justify-between">
                  <span className="text-gray">Subtotal</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray">Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between font-display text-xl">
                  <span>Total</span>
                  <span className="text-green">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isPlacing}
                className="w-full bg-green py-4 rounded text-[13px] font-semibold tracking-[0.08em] uppercase hover:opacity-85 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isPlacing && <Loader2 size={16} className="animate-spin text-black" />}
                <span className="text-black">{isPlacing ? "Placing Order..." : "Place Order"}</span>
              </button>

              <Link
                href="/cart"
                className="block text-center text-[12px] text-gray hover:text-white mt-4 transition-colors"
              >
                Back to Cart
              </Link>
            </div>
          </motion.div>
        </form>
      </>
    );
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="px-6 md:px-20 py-16 min-h-[60vh]">{content}</main>
      <Footer />
    </>
  );
}
