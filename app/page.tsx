"use client";

import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";

const ease = [0.22, 1, 0.36, 1] as const;

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
function HeroSection() {
  const handleSignIn = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center text-center w-full"
      style={{ zIndex: 10, minHeight: "100vh", paddingTop: "5rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease }}
        className="mb-7"
      >
        <span
          className="inline-flex items-center gap-2 tracking-[0.22em] uppercase font-medium rounded-full"
          style={{
            fontSize: "11px",
            padding: "0.5rem 1rem",
            background: "rgba(196,181,253,0.15)",
            border: "1px solid rgba(196,181,253,0.3)",
            color: "#7c3aed",
          }}
        >
          <motion.span
            className="rounded-full"
            style={{ width: "5px", height: "5px", background: "#a78bfa" }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
          Powered by Gemini AI
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.35, ease }}
        style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)", marginBottom: "1.75rem" }}
        className="font-light tracking-[-0.045em] leading-[0.95] max-w-4xl"
      >
        <span style={{ color: "rgba(15,15,25,0.88)" }}>Feel seen.</span>
        <br />
        <span
          style={{
            background: "linear-gradient(135deg, #f9a8d4 0%, #c4b5fd 50%, #93c5fd 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Act clearly.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        style={{ color: "rgba(15,15,25,0.42)", fontSize: "clamp(1rem,1.6vw,1.1rem)" }}
        className="font-light leading-relaxed max-w-[380px]"
      >
        Your daily mood check-in. Science-backed activities generated in seconds — personalized to you.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8, ease }}
        className="flex flex-col sm:flex-row items-center"
        style={{ gap: "1rem", marginTop: "2.5rem" }}
      >
        <button
          onClick={handleSignIn}
          className="inline-flex items-center font-medium rounded-full text-white transition-all duration-300 hover:scale-105"
          style={{
            fontSize: "15px",
            padding: "0.875rem 2.25rem",
            background: "linear-gradient(135deg, #f9a8d4, #c4b5fd)",
            boxShadow: "0 4px 20px rgba(196,181,253,0.35)",
          }}
        >
          Sign In with Google →
        </button>
        <a
          href="#how"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("how")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="font-normal transition-colors duration-200"
          style={{ fontSize: "14px", color: "rgba(15,15,25,0.38)", padding: "0.5rem 1rem" }}
        >
          How it works →
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
        style={{ bottom: "2rem", gap: "0.5rem" }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-9"
          style={{
            background: "linear-gradient(to bottom, rgba(196,181,253,0.6), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────
// FEATURES
// ─────────────────────────────────────────────
const FEATURES = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f9a8d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Real-Time Analysis",
    body: "Gemini AI cross-references your energy and stress against thousands of wellness data points — in under 3 seconds.",
    accent: "rgba(249,168,212,0.15)",
    border: "rgba(249,168,212,0.25)",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    title: "Precision Protocols",
    body: "Not generic advice. Three hyper-specific activities calibrated to exactly where you are right now.",
    accent: "rgba(196,181,253,0.15)",
    border: "rgba(196,181,253,0.25)",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Fully Private",
    body: "Your data never leaves your session. No accounts, no tracking, no history. Just you and your state.",
    accent: "rgba(147,197,253,0.15)",
    border: "rgba(147,197,253,0.25)",
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="relative" style={{ zIndex: 10, paddingTop: "8rem", paddingBottom: "7rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          style={{ marginBottom: "3.5rem" }}
        >
          <p
            className="tracking-[0.35em] uppercase font-medium"
            style={{ fontSize: "10px", marginBottom: "1rem", color: "rgba(196,181,253,0.8)" }}
          >
            Why InnerCircle
          </p>
          <h2
            className="font-light tracking-tight leading-tight"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "rgba(15,15,25,0.85)" }}
          >
            Precision wellness,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #f9a8d4, #c4b5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              instantly.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "1.25rem" }}>
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-[20px]"
              style={{
                padding: "1.5rem",
                background: "rgba(255,255,255,0.5)",
                backdropFilter: "blur(14px) saturate(160%)",
                WebkitBackdropFilter: "blur(14px) saturate(160%)",
                border: `1px solid ${f.border}`,
                boxShadow: `0 4px 20px rgba(31,38,135,0.05), inset 0 1px 0 rgba(255,255,255,0.8)`,
              }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>{f.icon}</div>
              <h3
                className="font-medium leading-snug"
                style={{ fontSize: "15px", marginBottom: "0.625rem", color: "rgba(15,15,25,0.85)" }}
              >
                {f.title}
              </h3>
              <p
                className="leading-[1.65]"
                style={{ fontSize: "13px", color: "rgba(15,15,25,0.42)" }}
              >
                {f.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// HOW IT WORKS
// ─────────────────────────────────────────────
const STEPS = [
  {
    num: "01",
    title: "Set your dials",
    body: "Slide your Energy and Stress levels to where they honestly are right now.",
    color: "#f9a8d4",
  },
  {
    num: "02",
    title: "AI reads your state",
    body: "Gemini analyses your inputs against evidence-based wellness techniques.",
    color: "#c4b5fd",
  },
  {
    num: "03",
    title: "Get your protocol",
    body: "Three precise, time-boxed activities appear. One physical, one cognitive, one mindfulness.",
    color: "#93c5fd",
  },
];

function HowItWorksSection() {
  return (
    <section id="how" className="relative" style={{ zIndex: 10, paddingTop: "6rem", paddingBottom: "6rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
      {/* Separator */}
      <div
        className="max-w-5xl mx-auto"
        style={{
          height: "1px",
          marginBottom: "5rem",
          background: "linear-gradient(90deg, transparent, rgba(196,181,253,0.25), transparent)",
        }}
      />
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          style={{ marginBottom: "3.5rem" }}
        >
          <p
            className="tracking-[0.35em] uppercase font-medium"
            style={{ fontSize: "10px", marginBottom: "1rem", color: "rgba(196,181,253,0.8)" }}
          >
            The Process
          </p>
          <h2
            className="font-light tracking-tight"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "rgba(15,15,25,0.85)" }}
          >
            Three steps.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #f9a8d4, #c4b5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Instant results.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "3rem" }}>
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease }}
              className="flex flex-col"
            >
              <span
                className="font-extralight leading-none"
                style={{ fontSize: "3rem", marginBottom: "1.25rem", color: step.color, opacity: 0.75 }}
              >
                {step.num}
              </span>
              <h3
                className="font-medium"
                style={{ fontSize: "16px", marginBottom: "0.625rem", color: "rgba(15,15,25,0.82)" }}
              >
                {step.title}
              </h3>
              <p
                className="leading-[1.7]"
                style={{ fontSize: "13px", color: "rgba(15,15,25,0.4)" }}
              >
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────
function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="about" className="relative flex items-center justify-center w-full" style={{ zIndex: 10, background: "transparent", minHeight: "80vh", paddingTop: "8rem", paddingBottom: "8rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-center" style={{ gap: "4rem" }}>
        
        {/* Left Column (Typography) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col"
        >
          <motion.h2
            variants={itemVariants}
            className="font-medium tracking-tight leading-[1.1] text-slate-800"
            style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", marginBottom: "1.25rem" }}
          >
            Powered by Gen AI.
          </motion.h2>
          
          <motion.h3
            variants={itemVariants}
            className="font-light tracking-tight text-slate-500"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", marginBottom: "1.5rem" }}
          >
            Your daily check-in, reimagined.
          </motion.h3>
          
          <motion.p
            variants={itemVariants}
            className="leading-relaxed font-light text-slate-500"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)", maxWidth: "32rem" }}
          >
            Traditional mood trackers only capture surface-level emotions. InnerCircle understands context. By analyzing the nuanced relationship between your current energy and stress levels, our AI generates hyper-personalized, instantly actionable activities designed to rebalance your state in the present moment.
          </motion.p>
        </motion.div>

        {/* Right Column (Visual/Glass Element) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center items-center w-full"
        >
          {/* Floating Abstract Card */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex flex-col justify-between overflow-hidden"
            style={{
              width: "100%",
              maxWidth: "340px",
              aspectRatio: "4/5",
              borderRadius: "1.5rem",
              padding: "2rem",
              background: "rgba(255,255,255,0.4)",
              backdropFilter: "blur(25px)",
              WebkitBackdropFilter: "blur(25px)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.08)",
            }}
          >
            {/* Inner Glowing Orb */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: "-2.5rem",
                right: "-2.5rem",
                width: "12rem",
                height: "12rem",
                borderRadius: "9999px",
                background: "linear-gradient(135deg, rgba(249,168,212,0.4), rgba(196,181,253,0.4))",
                filter: "blur(35px)",
              }}
            />
            <div
              className="absolute pointer-events-none"
              style={{
                bottom: "-2.5rem",
                left: "-2.5rem",
                width: "8rem",
                height: "8rem",
                borderRadius: "9999px",
                background: "linear-gradient(135deg, rgba(147,197,253,0.4), rgba(196,181,253,0.3))",
                filter: "blur(25px)",
              }}
            />

            {/* Mock UI Skeleton */}
            <div className="relative z-10 flex flex-col" style={{ gap: "1.25rem", flex: 1 }}>
              {/* Header Skeleton */}
              <div className="flex items-center" style={{ gap: "0.75rem" }}>
                <div style={{ width: "2.25rem", height: "2.25rem", borderRadius: "9999px", background: "linear-gradient(135deg, rgba(249,168,212,0.6), rgba(196,181,253,0.6))", boxShadow: "0 2px 10px rgba(196,181,253,0.2)" }} />
                <div style={{ height: "0.625rem", width: "6rem", borderRadius: "9999px", background: "rgba(15,15,25,0.12)" }} />
              </div>
              
              {/* Context Block Skeleton */}
              <div className="flex flex-col" style={{ gap: "0.5rem" }}>
                <div style={{ height: "0.5rem", width: "100%", borderRadius: "9999px", background: "rgba(15,15,25,0.06)" }} />
                <div style={{ height: "0.5rem", width: "85%", borderRadius: "9999px", background: "rgba(15,15,25,0.06)" }} />
              </div>

              {/* Tag Pills */}
              <div className="flex items-center" style={{ gap: "0.5rem", marginTop: "0.25rem" }}>
                <div style={{ padding: "0.25rem 0.75rem", borderRadius: "9999px", background: "rgba(249,168,212,0.15)", border: "1px solid rgba(249,168,212,0.3)" }}>
                  <div style={{ height: "0.25rem", width: "1.5rem", borderRadius: "9999px", background: "rgba(249,168,212,0.8)" }} />
                </div>
                <div style={{ padding: "0.25rem 0.75rem", borderRadius: "9999px", background: "rgba(196,181,253,0.15)", border: "1px solid rgba(196,181,253,0.3)" }}>
                  <div style={{ height: "0.25rem", width: "2rem", borderRadius: "9999px", background: "rgba(196,181,253,0.8)" }} />
                </div>
              </div>

              {/* Center Graphic Graphic */}
              <div className="flex-1 flex items-center justify-center my-2">
                <div className="relative flex items-center justify-center" style={{ width: "7.5rem", height: "7.5rem", borderRadius: "50%", background: 'conic-gradient(from 180deg at 50% 50%, rgba(249,168,212,0.9) 0deg, rgba(196,181,253,0.9) 180deg, rgba(147,197,253,0.9) 360deg)', padding: "1px", boxShadow: "0 8px 32px rgba(196,181,253,0.25)" }}>
                    <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
                    </div>
                </div>
              </div>
            </div>

            {/* Simulated AI Output Skeleton */}
            <div className="relative z-10 w-full shadow-sm" style={{ borderRadius: "1rem", background: "rgba(255,255,255,0.6)", border: "1px solid border: rgba(255, 255, 255, 0.25)", padding: "1rem", backdropFilter: "blur(12px)" }}>
               <div className="flex justify-between items-center" style={{ marginBottom: "0.75rem" }}>
                 <div style={{ height: "0.375rem", width: "4rem", borderRadius: "9999px", background: "rgba(167,139,250,0.6)" }} />
                 <div style={{ height: "0.375rem", width: "2rem", borderRadius: "9999px", background: "rgba(15,15,25,0.1)" }} />
               </div>
               <div style={{ height: "0.5rem", width: "85%", borderRadius: "9999px", background: "rgba(15,15,25,0.06)", marginBottom: "0.5rem" }} />
               <div style={{ height: "0.5rem", width: "60%", borderRadius: "9999px", background: "rgba(15,15,25,0.06)" }} />
            </div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// PAGE ROOT
// ─────────────────────────────────────────────
export default function Home() {
  return (
    <main className="relative bg-transparent">
      <div className="flex flex-col relative z-10 w-full overflow-x-hidden">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <AboutSection />
      </div>

      <footer className="relative w-full" style={{ zIndex: 10, paddingTop: "3rem", paddingBottom: "3rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <div
          className="max-w-5xl mx-auto"
          style={{
            height: "1px",
            marginBottom: "2rem",
            background: "linear-gradient(90deg, transparent, rgba(200,200,220,0.3), transparent)",
          }}
        />
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between" style={{ gap: "1rem" }}>
          <span
            className="font-semibold tracking-tight"
            style={{ fontSize: "13px", color: "rgba(15,15,25,0.45)" }}
          >
            Inner<span style={{ color: "#a78bfa" }}>Circle</span>
          </span>
          <span
            className="tracking-[0.2em] uppercase"
            style={{ fontSize: "11px", color: "rgba(15,15,25,0.25)" }}
          >
            Built with Gemini AI &nbsp;·&nbsp; 2026
          </span>
          <div className="flex items-center" style={{ gap: "0.375rem" }}>
            <span
              className="rounded-full"
              style={{
                width: "5px", height: "5px",
                background: "#a78bfa",
                boxShadow: "0 0 6px rgba(167,139,250,0.7)",
              }}
            />
            <span
              style={{ fontSize: "11px", color: "rgba(15,15,25,0.3)" }}
            >
              All systems operational
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
