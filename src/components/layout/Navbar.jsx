"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/shop", label: "Shop All" },
  { href: "/collections/snapbacks", label: "Snapbacks" },
  { href: "/collections/beanies", label: "Beanies" },
  { href: "/collections/bucket-hats", label: "Bucket Hats" },
  // { href: "/about", label: "About" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount } = useCart();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`sticky top-0 z-50 bg-black border-b border-border transition-all duration-300 ${
        isScrolled ? "shadow-lg shadow-black/50" : ""
      }`}
    >
      <div className="flex items-center justify-between px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 h-14 sm:h-16">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-[18px] xs:text-[20px] sm:text-[22px] tracking-[0.04em] shrink-0"
        >
          THE ULTRA&apos;S <span className="text-green">CO</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-4 xl:gap-6 2xl:gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[12px] xl:text-[13px] font-medium tracking-[0.06em] uppercase text-gray hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 md:gap-5">
          <Link
            href="/contact"
            className="hidden lg:block text-[12px] xl:text-[13px] font-medium tracking-[0.06em] uppercase text-gray hover:text-white transition-colors duration-200"
          >
            Contact
          </Link>

          <button
            className="p-2 text-gray hover:text-white transition-colors"
            aria-label="Search"
          >
            <Search size={18} className="sm:w-5 sm:h-5" />
          </button>

          <Link
            href="/cart"
            className="relative flex items-center gap-1.5 sm:gap-2 bg-green text-black px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded text-[11px] sm:text-[12px] md:text-[13px] font-semibold tracking-[0.06em] uppercase hover:opacity-85 transition-opacity"
          >
            <ShoppingBag size={14} className="sm:w-4 sm:h-4 text-black" />
            <span className="hidden xs:inline text-black">Cart</span>
            <span className="hidden sm:inline text-black">({cartCount})</span>
            {/* Mobile cart count badge */}
            {cartCount > 0 && (
              <span className="sm:hidden absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-black text-green text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 text-white"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X size={22} className="sm:w-6 sm:h-6" />
            ) : (
              <Menu size={22} className="sm:w-6 sm:h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-60"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-[320px] bg-black border-l border-border z-70 flex flex-col"
            >
              {/* Header with Close Button */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <span className="font-display text-lg tracking-wide">MENU</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-gray hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-4">
                <ul className="flex flex-col">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-5 py-4 text-[15px] font-medium tracking-[0.04em] uppercase text-white hover:text-green hover:bg-mid/50 transition-all border-b border-border/50"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + navLinks.length * 0.05 }}
                  >
                    <Link
                      href="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-5 py-4 text-[15px] font-medium tracking-[0.04em] uppercase text-white hover:text-green hover:bg-mid/50 transition-all border-b border-border/50"
                    >
                      Contact
                    </Link>
                  </motion.li>
                </ul>
              </nav>

              {/* Footer */}
              <div className="px-5 py-6 border-t border-border">
                <Link
                  href="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-green py-3.5 rounded text-[13px] font-semibold tracking-[0.06em] uppercase hover:opacity-90 transition-opacity"
                >
                  <ShoppingBag size={18} className="text-black" />
                  <span className="text-black">View Cart ({cartCount})</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
