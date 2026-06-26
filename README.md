# Entdecke den Code

Eine **einladungsbasierte, interaktive Mission-/Rätsel-Web-App**, gebaut mit
[Next.js](https://nextjs.org) (App Router), TypeScript und Tailwind CSS.

Nur eingeladene Teilnehmer mit einem gültigen persönlichen Schlüssel (z. B. über
einen QR-Code) erhalten Zugriff auf die geschützten Bereiche der Anwendung. Alle
übrigen Besucher landen auf der öffentlichen Landing Page oder auf einer
"Zugriff verweigert"-Seite.

---

## Inhaltsverzeichnis

- [Features](#features)
- [Tech-Stack](#tech-stack)
- [Projektstruktur](#projektstruktur)
- [Voraussetzungen](#voraussetzungen)
- [Erste Schritte](#erste-schritte)
- [Konfiguration](#konfiguration)
- [Funktionsweise des Zugriffsschutzes](#funktionsweise-des-zugriffsschutzes)
- [Verfügbare Skripte](#verfügbare-skripte)
- [Deployment](#deployment)
- [Sicherheit](#sicherheit)

---

## Features

- 🔐 **Zugriffsschutz** über persönliche Schlüssel (Query-Parameter `spieler`).
- 🧭 **Geschützte Routen** (`/start`, `/level/*`), abgesichert durch eine
  Next.js-Proxy-(Middleware-)Funktion.
- 🎨 **Modernes UI** mit Tailwind CSS, Glassmorphism-Optik und Verläufen.
- 🚫 **Dedizierte "Zugriff verweigert"-Seite** für ungültige Schlüssel.
- 🇩🇪 Vollständig in deutscher Sprache.

## Tech-Stack

| Bereich        | Technologie                          |
| -------------- | ------------------------------------ |
| Framework      | Next.js 16 (App Router)              |
| Sprache        | TypeScript 5                         |
| UI / Styling   | Tailwind CSS 4                       |
| Animationen    | Framer Motion                        |
| Runtime        | React 19                             |
| Linting        | ESLint 9 (`eslint-config-next`)      |

## Projektstruktur

```
.
├── app/
│   ├── layout.tsx          # Root-Layout, globale Metadaten & Fonts
│   ├── page.tsx            # Öffentliche Landing Page
│   ├── globals.css         # Globale Styles (Tailwind)
│   ├── start/page.tsx      # Geschützte Startseite (nach Zugriff)
│   └── denied/page.tsx     # "Zugriff verweigert"-Seite
├── proxy.ts                # Zugriffsschutz (Next.js Proxy/Middleware)
├── public/                 # Statische Assets
├── next.config.ts          # Next.js-Konfiguration
└── package.json
```

## Voraussetzungen

- **Node.js** 18.18 oder neuer (empfohlen: aktuelle LTS-Version)
- Einer der Paketmanager **npm**, **yarn**, **pnpm** oder **bun**

## Erste Schritte

1. Repository klonen:

   ```bash
   git clone https://github.com/Sedro-net/Entdecke-den-Code.git
   cd Entdecke-den-Code
   ```

2. Abhängigkeiten installieren:

   ```bash
   npm install
   ```

3. Umgebungsvariablen anlegen (siehe [Konfiguration](#konfiguration)):

   ```bash
   echo 'VALID_KEYS={"demo-key":true}' > .env.local
   ```

4. Entwicklungsserver starten:

   ```bash
   npm run dev
   ```

5. Im Browser öffnen: [http://localhost:3000](http://localhost:3000).

   Geschützte Seite testen:
   [http://localhost:3000/start?spieler=demo-key](http://localhost:3000/start?spieler=demo-key)

## Konfiguration

Die gültigen Zugriffsschlüssel werden über die Umgebungsvariable `VALID_KEYS`
gesetzt. Diese wird **nicht** im Repository eingecheckt (`.env*` ist in
`.gitignore`).

Lege eine Datei `.env.local` im Projekt-Root an:

```env
# Variante 1: Objekt (Key → truthy)
VALID_KEYS={"key-spieler-1":true,"key-spieler-2":true}

# Variante 2: Array von Keys (ebenfalls unterstützt)
# VALID_KEYS=["key-spieler-1","key-spieler-2"]
```

> **Hinweis:** Schlüssel dürfen nur aus Buchstaben, Ziffern, `-` und `_`
> bestehen und maximal 128 Zeichen lang sein.

## Funktionsweise des Zugriffsschutzes

Die Datei `proxy.ts` schützt die in `config.matcher` definierten Routen
(`/start`, `/level/*`):

1. Der Schlüssel wird aus dem Query-Parameter `?spieler=...` gelesen und
   getrimmt.
2. **Kein Schlüssel** → Weiterleitung zur Landing Page (`/`).
3. **Ungültiges Format oder unbekannter Schlüssel** → Weiterleitung zu
   `/denied`.
4. **Gültiger Schlüssel** → Zugriff auf die angeforderte Seite.

Jede Antwort erhält zusätzlich grundlegende Sicherheits-Header
(`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
`Cache-Control`).

## Verfügbare Skripte

| Befehl          | Beschreibung                                   |
| --------------- | ---------------------------------------------- |
| `npm run dev`   | Startet den Entwicklungsserver                 |
| `npm run build` | Erstellt einen produktionsreifen Build         |
| `npm run start` | Startet den Produktionsserver (nach `build`)   |
| `npm run lint`  | Führt ESLint aus                               |

## Deployment

Die App lässt sich am einfachsten über die
[Vercel-Plattform](https://vercel.com/new) deployen. Wichtig: Setze dort die
Umgebungsvariable `VALID_KEYS` in den Projekteinstellungen.

Weitere Details: [Next.js Deployment-Dokumentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Sicherheit

- Zugriffsschlüssel werden ausschließlich serverseitig über `VALID_KEYS`
  verwaltet und niemals im Code hinterlegt.
- Der Schlüsselabgleich nutzt ein `Set` (kein direkter Objektzugriff) und ist
  damit gegen Prototype-Pollution-Angriffe (z. B. `?spieler=constructor`)
  abgesichert.
- Eingaben werden auf Länge und erlaubte Zeichen validiert.
- Bei fehlerhafter `VALID_KEYS`-Konfiguration verhält sich die App
  **fail-closed** (niemand erhält Zugriff).
