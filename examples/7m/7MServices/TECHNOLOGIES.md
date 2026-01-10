# Technologien & Methoden für Statische Webprojekte

## Übersicht

Dieses Dokument beschreibt alle Technologien, Methoden und Best Practices für die Erstellung hochwertiger statischer Websites ohne Backend. Es dient als Blaupause für zukünftige Projekte mit ähnlichen Anforderungen.

---

## Kern-Technologien

### 1. HTML5
- **Verwendung:** Semantisches Markup für Struktur
- **Vorteile:** Barrierefrei, SEO-freundlich, moderne Standards
- **Key-Tags:** `<header>`, `<nav>`, `<section>`, `<footer>`, `<article>`

```html
<header>
    <nav>...</nav>
</header>
<main>
    <section id="about">...</section>
</main>
<footer>...</footer>
```

### 2. CSS3 (Inline oder Extern)
- **Verwendung:** Alle Styles inline im `<style>`-Tag oder externe CSS-Datei
- **Features:** Flexbox, Grid, CSS Variables, Media Queries

#### CSS Variables (Empfohlen)
```css
:root {
    --color-primary: #7DA23B;
    --color-text: #020101;
    --space-40: 1rem;
    --font-size-md: 16px;
}

.element {
    color: var(--color-text);
    padding: var(--space-40);
}
```

#### Flexbox Layout
```css
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
}

.card {
    flex: 1;
    flex-shrink: 0;
}
```

#### Grid Layout
```css
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 24px;
}
```

#### Responsive Design
```css
@media (max-width: 767px) {
    :root {
        --font-size-lg: 20px;
    }

    .grid {
        grid-template-columns: 1fr;
    }
}
```

### 3. Vanilla JavaScript
- **Verwendung:** Interaktivität ohne Frameworks
- **Vorteile:** Keine Abhängigkeiten, schnelle Ladezeiten, einfaches Debugging

```javascript
// DOM Selection
const element = document.querySelector('.classname');
const elements = document.querySelectorAll('.items');

// Event Listener
element.addEventListener('click', () => {
    // Aktion
});

// Scroll Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
```

---

## Projekt-Struktur

```
projekt/
├── index.html              # Hauptdatei
├── DESIGN.md               # Design-Dokumentation (optional)
├── TECHNOLOGIES.md         # Diese Datei
├── assets/
│   └── bilder/             # Optimierte Bilder
│       ├── foto1.jpg
│       └── logo.png
└── favicon.ico
```

---

## Design-System

### Farbpalette definieren
1. Primärfarben identifizieren (max. 2-3)
2. Textfarben definieren ( Haupt + Sekundär)
3. Hintergrundfarben festlegen
4. Als CSS Variables speichern

```css
:root {
    /* Primary */
    --color-primary: #7DA23B;
    --color-primary-hover: #656565;

    /* Text */
    --color-text: #020101;
    --color-text-secondary: #656565;

    /* Background */
    --color-white: #FFFFFF;
    --color-bg-light: #F2F0EB;
    --color-bg-medium: #E4E0D4;
}
```

### Typografie
```css
body {
    font-family: "Arial", -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 16px;
    line-height: 1.6;
}

h1 { font-size: 42px; }
h2 { font-size: 32px; }
h3 { font-size: 24px; }
```

### Spacing System
```css
:root {
    --space-20: 7px;   /* Klein */
    --space-30: 11px;  /* Innerhalb Components */
    --space-40: 16px;  /* Standard */
    --space-50: 24px;  /* Card-Padding */
    --space-60: 36px;  /* Section */
    --space-70: 54px;  /* Groß */
    --space-80: 81px;  /* Hero */
}
```

---

## Komponenten

### Header (Fixed)
```css
header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    background: var(--color-white);
    padding: 10px 3%;
}
```

### Cards
```css
.card {
    background: var(--color-white);
    border-radius: 0px;
    overflow: hidden;
    transition: 0.3s;
}

.card:hover {
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.card-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
}
```

### Buttons
```css
.btn {
    display: inline-block;
    padding: 12px 24px;
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: 0px;
    cursor: pointer;
    transition: 0.3s;
}

.btn:hover {
    background: var(--color-primary-hover);
}
```

---

## Animationen

### Fade In on Scroll
```css
.fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s, transform 0.5s;
}

.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}
```

```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
```

### Smooth Scroll
```css
html {
    scroll-behavior: smooth;
}
```

---

## Performance-Optimierung

### 1. Bilder optimieren
- WebP-Format bevorzugen
- Responsive Images mit `srcset`
- Lazy Loading

```html
<img src="bild.webp"
     alt="Beschreibung"
     loading="lazy"
     width="350" height="250">
```

### 2. CSS minimieren
- Inline-CSS für kleine Projekte
- External CSS für größere Projekte
- Minifizierung optional

### 3. JavaScript am Ende
```html
<body>
    <!-- Content -->
    <script src="script.js"></script>
</body>
```

---

## Deployment-Optionen

### 1. GitHub Pages (Empfohlen)
```bash
# GitHub Pages aktivieren:
# Settings → Pages → Source: main branch
# URL: https://username.github.io/repo-name/
```

### 2. Netlify
```bash
# Drag & Drop des build-Ordners
# Oder: git push → automatischer deploy
```

