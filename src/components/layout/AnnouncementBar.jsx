"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const announcements = [
  {
    mobile: (
      <>
        <span>New Drop</span>
        <span>—</span>
        <Link href="/shop" className="underline hover:no-underline">
          Shop Now
        </Link>
      </>
    ),
    desktop: (
      <>
        <span>New Drop: The Terrace Collection —</span>
        <Link href="/shop" className="underline hover:no-underline">
          Shop Now
        </Link>
      </>
    ),
  },
  {
    mobile: (
      <>
        <span>Free Ship</span>
        <span>—</span>
        <span>Orders $50+</span>
      </>
    ),
    desktop: <span>Free shipping on all orders over $60</span>,
  },
  {
    mobile: (
      <>
        <span>Premium</span>
        <span>—</span>
        <span>Quality Gear</span>
      </>
    ),
    desktop: <span>Premium headwear built for the ultras</span>,
  },
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      className="bg-green text-black text-center font-semibold text-[11px] sm:text-[12px] md:text-[13px] tracking-[0.06em] sm:tracking-[0.08em] uppercase py-2 sm:py-2.5 px-3 sm:px-4 overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {/* Mobile */}
        <motion.span
          key={`mobile-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex sm:hidden items-center justify-center gap-1.5"
        >
          {announcements[currentIndex].mobile}
        </motion.span>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {/* Desktop */}
        <motion.span
          key={`desktop-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="hidden sm:flex items-center justify-center gap-2"
        >
          {announcements[currentIndex].desktop}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}
