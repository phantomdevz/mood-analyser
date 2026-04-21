"use client";

import { motion } from "framer-motion";

type Blob = {
  color: string;
  size: string;
  style: React.CSSProperties;
  animate: Record<string, unknown>;
  transition: Record<string, unknown>;
};

const BLOBS: Blob[] = [
  {
    color: "radial-gradient(circle, rgba(249,168,212,0.55) 0%, transparent 70%)",
    size: "70vmax",
    style: { top: "-15vmax", left: "-10vmax" },
    animate: { x: [0, 40, -20, 0], y: [0, 30, -15, 0], scale: [1, 1.08, 0.96, 1] },
    transition: { duration: 22, repeat: Infinity, ease: "easeInOut" },
  },
  {
    color: "radial-gradient(circle, rgba(147,197,253,0.45) 0%, transparent 70%)",
    size: "65vmax",
    style: { bottom: "-20vmax", right: "-12vmax" },
    animate: { x: [0, -35, 20, 0], y: [0, -25, 18, 0], scale: [1, 1.06, 0.97, 1] },
    transition: { duration: 26, repeat: Infinity, ease: "easeInOut", delay: 4 },
  },
  {
    color: "radial-gradient(circle, rgba(253,230,138,0.45) 0%, transparent 70%)",
    size: "50vmax",
    style: { top: "40%", left: "35%" },
    animate: { x: [0, 20, -30, 0], y: [0, -20, 25, 0], scale: [1, 1.1, 0.94, 1] },
    transition: { duration: 19, repeat: Infinity, ease: "easeInOut", delay: 9 },
  },
];

export default function BreathingBackground() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Cream base */}
      <div className="absolute inset-0" style={{ background: "#fbfbfb" }} />

      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            background: blob.color,
            filter: "blur(72px)",
            ...blob.style,
          }}
          animate={blob.animate as Parameters<typeof motion.div>[0]["animate"]}
          transition={blob.transition as Parameters<typeof motion.div>[0]["transition"]}
        />
      ))}

      {/* Very subtle noise/grain texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          opacity: 0.018,
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
}
