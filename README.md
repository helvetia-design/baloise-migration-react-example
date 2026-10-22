# Baloise Design System Demo

Interne Referenzanwendung für das [Baloise Design System](https://design.baloise.dev). Die App zeigt alle Komponenten der Library (`@baloise/ds-react`) auf einer Showcase-Seite sowie eingebettet in vier Seiten eines fiktiven Versicherungsportals.

## Voraussetzungen

- Node.js 20 oder neuer
- npm

## Setup

```bash
npm install
```

## Entwicklung

```bash
npm run dev
```

Startet den Vite-Dev-Server (Standard-Port `5173`, siehe Terminal-Ausgabe für die genaue URL).

## Weitere Befehle

```bash
npm run typecheck   # tsc --noEmit
npm run build       # Typecheck + Production-Build
npm run preview     # Production-Build lokal unter Vite preview servieren
```

## Seiten

- `/` — Dashboard
- `/showcase` — Übersicht aller Komponenten mit ihren Varianten
- `/application` — Mehrstufiges Antragsformular
- `/claim` — Schadenmeldung
- `/profile` — Profilverwaltung

## Hinweise

- Keine Backend-Anbindung, keine Authentifizierung — alle Daten sind statische Mocks unter `src/data`.
- `vite.config.ts` enthält zwei Workarounds für bekannte Packaging-Probleme von `@baloise/ds-core`/`@baloise/ds-styles` (fehlerhafte `@vite-ignore`-Chunks bzw. falsche Sourcemap-Pfade in den Utility-CSS-Dateien).
