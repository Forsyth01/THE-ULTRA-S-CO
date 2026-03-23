"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 md:px-20 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-[48px] md:text-[72px] leading-[0.95] mb-6">
              WE MAKE
              <br />
              <span className="text-green">HEADWEAR</span>
            </h1>
            <p className="text-gray text-lg leading-relaxed mb-4">
              That&apos;s it. No grand origin story about how we were struck by
              lightning at a match and suddenly knew our purpose. We just love
              soccer and wanted hats that actually looked good.
            </p>
            <p className="text-gray text-lg leading-relaxed">
              The Ultra&apos;s Co started because we couldn&apos;t find headwear
              that matched the energy of terrace culture. So we made our own.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative aspect-square rounded-xl overflow-hidden"
          >
            <Image
              src="/uc.jpg"
              alt="The Ultra's Co"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </section>

      {/* Image Grid */}
      <section className="px-6 md:px-20 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((num, index) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square rounded-lg overflow-hidden bg-mid"
            >
              <Image
                src={`/headwarmer/headwarmer (${num}).jpg`}
                alt={`Headwear ${num}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* What We Do */}
      <section className="px-6 md:px-20 py-20 bg-mid border-y border-border">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-[42px] leading-none mb-8">
              WHAT WE&apos;RE <span className="text-green">ABOUT</span>
            </h2>
            <div className="space-y-6 text-gray text-lg leading-relaxed">
              <p>
                Snapbacks. Beanies. Bucket hats. We keep it simple because we
                think headwear should speak for itself.
              </p>
              <p>
                Every piece is designed with match day in mind. Bold enough to
                stand out in the stands, quality enough to last through every
                season.
              </p>
              <p>
                We&apos;re not trying to be everything to everyone. If you get it,
                you get it.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Image */}
      <section className="px-6 md:px-20 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden"
        >
          <Image
            src="/headwarmer/headwarmer (3).jpg"
            alt="Headwear collection"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-8 md:p-12">
              <h3 className="font-display text-[32px] md:text-[42px] leading-none mb-3">
                FOR THE <span className="text-green">TERRACES</span>
              </h3>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-20 py-20 bg-mid border-y border-border text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-[42px] md:text-[56px] leading-none mb-8">
            SEE THE <span className="text-green">COLLECTION</span>
          </h2>
          <Link
            href="/shop"
            className="inline-block bg-green text-black font-semibold text-[13px] tracking-[0.08em] uppercase px-8 py-4 rounded hover:opacity-85 transition-opacity"
          >
            Shop Now
          </Link>
        </motion.div>
      </section>
    </>
  );
}
