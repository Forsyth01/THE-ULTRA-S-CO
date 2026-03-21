"use client";

import { motion } from "framer-motion";

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-block font-body text-[13px] font-semibold tracking-[0.08em] uppercase px-8 py-3.5 rounded cursor-pointer transition-all duration-200";

  const variants = {
    primary: "bg-green text-black hover:opacity-85",
    outline: "bg-transparent text-white border border-border hover:border-white",
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
