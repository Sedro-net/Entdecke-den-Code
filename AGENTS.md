<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Kontext: Entdecke den Code

## Projektziel

"Entdecke den Code" ist eine einladungsbasierte Web-App für eine interaktive Schnitzeljagd, die Online-Rätsel mit Real-Life-Aufgaben kombiniert. Der Zugang erfolgt ausschließlich über personalisierte, gedruckte QR-Codes.

## Spielprinzip

- Jeder Teilnehmer erhält einen persönlichen QR-Code.
- Der QR-Code verweist auf `https://entdecke-den-code.online/start?spieler=<spielername>`.
- Der QR-Code bleibt während des gesamten Spiels derselbe und dient als permanenter Einstiegspunkt.
- Nach dem Scannen wird automatisch der aktuelle Spielfortschritt geladen.
- Besucher ohne gültigen Spielerzugang sehen ausschließlich die öffentliche Landingpage.
- Ungültige Spielernamen oder Manipulationsversuche führen immer auf eine Access-Denied-Seite.

## Spielfluss

1. QR-Code scannen.
2. Spieler identifizieren.
3. Fortschritt laden.
4. Auswahl zwischen zwei unterschiedlichen Aufgaben.
5. Aufgabe lösen.
6. Fortschritt speichern.
7. Neue Auswahl anzeigen.
8. Spiel bis zum Finale fortsetzen.

## Aufgabentypen

### Online

- Logikrätsel
- Verschlüsselungen
- Wissensfragen
- Zahlenrätsel
- Codeeingabe

### Real World

- Vor Ort gefundenen Code eingeben
- Bild als Nachweis hochladen

## Spielmechanik

- Vor jeder Aufgabe erhält der Spieler zwei unterschiedliche Missionen zur Auswahl.
- Jede Mission besitzt einen kurzen Titel und eine Beschreibung.
- Unterschiedliche Entscheidungen ermöglichen verschiedene Wege durch das Spiel.
- Alle Lösungen werden serverseitig geprüft.

## Datenhaltung

Keine Datenbank.

Dateibasierte Speicherung.

```
data/
    players/
        spieler1.json
        spieler2.json

    missions/
        mission1.json
        mission2.json

    uploads/
        spieler1/
```

Jeder Spieler besitzt genau eine JSON-Datei mit seinem aktuellen Fortschritt.

Beispiel:

```json
{
  "spieler": "spieler1",
  "currentMission": "mission3",
  "completed": [
    "mission1",
    "mission2"
  ],
  "lastSeen": "2026-06-26T12:00:00Z"
}
```

## Sicherheit

- Öffentliche Landingpage unter `/`.
- Geschützte Bereiche nur für gültige Spieler.
- Serverseitige Validierung aller Spielernamen.
- Keine clientseitige Vertrauensbasis.
- Ungültige oder manipulierte URLs führen immer zu `/denied`.
- Lösungen und Fortschritt dürfen niemals ausschließlich clientseitig gespeichert werden.

## Technischer Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- JSON-Dateien als Datenspeicher
- API Routes bzw. Server Actions für Spiellogik

## Ziel

Die Anwendung soll einfach erweiterbar sein. Neue Missionen sollen möglichst ohne Änderungen an der Spiellogik ergänzt werden können. Spielfortschritt, Missionen und Uploads werden strikt voneinander getrennt verwaltet.
