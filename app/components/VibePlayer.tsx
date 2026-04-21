"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function getEmbedUrl(uri: string) {
  if (!uri) return "";

  // Intercept standard open.spotify.com HTTP URLs (e.g., from "Copy Song Link")
  if (uri.includes("open.spotify.com")) {
    if (uri.includes("/embed/")) return uri; // Already parsed
    try {
      const urlHash = new URL(uri);
      return `https://open.spotify.com/embed${urlHash.pathname}?utm_source=generator&theme=0`;
    } catch {
      return uri; // Fallback
    }
  }

  // Parse standard Spotify URI format (spotify:track:12345)
  const parts = uri.split(":");
  if (parts.length >= 3) {
    return `https://open.spotify.com/embed/${parts[1]}/${parts[2]}?utm_source=generator&theme=0`;
  }

  return uri;
}

export default function VibePlayer({ spotifyUri }: { spotifyUri: string | null }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !spotifyUri) return null;

  const embedUrl = getEmbedUrl(spotifyUri);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 right-6 z-50 overflow-hidden"
      style={{
        width: "300px",
        height: "85px",
        borderRadius: "16px",
        background: "rgba(255,255,255,0.45)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.4)",
        boxShadow: "0 12px 32px 0 rgba(31,38,135,0.1), inset 0 1px 0 rgba(255,255,255,0.7)",
      }}
    >
      <iframe
        style={{ borderRadius: "16px" }}
        src={embedUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen={false}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </motion.div>
  );
}
