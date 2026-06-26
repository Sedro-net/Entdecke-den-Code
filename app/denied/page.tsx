import PageShell from "../components/PageShell";
import GlassCard from "../components/GlassCard";
import StatusLine from "../components/StatusLine";
import Footer from "../components/Footer";

export default function AccessDenied() {
  return (
    <PageShell>
      <GlassCard accent="danger">
        <h1 className="text-4xl md:text-6xl font-semibold mb-6 tracking-tight text-red-300">
          Zugriff verweigert
        </h1>

        <p className="text-lg md:text-xl text-red-200 mb-8 leading-relaxed">
          Der eingegebene Schlüssel ist ungültig.
        </p>

        <p className="text-red-400 text-sm italic opacity-80">
          Nicht jeder Versuch führt zum Ziel.
        </p>

        <StatusLine tone="danger">Status: Zugriff blockiert</StatusLine>
      </GlassCard>

      <Footer note="Secure System" />
    </PageShell>
  );
}
