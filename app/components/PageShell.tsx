import type { ReactNode } from "react";

/**
 * PageShell
 *
 * Full-screen page wrapper that provides the consistent app background,
 * vertical/horizontal centering and a responsive content container.
 *
 * The gradient and layout are taken from the public landing page and act as
 * the single source of truth for the overall look of every page.
 */
export default function PageShell({
  children,
  maxWidthClassName = "max-w-3xl",
}: {
  children: ReactNode;
  /** Tailwind max-width utility for the inner container. */
  maxWidthClassName?: string;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 text-white flex items-center justify-center p-6">
      <div className={`w-full ${maxWidthClassName}`}>{children}</div>
    </div>
  );
}
