"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <motion.div
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      className="bg-green text-black text-center font-semibold text-[11px] sm:text-[12px] md:text-[13px] tracking-[0.06em] sm:tracking-[0.08em] uppercase py-2 sm:py-2.5 px-3 sm:px-4"
    >
      {/* Mobile: Short message */}
      <span className="flex sm:hidden items-center justify-center gap-1.5">
        <span>New Drop</span>
        <span>—</span>
        <Link href="/shop" className="underline hover:no-underline">
          Shop Now
        </Link>
        <span className="mx-1">•</span>
        <span>Free Ship $60+</span>
      </span>

      {/* Desktop: Full message */}
      <span className="hidden sm:flex items-center justify-center gap-2">
        <span>New Drop: The Terrace Collection —</span>
        <Link href="/shop" className="underline hover:no-underline">
          Shop Now
        </Link>
        <span className="mx-2">|</span>
        <span>Free shipping on orders over $60</span>
      </span>
    </motion.div>
  );
}
