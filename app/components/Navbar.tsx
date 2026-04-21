"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  const pathname = usePathname();
  const isAuthCallback = pathname === '/auth/callback';

  useEffect(() => {
    if (isAuthCallback) return; // Prevent checking during the redirect cycle
    
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase, isAuthCallback]);

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  // Do not render navbar content if explicitly on the callback route.
  if (isAuthCallback) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ height: "60px" }}
    >
      <div
        className="h-full flex items-center justify-between px-6 md:px-10"
        style={{
          background: "rgba(251,251,251,0.72)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "1px solid rgba(200,200,220,0.25)",
          boxShadow: "0 1px 0 rgba(255,255,255,0.8)",
        }}
      >
        {/* Logo */}
        <Link href={user ? "/app" : "/"}>
          <span
            className="text-[16px] font-semibold tracking-tight cursor-pointer select-none"
            style={{ color: "rgba(15,15,25,0.88)" }}
          >
            Inner
            <span
              style={{
                background: "linear-gradient(135deg, #f9a8d4, #c4b5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Circle
            </span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {user ? (
            <>
              <Link href="/app" className="text-[13px] font-medium" style={{ color: "rgba(15,15,25,0.85)" }}>Dashboard</Link>
              <Link href="/insights" className="text-[13px] font-normal transition-colors" style={{ color: "rgba(15,15,25,0.45)" }}>Insights</Link>
            </>
          ) : (
            <>
              <a href="/#how" className="text-[13px] font-normal transition-colors duration-200" style={{ color: "rgba(15,15,25,0.45)" }}>How It Works</a>
              <a href="/#about" className="text-[13px] font-normal transition-colors duration-200" style={{ color: "rgba(15,15,25,0.45)" }}>About</a>
            </>
          )}
        </div>

        {/* Auth CTA */}
        {user ? (
          <button
            onClick={handleSignOut}
            className="hidden md:block text-[12px] font-medium px-4 py-2 rounded-full transition-all duration-200 hover:bg-black/5"
            style={{
              background: "rgba(15,15,25,0.05)",
              color: "rgba(15,15,25,0.65)",
            }}
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={handleSignIn}
            className="hidden md:block text-[12px] font-medium px-4 py-2 rounded-full transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, rgba(249,168,212,0.18), rgba(196,181,253,0.18))",
              border: "1px solid rgba(196,181,253,0.3)",
              color: "#6d28d9",
            }}
          >
            Sign In with Google
          </button>
        )}
      </div>
    </motion.nav>
  );
}
