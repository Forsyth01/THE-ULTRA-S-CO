"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Globe, Award, Heart } from "lucide-react";

const values = [
  {
    icon: Users,
    title: "Community First",
    description:
      "We're built by fans, for fans. Every design starts with the community in mind.",
  },
  {
    icon: Globe,
    title: "Global Culture",
    description:
      "Soccer unites the world. Our headwear represents the global nature of the beautiful game.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "We use only the finest materials. Each hat is crafted to last season after season.",
  },
  {
    icon: Heart,
    title: "Passion Driven",
    description:
      "Every stitch represents our love for the terraces, the chants, and the culture.",
  },
];

const timeline = [
  {
    year: "2020",
    title: "The Beginning",
    description:
      "Founded in a small studio with a dream to bring terrace culture to headwear.",
  },
  {
    year: "2021",
    title: "First Collection",
    description:
      "Launched our inaugural snapback collection, sold out in 48 hours.",
  },
  {
    year: "2022",
    title: "Going Global",
    description:
      "Expanded to 25+ countries with beanies and bucket hats joining the lineup.",
  },
  {
    year: "2023",
    title: "The Movement",
    description:
      "Reached 10,000+ members in our community. The terrace movement grows.",
  },
];

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
            <span className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-green mb-4">
              Our Story
            </span>
            <h1 className="font-display text-[48px] md:text-[72px] leading-[0.95] mb-6">
              BORN ON THE
              <br />
              <span className="text-green">TERRACES</span>
            </h1>
            <p className="text-gray text-lg leading-relaxed">
              The Ultra&apos;s Co was born from a simple observation: the passion
              of soccer fans deserves premium expression. We started on the
              terraces, watching the colors, feeling the energy, and dreaming of
              headwear that captures that spirit.
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
                alt={`Product ${num}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="px-6 md:px-20 py-20 bg-mid border-y border-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-green mb-2.5">
            What We Stand For
          </span>
          <h2 className="font-display text-[42px] leading-none">OUR VALUES</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-black rounded-xl border border-border"
            >
              <div className="w-12 h-12 bg-green/10 rounded-lg flex items-center justify-center mb-5">
                <value.icon className="text-green" size={24} />
              </div>
              <h3 className="font-display text-xl mb-2">{value.title}</h3>
              <p className="text-gray text-[14px] leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 md:px-20 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-green mb-2.5">
            Our Journey
          </span>
          <h2 className="font-display text-[42px] leading-none">THE TIMELINE</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="font-display text-[48px] text-green/20 mb-2">
                {item.year}
              </div>
              <h3 className="font-display text-xl mb-2">{item.title}</h3>
              <p className="text-gray text-[14px] leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
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
            alt="Premium headwear collection"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-8 md:p-12">
              <h3 className="font-display text-[32px] md:text-[42px] leading-none mb-3">
                CRAFTED FOR
                <br />
                <span className="text-green">THE CULTURE</span>
              </h3>
              <p className="text-gray text-base max-w-xl">
                Every piece is designed with the terrace in mind. Quality materials,
                bold designs, and a passion for the beautiful game.
              </p>
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
          <h2 className="font-display text-[42px] md:text-[56px] leading-none mb-6">
            JOIN THE <span className="text-green">MOVEMENT</span>
          </h2>
          <p className="text-gray text-lg max-w-xl mx-auto mb-8">
            Be part of a community that lives and breathes soccer culture. Wear
            the terrace.
          </p>
          <a
            href="/shop"
            className="inline-block bg-green text-black font-semibold text-[13px] tracking-[0.08em] uppercase px-8 py-4 rounded hover:opacity-85 transition-opacity"
          >
            <p className="text-black">
            Shop Now
            </p>
          </a>
        </motion.div>
      </section>
    </>
  );
}
