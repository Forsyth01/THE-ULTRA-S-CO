"use client";

import { motion } from "framer-motion";

export default function HeroHatSvg() {
  return (
    <motion.svg
      viewBox="0 0 400 400"
      className="w-[320px] h-[320px] md:w-[420px] md:h-[420px] opacity-95"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ rotate: -5 }}
      animate={{ rotate: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background circle */}
      <circle cx="200" cy="200" r="180" fill="#1a1a1a" opacity=".5" />

      {/* Snapback hat */}
      <g transform="translate(200,190)">
        {/* Brim */}
        <motion.ellipse
          cx="0"
          cy="60"
          rx="130"
          ry="18"
          fill="#0f0f0f"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <ellipse cx="-30" cy="65" rx="50" ry="10" fill="#1a1a1a" />

        {/* Hat body */}
        <motion.path
          d="M-120,60 Q-100,-40 0,-60 Q100,-40 120,60 Z"
          fill="#c8f050"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Panel lines */}
        <line
          x1="0"
          y1="-60"
          x2="0"
          y2="60"
          stroke="#0a0a0a"
          strokeWidth="1.5"
          opacity=".4"
        />
        <line
          x1="0"
          y1="-60"
          x2="-80"
          y2="40"
          stroke="#0a0a0a"
          strokeWidth="1.5"
          opacity=".4"
        />
        <line
          x1="0"
          y1="-60"
          x2="80"
          y2="40"
          stroke="#0a0a0a"
          strokeWidth="1.5"
          opacity=".4"
        />

        {/* Logo area */}
        <circle cx="0" cy="0" r="26" fill="#0a0a0a" />
        <text
          x="0"
          y="5"
          textAnchor="middle"
          fontFamily="Anton, sans-serif"
          fontSize="10"
          fill="#c8f050"
          letterSpacing="1"
        >
          UC
        </text>

        {/* Button top */}
        <circle cx="0" cy="-60" r="6" fill="#0a0a0a" />

        {/* Snap closure */}
        <rect x="-14" y="60" width="28" height="6" rx="3" fill="#1a1a1a" />
      </g>

      {/* Decorative elements */}
      <motion.circle
        cx="60"
        cy="80"
        r="3"
        fill="#c8f050"
        opacity=".5"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle
        cx="340"
        cy="300"
        r="5"
        fill="#c8f050"
        opacity=".3"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      />
      <motion.circle
        cx="320"
        cy="100"
        r="2"
        fill="#c8f050"
        opacity=".6"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
      />
      <motion.circle
        cx="80"
        cy="320"
        r="4"
        fill="#c8f050"
        opacity=".25"
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.8 }}
      />
    </motion.svg>
  );
}
