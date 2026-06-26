import PageShell from "../components/PageShell";
import GlassCard from "../components/GlassCard";
import StatusLine from "../components/StatusLine";
import Footer from "../components/Footer";

export default function StartPage() {
  return (
    <PageShell>
      <GlassCard accent="success">
        <h1 className="text-4xl md:text-6xl font-semibold mb-6 tracking-tight text-green-300">
          Zugriff gewährt
        </h1>

        <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
          Willkommen, Teilnehmer.
        </p>

        <p className="text-blue-300 text-sm">
          Dein Abenteuer beginnt jetzt.
        </p>

        <StatusLine>Status: Zugang gewährt</StatusLine>
      </GlassCard>

      <Footer note="Secure System" />
    </PageShell>
  );
}
