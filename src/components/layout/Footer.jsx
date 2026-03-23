"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-mid border-t border-border">
      <div className="px-6 md:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-display text-2xl tracking-[0.04em] block mb-3"
            >
              THE ULTRA&apos;S <span className="text-green">CO</span>
            </Link>
            <p className="text-[13px] text-gray leading-relaxed">
              Headwear for the terraces.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.12em] uppercase text-white mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <Link href="/shop" className="text-gray hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/collections/snapbacks" className="text-gray hover:text-white transition-colors">
                  Snapbacks
                </Link>
              </li>
              <li>
                <Link href="/collections/beanies" className="text-gray hover:text-white transition-colors">
                  Beanies
                </Link>
              </li>
              <li>
                <Link href="/collections/bucket-hats" className="text-gray hover:text-white transition-colors">
                  Bucket Hats
                </Link>
              </li>
              {/* <li>
                <Link href="/faq" className="text-gray hover:text-white transition-colors">
                  FAQ
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.12em] uppercase text-white mb-4">
              Contact Us
            </h4>
            <div className="space-y-3 text-[13px]">
              <a
                href="mailto:admin@setpiecesclothing.com"
                className="block text-gray hover:text-white transition-colors"
              >
                admin@setpiecesclothing.com
              </a>
              <p className="text-gray">USA</p>
              <p className="text-gray text-[12px] pt-2 border-t border-border mt-4">
                We typically respond within 24 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-[12px] text-gray">
            © {new Date().getFullYear()} The Ultra&apos;s Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
