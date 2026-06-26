import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl;

  // Spieler-Key aus URL holen (Query-Parameter)
  const spieler = url.searchParams.get("spieler");

  // erlaubte Keys (anpassen!)
  const validKeys = JSON.parse(process.env.VALID_KEYS || "{}");

  // 1. Kein Parameter → zurück zur Landing Page
  if (!spieler) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 2. Ungültiger Parameter → Access denied
  if (!validKeys[spieler]) {
    return NextResponse.redirect(new URL("/denied", request.url));
  }

  // 3. Alles ok → Seite laden
  return NextResponse.next();
}


export const config = {
  matcher: [
    "/start",        // Startseite schützen
    "/level/:path*", // alle Levelseiten schützen (z. B. /level1, /level2)
  ],
};
