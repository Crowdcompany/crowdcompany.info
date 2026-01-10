# 7M Immobilien Website Design Guide

## Übersicht

Dieser Design Guide definiert alle visuellen und strukturellen Regeln für die 7M Immobilien Website. Die Datei dient als Single Source of Truth für das Design-System.

---

## Farbpalette

### Primärfarben

| Name | Hex | RGB | Verwendung |
|------|-----|-----|------------|
| `--color-primary` | `#7DA23B` | 125, 162, 59 | Hauptfarbe, Buttons, Highlights, Header-Links |
| `--color-primary-hover` | `#656565` | 101, 101, 101 | Hover-State |
| `--color-accent` | `#FFBC7D` | 255, 188, 125 | Akzente (z.B. Käufer-Card) |

### Textfarben

| Name | Hex | RGB | Verwendung |
|------|-----|-----|------------|
| `--color-text` | `#020101` | 2, 1, 1 | Haupttext, Überschriften, Navigation |
| `--color-text-secondary` | `#656565` | 101, 101, 101 | Untertext, Metadaten, Kontaktdaten |
| `--color-border` | `#656565` | 101, 101, 101 | Rahmen, Trennlinien |

### Hintergrundfarben

| Name | Hex | RGB | Verwendung |
|------|-----|-----|------------|
| `--color-white` | `#FFFFFF` | 255, 255, 255 | Header, Cards, Content-Bereiche |
| `--color-bg-light` | `#F2F0EB` | 242, 240, 235 | Haupt-Hintergrund |
| `--color-bg-medium` | `#E4E0D4` | 228, 224, 212 | Section-Hintergrund (About) |

---

## Typografie

### Schriftarten

```css
font-family: "Arial", -apple-system, BlinkMacSystemFont, sans-serif;
```

### Schriftgrößen

| Variable | Wert | Verwendung |
|----------|------|------------|
| `--font-size-xs` | 12px | Footer-Links, Meta-Infos, Preise-Label |
| `--font-size-sm` | 14px | Fließtext, Body-Content |
| `--font-size-md` | 16px | Navigation, Team-Bio, Card-Text |
| `--font-size-lg` | 24px | Section-Titles, Hero-Tagline |
| `--font-size-xl` | 32px | H2-Überschriften |
| `--font-size-xxl` | 42px | Hero-Headline |

### Zeilenabstand

```css
line-height: 1.6;  /* Haupttext */
line-height: 1.7;  /* Team-Bio */
```

---

## Abstände (Spacing)

### Spacing-Variablen

| Variable | Wert | Rem | Verwendung |
|----------|------|-----|------------|
| `--space-20` | 0.44rem | 7px | Kleine Abstände |
| `--space-30` | 0.67rem | 11px | Innerhalb Components |
| `--space-40` | 1rem | 16px | Standard-Abstand |
| `--space-50` | 1.5rem | 24px | Card-Padding |
| `--space-60` | 2.25rem | 36px | Section-Padding |
| `--space-70` | 3.38rem | 54px | Große Section-Abstände |
| `--space-80` | 5.06rem | 81px | Hero, Haupt-Sections |

---

## Komponenten

### Header

```css
header {
    background-color: var(--color-white);
    padding: 1px 3% 30px 3%;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
}

.header-container {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
}

.logo {
    max-width: 180px;
    width: 180px;
    flex-shrink: 0;
}

.header-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex: 1;
}

.top-bar {
    display: flex;
    gap: 30px;
    font-size: var(--font-size-xs);
    margin-bottom: 8px;
}

nav ul {
    display: flex;
    list-style: none;
    gap: 16px;
}

nav a {
    padding-left: 16px;
    padding-right: 16px;
}

nav a:hover,
nav a.active {
    color: var(--color-primary);
}
```

### Hero Section

```css
.hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),
                url('Bilder/7M-Immobilien13.jpg') center/cover no-repeat;
    padding: calc(var(--space-80) + 80px) 3% var(--space-80);
}

.hero-tagline {
    font-size: var(--font-size-lg);
    color: var(--color-white);
    opacity: 0.95;
    max-width: 800px;
}
```

