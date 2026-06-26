/**
 * Footer
 *
 * Shared page footer with the current year and a short status note.
 */
export default function Footer({
  note = "Access Restricted",
}: {
  note?: string;
}) {
  return (
    <footer className="text-center text-blue-300 mt-8 text-xs tracking-wide opacity-80">
      &copy; {new Date().getFullYear()} • {note}
    </footer>
  );
}
