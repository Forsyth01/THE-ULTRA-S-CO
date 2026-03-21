"use client";

import { motion } from "framer-motion";

const marqueeItems = [
  "Snapbacks",
  "Beanies",
  "Bucket Hats",
  "The Ultra's Co",
  "New Arrivals",
  "Soccer Culture",
  "Wear the Terrace",
];

export default function Marquee() {
  return (
    <div className="border-y border-border overflow-hidden py-3.5 bg-mid">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-12 whitespace-nowrap w-max"
      >
        {/* Duplicate items for seamless loop */}
        {[...marqueeItems, ...marqueeItems].map((item, index) => (
          <span key={index} className="flex items-center gap-12">
            <span className="font-display text-sm tracking-[0.1em] uppercase text-gray">
              {item}
            </span>
            <span className="text-green text-sm">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
