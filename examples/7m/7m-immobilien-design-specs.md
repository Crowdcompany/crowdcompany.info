# Design-Spezifikationen: 7M Immobilien GmbH

> Analyse vom 30.12.2025
> Quelle: https://7m-immobilien.de/

---

## 1. Farbschema

### Primärfarben (Aus CSS extrahiert)
| Name | Hex-Code | RGB | Verwendung |
|------|----------|-----|------------|
| **Grün (Primary)** | `#7DA23B` | 125, 161, 59 | Footer-Hintergrund, Buttons, Navigation, Akzente |
| **Dunkelgrau** | `#656565` | 101, 101, 101 | Sekundärtexte, Icons, Border-Farbe |
| **Schwarz** | `#020101` | 2, 1, 1 | Texte, Überschriften |
| **Creme/Hellbeige** | `#F2F0EB` | 242, 240, 235 | Section-Hintergründe |
| **Beige** | `#E4E0D4` | 228, 224, 212 | Hintergrund-Akzente |
| **Weiß** | `#FFFFFF` | 255, 255, 255 | Hintergründe, Text auf dunklem Grund |

### Akzentfarben
| Name | Hex-Code | RGB | Verwendung |
|------|----------|-----|------------|
| **Dunkelrosa** | `#8E2F51` | 142, 47, 81 | Special Highlights |
| **Orange/Gold** | `#FFBC7D` | 255, 188, 125 | Call-to-Action, Hervorhebungen |

### CSS-Variablen (Elementor Global Colors)
```css
:root {
    /* Aus dem Elementor CSS extrahiert */
    --e-global-color-primary: #7DA23B;
    --e-global-color-text: #020101;
    --e-global-color-secondary: #656565;
    --e-global-color-accent: #FFBC7D;
}
```

---

## 2. Ressourcen und Bilder

### Logos
| Datei | URL | Lokaler Pfad |
|-------|-----|--------------|
| Logo Haupt (Header) | https://7m-immobilien.de/wp-content/uploads/2020/11/7M_Immobilien_Eifel_Rheinland_Ruhrgebiet-Logo1.png | Bilder/Logo1.png |
| Logo Secondary (Footer) | https://7m-immobilien.de/wp-content/uploads/2020/11/7M_Immobilien_Eifel_Rheinland_Ruhrgebiet-Logo2.png | Bilder/Logo2.png |
| Favicon | https://7m-immobilien.de/wp-content/uploads/2020/11/7M_Immobilien_Eifel_Rheinland_Ruhrgebiet-Favicon-150x150.jpg | Bilder/Favicon.png |
| TileImage | https://7m-immobilien.de/wp-content/uploads/2020/11/7M_Immobilien_Eifel_Rheinland_Ruhrgebiet-Favicon-300x300.jpg | - |

### Immobilien-Bilder
| Datei | URL |
|-------|-----|
| Hero-Hintergrund | https://7m-immobilien.de/wp-content/uploads/2021/03/7M-Immobilien14-start.jpg |
| Immobilie 1 | https://7m-immobilien.de/wp-content/uploads/2021/01/7M-Immobilien1.jpg |
| Immobilie 2 | https://7m-immobilien.de/wp-content/uploads/2021/01/7M-Immobilien2.jpg |
| Immobilie 3 | https://7m-immobilien.de/wp-content/uploads/2021/01/7M-Immobilien3.jpg |
| Immobilie 4 | https://7m-immobilien.de/wp-content/uploads/2021/01/7M-Immobilien4.jpg |
| Immobilie 5 | https://7m-immobilien.de/wp-content/uploads/2021/01/7M-Immobilien5.jpg |
| Immobilie 6 | https://7m-immobilien.de/wp-content/uploads/2021/01/7M-Immobilien6.jpg |
| Immobilie 7 (Teich) | https://7m-immobilien.de/wp-content/uploads/2021/01/7M-Immobilien7.jpg |
| Immobilie 8 | https://7m-immobilien.de/wp-content/uploads/2021/01/7M-Immobilien8.jpg |
| Immobilie 9 | https://7m-immobilien.de/wp-content/uploads/2021/01/7M-Immobilien9.jpg |
| Immobilie 10 (Garten) | https://7m-immobilien.de/wp-content/uploads/2021/01/7M-Immobilien10.jpg |
| Immobilie 11 (Denkmal) | https://7m-immobilien.de/wp-content/uploads/2021/01/7M-Immobilien11.jpg |
| Immobilie 12 (Turm) | https://7m-immobilien.de/wp-content/uploads/2021/01/7M-Immobilien12.jpg |
| Immobilie 13 | https://7m-immobilien.de/wp-content/uploads/2021/01/7M-Immobilien13.jpg |

### Kooperations-Logos
| Datei | URL |
|-------|-----|
| Fifth Flour | https://7m-immobilien.de/wp-content/uploads/2020/11/fifthflour.png |
| Modal | https://7m-immobilien.de/wp-content/uploads/2020/11/Modal...png |

---

## 3. Typografie

