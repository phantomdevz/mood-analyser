"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlassBreather() {
  const [phase, setPhase] = useState("Inhale");

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p = (p + 1) % 3;
      setPhase(["Inhale", "Hold", "Exhale"][p]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full my-4">
      <motion.div
        animate={{ scale: [1, 1.4, 1.4, 1] }}
        transition={{
          duration: 12,
          times: [0, 0.333, 0.666, 1],
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative flex items-center justify-center"
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.7)",
          boxShadow: "0 8px 32px rgba(196,181,253,0.2), inset 0 2px 8px rgba(255, 255, 255, 0.8)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={phase}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute text-[15px] tracking-[0.1em] font-medium uppercase"
            style={{ color: "rgba(15,15,25,0.7)" }}
          >
            {phase}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