### Property Cards

```css
.properties-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: var(--space-50);
}

.property-card {
    background: var(--color-white);
    overflow: hidden;
    transition: var(--transition);
}

.property-card:hover {
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.property-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
}

.property-content {
    padding: 20px;
}

.property-category {
    display: inline-block;
    padding: 4px 12px;
    font-size: var(--font-size-xs);
    margin-bottom: var(--space-20);
}

.property-title {
    font-size: 1.1rem;
    font-weight: 600;
    line-height: 1.4;
}

.property-price {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-primary);
}
```

### Target Groups Cards (Verkäufer/Käufer)

```css
.target-groups {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: var(--space-50);
    margin-bottom: var(--space-70);
}

.target-card {
    background: var(--color-bg-light);
    padding: var(--space-50);
    border-left: 4px solid var(--color-primary);
}

.seller-card {
    border-left-color: var(--color-primary);
}

.buyer-card {
    border-left-color: var(--color-accent);
}

.benefit-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.benefit-list li {
    padding: var(--space-20) 0;
    display: flex;
    align-items: flex-start;
    gap: var(--space-20);
}

.benefit-list .check {
    color: var(--color-primary);
    font-weight: bold;
    flex-shrink: 0;
}
```

### Team Section

```css
.team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: var(--space-60);
    margin-top: var(--space-60);
}

.team-card {
    background: var(--color-white);
    padding: var(--space-50);
    text-align: center;
}

.team-photo {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center 20%;
    margin-bottom: var(--space-30);
    border: 3px solid var(--color-primary);
}

.team-name {
    font-size: var(--font-size-lg);
    color: var(--color-primary);
    margin-bottom: var(--space-20);
}

.team-role {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin-bottom: var(--space-30);
}

.team-bio {
    font-size: var(--font-size-sm);
    line-height: 1.7;
}
```

### 4 Säulen (Pillars)

```css
.pillars-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-40);
    margin: var(--space-70) 0;
}

.pillar-card {
    background: var(--color-white);
    padding: var(--space-50);
    border: 1px solid var(--color-border);
    text-align: center;
    transition: var(--transition);
}

.pillar-card:hover {
    border-color: var(--color-primary);
    transform: translateY(-5px);
}

.pillar-icon {
    font-size: 2.5rem;
    display: block;
    margin-bottom: var(--space-30);
}
```

### Footer

```css
footer {
    background-color: var(--color-primary);
    color: var(--color-white);
    padding: var(--space-70) 3% var(--space-40);
}

.footer-container {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-60);
}

.footer-logo {
    max-width: 200px;
    margin-bottom: var(--space-30);
}
```

---

## Buttons

### Standard Button (View All)

```css
.view-all-link {
    display: inline-block;
    background-color: transparent;
    color: var(--color-text);
    padding: 1% 1%;
    border: 1px solid var(--color-text);
    border-radius: 0px;
    font-weight: 600;
    margin-top: var(--space-40);
    font-size: var(--font-size-xs);
}

.view-all-link:hover {
    background-color: var(--color-primary);
    color: var(--color-white);
    border-color: var(--color-primary);
}
```

### Team Button

```css
.team-btn {
    display: inline-block;
    background-color: transparent;
    color: var(--color-text);
    padding: 8px 20px;
    border: 1px solid var(--color-text);
    border-radius: 0px;
    font-weight: 600;
    font-size: var(--font-size-xs);
}

.team-btn:hover {
    background-color: var(--color-primary);
    color: var(--color-white);
    border-color: var(--color-primary);
}
```

---

## Responsive Design

### Mobile Breakpoint (max-width: 767px)

```css
@media (max-width: 767px) {
    :root {
        --font-size-lg: 20px;
        --font-size-xl: 26px;
        --font-size-xxl: 32px;
        --space-80: 3.38rem;
    }

    .logo {
        width: 140px;
        max-width: 140px;
    }

    .top-bar {
        display: none;
    }

    .mobile-menu-btn {
        display: block;
    }

    nav {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--color-white);
        padding: var(--space-40);
    }

    nav.active {
        display: block;
    }

    nav ul {
        flex-direction: column;
        gap: var(--space-30);
    }

    .properties-grid,
    .team-grid {
        grid-template-columns: 1fr;
    }
}
```