### 3. Vercel
```bash
npm i -g vercel
vercel deploy
```

### 4. AWS S3 + CloudFront
```
S3 Bucket → Static Website Hosting
CloudFront → CDN Distribution
```

---

## SEO-Grundlagen

### Meta-Tags
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Beschreibung der Seite (max. 160 Zeichen)">
    <title>Seitentitel | Markenname</title>
    <link rel="canonical" href="https://example.de/seite">
</head>
```

### Semantische Struktur
```html
<main>
    <article>
        <h1>...</h1>
        <p>...</p>
    </article>
</main>
```

### Open Graph (Social Media)
```html
<meta property="og:title" content="Titel">
<meta property="og:description" content="Beschreibung">
<meta property="og:image" content="bild.jpg">
<meta property="og:url" content="https://...">
```

---

## Accessibility (Barrierefreiheit)

### Grundlagen
```html
<!-- Alt-Text für Bilder -->
<img src="haus.jpg" alt="Schönes Einfamilienhaus mit Garten">

<!-- ARIA-Labels -->
<button aria-label="Menü öffnen">☰</button>

<!-- Kontrast -->
<!-- Vermeide: hellgrauer Text auf weißem Hintergrund -->
```

### Checkliste
- [ ] Alt-Texte für alle Bilder
- [ ] Kontrast-Verhältnis ≥ 4.5:1
- [ ] Tastatur-Navigation funktioniert
- [ ] Focus-States sichtbar
- [ ] Keine rein dekorativen Bilder

---

## Datei-Organisation

### Für neue Projekte kopieren

1. **TECHNOLOGIES.md** → Neues Projekt kopieren
2. **DESIGN.md** → Anpassen an neue Farben/Design
3. **index.html** → Diese Struktur übernehmen:
   ```html
   <!DOCTYPE html>
   <html lang="de">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>...</title>
       <style>
           :root { /* Farben */ }
           * { /* Reset */ }
           /* Components */
       </style>
   </head>
   <body>
       <header>...</header>
       <main>...</main>
       <footer>...</footer>
       <script>/* Interaktivität */</script>
   </body>
   </html>
   ```

---

## Checkliste für neue Projekte

### Vor dem Start
- [ ] Farbpalette definieren (max. 5 Farben)
- [ ] Schriftarten auswählen
- [ ] Struktur planen (Sections)
- [ ] Mobile-First denken

### Während der Entwicklung
- [ ] CSS Variables verwenden
- [ ] Semantisch markupen
- [ ] Responsive Breakpoints definieren
- [ ] Animationen sparsam einsetzen

### Vor dem Launch
- [ ] Auf verschiedenen Geräten testen
- [ ] Lighthouse-Audit durchführen
- [ ] Bilder optimieren
- [ ] Meta-Tags setzen
- [ ] Favicon hinzufügen

---

## Lighthouse-Ziele

| Metrik | Zielwert |
|--------|----------|
| Performance | ≥ 90 |
| Accessibility | ≥ 90 |
| Best Practices | ≥ 90 |
| SEO | ≥ 90 |

---

## Werkzeuge

### Design
- [Figma](https://figma.com) - UI Design
- [Coolors](https://coolors.co) - Farbpaletten

### Entwicklung
- [VS Code](https://code.visualstudio.com) - Editor
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/) - Debugging

### Testing
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Audit
- [GTmetrix](https://gtmetrix.com) - Performance

### Deployment
- [GitHub Pages](https://pages.github.com) - Kostenloses Hosting
- [Netlify](https://netlify.com) - Modernes Hosting
- [Vercel](https://vercel.com) - Schnelles Deployment

---

## Schnell-Start Template

Kopiere diesen Code für ein neues Projekt:

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Projektname</title>
    <meta name="description" content="Kurze Beschreibung">
    <style>
        :root {
            --color-primary: #7DA23B;
            --color-text: #020101;
            --color-bg: #F2F0EB;
            --font-size-md: 16px;
            --space-40: 1rem;
            --space-60: 2.25rem;
            --space-80: 5.06rem;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: "Arial", sans-serif;
            color: var(--color-text);
            background: var(--color-bg);
            line-height: 1.6;
        }
        header { background: white; padding: var(--space-40) 3%; }
        main { padding: var(--space-80) 3%; max-width: 1400px; margin: 0 auto; }
        footer { background: var(--color-primary); color: white; padding: var(--space-60) 3%; }
    </style>
</head>
<body>
    <header>
        <h1>Logo/Name</h1>
    </header>
    <main>
        <section>
            <h2>Willkommen</h2>
            <p>Inhalt...</p>
        </section>
    </main>
    <footer>
        <p>&copy; 2025 Projektname</p>
    </footer>
    <script>
        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                e.preventDefault();
                document.querySelector(a.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
            });
        });
    </script>
</body>
</html>
```

---

## Wartung

### Regelmäßige Aufgaben
- [ ] Sicherheits-Updates überprüfen
- [ ] Performance testen
- [ ] Bilder komprimieren
- [ ] Links prüfen (keine 404)

### Versionierung
- Git Tags für Meilensteine
- Semantic Versioning (1.0.0, 1.1.0, etc.)

---

*Letzte Aktualisierung: Dezember 2025*
*Version: 1.0*
