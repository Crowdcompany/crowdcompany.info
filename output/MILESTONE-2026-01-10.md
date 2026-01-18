# Milestone - 18. Januar 2026

## Projekt: Crowdcompany.info Website

### Stand der Website

Die Website crowdcompany.info ist produktiv mit vollständigem Bilingual-Support (Deutsch/Englisch).

### Aktuelle Features

**Bilingual-Support**
- Sprachumschalter (DE/EN) im Header
- Automatische Spracherkennung basierend auf Browsersprache
- Manuelle Umschaltung zwischen Deutsch und Englisch
- Alle wichtigen Texte sind übersetzbar

**Hero Section**
- Corporate Header Image (1600px breit) von S3
- "Multi-Cloud AI Solutions" als Hauptüberschrift
- `padding-top: 180px` um Überlagerung mit fixiertem Header zu vermeiden
- AWS, Azure & Google Cloud certified Badge

**Services Section**
- Überschrift und Untertitel übersetzbar
- Cloud Solutions (8 Punkte: AWS, Azure, Google Cloud, Migration, etc.)
- AI & Machine Learning (6 Punkte: GenAI, LLMs, MLOps, etc.)
- 15 Service-Cards im Grid-Layout mit Beschreibungen
- "Alle Leistungen im Überblick" übersetzbar

**Zertifizierungen**
- Interaktive Credential-Cards (klickbar für Verifizierung)
- AWS Certified Cloud Practitioner
- AWS Cloud AI Practitioner
- Microsoft Azure Fundamentals (AZ-900)
- Microsoft Azure AI Fundamentals (AI-900)
- Google Cloud Digital Leader
- Google Generative AI Leader

**About Section**
- "Warum Crowdcompany?" übersetzbar
- Multi-Cloud AI Solutions Untertitel übersetzbar
- 2 Absätze mit Firmengeschichte übersetzbar
- "Unsere Expertise für Ihren Erfolg" Badge übersetzbar
- 4 Pillar-Cards (Multi-Cloud, AI/ML, Moderne Technologien, Sicherheit)
- Stats-Row (5+ Zertifizierungen, 15+ Jahre, 3 Cloud Provider)

**Additional Services**
- "Weitere Serviceleistungen" übersetzbar
- "Maßgeschneiderte Lösungen für Ihr Unternehmen" übersetzbar
- App-Entwicklung (Titel + Beschreibung übersetzbar)
- SaaS-Entwicklung (Titel + Beschreibung übersetzbar)
- Prozess-Automatisierung (Titel + Beschreibung übersetzbar)

**CTA Buttons**
- Rote Call-to-Action Buttons in allen Sektionen
- Alle Buttons übersetzbar
- mailto: Links mit kontextspezifischen Betreffs

**Footer**
- Alle Texte in weiß (#ffffff) für guten Kontrast
- Cloud Services & AI Consulting
- Telefon und E-Mail Links
- Impressum und Datenschutz Links (übersetzbar)
- Copyright Text (übersetzbar)

### Technologie-Stack

- Frontend: Vanilla JavaScript, HTML5, CSS3
- CSS Framework: Pico CSS 2 (via CDN)
- Hosting: AWS S3 (crowdcompany.info)
- Fonts: System-Fonts mit Emoji-Fallback
- Bilingual-Support: Eigene JavaScript-Implementierung

### CSS-Design-System

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
- **Text:** #1a1a1a (Schwarz) - Alle Fließtexte sind schwarz
- **Footer:** #ffffff (Weiß) - Alle Footer-Texte sind weiß
- **CTA Buttons:** #dc3545 (Rot)

### Datei

- `index.html` - Vollständige Website in einer Datei
- `Header20260117-1600px.jpg` - Hero-Hintergrundbild (S3: mqlstreaming/corporate-identity)
- `LogoRund.png` - Logo im Header und Footer
- `RaimundBauerRundklein.png` - Logo im Footer

### Deployment

```bash
aws s3 sync /media/xray/NEU/Code/Crowdcompany.info/output/ s3://crowdcompany.info/ --delete
```

### Übersetzte Inhalte

Insgesamt über 70 Übersetzungsschlüssel für:
- Services Title/Subtitle
- Target Card Titles (Cloud Solutions, AI/ML)
- All Services Title
- About Section (5 Texte)
- Pillars (4 Titel + 4 Beschreibungen)
- Additional Services (1 Titel + 1 Untertitel + 3 Karten)
- CTA Buttons (alle Sektionen)
- Navigation Links
- Credentials Title/Subtitle
- Footer Links (Impressum, Datenschutz)

### Offene Punkte

Keine - Website ist produktiv einsatzbereit mit vollständigem Bilingual-Support.

### Nächstes Milestone

Wird bei neuen Anforderungen definiert.
