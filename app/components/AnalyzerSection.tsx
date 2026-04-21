"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ActivityCard from "./ActivityCard";
import VibePlayer from "./VibePlayer";

interface Activity {
  title: string;
  duration: string;
  description: string;
}

// ── Slider ─────────────────────────────────────────────────────────────────
function SliderInput({
  id,
  label,
  leftLabel,
  rightLabel,
  value,
  onChange,
  color,
  glowColor,
}: {
  id: string;
  label: string;
  leftLabel: string;
  rightLabel: string;
  value: number;
  onChange: (v: number) => void;
  color: string;
  glowColor: string;
}) {
  const [dragging, setDragging] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: "1rem" }}>
        <label
          htmlFor={id}
          className="font-medium"
          style={{ fontSize: "14px", color: "rgba(15,15,25,0.7)" }}
        >
          {label}
        </label>
        <span
          className="font-semibold tabular-nums"
          style={{ fontSize: "14px", color }}
        >
          {value}
        </span>
      </div>

      {/* Track */}
      <div className="relative" style={{ height: "36px" }}>
        {/* Track background */}
        <div
          className="absolute left-0 right-0 rounded-full"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            height: "6px",
            background: "rgba(15,15,25,0.06)",
          }}
        />
        {/* Track fill */}
        <div
          className="absolute left-0 rounded-full transition-all duration-75"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            height: "6px",
            width: `${value}%`,
            background: `linear-gradient(90deg, rgba(255,255,255,0.8), ${color})`,
          }}
        />
        {/* Thumb */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: `calc(${value}% - 14px)`,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <motion.div
            animate={
              dragging
                ? { scale: 1.25, boxShadow: `0 0 0 10px ${glowColor}` }
                : { scale: 1, boxShadow: `0 0 0 4px ${glowColor}` }
            }
            transition={{ duration: 0.15 }}
            className="rounded-full"
            style={{
              width: "28px", height: "28px",
              background: "white",
              border: `2.5px solid ${color}`,
              boxShadow: `0 2px 12px ${glowColor}`,
            }}
          />
        </div>
        {/* Native input — invisible, handles all pointer interaction */}
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          onTouchStart={() => setDragging(true)}
          onTouchEnd={() => setDragging(false)}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
          style={{ zIndex: 5, height: "100%" }}
          aria-label={label}
        />
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between" style={{ marginTop: "0.5rem" }}>
        <span style={{ fontSize: "11px", color: "rgba(15,15,25,0.3)" }}>{leftLabel}</span>
        <span style={{ fontSize: "11px", color: "rgba(15,15,25,0.3)" }}>{rightLabel}</span>
      </div>
    </div>
  );
}

