"use client";

import { useEffect, useRef } from "react";
import { FINALE_TOTAL_SECONDS } from "./finaleMediaTimeline";
import { withBasePath } from "./sitePaths";

type Point = { x: number; y: number };
type ActorKind = "ko" | "firm";
type ArenaGeometry = {
  kapFamily: Point[];
  scofSnow: Point[];
  source: Point[];
  scatterOne: Point[];
  scatterTwo: Point[];
  finalMarks: Point[];
  introEdge: Point[];
  introKap: Point[];
  introFirm: Point[];
  introScatter: Point[];
  introDual: Point[];
  introHandoff: Point[];
};

const TAU = Math.PI * 2;
const INTRO_END = 10;

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => {
  const normalized = clamp01(value);
  return normalized * normalized * (3 - 2 * normalized);
};
const mix = (from: number, to: number, amount: number) => from + (to - from) * amount;
const mixPoint = (from: Point, to: Point, amount: number): Point => ({
  x: mix(from.x, to.x, amount),
  y: mix(from.y, to.y, amount),
});
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
  const step = Math.max(2, Math.floor(Math.sqrt((width * height) / Math.max(1, count * 5))));
  for (let y = 0; y < mask.height; y += step) {
    for (let x = 0; x < mask.width; x += step) {
      if (pixels[(y * mask.width + x) * 4 + 3] > 70) candidates.push({ x, y });
    }
  }
  if (!candidates.length) return [{ x: width / 2, y: height / 2 }];
  return Array.from({ length: count }, (_, index) => {
    const distributed = ((index + hash(index, 12) * 0.42) / count) * candidates.length;
    return candidates[Math.floor(distributed) % candidates.length];
  });
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

function keyframePath(points: Point[], progress: number, dwell = 0.09): Point {
  const normalized = clamp01(progress);
  const scaled = normalized * (points.length - 1);
  const segment = Math.min(points.length - 2, Math.floor(scaled));
  const local = scaled - segment;
  const travelling = ease((local - dwell) / (1 - dwell * 2));
  return mixPoint(points[segment], points[segment + 1], travelling);
}

function drawResponsiveTitle(context: CanvasRenderingContext2D, title: "kap" | "firm", width: number, height: number) {
  const compact = width < 620;
  const tiny = width < 260;
  const centreX = width / 2;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = `900 ${compact ? Math.min(width * (tiny ? 0.29 : 0.24), height * 0.18) : Math.min(width * 0.13, height * 0.2)}px Georgia, serif`;
  if (compact) {
    context.fillText(title === "kap" ? "KAP" : "ST", centreX, height * 0.43);
    context.fillText(title === "kap" ? "OSSEN" : "FIRM", centreX, height * 0.59);
  } else {
    context.fillText(title === "kap" ? "KAP OSSEN" : "ST-FIRM", centreX, height * 0.51);
  }
}

function buildGeometry(width: number, height: number): ArenaGeometry {
  const count = width < 260 ? 150 : width < 620 ? 480 : 900;
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
  const introKap = sampleMask(width, height, count, (context) => drawResponsiveTitle(context, "kap", width, height));
  const introFirm = sampleMask(width, height, count, (context) => drawResponsiveTitle(context, "firm", width, height));
  const introEdge = Array.from({ length: count }, (_, index) => perimeterPoint(index / count, width, height));
  const introScatter = Array.from({ length: count }, (_, index) => ({
    x: width * (0.04 + hash(index, 21) * 0.92),
    y: height * (0.08 + hash(index, 22) * 0.82),
  }));
  const introDual = Array.from({ length: count }, (_, index) => {
    const koSide = index < count / 2;
    const angle = hash(index, 23) * TAU;
    const radius = Math.sqrt(hash(index, 24)) * Math.min(width, height) * 0.09;
    return {
      x: width * (koSide ? 0.62 : 0.38) + Math.cos(angle) * radius,
      y: height * 0.5 + Math.sin(angle) * radius,
    };
  });
  const introHandoff = Array.from({ length: count }, (_, index) => {
    const koSide = index < count / 2;
    const target = perimeterPoint(koSide ? 0.75 : 0.5, width, height);
    const angle = hash(index, 25) * TAU;
    const radius = Math.sqrt(hash(index, 26)) * Math.min(width, height) * 0.055;
    return { x: target.x + Math.cos(angle) * radius, y: target.y + Math.sin(angle) * radius };
  });
  const finalMarks = Array.from({ length: count }, (_, index) => {
    const left = index < count / 2;
    const angle = hash(index, left ? 7 : 8) * TAU;
    const radius = Math.sqrt(hash(index, left ? 9 : 10)) * Math.min(width, height) * 0.065;
    return {
      x: width * (left ? 0.4 : 0.6) + Math.cos(angle) * radius,
      y: height * 0.8 + Math.sin(angle) * radius,
    };
  });
  return {
    kapFamily, scofSnow, source, scatterOne, scatterTwo, finalMarks,
    introEdge, introKap, introFirm, introScatter, introDual, introHandoff,
  };
}