### Schriftarten
- **Primär:** System-Sans-Serif (Arial, sans-serif gemäß CSS)
- **Größen:**
  - Normal: 12px (laut CSS `font-size:12px`)
  - Navigation: 16px mit Padding
  - Überschriften: Variabel je nach Element

### CSS-Referenz
```css
.elementor-48 .elementor-element.elementor-element-52a3bc5 .elementor-button {
    font-family: "Arial", Sans-serif;
    font-size: 12px;
}
```

---

## 4. Layout-Struktur

### Technologie-Stack
- **CMS:** WordPress 6.9
- **Seitenbuilder:** Elementor Pro 3.18.3
- **Immobilien-Listen:** Jet Engine
- **Cookie-Consent:** Borlabs Cookie 2.2.49

### Responsive Breakpoints
| Gerät | Breakpoint |
|-------|------------|
| Mobile | max-width: 767px |
| Tablet | max-width: 1024px |

---

## 5. Button-Stile

### Primär-Button (z.B. "Suchen")
```css
.elementor-button {
    font-family: "Arial", Sans-serif;
    font-size: 12px;
    fill: var(--e-global-color-text);
    color: var(--e-global-color-text);
    background-color: #E4E0D478; /* Transparent mit Beige-Touch */
    padding: 1% 1% 1% 1%;
}
```

### Footer-Buttons
```css
.elementor-element-52a3bc5 .elementor-button {
    background-color: #02010100; /* Transparent */
    padding: 0% 0% 0% 0%;
}
```

---

## 6. Header-Design

### Navigations-Links
```css
.elementor-nav-menu--main .elementor-item {
    color: var(--e-global-color-text);
    fill: var(--e-global-color-text);
    padding-left: 16px;
    padding-right: 16px;
}

.elementor-nav-menu--main .elementor-item:hover,
.elementor-nav-menu--main .elementor-item.elementor-item-active {
    color: var(--e-global-color-primary); /* #7DA23B */
    fill: var(--e-global-color-primary);
}
```

### Mobile Menu Toggle
- Hamburger-Menü für Mobile
- Zentriertes Logo auf Mobile

---

## 7. Footer-Design

### Footer-Hintergrund
```css
.elementor-element-170db061 {
    background-color: var(--e-global-color-6039a4b); /* Entspricht Primary #7DA23B */
}
```

### Footer-Styles
| Element | Wert |
|---------|------|
| Hintergrund | #7DA23B (Grün) |
| Textfarbe | #FFFFFF (Weiß) |
| Border | 1px solid #020101 |
| Padding | 0% 3% 0% 3% |

### Footer-Navigation
```css
.elementor-48 .elementor-element.elementor-element-4112bacc {
    background-color: #E4E0D478;
    border-style: solid;
    border-width: 0px 0px 1px 0px;
    border-color: var(--e-global-color-text);
}
```

---

## 8. Social Media Links

### Footer Social Icons
```css
.elementor-element-27e65b4.elementor-view-stacked .elementor-icon {
    background-color: var(--e-global-color-text); /* #020101 */
}

.elementor-element-27e65b4.elementor-view-stacked .elementor-icon:hover {
    background-color: #6565657D; /* Transparent Grau */
}
```

---

## 9. Komplette CSS-Variablen

```css
:root {
    /* Primärfarben - Extrahiert aus Elementor CSS */
    --color-primary: #7DA23B;
    --color-primary-rgb: 125, 161, 59;
    --color-text: #020101;
    --color-text-rgb: 2, 1, 1;
    --color-secondary: #656565;
    --color-secondary-rgb: 101, 101, 101;

    /* Hintergrundfarben */
    --color-bg-light: #F2F0EB;
    --color-bg-medium: #E4E0D4;
    --color-white: #FFFFFF;

    /* Akzentfarben */
    --color-accent: #FFBC7D;
    --color-accent-secondary: #8E2F51;

    /* Border */
    --color-border: #656565;

    /* Hover-Farben */
    --color-hover: #6565657D;

    /* Typografie */
    --font-primary: "Arial", Sans-serif;
    --font-size-small: 12px;
    --font-size-normal: 14px;
    --font-size-medium: 16px;

    /* Abstände */
    --padding-nav: 16px;
    --padding-button: 1%;

    /* Transitions */
    --transition: 0.3s;
}
```

---

## 10. Zusammenfassung

Das Design der 7M Immobilien GmbH zeichnet sich aus durch:

- **Hauptfarbe:** Grünes #7DA23B für Footer und wichtige Akzente
- **Textfarbe:** Dunkles #020101 für optimale Lesbarkeit
- **Hintergrund:** Creme-Farbton #F2F0EB für warme, einladende Atmosphäre
- **Layout:** Elementor-basiert, komplett responsive
- **Gesamteindruck:** Professionell, seriös, vertrauenswürdig

Die Farben wurden direkt aus dem CSS der Originalseite extrahiert und entsprechen 1:1 dem Original-Design.

---

*Erstellt für die Entwicklung einer neuen Marke der 7M Immobilien GmbH.*