---

## Global Settings

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: "Arial", -apple-system, BlinkMacSystemFont, sans-serif;
    color: var(--color-text);
    line-height: 1.6;
    background-color: var(--color-bg-light);
}

a {
    text-decoration: none;
    color: inherit;
    transition: var(--transition);
}

img {
    max-width: 100%;
    height: auto;
}

:root {
    --btn-radius: 0px;
    --card-radius: 0px;
    --transition: 0.3s;
}
```

---

## Animationen

### Scroll Animation

```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.property-card, .team-card, .service-item').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(el);
});
```

### Header Scroll Effect

```javascript
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});
```

---

## Assets

### Bild-Dateien

| Datei | Beschreibung |
|-------|--------------|
| `Bilder/Logo1.png` | Header & Footer Logo |
| `Bilder/7M-Immobilien1.jpg` - `7M-Immobilien14.jpg` | Property Images |
| `Bilder/MichaelSieben.jpg` | Team Photo Michael |
| `Bilder/NicoleBauer.jpeg` | Team Photo Nicole |
| `Bilder/Favicon.png` | Favicon |

### Empfohlene Bild-Größen

| Verwendung | Größe |
|------------|-------|
| Logo Header | 180px breit |
| Logo Footer | 200px breit |
| Team Photos | 180x180px (rund) |
| Property Images | 350px breit (Cards) |

---

## Links-Struktur

### Interne Anchors
- `#properties` → Angebote Section
- `#services` → Services Section
- `#about` → Über uns Section
- `#contact` → Footer/Kontakt

### Externe Links (7m-immobilien.de)
- `/angebote` → Alle Angebote
- `/kontakt` → Kontaktformular
- `/home/team` → Team Seite
- `/immobilien-abc` → Ratgeber
- `/referenzen` → Referenzen
- `/datenschutz`, `/impressum` → Rechtliches

### Funktionelle Links
- `mailto:info@7M-Immobilien.de`
- `tel:+4924849196325`

---

## Best Practices

### DO
- Verwende die CSS-Variablen für alle Farben und Abstände
- Nutze Flexbox und Grid für Layouts
- Halte Konsistenz bei Button-Styles
- Verwende semantisches HTML

### DON'T
- Hartkodiere Farbwerte (nutze Variablen)
- Mische verschiedene Button-Styles
- Vergiss mobile Responsiveness

---

## Workflow & Entwicklungsprozess

### GitHub + Lokale Datei synchronisieren

**WICHTIG:** Nach JEDER Änderung müssen beide Dateien aktualisiert werden:

1. **index.html** im lokalen Arbeitsverzeichnis (`/media/xray/NEU/Code/Firecrawl/`) aktualisieren
2. **7MServices/index.html** im GitHub-Repository aktualisieren
3. Beide Versionen zu GitHub pushen

**Warum?** Raimund muss die Änderungen sofort in seinem Browser sehen können (per `file://` URL), ohne auf GitHub Pages warten zu müssen.

**Befehl nach dem Git-Commit:**
```bash
cp /media/xray/NEU/Code/Firecrawl/7MServices/index.html /media/xray/NEU/Code/Firecrawl/index.html
```

### Änderungs-Kommunikation

Nach jedem Commit:
- Nenne die Datei, die geändert wurde
- Beschreibe die Änderung kurz
- Bestätige, dass beide Dateien (lokal + GitHub) aktualisiert wurden

---

## Wartung

### Letzte Aktualisierung
Diese Datei sollte bei jedem Design-Update überprüft und aktualisiert werden.

### Versions-Historie
- v1.0: Initiale Version
- v1.1: Farben aus Elementor CSS extrahiert
- v1.2: Team-Section mit runden Photos
- v1.3: Extended Benefits-Listen hinzugefügt
- v1.4: Header-Layout optimiert
