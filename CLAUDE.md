# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projekt-Art

Bilinguale (Deutsch/Englisch) Unternehmenswebsite für Crowdcompany UG mit Fokus auf Multi-Cloud AI Solutions und Consulting.

## Technologie-Stack

- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **CSS Framework:** Pico CSS 2 (via CDN)
- **Hosting:** AWS S3 (statisches Hosting)
- **Build-Tools:** Keine (pure statische Dateien)
- **Sprachen:** Deutsch (Standard) und Englisch (umschaltbar)

## Wichtige Verzeichnisse

- `/output/` - **Hauptverzeichnis der Website** - Hier ist die aktuelle index.html
- `/docs/` - AWS S3 CLI-Referenz und Deployment-Workflows

## Hauptdatei

Die gesamte Website ist in einer einzigen Datei: `/output/index.html`

## Lokale Entwicklung

```bash
# Website im Browser öffnen
file:///media/xray/NEU/Code/Crowdcompany.info/output/index.html

# Oder mit Python Server
cd /media/xray/NEU/Code/Crowdcompany.info/output
python3 -m http.server 8000
```

## Deployment zu S3

```bash
# Deployment zu crowdcompany.info
aws s3 sync /media/xray/NEU/Code/Crowdcompany.info/output/ s3://crowdcompany.info/ --delete
```

## Bilingual-Support (Deutsch/Englisch)

Die Website verfügt über einen Sprachumschalter (DE/EN) im Header.

### Funktionsweise

1. **Automatische Spracherkennung:** Beim Laden der Seite wird die Browsersprache erkannt (`navigator.language`)
2. **Standardsprache:** Wenn die Browsersprache nicht Deutsch oder Englisch ist, wird Deutsch als Standard verwendet
3. **Manuelle Umschaltung:** Der Benutzer kann über DE/EN-Buttons im Header die Sprache wechseln

### pageContentData-Struktur

Alle übersetzten Texte sind im `pageContentData`-Objekt gespeichert:

```javascript
const pageContentData = {
    de: {
        'services-title': 'Unsere KI & Cloud Services',
        'services-subtitle': 'Multi-Cloud Expertise für Ihr Unternehmen',
        // ... weitere Schlüssel
    },
    en: {
        'services-title': 'Our AI & Cloud Services',
        'services-subtitle': 'Multi-Cloud Expertise for your business',
        // ... weitere Schlüssel
    }
};
```

### Neue Übersetzungen hinzufügen

Wenn du neue Texte übersetzbar machen musst:

1. **ID zum HTML-Element hinzufügen:**
   ```html
   <p id="mein-text">Deutscher Text</p>
   ```

2. **Übersetzungsschlüssel zu pageContentData hinzufügen:**
   ```javascript
   de: {
       'mein-text': 'Deutscher Text',
   },
   en: {
       'mein-text': 'English Text',
   }
   ```

3. **JavaScript setLanguage()-Funktion erweitern:**
   ```javascript
   function setLanguage(lang) {
       // ... existierender Code
       const meinText = document.getElementById('mein-text');
       if (meinText) meinText.textContent = pageContentData[lang]['mein-text'];
   }
   ```

## Design-System

### CSS-Variablen (Pico CSS Override)

```css
:root {
    --pico-primary: #2d2d2d;
    --pico-background-color: #ffffff;
    --pico-text-color: #1a1a1a;
    --pico-h-color: #1a1a1a; /* Alle Überschriften schwarz */
}
```

### Farben

- **Primär:** #7DA23B (Grün)
- **Text:** #1a1a1a (Schwarz) - Alle Fließtexte sind schwarz, nicht grau!
- **Footer:** Alle Texte im Footer sind weiß (#ffffff)
- **CTA Buttons:** #dc3545 (Rot)

## Aktuelle Features

### Hero Section
- Corporate Header Image (1600px breit)
- `padding-top: 180px` um Überlagerung mit fixiertem Header zu vermeiden

### Services
- Cloud Solutions (AWS, Azure, Google Cloud)
- AI & Machine Learning
- 15 Service-Cards im Grid-Layout

### Zertifizierungen
- Interaktive Credential-Cards
- Klickbare Badges für Verifizierung
- AWS Certified Cloud Practitioner
- AWS Cloud AI Practitioner
- Microsoft Azure Fundamentals (AZ-900)
- Microsoft Azure AI Fundamentals (AI-900)
- Google Cloud Digital Leader
- Google Generative AI Leader

### About Section
- Bilingualer Textblock (2 Absätze)
- 4 Pillar-Cards mit Icons
- Stats-Row (5+ Zertifizierungen, 15+ Jahre, 3 Cloud Provider)

### Additional Services
- App-Entwicklung
- SaaS-Entwicklung
- Prozess-Automatisierung

### CTA Buttons
- Rote Call-to-Action Buttons in allen Sektionen
- mailto: Links mit kontextspezifischen Betreffs

## Dokumentation

- `/docs/workflow-neue-website.md` - Kompletter AWS S3 + Cloudflare Setup
- `/docs/aws-cli-referenz.md` - Alle AWS CLI Befehle
- `/output/MILESTONE-2026-01-10.md` - Projekt-Milestone und aktueller Stand

## Git-Konventionen

Commit-Messages folgen dem Pattern: `feat/scope: kurze Beschreibung`

Beispiele:
- `feat(i18n): add bilingual support for footer elements`
- `fix(hero): adjust padding to prevent header overlap`
- `style(footer): change text color to white`

## Wichtige Hinweise

1. **Keine grauen Fließtexte:** Alle Fließtexte müssen schwarz (#1a1a1a) sein, nicht grau!
2. **Footer-Texte sind weiß:** Alle Texte im Footer müssen weiß (#ffffff) sein
3. **IDs für Übersetzungen:** Wenn du neue Texte hinzufügst, denke daran, sie übersetzbar zu machen
4. **Einzelne Datei:** Die gesamte Website ist in `/output/index.html` - keine separaten CSS/JS-Dateien
