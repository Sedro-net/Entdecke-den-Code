export default function StartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">

        <div className="bg-white/10 backdrop-blur-2xl border border-green-400/30 rounded-3xl shadow-2xl p-10 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-green-300">
            Zugriff gewährt
          </h1>

          <p className="text-blue-100 mb-8">
            Willkommen, Teilnehmer.
          </p>

          <p className="text-blue-300 text-sm">
            Dein Abenteuer beginnt jetzt.
          </p>

        </div>

      </div>
    </div>
  );
}
``
