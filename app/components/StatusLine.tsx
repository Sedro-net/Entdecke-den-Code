import type { ReactNode } from "react";

export type StatusTone = "default" | "danger";

const toneColor: Record<StatusTone, string> = {
  default: "text-blue-400",
  danger: "text-red-400",
};

/**
 * StatusLine
 *
 * Small, uppercase, wide-tracked status indicator used at the bottom of cards
 * (e.g. "Status: Zugang erforderlich").
 */
export default function StatusLine({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: StatusTone;
}) {
  return (
    <p
      className={`${toneColor[tone]} text-xs mt-10 tracking-widest uppercase opacity-60`}
    >
      {children}
    </p>
  );
}
