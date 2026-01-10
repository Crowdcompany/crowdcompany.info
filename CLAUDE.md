# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projekt-Art

Dokumentations- und Ressourcen-Sammlung für statische Webentwicklung mit Fokus auf AWS S3 Hosting.

## Technologie-Stack

- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **Hosting:** AWS S3 (statisches Hosting)
- **Build-Tools:** Keine (pure statische Dateien)
- **Sprache:** Deutsch (alle Inhalte)

## Wichtige Verzeichnisse

- `/certificates/` - Wiederverwendbare Widgets (certifications-widget.js)
- `/docs/` - AWS S3 CLI-Referenz und Deployment-Workflows
- `/input/7MServices/` - Vollständige Website-Implementierung als Referenz

## Lokale Entwicklung

```bash
# Website im Browser öffnen
file:///media/xray/NEU/Code/Crowdcompany.info/input/7MServices/index.html

# Oder mit Python Server
python3 -m http.server 8000
```

## Deployment zu S3

```bash
aws s3 sync /media/xray/NEU/Code/Crowdcompany.info/input/7MServices/ \
  s3://2026crowdhosting/7m-immobilien/ \
  --delete
```

## Dokumentation

- `/docs/workflow-neue-website.md` - Kompletter AWS S3 + Cloudflare Setup
- `/docs/aws-cli-referenz.md` - Alle AWS CLI Befehle
- `/input/7MServices/DESIGN.md` - Design-System mit CSS-Variablen

## Design-System Referenz

```css
:root {
    --color-primary: #7DA23B;        /* Grün */
    --color-primary-hover: #656565;   /* Grau Hover */
    --color-text: #020101;            /* Fast Schwarz */
    --color-bg-light: #F2F0EB;        /* Creme */
}
```