function actorPosition(time: number, actor: ActorKind, width: number, height: number): Point {
  const left = Math.max(34, width * 0.08);
  const right = width - left;
  const top = Math.max(30, height * 0.1);
  const bottom = height - top;
  const centre = { x: width / 2, y: height / 2 };
  if (time < 31) {
    const koProgress = clamp01((time - INTRO_END) / 21);
    const firmProgress = clamp01((time - INTRO_END - 0.55) / 20.45);
    const koCorners = [
      { x: left, y: bottom }, { x: right, y: top }, { x: right, y: bottom },
      { x: left, y: top }, { x: left, y: bottom },
    ];
    const firmCorners = [
      { x: right, y: bottom }, { x: left, y: top }, { x: right, y: top },
      { x: left, y: bottom }, { x: right, y: bottom },
    ];
    return keyframePath(actor === "ko" ? koCorners : firmCorners, actor === "ko" ? koProgress : firmProgress, 0.11);
  }
  if (time < 63) {
    const progress = clamp01((time - 31) / 32);
    if (actor === "ko") return perimeterPoint(progress + 0.75, width, height);
    const angle = -progress * TAU + Math.PI;
    return {
      x: centre.x + Math.sin(angle) * width * 0.4,
      y: centre.y + Math.sin(angle * 2) * height * 0.31,
    };
  }
  if (time < 76) {
    const progress = clamp01((time - 63) / 13);
    if (actor === "ko") {
      return keyframePath([
        { x: centre.x, y: top }, { x: right, y: centre.y }, { x: centre.x, y: bottom },
        { x: left, y: centre.y }, { x: centre.x, y: top },
      ], progress, 0.08);
    }
    return {
      x: mix(right, left, ease(progress)),
      y: centre.y + Math.sin(progress * TAU * 1.5) * height * 0.32,
    };
  }
  const collapse = ease((time - 76) / 6);
  if (actor === "ko") {
    const angle = (time - 76) * 0.95;
    return {
      x: centre.x + Math.cos(angle) * width * 0.38 * (1 - collapse),
      y: centre.y + Math.sin(angle) * height * 0.34 * (1 - collapse),
    };
  }
  const zigzag = Math.sin(collapse * Math.PI * 5) * (1 - collapse);
  return {
    x: centre.x + zigzag * width * 0.34,
    y: mix(bottom, centre.y, collapse),
  };
}

function introParticlePosition(time: number, index: number, geometry: ArenaGeometry): Point {
  const edge = geometry.introEdge[index % geometry.introEdge.length];
  const kap = geometry.introKap[index % geometry.introKap.length];
  const source = geometry.source[index % geometry.source.length];
  const dual = geometry.introDual[index % geometry.introDual.length];
  const scatter = geometry.introScatter[index % geometry.introScatter.length];
  const firm = geometry.introFirm[index % geometry.introFirm.length];
  const handoff = geometry.introHandoff[index % geometry.introHandoff.length];
  if (time < 0.4) return mixPoint(edge, kap, ease(time / 0.4));
  if (time < 2.4) return kap;
  if (time < 3.2) return mixPoint(kap, source, ease((time - 2.4) / 0.8));
  if (time < 5.6) return source;
  if (time < 6.5) return mixPoint(dual, scatter, ease((time - 5.6) / 0.9));
  if (time < 8.3) return mixPoint(scatter, firm, ease((time - 6.5) / 1.8));
  if (time < 9.3) return firm;
  return mixPoint(firm, handoff, ease((time - 9.3) / 0.7));
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
  return mixPoint(from, to, amount);
}

