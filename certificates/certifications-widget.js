/**
 * Raimund Bauer - Certification Badge Widget
 * Einbettbar auf jeder Webseite via Script-Tag
 * 
 * Nutzung:
 * <div id="rb-certifications"></div>
 * <div id="rb-certifications" data-lang="en"></div>
 * <script src="https://crowdcompany.info/certifications-widget.js"></script>
 */

(function() {
  'use strict';

  const TRANSLATIONS = {
    de: {
      title: 'Verifizierte Zertifizierungen',
      subtitle: 'Klicken Sie auf ein Badge zur Verifizierung',
      verify: 'Verifizieren',
      verifyTitle: 'Zertifizierung verifizieren'
    },
    en: {
      title: 'Verified Certifications',
      subtitle: 'Click on a badge to verify',
      verify: 'Verify',
      verifyTitle: 'Verify certification'
    }
  };

  const CERTIFICATIONS = [
    {
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      verifyUrl: 'https://www.credly.com/badges/06c1a0fb-ec0c-4f9a-9b98-491064ba863f/public_url',
      badgeUrl: 'https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png',
      color: '#FF9900'
    },
    {
      name: 'Microsoft Azure Fundamentals',
      issuer: 'Microsoft',
      verifyUrl: 'https://learn.microsoft.com/api/credentials/share/de-de/RaimundBauer-9096/E433F4ED798678ED?sharingId=DD0D50C6C2600A10',
      badgeUrl: 'https://learn.microsoft.com/media/learn/certification/badges/microsoft-certified-fundamentals-badge.svg',
      color: '#0078D4'
    },
    {
      name: 'Microsoft Azure AI Fundamentals',
      issuer: 'Microsoft',
      verifyUrl: 'https://learn.microsoft.com/api/credentials/share/de-de/RaimundBauer-9096/85393A84D699698D?sharingId=DD0D50C6C2600A10',
      badgeUrl: 'https://learn.microsoft.com/media/learn/certification/badges/microsoft-certified-fundamentals-badge.svg',
      color: '#0078D4'
    },
    {
      name: 'Google Cloud Digital Leader',
      issuer: 'Google Cloud',
      verifyUrl: 'https://www.credly.com/badges/a570daac-301d-4d4b-8161-d93a33aa281f/public_url',
      badgeUrl: 'https://images.credly.com/size/340x340/images/44994cda-b5b0-44cb-9a6d-d29b57163073/image.png',
      color: '#4285F4'
    },
    {
      name: 'Google Generative AI Leader',
      issuer: 'Google Cloud',
      verifyUrl: 'https://www.credly.com/badges/74890765-5a15-4988-96a9-2c07439b2cf3/public_url',
      badgeUrl: 'https://images.credly.com/size/680x680/images/ec23e41a-0f32-4a98-9c00-28925621b281/blob',
      color: '#34A853'
    }
  ];

  const STYLES = `
    .rb-cert-widget {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      max-width: 100%;
      margin: 0 auto;
    }
    .rb-cert-widget * {
      box-sizing: border-box;
    }
    .rb-cert-header {
      text-align: center;
      margin-bottom: 0.75rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #e5e7eb;
    }
    .rb-cert-header h3 {
      margin: 0 0 0.25rem 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
    }
    .rb-cert-header p {
      margin: 0;
      font-size: 0.875rem;
      color: #6b7280;
    }
    .rb-cert-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      justify-content: center;
    }
    .rb-cert-badge {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.5rem;
      background: #fff;
      border-radius: 10px;
      border: 1px solid #e5e7eb;
      text-decoration: none;
      color: inherit;
      transition: all 0.2s ease;
      flex: 1 1 auto;
      min-width: 120px;
      max-width: 200px;
    }
    .rb-cert-badge:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px -6px rgba(0,0,0,0.15);
      border-color: var(--badge-color, #3b82f6);
    }
    .rb-cert-badge img {
      width: 110px;
      height: 110px;
      object-fit: contain;
      margin-bottom: 0.4rem;
    }
    .rb-cert-badge-name {
      font-size: 0.7rem;
      font-weight: 500;
      text-align: center;
      color: #374151;
      line-height: 1.2;
    }
    .rb-cert-badge-issuer {
      font-size: 0.6rem;
      color: #9ca3af;
      margin-top: 0.15rem;
      text-align: center;
    }
    .rb-cert-verify {
      font-size: 0.55rem;
      color: #3b82f6;
      margin-top: 0.25rem;
      display: flex;
      align-items: center;
      gap: 0.2rem;
    }
    .rb-cert-verify svg {
      width: 9px;
      height: 9px;
    }
    
    /* Kompakte Variante */
    .rb-cert-widget.compact .rb-cert-grid {
      gap: 3px;
    }
    .rb-cert-widget.compact .rb-cert-badge {
      padding: 0.3rem;
      min-width: 80px;
      max-width: 120px;
    }
    .rb-cert-widget.compact .rb-cert-badge img {
      width: 70px;
      height: 70px;
    }
    .rb-cert-widget.compact .rb-cert-badge-name {
      font-size: 0.6rem;
    }
    .rb-cert-widget.compact .rb-cert-badge-issuer,
    .rb-cert-widget.compact .rb-cert-verify {
      display: none;
    }
    
    /* Dark Mode */
    .rb-cert-widget.dark {
      background: #1f2937;
      padding: 0.75rem;
      border-radius: 12px;
    }
    .rb-cert-widget.dark .rb-cert-header h3 {
      color: #f9fafb;
    }
    .rb-cert-widget.dark .rb-cert-header p {
      color: #9ca3af;
    }
    .rb-cert-widget.dark .rb-cert-header {
      border-bottom-color: #374151;
    }
    .rb-cert-widget.dark .rb-cert-badge {
      background: #374151;
      border-color: #4b5563;
    }
    .rb-cert-widget.dark .rb-cert-badge:hover {
      border-color: var(--badge-color, #3b82f6);
    }
    .rb-cert-widget.dark .rb-cert-badge-name {
      color: #f3f4f6;
    }
    .rb-cert-widget.dark .rb-cert-badge-issuer {
      color: #9ca3af;
    }
    
    /* Responsive */
    @media (max-width: 480px) {
      .rb-cert-badge {
        min-width: 100px;
        max-width: 48%;
      }
      .rb-cert-badge img {
        width: 90px;
        height: 90px;
      }
    }
  `;

  // Detect browser language
  function detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage || 'de';
    // Extrahiere nur den Sprachcode (z.B. 'de' aus 'de-DE')
    const lang = browserLang.split('-')[0].toLowerCase();
    // Unterstützte Sprachen: de, en - Fallback zu 'de'
    return TRANSLATIONS[lang] ? lang : 'de';
  }

  function createWidget(container, options = {}) {
    const variant = options.variant || '';
    const showHeader = options.showHeader !== false;
    // Priorität: 1. explizit gesetzt, 2. Browser-Sprache
    const lang = options.lang || detectLanguage();
    const t = TRANSLATIONS[lang] || TRANSLATIONS.de;

    // Inject styles
    if (!document.getElementById('rb-cert-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'rb-cert-styles';
      styleEl.textContent = STYLES;
      document.head.appendChild(styleEl);
    }

    // Build HTML
    let html = `<div class="rb-cert-widget ${variant}">`;
    
    if (showHeader) {
      html += `
        <div class="rb-cert-header">
          <h3>${t.title}</h3>
          <p>${t.subtitle}</p>
        </div>
      `;
    }

    html += '<div class="rb-cert-grid">';
    
    CERTIFICATIONS.forEach(cert => {
      html += `
        <a href="${cert.verifyUrl}" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="rb-cert-badge"
           style="--badge-color: ${cert.color}"
           title="${t.verifyTitle}: ${cert.name}">
          <img src="${cert.badgeUrl}" alt="${cert.name}" loading="lazy">
          <span class="rb-cert-badge-name">${cert.name}</span>
          <span class="rb-cert-badge-issuer">${cert.issuer}</span>
          <span class="rb-cert-verify">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            ${t.verify}
          </span>
        </a>
      `;
    });

    html += '</div></div>';
    
    container.innerHTML = html;
  }

  // Auto-init on DOMContentLoaded
  function init() {
    const containers = document.querySelectorAll('[data-rb-certifications], #rb-certifications');
    containers.forEach(container => {
      const options = {
        variant: container.dataset.variant || '',
        showHeader: container.dataset.header !== 'false',
        // Wenn data-lang gesetzt, nutze das, sonst undefined (dann greift detectLanguage)
        lang: container.dataset.lang || undefined
      };
      createWidget(container, options);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for manual initialization
  window.RBCertifications = {
    init: createWidget,
    certifications: CERTIFICATIONS,
    translations: TRANSLATIONS,
    detectLanguage: detectLanguage
  };

})();
