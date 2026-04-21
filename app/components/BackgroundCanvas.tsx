"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 150;

function getFramePath(index: number) {
  const padded = String(index).padStart(4, "0");
  return `/frames/frame_${padded}.webp`;
}

/**
 * Image-sequence canvas that scrubs through 150 frames
 * synced to scroll via GSAP ScrollTrigger.
 *
 * When frames aren't present the canvas stays fully transparent
 * and the BreathingBackground CSS handles the visual.
 */
export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef({ current: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    let hasAnyFrame = false;

    const drawFrame = (index: number) => {
      const img = images[index];
      if (!img || !img.complete) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scale = Math.max(
        canvas.width / img.naturalWidth,
        canvas.height / img.naturalHeight
      );
      const x = (canvas.width - img.naturalWidth * scale) / 2;
      const y = (canvas.height - img.naturalHeight * scale) / 2;
      ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        hasAnyFrame = true;
        if (loadedCount === 1) drawFrame(0);
      };
      images.push(img);
    }
    imagesRef.current = images;

    const trigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
      onUpdate: (self) => {
        if (!hasAnyFrame || loadedCount < FRAME_COUNT * 0.5) return;
        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(self.progress * (FRAME_COUNT - 1))
        );
        if (frameRef.current.current !== frameIndex) {
          frameRef.current.current = frameIndex;
          drawFrame(frameIndex);
        }
      },
    });

    return () => {
      trigger.kill();
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 1, pointerEvents: "none" }}
    />
  );
}
