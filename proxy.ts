import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Maximale Länge eines Spieler-Keys. Verhindert, dass übergroße Eingaben
 * verarbeitet werden (DoS-/Missbrauchsschutz).
 */
const MAX_KEY_LENGTH = 128;

/**
 * Nur alphanumerische Zeichen, Bindestrich und Unterstrich sind in einem
 * Key erlaubt. Das schließt Steuerzeichen und unerwartete Eingaben aus.
 */
const KEY_PATTERN = /^[A-Za-z0-9_-]+$/;

/**
 * Lädt und parst die gültigen Keys aus der Umgebungsvariable VALID_KEYS.
 * Fehlerhafte oder fehlende Konfiguration führt nicht zu einem Absturz,
 * sondern zu einem leeren Satz an Keys (fail-closed).
 */
function loadValidKeys(): Set<string> {
  const raw = process.env.VALID_KEYS;
  if (!raw) {
    return new Set();
  }

  try {
    const parsed = JSON.parse(raw);

    // Unterstützt sowohl ein Objekt ({"key": true}) als auch ein Array (["key"]).
    if (Array.isArray(parsed)) {
      return new Set(parsed.filter((k): k is string => typeof k === "string"));
    }

    if (parsed && typeof parsed === "object") {
      return new Set(
        Object.keys(parsed).filter(
          (k) => (parsed as Record<string, unknown>)[k]
        )
      );
    }

    return new Set();
  } catch {
    // Ungültiges JSON in VALID_KEYS – sicherheitshalber niemandem Zugriff geben.
    console.error("[proxy] VALID_KEYS enthält ungültiges JSON.");
    return new Set();
  }
}

/**
 * Fügt einer Antwort grundlegende Sicherheits-Header hinzu.
 */
function withSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "no-referrer");
  // Geschützte Seiten sollen nicht zwischengespeichert werden.
  response.headers.set("Cache-Control", "no-store, max-age=0");
  return response;
}

export function proxy(request: NextRequest) {
  const url = request.nextUrl;

  // Spieler-Key aus URL holen (Query-Parameter), getrimmt.
  const spieler = (url.searchParams.get("spieler") ?? "").trim();

  const validKeys = loadValidKeys();

  // 1. Kein Parameter → zurück zur Landing Page.
  if (!spieler) {
    return withSecurityHeaders(
      NextResponse.redirect(new URL("/", request.url))
    );
  }

  // 2. Eingabe-Validierung: Länge und erlaubte Zeichen prüfen.
  //    Ungültiges Format wird wie ein ungültiger Key behandelt.
  const isWellFormed =
    spieler.length <= MAX_KEY_LENGTH && KEY_PATTERN.test(spieler);

  // 3. Gültigkeit prüfen. Set.has() verhindert Prototype-Pollution-Lücken
  //    (z. B. ?spieler=constructor), die bei direktem Objektzugriff auftreten.
  if (!isWellFormed || !validKeys.has(spieler)) {
    return withSecurityHeaders(
      NextResponse.redirect(new URL("/denied", request.url))
    );
  }

  // 4. Alles ok → Seite laden.
  return withSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    "/start", // Startseite schützen
    "/level/:path*", // alle Levelseiten schützen (z. B. /level1, /level2)
  ],
};