function createSnowflakeSprite(colour: string) {
  const sprite = document.createElement("canvas");
  sprite.width = 28;
  sprite.height = 28;
  const context = sprite.getContext("2d");
  if (!context) return sprite;
  context.translate(14, 14);
  context.strokeStyle = colour;
  context.lineWidth = 2.8;
  context.lineCap = "round";
  context.shadowBlur = 5;
  context.shadowColor = colour;
  for (let branch = 0; branch < 3; branch += 1) {
    const angle = (branch * Math.PI) / 3;
    context.beginPath();
    context.moveTo(-10 * Math.cos(angle), -10 * Math.sin(angle));
    context.lineTo(10 * Math.cos(angle), 10 * Math.sin(angle));
    context.stroke();
    for (const direction of [-1, 1]) {
      const tipX = direction * 7 * Math.cos(angle);
      const tipY = direction * 7 * Math.sin(angle);
      for (const fork of [-1, 1]) {
        const forkAngle = angle + direction * Math.PI + fork * 0.55;
        context.beginPath();
        context.moveTo(tipX, tipY);
        context.lineTo(tipX + Math.cos(forkAngle) * 3.5, tipY + Math.sin(forkAngle) * 3.5);
        context.stroke();
      }
    }
  }
  context.fillStyle = "#fff";
  context.beginPath();
  context.arc(0, 0, 1.6, 0, TAU);
  context.fill();
  return sprite;
}

function drawFormationUnderlay(
  context: CanvasRenderingContext2D,
  title: "kap" | "firm",
  width: number,
  height: number,
  alpha: number,
) {
  context.save();
  context.globalAlpha = alpha;
  context.fillStyle = title === "kap" ? "#4b1458" : "#361244";
  context.shadowBlur = 26;
  context.shadowColor = title === "kap" ? "#f1cf70" : "#d998cf";
  drawResponsiveTitle(context, title, width, height);
  context.restore();
}

function drawRadialFragments(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  position: Point,
  size: number,
  explosion: number,
  alpha: number,
) {
  const pieces = 24;
  for (let index = 0; index < pieces; index += 1) {
    const start = (index / pieces) * TAU - 0.025;
    const end = ((index + 1) / pieces) * TAU + 0.025;
    const centre = (start + end) / 2;
    const distance = explosion * size * (0.34 + hash(index, 31) * 0.42);
    context.save();
    context.globalAlpha = alpha;
    context.translate(position.x + Math.cos(centre) * distance, position.y + Math.sin(centre) * distance);
    context.rotate((hash(index, 32) - 0.5) * explosion * 0.95);
    context.beginPath();
    context.moveTo(0, 0);
    context.arc(0, 0, size * 0.58, start, end);
    context.closePath();
    context.clip();
    context.shadowBlur = 18;
    context.shadowColor = "rgba(229,189,89,.7)";
    context.drawImage(image, -size / 2, -size / 2, size, size);
    context.restore();
  }
}

function drawGridFragments(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  position: Point,
  size: number,
  explosion: number,
  alpha: number,
) {
  const columns = 5;
  const rows = 4;
  const sourceWidth = image.naturalWidth / columns;
  const sourceHeight = image.naturalHeight / rows;
  const cellWidth = size / columns;
  const cellHeight = size / rows;
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const index = row * columns + column;
      const localX = (column + 0.5) * cellWidth - size / 2;
      const localY = (row + 0.5) * cellHeight - size / 2;
      const length = Math.hypot(localX, localY) || 1;
      const distance = explosion * size * (0.24 + hash(index, 33) * 0.38);
      context.save();
      context.globalAlpha = alpha;
      context.translate(position.x + localX + (localX / length) * distance, position.y + localY + (localY / length) * distance);
      context.rotate((hash(index, 34) - 0.5) * explosion * 0.9);
      context.shadowBlur = 14;
      context.shadowColor = "rgba(151,72,176,.62)";
      context.drawImage(
        image,
        column * sourceWidth, row * sourceHeight, sourceWidth, sourceHeight,
        -cellWidth / 2, -cellHeight / 2, cellWidth + 0.5, cellHeight + 0.5,
      );
      context.restore();
    }
  }
}

function drawShockwave(context: CanvasRenderingContext2D, position: Point, size: number, progress: number) {
  const normalized = clamp01(progress);
  if (normalized <= 0 || normalized >= 1) return;
  context.save();
  context.globalAlpha = (1 - normalized) * 0.72;
  context.strokeStyle = "#f1cf70";
  context.lineWidth = Math.max(1, 3 * (1 - normalized));
  context.shadowBlur = 18;
  context.shadowColor = "#fff1a8";
  context.beginPath();
  context.arc(position.x, position.y, size * (0.5 + normalized * 1.7), 0, TAU);
  context.stroke();
  context.restore();
}

