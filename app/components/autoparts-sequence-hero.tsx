"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 240;
const DEFAULT_FRAME_ROOT = "/media/autoparts-sequence";
const BITMAP_CACHE_SIZE = 14;
const PRELOAD_CONCURRENCY = 10;
const PRELOAD_RADIUS = 5;

type AutopartsSequenceHeroProps = {
  frameRoot?: string;
  label: string;
  summary: string;
  title: string;
  variant?: "autoparts" | "home";
};

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(start: number, end: number, value: number) {
  const progress = clamp((value - start) / (end - start));
  return progress * progress * (3 - 2 * progress);
}

function frameSource(frameRoot: string, index: number) {
  return `${frameRoot}/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;
}

export function AutopartsSequenceHero({
  frameRoot = DEFAULT_FRAME_ROOT,
  label,
  summary,
  title,
  variant = "autoparts",
}: AutopartsSequenceHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [failedFrames, setFailedFrames] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const canvas = canvasRef.current;
    const labelElement = labelRef.current;
    const titleElement = titleRef.current;
    const summaryElement = summaryRef.current;
    const isHome = variant === "home";
    const context = canvas?.getContext("2d", {
      alpha: false,
      desynchronized: true,
    });

    if (
      !section ||
      !sticky ||
      !canvas ||
      !context ||
      !labelElement ||
      !titleElement ||
      !summaryElement
    ) {
      return;
    }

    const frameBlobs: Array<Blob | null> = new Array(FRAME_COUNT).fill(null);
    const bitmapCache = new Map<number, ImageBitmap>();
    const pendingBitmaps = new Map<number, Promise<void>>();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;
    let lastDrawnFrame = -1;
    let completedFrames = 0;
    let failures = 0;
    let cancelled = false;
    let loadCursor = 0;

    const targetFrame = () => Math.round(progressRef.current * (FRAME_COUNT - 1));

    const trimBitmapCache = (anchor: number) => {
      while (bitmapCache.size > BITMAP_CACHE_SIZE) {
        const removable = [...bitmapCache.keys()]
          .filter((index) => index !== anchor)
          .sort((a, b) => Math.abs(b - anchor) - Math.abs(a - anchor))[0];

        if (removable === undefined) break;
        bitmapCache.get(removable)?.close();
        bitmapCache.delete(removable);
      }
    };

    const nearestAvailableBitmap = (target: number) => {
      const exact = bitmapCache.get(target);
      if (exact) return exact;

      let nearestIndex = -1;
      let nearestDistance = Number.POSITIVE_INFINITY;
      bitmapCache.forEach((_, index) => {
        const distance = Math.abs(index - target);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      return nearestIndex >= 0 ? bitmapCache.get(nearestIndex) ?? null : null;
    };

    const drawFrame = (force = false) => {
      const target = targetFrame();
      const bitmap = nearestAvailableBitmap(target);

      if (!bitmap) return;
      if (!force && target === lastDrawnFrame) return;

      const canvasRatio = canvas.width / canvas.height;
      const imageRatio = bitmap.width / bitmap.height;
      let drawWidth: number;
      let drawHeight: number;
      let drawX: number;
      let drawY: number;

      if (isHome) {
        if (imageRatio > canvasRatio) {
          drawHeight = canvas.height;
          drawWidth = drawHeight * imageRatio;
          drawX = (canvas.width - drawWidth) / 2;
          drawY = 0;
        } else {
          drawWidth = canvas.width;
          drawHeight = drawWidth / imageRatio;
          drawX = 0;
          drawY = (canvas.height - drawHeight) / 2;
        }
      } else if (imageRatio > canvasRatio) {
        drawWidth = canvas.width;
        drawHeight = drawWidth / imageRatio;
        drawX = 0;
        drawY = (canvas.height - drawHeight) / 2;
      } else {
        drawHeight = canvas.height;
        drawWidth = drawHeight * imageRatio;
        drawX = (canvas.width - drawWidth) / 2;
        drawY = 0;
      }

      const mobileZoom =
        !isHome && sticky.clientWidth <= 680
          ? 1 + (1 - smoothstep(0.18, 0.68, progressRef.current)) * 0.55
          : 1;
      drawWidth *= mobileZoom;
      drawHeight *= mobileZoom;
      drawX = (canvas.width - drawWidth) / 2;
      drawY = (canvas.height - drawHeight) / 2;

      context.fillStyle = isHome ? "#101828" : "#d7d8d6";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.drawImage(bitmap, drawX, drawY, drawWidth, drawHeight);
      lastDrawnFrame = target;
    };

    const decodeFrame = (index: number) => {
      if (
        cancelled ||
        bitmapCache.has(index) ||
        pendingBitmaps.has(index) ||
        !frameBlobs[index]
      ) {
        return pendingBitmaps.get(index) ?? Promise.resolve();
      }

      const pending = createImageBitmap(frameBlobs[index] as Blob)
        .then((bitmap) => {
          if (cancelled) {
            bitmap.close();
            return;
          }

          bitmapCache.set(index, bitmap);
          trimBitmapCache(targetFrame());

          if (index === targetFrame()) {
            lastDrawnFrame = -1;
            drawFrame(true);
          }
        })
        .catch(() => {
          // A nearby cached frame remains visible if an individual decode fails.
        })
        .finally(() => {
          pendingBitmaps.delete(index);
        });

      pendingBitmaps.set(index, pending);
      return pending;
    };

    const primeFrameWindow = (target: number) => {
      void decodeFrame(target);
      for (let offset = 1; offset <= PRELOAD_RADIUS; offset += 1) {
        if (target + offset < FRAME_COUNT) void decodeFrame(target + offset);
        if (target - offset >= 0) void decodeFrame(target - offset);
      }
    };

    const resizeCanvas = () => {
      const rect = sticky.getBoundingClientRect();
      const deviceScale = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(rect.width * deviceScale));
      const height = Math.max(1, Math.round(rect.height * deviceScale));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        lastDrawnFrame = -1;
        drawFrame(true);
      }
    };

    const positionText = (progress: number) => {
      const viewportHeight = sticky.clientHeight;
      const viewportWidth = sticky.clientWidth;
      const mobile = viewportWidth <= 680;

      if (isHome) {
        const firstEntry = smoothstep(0.04, 0.2, progress);
        const firstExit = smoothstep(0.3, 0.5, progress);
        const secondEntry = smoothstep(0.3, 0.5, progress);
        const compacting = smoothstep(0.62, 0.82, progress);
        const summaryEntry = smoothstep(0.76, 0.92, progress);
        const firstOpacity = firstEntry * (1 - firstExit);
        const firstY = (1 - firstEntry) * viewportHeight * 0.72 - firstExit * viewportHeight * 0.96;
        const secondX = (1 - secondEntry) * viewportWidth * 0.78;
        const secondY = -compacting * viewportHeight * (mobile ? 0.22 : 0.24);
        const secondScale = 1 - compacting * (mobile ? 0.34 : 0.38);
        const summaryStartY = viewportHeight * 0.72;
        const summaryEndY = viewportHeight * (mobile ? 0.32 : 0.34);
        const summaryY = summaryStartY + (summaryEndY - summaryStartY) * summaryEntry;

        labelElement.style.opacity = String(firstOpacity);
        labelElement.style.transform = `translate3d(-50%, calc(-50% + ${firstY}px), 0)`;
        titleElement.style.opacity = String(secondEntry);
        titleElement.style.transform = `translate3d(calc(-50% + ${secondX}px), calc(-50% + ${secondY}px), 0) scale(${secondScale})`;
        summaryElement.style.opacity = String(summaryEntry);
        summaryElement.style.transform = `translate3d(-50%, calc(-50% + ${summaryY}px), 0)`;
        return;
      }

      const labelEntry = smoothstep(0.03, 0.2, progress);
      const titleEntry = smoothstep(0.22, 0.4, progress);
      const compacting = smoothstep(0.54, 0.72, progress);
      const summaryEntry = smoothstep(0.64, 0.82, progress);

      const labelX = (1 - labelEntry) * viewportWidth * 0.72;
      const titleX = -(1 - titleEntry) * viewportWidth * 0.72;
      const labelStartY = mobile ? -54 : -72;
      const titleStartY = mobile ? 20 : 42;
      const labelEndY = -viewportHeight * (mobile ? 0.36 : 0.37);
      const titleEndY = -viewportHeight * (mobile ? 0.27 : 0.28);
      const labelY = labelStartY + (labelEndY - labelStartY) * compacting;
      const titleY = titleStartY + (titleEndY - titleStartY) * compacting;
      const labelScale = 1 - compacting * (mobile ? 0.55 : 0.58);
      const titleScale = 1 - compacting * (mobile ? 0.5 : 0.57);
      const summaryStartY = viewportHeight * 0.7;
      const summaryEndY = viewportHeight * (mobile ? 0.27 : 0.29);
      const summaryY = summaryStartY + (summaryEndY - summaryStartY) * summaryEntry;

      labelElement.style.opacity = String(labelEntry);
      labelElement.style.transform = `translate3d(calc(-50% + ${labelX}px), calc(-50% + ${labelY}px), 0) scale(${labelScale})`;
      titleElement.style.opacity = String(titleEntry);
      titleElement.style.transform = `translate3d(calc(-50% + ${titleX}px), calc(-50% + ${titleY}px), 0) scale(${titleScale})`;
      summaryElement.style.opacity = String(summaryEntry);
      summaryElement.style.transform = `translate3d(-50%, calc(-50% + ${summaryY}px), 0)`;
    };

    const updateFromScroll = () => {
      animationFrame = 0;

      if (reducedMotion) {
        progressRef.current = 1;
      } else {
        const sectionRect = section.getBoundingClientRect();
        const stickyTop = Number.parseFloat(window.getComputedStyle(sticky).top) || 0;
        const scrollDistance = Math.max(1, section.offsetHeight - sticky.offsetHeight);
        progressRef.current = clamp((stickyTop - sectionRect.top) / scrollDistance);
      }

      positionText(progressRef.current);
      primeFrameWindow(targetFrame());
      drawFrame();
    };

    const requestUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateFromScroll);
      }
    };

    const loadFrame = async (index: number) => {
      try {
        const response = await fetch(frameSource(frameRoot, index), { cache: "force-cache" });
        if (!response.ok) throw new Error(`Frame ${index + 1} failed to load`);
        frameBlobs[index] = await response.blob();
      } catch {
        failures += 1;
      } finally {
        completedFrames += 1;
        if (!cancelled) {
          setLoadingProgress(Math.round((completedFrames / FRAME_COUNT) * 100));
        }
      }

      if (index === 0 || Math.abs(index - targetFrame()) <= PRELOAD_RADIUS) {
        await decodeFrame(index);
      }
    };

    const loadWorker = async () => {
      while (!cancelled) {
        const index = loadCursor;
        loadCursor += 1;
        if (index >= FRAME_COUNT) return;
        await loadFrame(index);
      }
    };

    const preloadFrames = async () => {
      await Promise.all(
        Array.from({ length: PRELOAD_CONCURRENCY }, () => loadWorker()),
      );

      if (cancelled) return;
      await decodeFrame(targetFrame());
      setFailedFrames(failures);
      setReady(true);
      lastDrawnFrame = -1;
      drawFrame(true);
    };

    resizeCanvas();
    positionText(reducedMotion ? 1 : 0);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      requestUpdate();
    });
    resizeObserver.observe(sticky);

    void preloadFrames();
    updateFromScroll();

    return () => {
      cancelled = true;
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      bitmapCache.forEach((bitmap) => bitmap.close());
      bitmapCache.clear();
    };
  }, [frameRoot, variant]);

  return (
    <section
      ref={sectionRef}
      className={`scroll-sequence scroll-sequence--${variant}`}
      aria-label={
        variant === "home"
          ? "Pamtech Group growth and service sequence"
          : "Pamtech Autoparts vehicle parts sequence"
      }
    >
      <div ref={stickyRef} className="scroll-sequence__sticky">
        <canvas
          ref={canvasRef}
          className="scroll-sequence__canvas"
          role="img"
          aria-label={
            variant === "home"
              ? "Pamtech Group's future-facing service and growth visual"
              : "A vehicle progressively separates into its component parts"
          }
        />

        <div className="scroll-sequence__shade" aria-hidden="true" />

        <div className="scroll-sequence__copy">
          <p ref={labelRef} className="scroll-sequence__label">
            {label}
          </p>
          <h1 ref={titleRef} className="scroll-sequence__title">
            {title}
          </h1>
          <p ref={summaryRef} className="scroll-sequence__summary">
            {summary}
          </p>
        </div>

        <div
          className={`scroll-sequence__status${ready ? " is-ready" : ""}`}
          role="status"
          aria-live="polite"
        >
          <p>
            {failedFrames
              ? `Preparing animation (${failedFrames} frame${failedFrames === 1 ? "" : "s"} unavailable)`
              : `Preparing animation ${loadingProgress}%`}
          </p>
          <span aria-hidden="true">
            <i style={{ width: `${loadingProgress}%` }} />
          </span>
        </div>
      </div>
    </section>
  );
}

export function HomeSequenceHero(
  props: Omit<AutopartsSequenceHeroProps, "frameRoot" | "variant">,
) {
  return (
    <AutopartsSequenceHero
      {...props}
      frameRoot="/media/home-sequence"
      variant="home"
    />
  );
}
