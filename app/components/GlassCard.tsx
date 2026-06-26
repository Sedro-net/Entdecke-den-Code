import type { ReactNode } from "react";

export type Accent = "default" | "success" | "danger";

const accentBorder: Record<Accent, string> = {
  default: "border-white/20",
  success: "border-green-400/30",
  danger: "border-red-400/30",
};

const accentGlow: Record<Accent, string> = {
  default: "from-white/5 via-transparent to-white/10",
  success: "from-green-400/10 via-transparent to-white/10",
  danger: "from-red-500/10 via-transparent to-transparent",
};

/**
 * GlassCard
 *
 * The frosted-glass card used across the whole app. The base styling matches
 * the landing page; only the border tint and the subtle glow change per
 * `accent` so every page stays visually consistent.
 */
export default function GlassCard({
  children,
  accent = "default",
}: {
  children: ReactNode;
  accent?: Accent;
}) {
  return (
    <div
      className={`relative bg-white/10 backdrop-blur-2xl border ${accentBorder[accent]} rounded-3xl shadow-2xl hover:bg-white/15 transition overflow-hidden`}
    >
      {/* subtle glow effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-tr ${accentGlow[accent]} pointer-events-none`}
      />

      <div className="p-10 md:p-14 text-center relative z-10">{children}</div>
    </div>
  );
}