// ── Main Export ─────────────────────────────────────────────────────────────
export default function AnalyzerSection() {
  const [energy, setEnergy] = useState(50);
  const [stress, setStress] = useState(50);
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [spotifyUri, setSpotifyUri] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const notesMaxLen = 150;

  const handleAnalyze = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setActivities(null);
    setSpotifyUri(null);
    setError(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ energy, stress, notes }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      
      setActivities(data.activities);
      setSpotifyUri(data.spotify_uri || null);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="analyzer" className="relative flex flex-col items-center justify-center" style={{ zIndex: 10, minHeight: "100vh", paddingTop: "8rem", paddingBottom: "8rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>

      {/* Centered section heading */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
        style={{ marginBottom: "4rem" }}
      >
        <p
          className="tracking-[0.35em] uppercase font-medium"
          style={{ fontSize: "10px", marginBottom: "1rem", color: "rgba(196,181,253,0.8)" }}
        >
          Daily Check-In
        </p>
        <h2
          className="font-light tracking-tight leading-tight"
          style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", color: "rgba(15,15,25,0.88)" }}
        >
          How are you feeling,{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #f9a8d4, #c4b5fd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            right now?
          </span>
        </h2>
        <p
          className="font-light"
          style={{ marginTop: "1rem", fontSize: "16px", color: "rgba(15,15,25,0.45)" }}
        >
          Calibrate your state. We'll generate your personal wellness protocol.
        </p>
      </motion.div>

      {/* THE HUGE DASHBOARD PANEL */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="w-full relative"
        style={{ maxWidth: "1100px" }}
      >
        <div
          className="w-full flex flex-col md:flex-row overflow-hidden relative"
          style={{
            borderRadius: "1.5rem",
            background: "rgba(255,255,255,0.48)",
            backdropFilter: "blur(28px) saturate(180%)",
            WebkitBackdropFilter: "blur(28px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.28)",
            boxShadow: "0 8px 32px 0 rgba(31,38,135,0.08), inset 0 1px 0 rgba(255,255,255,0.7)",
          }}
        >
          {/* LEFT COLUMN: INPUTS */}
          <div className="w-full md:w-[45%] flex flex-col" style={{ padding: "3rem" }}>
            
            {/* Sliders */}
            <div className="flex flex-col" style={{ gap: "2.5rem", marginBottom: "3rem" }}>
              <SliderInput
                id="energy-slider"
                label="Energy Input"
                leftLabel="Physically Drained"
                rightLabel="High Voltage"
                value={energy}
                onChange={setEnergy}
                color="#a78bfa"
                glowColor="rgba(167,139,250,0.25)"
              />
              <SliderInput
                id="stress-slider"
                label="Cognitive Load"
                leftLabel="Clear & Calm"
                rightLabel="Overwhelmed"
                value={stress}
                onChange={setStress}
                color="#f472b6"
                glowColor="rgba(244,114,182,0.25)"
              />
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "rgba(15,15,25,0.06)", marginBottom: "2rem" }} />

            {/* Notes textarea */}
            <div style={{ marginBottom: "2.5rem" }}>
              <div className="flex justify-between items-center" style={{ marginBottom: "1rem" }}>
                <label
                  htmlFor="mood-notes"
                  className="font-medium"
                  style={{ fontSize: "14px", color: "rgba(15,15,25,0.55)" }}
                >
                  Context{" "}
                  <span style={{ color: "rgba(15,15,25,0.28)", fontWeight: 400 }}>(optional)</span>
                </label>
                <span
                  className="tabular-nums"
                  style={{ fontSize: "12px", color: notes.length >= notesMaxLen * 0.85 ? "#f472b6" : "rgba(15,15,25,0.28)" }}
                >
                  {notes.length}/{notesMaxLen}
                </span>
              </div>
              <div className="relative">
                <textarea
                  id="mood-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value.slice(0, notesMaxLen))}
                  placeholder="What's specifically on your mind? e.g., 'Big presentation tomorrow', 'Poor sleep'"
                  rows={4}
                  className="w-full resize-none outline-none bg-transparent leading-relaxed"
                  style={{
                    fontSize: "15px",
                    paddingTop: "0.25rem",
                    paddingBottom: "1rem",
                    color: "rgba(15,15,25,0.75)",
                    caretColor: "#c4b5fd",
                    fontFamily: "inherit",
                    borderBottom: "1.5px solid rgba(15,15,25,0.13)",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderBottomColor = "rgba(196,181,253,0.7)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderBottomColor = "rgba(15,15,25,0.13)";
                  }}
                />
              </div>
            </div>

            {/* SPACER for tall layouts */}
            <div style={{ flexGrow: 1 }} />

            {/* CTA Button */}
            <motion.button
              id="analyze-btn"
              onClick={handleAnalyze}
              disabled={isLoading}
              whileHover={isLoading ? {} : {
                scale: 1.015,
                boxShadow: "0 0 28px rgba(196,181,253,0.45), 0 0 48px rgba(249,168,212,0.2)",
              }}
              whileTap={isLoading ? {} : { scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="w-full rounded-[14px] font-medium tracking-[0.01em] text-white disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
              style={{
                fontSize: "16px",
                paddingTop: "1.25rem",
                paddingBottom: "1.25rem",
                background: isLoading
                  ? "rgba(196,181,253,0.45)"
                  : "linear-gradient(135deg, #f9a8d4 0%, #c4b5fd 55%, #93c5fd 100%)",
                boxShadow: "0 4px 18px rgba(196,181,253,0.3), inset 0 1px 0 rgba(255,255,255,0.35)",
                transition: "box-shadow 0.25s, background 0.25s",
                color: isLoading ? "rgba(255,255,255,0.5)" : "#fff",
              }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center" style={{ gap: "0.75rem" }}>
                  <motion.span
                    className="rounded-full bg-white/60 inline-block"
                    style={{ width: "6px", height: "6px" }}
                    animate={{ scale: [1, 1.8, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  />
                  <motion.span
                    className="rounded-full bg-white/60 inline-block"
                    style={{ width: "6px", height: "6px" }}
                    animate={{ scale: [1, 1.8, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.span
                    className="rounded-full bg-white/60 inline-block"
                    style={{ width: "6px", height: "6px" }}
                    animate={{ scale: [1, 1.8, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  />
                </span>
              ) : (
                "Analyze My State"
              )}
            </motion.button>
          </div>

          {/* RIGHT COLUMN: OUTPUTS & STATES */}
          <div className="w-full md:w-[55%] flex flex-col relative" style={{ background: "rgba(255,255,255,0.35)", borderLeft: "1px solid rgba(255,255,255,0.4)" }}>
            
            {/* Inner Content Wrapper */}
            <div className="w-full h-full flex flex-col p-8 md:p-12 relative overflow-y-auto" style={{ minHeight: "500px" }}>

            {/* EMPTY STATE */}
            <AnimatePresence>
              {!isLoading && !activities && !error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="relative flex items-center justify-center" style={{ width: "9rem", height: "9rem", marginBottom: "2rem" }}>
                    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "linear-gradient(135deg, rgba(249,168,212,0.15), rgba(196,181,253,0.15))", filter: "blur(20px)" }} />
                    <div style={{ width: "4.5rem", height: "4.5rem", borderRadius: "50%", background: "rgba(255,255,255,0.8)", border: "1px solid rgba(196,181,253,0.3)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(196,181,253,0.15)", zIndex: 2 }}>
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                  </div>
                  <h3 style={{ fontSize: "1.25rem", color: "rgba(15,15,25,0.7)", marginBottom: "0.75rem", fontWeight: 500 }}>Awaiting Input</h3>
                  <p style={{ fontSize: "14px", color: "rgba(15,15,25,0.4)", maxWidth: "300px", lineHeight: "1.6" }}>
                    Configure your current state using the dials. Our AI model will process your metrics to create an instant intervention.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* LOADING STATE */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8"
                >
                  <div className="relative flex items-center justify-center" style={{ width: "200px", height: "200px" }}>
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                          width: `${80 + i * 40}px`,
                          height: `${80 + i * 40}px`,
                          background:
                            i === 0
                              ? "linear-gradient(135deg, rgba(249,168,212,0.4), rgba(196,181,253,0.4))"
                              : "transparent",
                          border: i > 0 ? "1px solid rgba(196,181,253,0.4)" : "none",
                          backdropFilter: i === 0 ? "blur(12px)" : undefined,
                        }}
                        animate={{
                          scale: [1, i === 0 ? 1.2 : 1.1, 1],
                          opacity: [0.8, 0.2, 0.8],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.4,
                        }}
                      />
                    ))}
                  </div>
                  <p
                    className="tracking-[0.3em] uppercase"
                    style={{ fontSize: "11px", color: "rgba(15,15,25,0.4)", marginTop: "2rem" }}
                  >
                    Generating Protocol...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ERROR STATE */}
            <AnimatePresence>
              {error && !isLoading && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                >
                  <div style={{ padding: "2rem", borderRadius: "1.5rem", background: "rgba(255,255,255,0.6)", border: "1px solid rgba(252,129,129,0.3)", boxShadow: "0 8px 32px rgba(252,129,129,0.15)", maxWidth: "400px" }}>
                    <div style={{ width: "3rem", height: "3rem", borderRadius: "50%", background: "rgba(252,129,129,0.15)", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem auto" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                    </div>
                    <p style={{ fontSize: "16px", fontWeight: 500, color: "#ef4444", marginBottom: "0.5rem" }}>
                      Intervention Failed
                    </p>
                    <p style={{ fontSize: "14px", color: "rgba(15,15,25,0.5)", marginBottom: "1.5rem", lineHeight: "1.6" }}>
                      {error}
                    </p>
                    <button
                      onClick={() => setError(null)}
                      style={{ fontSize: "13px", fontWeight: 500, padding: "0.5rem 1rem", borderRadius: "9999px", background: "rgba(15,15,25,0.05)", color: "rgba(15,15,25,0.6)", transition: "background 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(15,15,25,0.08)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "rgba(15,15,25,0.05)"}
                    >
                      Dismiss Error
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* RESULTS STATE */}
            <AnimatePresence mode="wait">
              {activities && !isLoading && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col w-full h-full relative"
                  style={{ gap: "1rem" }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between" style={{ marginBottom: "1rem", paddingLeft: "0.25rem", paddingRight: "0.25rem" }}>
                    <p
                      className="tracking-[0.25em] uppercase font-medium"
                      style={{ fontSize: "11px", color: "rgba(196,181,253,0.9)" }}
                    >
                      Generated Protocol
                    </p>
                    <button
                      onClick={() => {
                        setActivities(null);
                        setSpotifyUri(null);
                      }}
                      className="font-medium rounded-full"
                      style={{
                        fontSize: "11px",
                        padding: "0.375rem 0.875rem",
                        color: "rgba(15,15,25,0.4)",
                        background: "rgba(15,15,25,0.05)",
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(15,15,25,0.8)"; e.currentTarget.style.background = "rgba(15,15,25,0.08)" }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(15,15,25,0.4)"; e.currentTarget.style.background = "rgba(15,15,25,0.05)" }}
                    >
                      ↺ New Check-In
                    </button>
                  </div>

                  <div className="flex flex-col" style={{ gap: "1rem" }}>
                    {activities.map((activity, idx) => (
                      <ActivityCard key={idx} activity={activity} index={idx} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            </div>
          </div>
        </div>
      </motion.div>

      {/* RENDER THE VIBE PLAYER GLOBALLY WITHIN THIS SCOPE IF A URI EXISTS */}
      <VibePlayer spotifyUri={spotifyUri} />
    </section>
  );
}
