export type FinalePhaseKey = "scof" | "kap" | "firm" | "finale" | "rest";

export const FINALE_TOTAL_SECONDS = 94;

export const finaleMaster = {
  fileName: "kap-ossen-finale-master-94s.mp4",
  duration: FINALE_TOTAL_SECONDS,
  crossfadeSeconds: 3,
  crossfadeCenters: [11, 43],
  sourceClips: [
    { id: "part-one", sourceStart: 5, sourceEnd: 17.5, outputStart: 0 },
    { id: "part-two", sourceStart: 53.5, sourceEnd: 88.5, outputStart: 9.5 },
    { id: "part-three", sourceStart: 107.5, sourceEnd: 160, outputStart: 41.5 },
  ],
} as const;

export const finalePhases = [
  { key: "scof", start: 0, end: 11, icon: "❄", label: "SCOF", description: "Current value position" },
  { key: "kap", start: 11, end: 27, icon: "✦", label: "KAP OSSEN", description: "29 October 2029 checkpoint" },
  { key: "firm", start: 27, end: 43, icon: "⚡", label: "ST‑FIRM", description: "Consistency and technology engine" },
  { key: "finale", start: 43, end: 86, icon: "∞", label: "GLOBAL HORIZON", description: "€45 long-horizon aspiration" },
  { key: "rest", start: 86, end: 94, icon: "✨", label: "HERITAGE × TECHNOLOGY × LEGACY", description: "One legacy · Many generations" },
] as const;

export const finaleRoster = [
  { id: "awakening", start: 0, end: 4 },
  { id: "current", start: 4, end: 8 },
  { id: "current-fx", start: 8, end: 11 },
  { id: "checkpoint-date", start: 11, end: 16 },
  { id: "checkpoint-path", start: 16, end: 22 },
  { id: "checkpoint-multiple", start: 22, end: 27 },
  { id: "firm-activation", start: 27, end: 32 },
  { id: "consistency", start: 32, end: 39 },
  { id: "checkpoint-fx", start: 39, end: 43 },
  { id: "horizon", start: 43, end: 54 },
  { id: "horizon-kes", start: 54, end: 65 },
  { id: "ladder", start: 65, end: 74 },
  { id: "multiples", start: 74, end: 82 },
  { id: "constellation", start: 82, end: 86 },
  { id: "lockup", start: 86, end: 91 },
  { id: "status", start: 91, end: 94 },
] as const;

export type FinaleRosterId = (typeof finaleRoster)[number]["id"];

export function phaseAtCeremonyTime(seconds: number) {
  const normalized = Math.max(0, Math.min(FINALE_TOTAL_SECONDS - 0.001, seconds));
  return finalePhases.find((phase) => normalized >= phase.start && normalized < phase.end) ?? finalePhases[0];
}

export function rosterAtCeremonyTime(seconds: number) {
  const normalized = Math.max(0, Math.min(FINALE_TOTAL_SECONDS - 0.001, seconds));
  return finaleRoster.find((scene) => normalized >= scene.start && normalized < scene.end) ?? finaleRoster[0];
}

export function ceremonyTimeFromSourceTime(sourceTime: number) {
  return Math.max(0, Math.min(FINALE_TOTAL_SECONDS, sourceTime));
}

export function formatCeremonyTime(seconds: number) {
  const safe = Math.max(0, Math.min(FINALE_TOTAL_SECONDS, Math.floor(seconds)));
  return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
}
