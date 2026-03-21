"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Twitter, Youtube, Facebook } from "lucide-react";

const footerLinks = {
  shop: [
    { href: "/shop", label: "All Products" },
    { href: "/collections/snapbacks", label: "Snapbacks" },
    { href: "/collections/beanies", label: "Beanies" },
    { href: "/collections/bucket-hats", label: "Bucket Hats" },
    { href: "/collections/new-arrivals", label: "New Arrivals" },
  ],
  support: [
    { href: "/shipping", label: "Shipping Info" },
    { href: "/returns", label: "Returns" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/sustainability", label: "Sustainability" },
    { href: "/press", label: "Press" },
    { href: "/careers", label: "Careers" },
  ],
};

const socialLinks = [
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
  { href: "https://youtube.com", icon: Youtube, label: "YouTube" },
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="bg-mid border-t border-border">
      <div className="px-6 md:px-20 pt-16 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 pb-12 border-b border-border">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="font-display text-2xl tracking-[0.04em] block mb-4"
            >
              THE ULTRA&apos;S <span className="text-green">CO</span>
            </Link>
            <p className="text-[13px] text-gray leading-relaxed max-w-[260px]">
              Premium headwear built for the ultras, the fans, the faithful.
              Forged in soccer culture.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.12em] uppercase text-white mb-5">
              Shop
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-gray hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.12em] uppercase text-white mb-5">
              Support
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-gray hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.12em] uppercase text-white mb-5">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-gray hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-gray">
            © {new Date().getFullYear()} The Ultra&apos;s Co. All rights
            reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 border border-border rounded-full flex items-center justify-center text-gray hover:border-green hover:text-green transition-colors"
                aria-label={social.label}
              >
                <social.icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
