"use client";

import { useEffect, useRef } from "react";
import { FINALE_TOTAL_SECONDS } from "./finaleMediaTimeline";
import { withBasePath } from "./sitePaths";

type Point = { x: number; y: number };
type ArenaGeometry = {
  kapFamily: Point[];
  scofSnow: Point[];
  source: Point[];
  scatterOne: Point[];
  scatterTwo: Point[];
  finalMarks: Point[];
};

const TAU = Math.PI * 2;

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => {
  const normalized = clamp01(value);
  return normalized * normalized * (3 - 2 * normalized);
};
const mix = (from: number, to: number, amount: number) => from + (to - from) * amount;
const hash = (index: number, salt = 0) => {
  const value = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

function sampleMask(width: number, height: number, count: number, draw: (context: CanvasRenderingContext2D) => void) {
  const mask = document.createElement("canvas");
  mask.width = Math.max(1, Math.round(width));
  mask.height = Math.max(1, Math.round(height));
  const context = mask.getContext("2d", { willReadFrequently: true });
  if (!context) return [];
  context.clearRect(0, 0, width, height);
  context.fillStyle = "#fff";
  draw(context);
  const pixels = context.getImageData(0, 0, mask.width, mask.height).data;
  const candidates: Point[] = [];
  const step = Math.max(3, Math.floor(Math.sqrt((width * height) / Math.max(1, count * 4))));
  for (let y = 0; y < mask.height; y += step) {
    for (let x = 0; x < mask.width; x += step) {
      if (pixels[(y * mask.width + x) * 4 + 3] > 70) candidates.push({ x, y });
    }
  }
  if (!candidates.length) return [{ x: width / 2, y: height / 2 }];
  return Array.from({ length: count }, (_, index) => candidates[Math.floor((index / count) * candidates.length) % candidates.length]);
}

function buildGeometry(width: number, height: number): ArenaGeometry {
  const count = width < 260 ? 80 : width < 620 ? 220 : 420;
  const centreX = width / 2;
  const centreY = height * 0.5;
  const sourceRadius = Math.min(width, height) * 0.13;
  const source = Array.from({ length: count }, (_, index) => {
    const angle = hash(index, 1) * TAU;
    const radius = Math.sqrt(hash(index, 2)) * sourceRadius;
    return { x: centreX + Math.cos(angle) * radius, y: centreY + Math.sin(angle) * radius };
  });
  const scatterOne = Array.from({ length: count }, (_, index) => ({
    x: width * (0.08 + hash(index, 3) * 0.84),
    y: height * (0.12 + hash(index, 4) * 0.72),
  }));
  const scatterTwo = Array.from({ length: count }, (_, index) => ({
    x: width * (0.05 + hash(index, 5) * 0.9),
    y: height * (0.1 + hash(index, 6) * 0.76),
  }));
  const kapFamily = sampleMask(width, height, count, (context) => {
    const headline = Math.min(width * 0.125, height * 0.19);
    const family = headline * 0.48;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = `900 ${headline}px Georgia, serif`;
    context.fillText("KAP OSSEN", centreX, height * 0.43);
    context.font = `800 ${family}px Georgia, serif`;
    context.fillText("F A M I L Y", centreX, height * 0.58);
  });
  const scofSnow = sampleMask(width, height, count, (context) => {
    const headline = Math.min(width * 0.18, height * 0.25);
    const snow = headline * 0.34;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = `900 ${headline}px Georgia, serif`;
    context.fillText("SCOF", centreX, height * 0.5);
    context.font = `700 ${snow}px Georgia, serif`;
    for (const [x, y] of [[0.16, 0.28], [0.28, 0.72], [0.72, 0.28], [0.84, 0.72], [0.5, 0.2], [0.5, 0.8]]) {
      context.fillText("\u2726", width * x, height * y);
    }
  });
  const finalMarks = Array.from({ length: count }, (_, index) => {
    const left = index < count / 2;
    const localIndex = left ? index : index - Math.floor(count / 2);
    const angle = hash(localIndex, left ? 7 : 8) * TAU;
    const radius = Math.sqrt(hash(localIndex, left ? 9 : 10)) * Math.min(width, height) * 0.065;
    return {
      x: width * (left ? 0.4 : 0.6) + Math.cos(angle) * radius,
      y: height * 0.8 + Math.sin(angle) * radius,
    };
  });
  return { kapFamily, scofSnow, source, scatterOne, scatterTwo, finalMarks };
}

function perimeterPoint(progress: number, width: number, height: number): Point {
  const marginX = Math.max(30, width * 0.07);
  const marginY = Math.max(28, height * 0.09);
  const left = marginX;
  const right = width - marginX;
  const top = marginY;
  const bottom = height - marginY;
  const horizontal = right - left;
  const vertical = bottom - top;
  const distance = (((progress % 1) + 1) % 1) * (horizontal * 2 + vertical * 2);
  if (distance < horizontal) return { x: left + distance, y: top };
  if (distance < horizontal + vertical) return { x: right, y: top + distance - horizontal };
  if (distance < horizontal * 2 + vertical) return { x: right - (distance - horizontal - vertical), y: bottom };
  return { x: left, y: bottom - (distance - horizontal * 2 - vertical) };
}

function actorPosition(time: number, actor: "ko" | "firm", width: number, height: number): Point {
  const offset = actor === "ko" ? 0 : 0.5;
  if (time < 31) return perimeterPoint(time / 15.5 + offset, width, height);
  if (time < 63) {
    const angle = ((time - 31) / 8) * TAU + (actor === "ko" ? 0 : Math.PI);
    return {
      x: width / 2 + Math.sin(angle) * width * 0.4,
      y: height / 2 + Math.sin(angle * 2) * height * 0.31,
    };
  }
  if (time < 76) return perimeterPoint((time - 63) / 5.2 + offset, width, height);
  const spiral = ease((time - 76) / 6);
  const angle = (time - 76) * 2.4 + (actor === "ko" ? 0 : Math.PI);
  return {
    x: width / 2 + Math.cos(angle) * width * 0.38 * (1 - spiral),
    y: height / 2 + Math.sin(angle) * height * 0.34 * (1 - spiral),
  };
}

function particlePosition(time: number, index: number, geometry: ArenaGeometry): Point {
  const source = geometry.source[index % geometry.source.length];
  const scatterOne = geometry.scatterOne[index % geometry.scatterOne.length];
  const kap = geometry.kapFamily[index % geometry.kapFamily.length];
  const scatterTwo = geometry.scatterTwo[index % geometry.scatterTwo.length];
  const scof = geometry.scofSnow[index % geometry.scofSnow.length];
  const finalMark = geometry.finalMarks[index % geometry.finalMarks.length];
  let from = source;
  let to = scatterOne;
  let amount = ease((time - 82) / 1.2);
  if (time >= 83.2 && time < 85.2) {
    from = scatterOne; to = kap; amount = ease((time - 83.2) / 2);
  } else if (time >= 85.2 && time < 86) {
    from = kap; to = kap; amount = 1;
  } else if (time >= 86 && time < 87.2) {
    from = kap; to = scatterTwo; amount = ease((time - 86) / 1.2);
  } else if (time >= 87.2 && time < 89.5) {
    from = scatterTwo; to = scof; amount = ease((time - 87.2) / 2.3);
  } else if (time >= 89.5 && time < 91) {
    from = scof; to = scof; amount = 1;
  } else if (time >= 91 && time < 92) {
    from = scof; to = scatterOne; amount = ease(time - 91);
  } else if (time >= 92) {
    from = scatterOne; to = finalMark; amount = ease((time - 92) / 1.45);
  }
  return { x: mix(from.x, to.x, amount), y: mix(from.y, to.y, amount) };
}

export default function FinaleBrandArena({ ceremonyTime, paused }: { ceremonyTime: number; paused: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const geometryRef = useRef<ArenaGeometry | null>(null);
  const imagesRef = useRef<{ ko: HTMLImageElement; firm: HTMLImageElement } | null>(null);
  const timeRef = useRef(ceremonyTime);
  const syncRef = useRef(0);
  const pausedRef = useRef(paused);

  useEffect(() => {
    timeRef.current = ceremonyTime;
    syncRef.current = performance.now();
    pausedRef.current = paused;
  }, [ceremonyTime, paused]);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const load = (src: string) => new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = withBasePath(src);
    });
    void Promise.all([
      load("/brand/kap-ossen/ko-crest-arena-trimmed-768.webp"),
      load("/st-firm-logo.png"),
    ]).then(([ko, firm]) => { imagesRef.current = { ko, firm }; });

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(bounds.width * ratio));
      canvas.height = Math.max(1, Math.round(bounds.height * ratio));
      canvas.style.width = `${bounds.width}px`;
      canvas.style.height = `${bounds.height}px`;
      geometryRef.current = buildGeometry(bounds.width, bounds.height);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;
    let frame = 0;
    const draw = (now: number) => {
      const context = canvas.getContext("2d");
      const geometry = geometryRef.current;
      const images = imagesRef.current;
      const bounds = host.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      context?.setTransform(ratio, 0, 0, ratio, 0, 0);
      context?.clearRect(0, 0, bounds.width, bounds.height);
      const elapsed = pausedRef.current ? 0 : (now - syncRef.current) / 1000;
      const time = Math.max(0, Math.min(FINALE_TOTAL_SECONDS - 0.001, timeRef.current + elapsed));
      if (context && images && geometry && bounds.width > 0 && bounds.height > 0) {
        const minDimension = Math.min(bounds.width, bounds.height);
        const koSize = Math.max(76, Math.min(158, minDimension * 0.22));
        const firmSize = koSize * 0.76;
        const drawActor = (kind: "ko" | "firm", at: number, alpha = 1, forcedPosition?: Point) => {
          const position = forcedPosition ?? actorPosition(at, kind, bounds.width, bounds.height);
          const previous = forcedPosition
            ? { x: forcedPosition.x + (kind === "ko" ? -2 : 2), y: forcedPosition.y }
            : actorPosition(Math.max(0, at - 0.05), kind, bounds.width, bounds.height);
          const angle = Math.atan2(position.y - previous.y, position.x - previous.x) * 0.18;
          const image = images[kind];
          const size = kind === "ko" ? koSize : firmSize;
          context.save();
          context.globalAlpha = alpha;
          context.translate(position.x, position.y);
          context.rotate(angle);
          context.shadowBlur = kind === "ko" ? 24 : 18;
          context.shadowColor = kind === "ko" ? "rgba(229,189,89,.72)" : "rgba(151,72,176,.62)";
          if (kind === "firm") {
            context.fillStyle = "rgba(255,255,255,.9)";
            context.beginPath();
            context.roundRect(-size * 0.48, -size * 0.48, size * 0.96, size * 0.96, size * 0.2);
            context.fill();
          }
          context.drawImage(image, -size / 2, -size / 2, size, size);
          context.restore();
        };
        if (time < 82) {
          for (let trail = 5; trail >= 1; trail -= 1) {
            drawActor("ko", Math.max(0, time - trail * 0.07), 0.035 * (6 - trail));
            drawActor("firm", Math.max(0, time - trail * 0.07), 0.03 * (6 - trail));
          }
          drawActor("ko", time);
          drawActor("firm", time);
        } else {
          const colours = ["#f1cf70", "#fff7d5", "#7a2f87", "#d998cf", "#ffffff"];
          geometry.source.forEach((_, index) => {
            const point = particlePosition(time, index, geometry);
            const shimmer = 0.72 + Math.sin(time * 4 + index * 0.37) * 0.25;
            context.globalAlpha = shimmer;
            context.fillStyle = colours[index % colours.length];
            context.shadowBlur = index % 5 === 0 ? 8 : 3;
            context.shadowColor = colours[index % colours.length];
            context.beginPath();
            context.arc(point.x, point.y, bounds.width < 620 ? 1.35 : 1.8, 0, TAU);
            context.fill();
          });
          context.globalAlpha = 1;
          context.shadowBlur = 0;
          if (time >= 92.4) {
            const opacity = ease((time - 92.4) / 1.2);
            drawActor("ko", time, opacity, { x: bounds.width * 0.39, y: bounds.height * 0.79 });
            drawActor("firm", time, opacity, { x: bounds.width * 0.61, y: bounds.height * 0.79 });
          }
        }
      }
      frame = window.requestAnimationFrame(draw);
    };
    frame = window.requestAnimationFrame(draw);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return <div ref={hostRef} className="finaleBrandArena" aria-hidden="true"><canvas ref={canvasRef} /></div>;
}
