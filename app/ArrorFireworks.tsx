"use client";

import { useEffect, useRef, useState } from "react";

export type ArrorCeremonyPhase = "patrol" | "countdown" | "gather" | "form" | "break" | "fireworks" | "afterglow" | "return" | "cooldown" | "still";

type ArrorFireworksProps = {
  active: boolean;
  cycle: number;
  phase: ArrorCeremonyPhase;
  reducedMotion: boolean;
  sequence: number;
};

type Particle = {
  color: string;
  delay: number;
  drag: number;
  gravity: number;
  life: number;
  size: number;
  twinkle: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

const GOLD = "#f2ce68";
const PALE_GOLD = "#fff0b0";
const EMERALD = "#3ccc78";
const IVORY = "#fffbed";
const PLUM = "#d49ade";

function seededUnit(index: number, seed: number) {
  return ((index * 37 + seed * 53 + 17) % 101) / 100;
}

function addRadial(
  particles: Particle[],
  x: number,
  y: number,
  count: number,
  speed: number,
  color: string,
  delay: number,
  seed: number,
  options: Partial<Pick<Particle, "drag" | "gravity" | "life" | "size" | "twinkle">> = {},
) {
  for (let index = 0; index < count; index += 1) {
    const angle = (Math.PI * 2 * index) / count + seededUnit(index, seed) * 0.045;
    const velocity = speed * (0.84 + seededUnit(index + 5, seed) * 0.28);
    particles.push({
      color,
      delay: delay + (index % 4) * 0.008,
      drag: options.drag ?? 0.988,
      gravity: options.gravity ?? 34,
      life: options.life ?? 1.55,
      size: options.size ?? 2.1,
      twinkle: options.twinkle ?? 0.22,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity,
      x,
      y,
    });
  }
}

function addCometFan(particles: Particle[], width: number, height: number, seed: number) {
  const launches = [
    [0.08, 0.82, 0.33, 0.3],
    [0.22, 0.88, 0.43, 0.23],
    [0.39, 0.9, 0.52, 0.2],
    [0.61, 0.9, 0.58, 0.2],
    [0.78, 0.88, 0.69, 0.25],
    [0.92, 0.82, 0.78, 0.32],
  ];
  launches.forEach(([fromX, fromY, toX, toY], launchIndex) => {
    const duration = 0.72 + (launchIndex % 3) * 0.06;
    for (let trail = 0; trail < 10; trail += 1) {
      particles.push({
        color: launchIndex % 2 === 0 ? EMERALD : PALE_GOLD,
        delay: trail * 0.026 + launchIndex * 0.022,
        drag: 1,
        gravity: 0,
        life: duration,
        size: trail === 0 ? 3.1 : 1.7,
        twinkle: 0.12,
        vx: ((toX - fromX) * width) / duration,
        vy: ((toY - fromY) * height) / duration,
        x: fromX * width + seededUnit(trail, seed + launchIndex) * 2,
        y: fromY * height,
      });
    }
  });
}

function buildParticles(width: number, height: number, phase: ArrorCeremonyPhase, cycle: number, sequence: number) {
  const particles: Particle[] = [];
  const mobile = width < 620;
  const density = mobile ? 0.58 : width < 920 ? 0.76 : 1;
  const count = (value: number) => Math.max(8, Math.round(value * density));
  const seed = sequence * 11 + cycle * 7;

  if (phase === "break") {
    addCometFan(particles, width, height, seed);
    return particles;
  }

  if (phase !== "fireworks") return particles;

  if (cycle === 1) {
    addRadial(particles, width * 0.43, height * 0.3, count(42), width * 0.095, EMERALD, 0.02, seed, { gravity: 24, life: 1.35, twinkle: 0.12 });
    addRadial(particles, width * 0.68, height * 0.23, count(48), width * 0.105, GOLD, 0.22, seed + 1, { gravity: 28, life: 1.5, twinkle: 0.2 });
    addRadial(particles, width * 0.84, height * 0.37, count(34), width * 0.075, IVORY, 0.44, seed + 2, { gravity: 22, life: 1.18, size: 1.7, twinkle: 0.42 });
  } else if (cycle === 2) {
    addRadial(particles, width * 0.38, height * 0.24, count(54), width * 0.11, GOLD, 0.02, seed, { drag: 0.995, gravity: 42, life: 1.85, size: 2.25, twinkle: 0.34 });
    addRadial(particles, width * 0.72, height * 0.3, count(58), width * 0.115, PALE_GOLD, 0.26, seed + 1, { drag: 0.994, gravity: 44, life: 1.9, size: 2.15, twinkle: 0.3 });
    [[0.52, 0.19], [0.86, 0.43]].forEach(([x, y], burstIndex) => {
      for (let branch = 0; branch < 4; branch += 1) {
        const angle = Math.PI / 4 + (Math.PI / 2) * branch;
        for (let spark = 0; spark < count(11); spark += 1) {
          const velocity = width * (0.055 + spark * 0.0014);
          particles.push({ color: burstIndex === 0 ? IVORY : PLUM, delay: 0.42 + burstIndex * 0.18 + spark * 0.006, drag: 0.992, gravity: 20, life: 1.28, size: 1.8, twinkle: 0.48, vx: Math.cos(angle) * velocity, vy: Math.sin(angle) * velocity, x: width * x, y: height * y });
        }
      }
    });
  } else {
    const fanAngles = [-1.29, -1.12, -0.96, -0.8, -0.64];
    [0.08, 0.92].forEach((origin, side) => {
      fanAngles.forEach((baseAngle, ray) => {
        const angle = side === 0 ? baseAngle : Math.PI - baseAngle;
        for (let spark = 0; spark < count(7); spark += 1) {
          const velocity = width * (0.105 + ray * 0.008 + spark * 0.001);
          particles.push({ color: ray % 2 ? EMERALD : GOLD, delay: ray * 0.045 + spark * 0.009, drag: 0.991, gravity: 54, life: 1.7, size: 2.15, twinkle: 0.25, vx: Math.cos(angle) * velocity, vy: Math.sin(angle) * velocity, x: width * origin, y: height * 0.82 });
        }
      });
    });
    addRadial(particles, width * 0.31, height * 0.35, count(48), width * 0.083, EMERALD, 0.35, seed, { gravity: 18, life: 1.48, size: 2, twinkle: 0.28 });
    addRadial(particles, width * 0.79, height * 0.37, count(48), width * 0.083, EMERALD, 0.48, seed + 1, { gravity: 18, life: 1.48, size: 2, twinkle: 0.28 });
    addRadial(particles, width * 0.57, height * 0.15, count(82), width * 0.095, GOLD, 0.7, seed + 2, { drag: 0.997, gravity: 72, life: 2.45, size: 2.3, twinkle: 0.38 });
    addRadial(particles, width * 0.57, height * 0.15, count(38), width * 0.057, IVORY, 0.88, seed + 3, { gravity: 36, life: 1.45, size: 1.65, twinkle: 0.62 });
  }

  return particles;
}

export default function ArrorFireworks({ active, cycle, phase, reducedMotion, sequence }: ArrorFireworksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [resizeRevision, setResizeRevision] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!container || !("ResizeObserver" in window)) return;
    let frame = 0;
    const observer = new ResizeObserver(() => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => setResizeRevision((value) => value + 1));
    });
    observer.observe(container);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active || reducedMotion || (phase !== "break" && phase !== "fireworks")) return;
    const container = canvas.parentElement;
    if (!container) return;

    let frame = 0;
    let stopped = false;
    const bounds = container.getBoundingClientRect();
    const width = Math.max(1, bounds.width);
    const height = Math.max(1, bounds.height);
    const ratio = Math.min(window.devicePixelRatio || 1, width < 620 ? 1.25 : 1.75);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const particles = buildParticles(width, height, phase, cycle, sequence);
    const started = performance.now();

    const draw = (now: number) => {
      if (stopped) return;
      const elapsed = (now - started) / 1_000;
      let alive = false;
      context.clearRect(0, 0, width, height);
      context.save();
      context.globalCompositeOperation = "lighter";

      particles.forEach((particle) => {
        const local = elapsed - particle.delay;
        if (local < 0 || local > particle.life) return;
        alive = true;
        const progress = local / particle.life;
        const resistance = Math.pow(particle.drag, local * 60);
        const x = particle.x + particle.vx * local * resistance;
        const y = particle.y + particle.vy * local * resistance + particle.gravity * local * local * 0.5;
        const previousLocal = Math.max(0, local - 0.045);
        const previousResistance = Math.pow(particle.drag, previousLocal * 60);
        const previousX = particle.x + particle.vx * previousLocal * previousResistance;
        const previousY = particle.y + particle.vy * previousLocal * previousResistance + particle.gravity * previousLocal * previousLocal * 0.5;
        const flicker = 0.78 + Math.sin((local * 22 + particle.twinkle * 17) * Math.PI) * particle.twinkle * 0.22;
        const alpha = Math.max(0, Math.pow(1 - progress, 1.18) * flicker);

        context.globalAlpha = alpha * 0.72;
        context.strokeStyle = particle.color;
        context.lineWidth = Math.max(0.65, particle.size * (1 - progress * 0.48));
        context.beginPath();
        context.moveTo(previousX, previousY);
        context.lineTo(x, y);
        context.stroke();
        context.globalAlpha = alpha;
        context.fillStyle = particle.color;
        context.shadowBlur = 8 + particle.size * 2;
        context.shadowColor = particle.color;
        context.beginPath();
        context.arc(x, y, Math.max(0.55, particle.size * (1 - progress * 0.38)), 0, Math.PI * 2);
        context.fill();
      });

      context.restore();
      if (alive || elapsed < 0.95) frame = window.requestAnimationFrame(draw);
      else context.clearRect(0, 0, width, height);
    };

    frame = window.requestAnimationFrame(draw);
    return () => {
      stopped = true;
      window.cancelAnimationFrame(frame);
      context.clearRect(0, 0, width, height);
    };
  }, [active, cycle, phase, reducedMotion, resizeRevision, sequence]);

  if (reducedMotion) return <div className={`arrorFireworksReducedHalo ${phase === "form" || phase === "fireworks" ? "isVisible" : ""}`} aria-hidden="true" />;
  return <canvas ref={canvasRef} className="arrorFireworksCanvas" data-firework-act={cycle} aria-hidden="true" />;
}
