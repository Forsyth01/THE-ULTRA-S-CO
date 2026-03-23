"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="px-6 md:px-20 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mb-16"
        >
          <span className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-green mb-3">
            Get in Touch
          </span>
          <h1 className="font-display text-[48px] md:text-[64px] leading-none mb-4">
            CONTACT US
          </h1>
          <p className="text-gray text-base">
            Have a question, feedback, or just want to say hi? We&apos;d love to
            hear from you. Fill out the form below or reach us through any of
            our channels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-[11px] font-semibold tracking-[0.12em] uppercase mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-mid border border-border rounded px-4 py-3 text-white focus:border-green focus:outline-none transition-colors"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold tracking-[0.12em] uppercase mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-mid border border-border rounded px-4 py-3 text-white focus:border-green focus:outline-none transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold tracking-[0.12em] uppercase mb-2">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full bg-mid border border-border rounded px-4 py-3 text-white focus:border-green focus:outline-none transition-colors"
                placeholder="How can we help?"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold tracking-[0.12em] uppercase mb-2">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={5}
                className="w-full bg-mid border border-border rounded px-4 py-3 text-white focus:border-green focus:outline-none transition-colors resize-none"
                placeholder="Your message..."
                required
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 w-full bg-green text-black font-semibold text-[13px] tracking-[0.08em] uppercase py-4 rounded hover:opacity-85 transition-opacity"
            >
              <Send size={16} />
              Send Message
            </motion.button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="p-8 bg-mid rounded-xl border border-border">
              <h3 className="font-display text-xl mb-6">CONTACT INFO</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-green" size={18} />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-gray mb-1">
                      Email
                    </div>
                    <a
                      href="mailto:admin@setpiecesclothing.com"
                      className="text-white hover:text-green transition-colors"
                    >
                      admin@setpiecesclothing.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-green" size={18} />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-gray mb-1">
                      Location
                    </div>
                    <span className="text-white">USA</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-mid rounded-xl border border-border">
              <h3 className="font-display text-xl mb-4">RESPONSE TIME</h3>
              <p className="text-gray text-[14px] leading-relaxed">
                We typically respond within 24 hours during business days. For
                urgent matters, please include &quot;URGENT&quot; in your subject line.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
