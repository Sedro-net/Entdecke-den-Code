export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">

        {/* Main Card */}
        <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl hover:bg-white/15 transition overflow-hidden">

          {/* subtiler Glow-Effekt */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 pointer-events-none" />

          <div className="p-10 md:p-14 text-center relative z-10">
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

            {/* subtiler Hinweis */}
            <div className="text-blue-300 text-sm italic mt-6 opacity-80">
              Wartest du noch auf ein Signal?
            </div>

            {/* kleiner System-Status (wow-Effekt) */}
            <p className="text-blue-400 text-xs mt-10 tracking-widest uppercase opacity-60">
              Status: Zugang erforderlich
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-blue-300 mt-8 text-xs tracking-wide opacity-80">
          &copy; {new Date().getFullYear()} • Access Restricted
        </footer>
      </div>
    </div>
  );
}
