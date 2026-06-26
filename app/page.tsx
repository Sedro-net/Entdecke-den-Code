import PageShell from "./components/PageShell";
import GlassCard from "./components/GlassCard";
import StatusLine from "./components/StatusLine";
import Footer from "./components/Footer";

export default function LandingPage() {
  return (
    <PageShell>
      <GlassCard>
        <h1 className="text-4xl md:text-6xl font-semibold mb-6 tracking-tight text-white">
          Entdeckt den Code
        </h1>

        <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
          Eine verborgene Mission wurde gestartet.<br />
          Nur eingeladene Teilnehmer erhalten Zugriff.
        </p>

        <div className="space-y-5 mb-10">
          <p className="text-blue-200">
            Lass dein Abenteuer beginnen.
          </p>

          <p className="text-blue-300 text-sm">
            Verwende deinen persönlichen QR-Code, um Zugriff zu erhalten.
          </p>
        </div>

        {/* subtler Hinweis */}
        <div className="text-blue-300 text-sm italic mt-6 opacity-80">
          Wartest du noch auf ein Signal?
        </div>

        <StatusLine>Status: Zugang erforderlich</StatusLine>
      </GlassCard>

      <Footer note="Access Restricted" />
    </PageShell>
  );
}
