# Pico CSS - Anleitung für statische Webseiten

## Übersicht

Pico CSS ist ein minimalistisches CSS-Framework, das semantisches HTML automatisch stylt – ohne Klassen.

**Vorteile:**
- ~10kb gzipped
- Kein Build-Prozess
- Dark/Light Mode eingebaut
- Responsive out-of-the-box
- Barrierefreiheit (WCAG-konform)

**CDN-Link:**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
```

---

## Basis-Template

```html
<!DOCTYPE html>
<html lang="de" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meine Webseite</title>
    
    <!-- Pico CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
</head>
<body>
    <header class="container">
        <nav>
            <ul>
                <li><strong>Firmenname</strong></li>
            </ul>
            <ul>
                <li><a href="#services">Services</a></li>
                <li><a href="#about">Über uns</a></li>
                <li><a href="#contact" role="button">Kontakt</a></li>
            </ul>
        </nav>
    </header>

    <main class="container">
        <h1>Willkommen</h1>
        <p>Das ist automatisch gestylt.</p>
    </main>

    <footer class="container">
        <p>© 2026 Firmenname</p>
    </footer>
</body>
</html>
```

---

## Theme-Steuerung

### Dark/Light Mode setzen

```html
<!-- Dark Mode (Standard) -->
<html lang="de" data-theme="dark">

<!-- Light Mode -->
<html lang="de" data-theme="light">

<!-- System-Präferenz folgen (kein data-theme setzen) -->
<html lang="de">
```

### Theme-Toggle mit JavaScript

```html
<button id="theme-toggle">🌓 Theme wechseln</button>

<script>
const toggle = document.getElementById('theme-toggle');
const html = document.documentElement;

toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

// Gespeichertes Theme laden
const saved = localStorage.getItem('theme');
if (saved) html.setAttribute('data-theme', saved);
</script>
```

---

## Wichtige Elemente

### Container (begrenzt Breite)

```html
<!-- Zentrierter Container mit max-width -->
<main class="container">
    <p>Inhalt hier</p>
</main>

<!-- Volle Breite -->
<section class="container-fluid">
    <p>Volle Breite</p>
</section>
```

### Navigation

```html
<nav>
    <ul>
        <li><strong>Logo</strong></li>
    </ul>
    <ul>
        <li><a href="#">Link 1</a></li>
        <li><a href="#">Link 2</a></li>
        <li><a href="#" role="button">CTA Button</a></li>
    </ul>
</nav>
```

### Buttons

```html
<!-- Standard Button -->
<button>Primär</button>

<!-- Link als Button -->
<a href="#" role="button">Link-Button</a>

<!-- Varianten -->
<button class="secondary">Sekundär</button>
<button class="contrast">Kontrast</button>
<button class="outline">Outline</button>
```

### Cards (mit article)

```html
<article>
    <header>Card Header</header>
    <p>Card Inhalt...</p>
    <footer>
        <button>Aktion</button>
    </footer>
</article>
```

### Formulare

```html
<form>
    <label>
        E-Mail
        <input type="email" placeholder="name@example.de" required>
    </label>
    
    <label>
        Nachricht
        <textarea placeholder="Ihre Nachricht..."></textarea>
    </label>
    
    <button type="submit">Absenden</button>
</form>
```

### Gruppierte Überschriften

```html
<hgroup>
    <h2>Hauptüberschrift</h2>
    <p>Untertitel oder Beschreibung</p>
</hgroup>
```

### Grid-Layout

```html
<!-- Automatisches Grid -->
<div class="grid">
    <div>Spalte 1</div>
    <div>Spalte 2</div>
    <div>Spalte 3</div>
</div>
```

---

## Eigene Anpassungen

### CSS-Variablen überschreiben

```html
<style>
:root {
    /* Primärfarbe ändern */
    --pico-primary: #3b82f6;
    --pico-primary-hover: #2563eb;
    
    /* Border-Radius */
    --pico-border-radius: 0.5rem;
    
    /* Schriftgröße */
    --pico-font-size: 100%;
}
</style>
```

### Häufig genutzte Variablen

```css
:root {
    /* Farben */
    --pico-primary: #3b82f6;
    --pico-primary-hover: #2563eb;
    --pico-background-color: #1a1a2e;
    --pico-card-background-color: #16213e;
    
    /* Abstände */
    --pico-spacing: 1rem;
    --pico-block-spacing-vertical: 1rem;
    --pico-block-spacing-horizontal: 1rem;
    
    /* Typografie */
    --pico-font-family: system-ui, sans-serif;
    --pico-font-size: 100%;
    --pico-line-height: 1.5;
    
    /* Rahmen */
    --pico-border-radius: 0.25rem;
    --pico-border-width: 1px;
}
```

---

## Typische Erweiterungen

### Service-Cards mit Hover

```html
<style>
.service-card {
    padding: 1.5rem;
    border-radius: var(--pico-border-radius);
    background: var(--pico-card-background-color);
    border: 1px solid var(--pico-muted-border-color);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.service-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
</style>

<div class="service-card">
    <h4>☁️ Cloud Services</h4>
    <p>Beschreibung...</p>
</div>
```

### Hero-Section mit Gradient

```html
<style>
.hero {
    text-align: center;
    padding: 4rem 2rem;
    background: linear-gradient(135deg, 
        rgba(59, 130, 246, 0.1) 0%, 
        rgba(139, 92, 246, 0.1) 100%);
    border-radius: var(--pico-border-radius);
    margin-bottom: 2rem;
}
</style>

<section class="hero">
    <h1>Überschrift</h1>
    <p>Untertitel</p>
    <a href="#contact" role="button">Call to Action</a>
</section>
```

### Statistik-Zahlen

```html
<style>
.stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    flex-wrap: wrap;
    padding: 1.5rem;
    background: var(--pico-card-background-color);
    border-radius: var(--pico-border-radius);
}

.stat { text-align: center; }

.stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--pico-primary);
}

.stat-label {
    font-size: 0.9rem;
    color: var(--pico-muted-color);
}
</style>

<div class="stats">
    <div class="stat">
        <div class="stat-number">15+</div>
        <div class="stat-label">Jahre Erfahrung</div>
    </div>
    <div class="stat">
        <div class="stat-number">50+</div>
        <div class="stat-label">Projekte</div>
    </div>
</div>
```

---

## Integration mit S3-Workflow

### Deployment

```bash
# Dateien zu S3 synchronisieren
aws s3 sync ./website/ s3://deine-domain.de/ --delete

# Oder mit CloudFront Cache Invalidation
aws cloudfront create-invalidation --distribution-id EXXXXX --paths "/*"
```

### Dateistruktur

```
website/
├── index.html          # Hauptseite mit Pico CSS CDN
├── impressum.html      # Weitere Seiten
├── datenschutz.html
├── css/
│   └── custom.css      # Eigene Erweiterungen (optional)
├── js/
│   └── main.js         # JavaScript (optional)
└── images/
    └── logo.png
```

---

## Ressourcen

- **Dokumentation:** https://picocss.com/docs
- **Beispiele:** https://picocss.com/examples
- **GitHub:** https://github.com/picocss/pico
- **CSS-Variablen:** https://picocss.com/docs/css-variables

---

## Versionen pinnen (Produktion)

Für Produktionsseiten Version fixieren:

```html
<!-- Aktuelle Version 2.x -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2.0.6/css/pico.min.css">
```

So vermeidest du unerwartete Änderungen bei Updates.

---

*Erstellt: 2026-01-09*
