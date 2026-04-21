"use client";

import { motion } from "framer-motion";
import GlassBreather from "./GlassBreather";

interface Activity {
  title: string;
  duration: string;
  description: string;
}

const ACCENTS = [
  {
    badge: "rgba(249,168,212,0.25)",
    badgeBorder: "rgba(249,168,212,0.4)",
    badgeText: "#be185d",
    dot: "#f472b6",
    glow: "rgba(249,168,212,0.3)",
  },
  {
    badge: "rgba(196,181,253,0.25)",
    badgeBorder: "rgba(196,181,253,0.4)",
    badgeText: "#6d28d9",
    dot: "#a78bfa",
    glow: "rgba(196,181,253,0.3)",
  },
  {
    badge: "rgba(147,197,253,0.25)",
    badgeBorder: "rgba(147,197,253,0.4)",
    badgeText: "#1d4ed8",
    dot: "#60a5fa",
    glow: "rgba(147,197,253,0.3)",
  },
];

export const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.14,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: { duration: 0.22 },
  },
};

interface Props {
  activity: Activity;
  index: number;
}

export default function ActivityCard({ activity, index }: Props) {
  const accent = ACCENTS[index % ACCENTS.length];

  // Detect if this task is related to breathing
  const isBreathingTask = 
    activity.title.toLowerCase().includes("breathe") || 
    activity.title.toLowerCase().includes("breathing") ||
    activity.description.toLowerCase().includes("breathe") || 
    activity.description.toLowerCase().includes("breathing");

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ y: -3, transition: { duration: 0.18, ease: "easeOut" } }}
      className="relative group"
    >
      <div
        className="relative rounded-[18px] p-5 overflow-hidden transition-shadow duration-300 flex flex-col"
        style={{
          background: "rgba(255, 255, 255, 0.55)",
          backdropFilter: "blur(12px) saturate(160%)",
          WebkitBackdropFilter: "blur(12px) saturate(160%)",
          border: "1px solid rgba(255, 255, 255, 0.45)",
          boxShadow: `0 4px 24px rgba(31, 38, 135, 0.06), 0 0 0 0.5px ${accent.glow}`,
        }}
      >
        {/* Soft tinted ambient top edge */}
        <div
          className="absolute top-0 left-0 right-0 h-px rounded-t-[18px]"
          style={{ background: `linear-gradient(90deg, transparent, ${accent.glow}, transparent)` }}
        />

        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: accent.dot, boxShadow: `0 0 8px ${accent.glow}` }}
            />
            <h3
              className="text-[15px] font-medium leading-snug"
              style={{ color: "rgba(15,15,25,0.88)" }}
            >
              {activity.title}
            </h3>
          </div>

          {/* Duration badge */}
          <span
            className="text-[10px] font-semibold tracking-[0.12em] uppercase px-3 py-1 rounded-full flex-shrink-0 ml-3"
            style={{
              background: accent.badge,
              border: `1px solid ${accent.badgeBorder}`,
              color: accent.badgeText,
            }}
          >
            {activity.duration}
          </span>
        </div>

        {/* Description */}
        <p
          className="text-[13px] leading-[1.65] pl-[18px]"
          style={{ color: "rgba(15,15,25,0.48)" }}
        >
          {activity.description}
        </p>

        {/* Dynamic Breathing UI Interception */}
        {isBreathingTask && (
          <div className="mt-2 text-center w-full">
            <GlassBreather />
          </div>
        )}

      </div>
    </motion.div>
  );
}
