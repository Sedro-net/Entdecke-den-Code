export default function AccessDenied() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">

        <div className="relative bg-white/10 backdrop-blur-2xl border border-red-400/30 rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 via-transparent to-transparent pointer-events-none" />

          <div className="p-10 md:p-14 text-center relative z-10">
            <h1 className="text-3xl md:text-5xl font-semibold mb-6 text-red-300">
              Zugriff verweigert
            </h1>

            <p className="text-red-200 mb-8">
              Der eingegebene Schlüssel ist ungültig.
            </p>

            <p className="text-red-400 text-sm italic opacity-80">
              Nicht jeder Versuch führt zum Ziel.
            </p>

            <p className="text-red-400 text-xs mt-10 tracking-widest uppercase opacity-60">
              Status: Zugriff blockiert
            </p>
          </div>
        </div>

        <footer className="text-center text-blue-300 mt-8 text-xs opacity-80">
          &copy; {new Date().getFullYear()} • Secure System
        </footer>
      </div>
    </div>
  );
}