export default function FinaleBrandArena({ ceremonyTime, paused }: { ceremonyTime: number; paused: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const geometryRef = useRef<ArenaGeometry | null>(null);
  const imagesRef = useRef<{ ko: HTMLImageElement; firm: HTMLImageElement } | null>(null);
  const spritesRef = useRef<HTMLCanvasElement[]>([]);
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
    spritesRef.current = ["#f1cf70", "#fff7d5", "#7a2f87", "#d998cf", "#ffffff", "#77b989"].map(createSnowflakeSprite);
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
      const sprites = spritesRef.current;
      const bounds = host.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      context?.setTransform(ratio, 0, 0, ratio, 0, 0);
      context?.clearRect(0, 0, bounds.width, bounds.height);
      const elapsed = pausedRef.current ? 0 : (now - syncRef.current) / 1000;
      const time = Math.max(0, Math.min(FINALE_TOTAL_SECONDS - 0.001, timeRef.current + elapsed));
      if (context && images && geometry && sprites.length && bounds.width > 0 && bounds.height > 0) {
        const minDimension = Math.min(bounds.width, bounds.height);
        const koSize = Math.max(76, Math.min(158, minDimension * 0.22));
        const firmSize = koSize * 0.76;
        const centre = { x: bounds.width / 2, y: bounds.height / 2 };
        const drawActorAt = (kind: ActorKind, position: Point, alpha = 1, rotation = 0, scale = 1) => {
          const image = images[kind];
          const size = (kind === "ko" ? koSize : firmSize) * scale;
          context.save();
          context.globalAlpha = alpha;
          context.translate(position.x, position.y);
          context.rotate(rotation);
          context.shadowBlur = kind === "ko" ? 24 : 18;
          context.shadowColor = kind === "ko" ? "rgba(229,189,89,.72)" : "rgba(151,72,176,.62)";
          if (kind === "firm") {
            context.fillStyle = "rgba(255,255,255,.92)";
            context.beginPath();
            context.roundRect(-size * 0.48, -size * 0.48, size * 0.96, size * 0.96, size * 0.2);
            context.fill();
          }
          context.drawImage(image, -size / 2, -size / 2, size, size);
          context.restore();
        };
        const drawActor = (kind: ActorKind, at: number, alpha = 1, forcedPosition?: Point) => {
          const position = forcedPosition ?? actorPosition(at, kind, bounds.width, bounds.height);
          const previous = forcedPosition
            ? { x: forcedPosition.x + (kind === "ko" ? -2 : 2), y: forcedPosition.y }
            : actorPosition(Math.max(INTRO_END, at - 0.05), kind, bounds.width, bounds.height);
          const angle = Math.atan2(position.y - previous.y, position.x - previous.x) * 0.18;
          drawActorAt(kind, position, alpha, angle);
        };
        const drawSnowfield = (positions: (index: number) => Point, alpha: number, paletteOffset = 0) => {
          geometry.source.forEach((_, index) => {
            const point = positions(index);
            const shimmer = 0.74 + Math.sin(time * 4.2 + index * 0.37) * 0.24;
            const baseSize = bounds.width < 260 ? 7 : bounds.width < 620 ? 10.5 : 14;
            const size = baseSize * (0.78 + hash(index, 41) * 0.52);
            context.globalAlpha = alpha * shimmer;
            context.drawImage(sprites[(index + paletteOffset) % sprites.length], point.x - size / 2, point.y - size / 2, size, size);
          });
          context.globalAlpha = 1;
        };
        const drawBounceImpact = (position: Point, size: number, progress: number, paletteOffset: number) => {
          const normalized = clamp01(progress);
          drawShockwave(context, position, size, normalized);
          for (let index = 0; index < 14; index += 1) {
            const angle = (index / 14) * TAU + hash(index, paletteOffset + 50) * 0.22;
            const radius = size * (0.28 + normalized * (0.7 + hash(index, 52) * 0.55));
            const flakeSize = (bounds.width < 620 ? 7 : 10) * (0.75 + hash(index, 53) * 0.5);
            context.globalAlpha = (1 - normalized) * 0.9;
            context.drawImage(
              sprites[(index + paletteOffset) % sprites.length],
              position.x + Math.cos(angle) * radius - flakeSize / 2,
              position.y + Math.sin(angle) * radius - flakeSize / 2,
              flakeSize,
              flakeSize,
            );
          }
          context.globalAlpha = 1;
        };

        if (time < INTRO_END) {
          let snowAlpha = 1;
          if (time >= 3.2 && time < 5.6) snowAlpha = 0.3;
          else if (time >= 5.6 && time < 6.2) snowAlpha = mix(0.3, 1, ease((time - 5.6) / 0.6));
          if (time < 2.7) {
            const underlayAlpha = ease(time / 0.35) * (1 - ease((time - 2.35) / 0.35)) * 0.34;
            drawFormationUnderlay(context, "kap", bounds.width, bounds.height, underlayAlpha);
          } else if (time >= 6.2 && time < 9.5) {
            const underlayAlpha = ease((time - 6.2) / 0.45) * (1 - ease((time - 9.15) / 0.35)) * 0.36;
            drawFormationUnderlay(context, "firm", bounds.width, bounds.height, underlayAlpha);
          }
          drawSnowfield((index) => introParticlePosition(time, index, geometry), snowAlpha, time >= 5.6 ? 2 : 0);

          if (time >= 2.65 && time < 3.55) {
            const appear = ease((time - 2.65) / 0.55);
            drawActorAt("ko", centre, appear, 0, 0.86 + appear * 0.14);
          } else if (time >= 3.55 && time < 4.55) {
            let fracture = ease((time - 3.55) / 0.4);
            if (time >= 3.95 && time < 4.12) fracture = 1;
            else if (time >= 4.12) fracture = 1 - ease((time - 4.12) / 0.43);
            drawRadialFragments(context, images.ko, centre, koSize * 1.08, fracture, 1);
          } else if (time >= 4.55 && time < 4.9) {
            const settle = ease((time - 4.55) / 0.35);
            drawActorAt("ko", mixPoint(centre, { x: bounds.width * 0.38, y: bounds.height * 0.5 }, settle));
            drawActorAt("firm", { x: bounds.width * 0.62, y: bounds.height * 0.5 }, settle, 0, 0.96);
            drawShockwave(context, centre, koSize, (time - 4.55) / 0.35);
          } else if (time >= 4.9 && time < 5.6) {
            const orbit = ease((time - 4.9) / 0.7);
            const angle = orbit * Math.PI;
            const radiusX = bounds.width * 0.12;
            const radiusY = bounds.height * 0.095;
            const koPosition = { x: centre.x - Math.cos(angle) * radiusX, y: centre.y + Math.sin(angle) * radiusY };
            const firmPosition = { x: centre.x + Math.cos(angle) * radiusX, y: centre.y - Math.sin(angle) * radiusY };
            drawActorAt("ko", koPosition, 1, angle * 0.12);
            drawActorAt("firm", firmPosition, 1, -angle * 0.12);
          } else if (time >= 5.6 && time < 6.5) {
            const koPosition = { x: bounds.width * 0.62, y: bounds.height * 0.5 };
            const firmPosition = { x: bounds.width * 0.38, y: bounds.height * 0.5 };
            const explosion = ease((time - 5.6) / 0.58);
            const fragmentAlpha = 1 - ease((time - 6.08) / 0.42);
            drawRadialFragments(context, images.ko, koPosition, koSize, explosion, fragmentAlpha);
            drawGridFragments(context, images.firm, firmPosition, firmSize, explosion, fragmentAlpha);
            drawShockwave(context, koPosition, koSize * 0.7, (time - 5.92) / 0.48);
            drawShockwave(context, firmPosition, firmSize * 0.7, (time - 5.92) / 0.48);
          } else if (time >= 9.55) {
            const reform = ease((time - 9.55) / 0.45);
            drawActorAt("ko", perimeterPoint(0.75, bounds.width, bounds.height), reform);
            drawActorAt("firm", perimeterPoint(0.5, bounds.width, bounds.height), reform);
          }
        } else if (time < 82) {
          for (let trail = 3; trail >= 1; trail -= 1) {
            drawActor("ko", Math.max(INTRO_END, time - trail * 0.08), 0.04 * (4 - trail));
            drawActor("firm", Math.max(INTRO_END, time - trail * 0.08), 0.035 * (4 - trail));
          }
          drawActor("ko", time);
          drawActor("firm", time);
          if (time < 31) {
            const koTravel = (time - INTRO_END) / (21 / 4);
            const koLocal = koTravel - Math.floor(koTravel);
            if (koLocal < 0.14) drawBounceImpact(actorPosition(time, "ko", bounds.width, bounds.height), koSize * 0.72, koLocal / 0.14, 0);
            const firmElapsed = time - INTRO_END - 0.55;
            if (firmElapsed >= 0) {
              const firmTravel = firmElapsed / (20.45 / 4);
              const firmLocal = firmTravel - Math.floor(firmTravel);
              if (firmLocal < 0.14) drawBounceImpact(actorPosition(time, "firm", bounds.width, bounds.height), firmSize * 0.72, firmLocal / 0.14, 2);
            }
          }
        } else {
          drawSnowfield((index) => particlePosition(time, index, geometry), 1, 0);
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
