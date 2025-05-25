"use client";

import { motion } from "framer-motion";
import React from "react";

export default function CoffeeSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Smoke */}
      <motion.path
        d="M26 20 C28 15, 32 15, 34 20"
        stroke="gray"
        strokeWidth="2"
        fill="none"
        animate={{ y: [-2, -6, -2] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      <motion.path
        d="M30 20 C32 15, 36 15, 38 20"
        stroke="gray"
        strokeWidth="2"
        fill="none"
        animate={{ y: [-2, -5, -2] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />
      <motion.path
        d="M34 20 C36 15, 40 15, 42 20"
        stroke="gray"
        strokeWidth="2"
        fill="none"
        animate={{ y: [-1, -4, -1] }}
        transition={{ duration: 2.8, repeat: Infinity }}
      />

      {/* Cup Body */}
      <rect
        x="20"
        y="25"
        width="24"
        height="18"
        rx="6"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="#a15c38"
        strokeWidth="2"
      />

      {/* Handle */}
      <path
        d="M44 28 Q50 34, 44 40"
        fill="none"
        stroke="#a15c38"
        strokeWidth="3"
      />
    </svg>
  );
}
