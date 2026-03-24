"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";

const heroImages = [
  "/headwarmer/hero1.jpg",
  "/headwarmer/hero2.jpg",
  "/headwarmer/hero3.jpg",
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-transition images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-[100svh] lg:min-h-[90vh] grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
      {/* Left Content */}
      <div className="flex flex-col justify-center px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-14 sm:py-12 md:py-16 lg:py-20 order-1">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block text-[10px] xs:text-[11px] sm:text-xs font-semibold tracking-[0.12em] sm:tracking-[0.14em] uppercase text-green border border-green px-6 sm:px-4 py-1 sm:py-1.5 rounded-full mb-6 sm:mb-5 md:mb-6 lg:mb-7 w-fit"
        >
          New Season Drop
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-[70px] xs:text-[52px] sm:text-[60px] md:text-[72px] lg:text-[80px] xl:text-[88px] 2xl:text-[96px] leading-[0.9] sm:leading-[0.95] tracking-tight mb-4 sm:mb-5 md:mb-6 lg:mb-7"
        >
          WEAR
          <br />
          THE
          <br />
          <span className="text-green">TERRACE.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className=" sm:text-base text-gray max-w-[360px] sm:max-w-[360px] md:max-w-[400px] mb-6 sm:mb-8 md:mb-10 lg:mb-11 leading-relaxed"
        >
          Premium headwear built for the ultras, the fans, the faithful.
          Snapbacks, beanies & bucket hats — forged in soccer culture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-row flex-wrap gap-3 sm:gap-3.5"
        >
          <Button href="/shop" variant="primary">
            <span className="text-black">Shop the Collection</span>
          </Button>
          <Button href="/shop" variant="outline">
            Explore
          </Button>
        </motion.div>
      </div>

      {/* Right Visual */}
      <div className="relative bg-mid min-h-[280px] xs:min-h-[320px] sm:min-h-[380px] md:min-h-[420px] lg:min-h-0 overflow-hidden order-2">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentImageIndex]}
              alt="Premium headwear"
              fill
              className="object-cover"
              priority={currentImageIndex === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </AnimatePresence>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="absolute bottom-4 right-4 xs:bottom-6 xs:right-6 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10 bg-green font-display text-[11px] xs:text-[12px] sm:text-[13px] tracking-[0.06em] uppercase px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded text-center leading-tight z-10"
        >
          <span className="text-black">Free Shipping</span>
          <br />
          <span className="text-black">Orders $50+</span>
        </motion.div>

        {/* Decorative circles - hidden on very small screens */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="hidden sm:block absolute top-12 sm:top-16 md:top-20 left-8 sm:left-12 md:left-16 w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-green opacity-50 z-10"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="hidden sm:block absolute bottom-24 sm:bottom-32 md:bottom-40 right-16 sm:right-24 md:right-32 w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 rounded-full bg-green opacity-30 z-10"
        />
      </div>
    </section>
  );
}
