"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const stats = [
  { number: "10K+", label: "Happy Fans" },
  { number: "25+", label: "Countries" },
  { number: "100%", label: "Premium" },
];

export default function About() {
  return (
    <section className="px-6 md:px-20 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center" id="about">
      {/* Visual */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative aspect-[4/3] bg-mid rounded-xl flex items-center justify-center overflow-hidden"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-green/10 via-transparent to-transparent" />
<img src="/uc.jpg" alt="" className="object-cover" />
        {/* Large UC text */}
        {/* <span className="font-display text-[80px] md:text-[120px] text-border select-none">
          UC
        </span> */}

        {/* Decorative elements */}
        {/* <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10 w-20 h-20 border border-border rounded-full"
        /> */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 left-10 w-16 h-16 border border-green/30 rounded-full"
        />
      </motion.div>

      {/* Content */}
      <div>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-green mb-3"
        >
          Our Story
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-[42px] leading-tight mb-5"
        >
          BORN ON THE
          <br />
          TERRACES
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray text-[15px] leading-relaxed mb-8"
        >
          We started The Ultra&apos;s Co with a simple mission: create premium
          headwear that represents the passion of soccer culture. From the
          terraces to the streets, our hats are designed for those who live and
          breathe the beautiful game. Every stitch, every design, every detail
          is crafted with the faithful in mind.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex gap-10 mb-9"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-4xl text-green leading-none">
                {stat.number}
              </div>
              <div className="text-[12px] text-gray tracking-[0.08em] uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Button href="/about" variant="outline">
            Learn More
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
