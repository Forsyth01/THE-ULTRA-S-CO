"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { searchProducts } from "@/lib/shopify/api";

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.trim().length < 2) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const searchResults = await searchProducts(query.trim());
        setResults(searchResults);
        setHasSearched(true);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  // Reset on close
  const handleClose = () => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
    onClose();
  };

  const handleResultClick = () => {
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-[101] p-4 pt-20 md:pt-32"
          >
            <div className="max-w-2xl mx-auto">
              {/* Search Input */}
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray"
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-mid border border-border rounded-lg pl-12 pr-12 py-4 text-white text-lg placeholder:text-gray focus:border-green focus:outline-none transition-colors"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              {/* Results */}
              <div className="mt-4 max-h-[60vh] overflow-y-auto">
                {isLoading && (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 size={24} className="animate-spin text-green" />
                  </div>
                )}

                {!isLoading && hasSearched && results.length === 0 && (
                  <div className="bg-mid border border-border rounded-lg p-8 text-center">
                    <p className="text-gray">
                      No products found for &quot;{query}&quot;
                    </p>
                  </div>
                )}

                {!isLoading && results.length > 0 && (
                  <div className="bg-mid border border-border rounded-lg overflow-hidden">
                    {results.map((product, index) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={handleResultClick}
                        className={`flex items-center gap-4 p-4 hover:bg-black/30 transition-colors ${
                          index !== results.length - 1
                            ? "border-b border-border"
                            : ""
                        }`}
                      >
                        <div className="relative w-16 h-16 bg-black rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] text-gray uppercase tracking-wide">
                            {product.category}
                          </p>
                          <h4 className="text-white font-medium truncate">
                            {product.name}
                          </h4>
                          <p className="text-green font-display">
                            ${product.price}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {!isLoading && !hasSearched && query.length < 2 && query.length > 0 && (
                  <div className="bg-mid border border-border rounded-lg p-8 text-center">
                    <p className="text-gray text-sm">
                      Type at least 2 characters to search
                    </p>
                  </div>
                )}
              </div>

              {/* Close hint */}
              <p className="text-center text-gray text-sm mt-4">
                Press <span className="text-white">ESC</span> or click outside to close
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
