# S3 Website-Hosting mit Custom Domain (Cloudflare)

## Übersicht

Diese Anleitung beschreibt den kompletten Workflow zum Einrichten einer statischen Website auf AWS S3 mit einer Custom Domain über Cloudflare DNS.

**Voraussetzungen:**
- AWS CLI installiert und konfiguriert
- AWS IAM-User mit S3-Berechtigungen
- Domain bei Cloudflare (Nameserver auf Cloudflare umgestellt)

**Wichtige Regel:** Der S3-Bucket muss **exakt so heißen wie die Domain**, damit der Host-Header korrekt funktioniert.

---

## Schritt 1: S3-Bucket erstellen

```bash
# Bucket mit Domain-Namen erstellen
aws s3 mb s3://meine-domain.de --region eu-central-1
```

**Hinweis:** Falls der Fehler `AccessDenied` erscheint, muss der IAM-User die Berechtigung `s3:CreateBucket` haben, oder der Bucket wird über die AWS Console erstellt.

---

## Schritt 2: Public Access Block deaktivieren

S3-Buckets sind standardmäßig privat. Für öffentliches Website-Hosting muss der Public Access Block entfernt werden:

```bash
aws s3api put-public-access-block \
  --bucket meine-domain.de \
  --public-access-block-configuration \
  "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
```

**Prüfen:**
```bash
aws s3api get-public-access-block --bucket meine-domain.de
```

---

## Schritt 3: Bucket Policy für öffentlichen Lesezugriff

Diese Policy erlaubt jedem, die Dateien im Bucket zu lesen:

```bash
aws s3api put-bucket-policy --bucket meine-domain.de --policy '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::meine-domain.de/*"
    }
  ]
}'
```

**Prüfen:**
```bash
aws s3api get-bucket-policy --bucket meine-domain.de
```

---

## Schritt 4: Static Website Hosting aktivieren

```bash
aws s3 website s3://meine-domain.de/ --index-document index.html
```

**Optional mit Error-Seite:**
```bash
aws s3 website s3://meine-domain.de/ --index-document index.html --error-document error.html
```

**Prüfen:**
```bash
aws s3api get-bucket-website --bucket meine-domain.de
```

**Website-URL (direkt S3):**
```
http://meine-domain.de.s3-website.eu-central-1.amazonaws.com
```

---

## Schritt 5: Dateien hochladen

### Einzelne Datei:
```bash
aws s3 cp index.html s3://meine-domain.de/
```

### Ganzen Ordner synchronisieren:
```bash
aws s3 sync /pfad/zum/projekt/ s3://meine-domain.de/
```

### Mit Löschung (Dateien die lokal nicht existieren werden auch in S3 gelöscht):
```bash
aws s3 sync /pfad/zum/projekt/ s3://meine-domain.de/ --delete
```

### Bestimmte Dateien ausschließen:
```bash
aws s3 sync /pfad/zum/projekt/ s3://meine-domain.de/ \
  --delete \
  --exclude ".git/*" \
  --exclude "*.md" \
  --exclude "node_modules/*"
```

**Wichtig:** Kein `--acl public-read` verwenden! Die Bucket Policy regelt den Zugriff.

---

## Schritt 6: S3-Website testen

Bevor du Cloudflare konfigurierst, teste die direkte S3-URL:

```bash
curl http://meine-domain.de.s3-website.eu-central-1.amazonaws.com
```

Oder im Browser:
```
http://meine-domain.de.s3-website.eu-central-1.amazonaws.com
```

Wenn das funktioniert, weiter zu Schritt 7.

---

## Schritt 7: Cloudflare DNS konfigurieren

### Im Cloudflare Dashboard:

1. **Login:** https://dash.cloudflare.com
2. **Domain auswählen:** meine-domain.de
3. **DNS** → **Einträge**
4. **Eintrag hinzufügen** (oder bestehenden bearbeiten)

### CNAME für Root-Domain (@):

| Feld | Wert |
|------|------|
| Typ | `CNAME` |
| Name | `@` |
| Ziel | `meine-domain.de.s3-website.eu-central-1.amazonaws.com` |
| Proxy-Status | **AUS** (graue Wolke!) |
| TTL | Auto |

### CNAME für www-Subdomain:

| Feld | Wert |
|------|------|
| Typ | `CNAME` |
| Name | `www` |
| Ziel | `meine-domain.de.s3-website.eu-central-1.amazonaws.com` |
| Proxy-Status | **AUS** (graue Wolke!) |
| TTL | Auto |

### ⚠️ Wichtig: Proxy muss AUS sein!

- S3 Website-Hosting unterstützt **nur HTTP** (kein HTTPS)
- Cloudflare Proxy versucht HTTPS zu erzwingen → Konflikt
- Mit Proxy AUS leitet Cloudflare nur DNS weiter

---

## Schritt 8: DNS-Propagation abwarten und testen

Nach dem Speichern in Cloudflare:

1. **1-5 Minuten warten** (Cloudflare ist schnell)
2. **Inkognito-Fenster öffnen** (verhindert Browser-Cache)
3. **Domain aufrufen:** `http://meine-domain.de`

### DNS prüfen (optional):
```bash
dig meine-domain.de
```

### HTTP-Header prüfen:
```bash
curl -I http://meine-domain.de
```

---

## Komplettes Setup-Script

Hier alle Befehle zusammengefasst zum Kopieren:

```bash
#!/bin/bash

# === KONFIGURATION ===
DOMAIN="meine-domain.de"
REGION="eu-central-1"
LOCAL_PATH="/pfad/zum/projekt"

# === SETUP ===

echo "🚀 Starte Setup für $DOMAIN"

# 1. Bucket erstellen
echo "📦 Erstelle Bucket..."
aws s3 mb s3://$DOMAIN --region $REGION

# 2. Public Access Block deaktivieren
echo "🔓 Deaktiviere Public Access Block..."
aws s3api put-public-access-block \
  --bucket $DOMAIN \
  --public-access-block-configuration \
  "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# 3. Bucket Policy setzen
echo "📜 Setze Bucket Policy..."
aws s3api put-bucket-policy --bucket $DOMAIN --policy '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::'$DOMAIN'/*"
    }
  ]
}'

# 4. Website-Hosting aktivieren
echo "🌐 Aktiviere Website-Hosting..."
aws s3 website s3://$DOMAIN/ --index-document index.html

# 5. Dateien hochladen
echo "📤 Lade Dateien hoch..."
aws s3 sync $LOCAL_PATH s3://$DOMAIN/ --delete

# 6. Fertig
echo ""
echo "✅ Setup abgeschlossen!"
echo ""
echo "S3 Website-URL:"
echo "http://$DOMAIN.s3-website.$REGION.amazonaws.com"
echo ""
echo "⚠️  Jetzt in Cloudflare DNS konfigurieren:"
echo "   Typ:    CNAME"
echo "   Name:   @"
echo "   Ziel:   $DOMAIN.s3-website.$REGION.amazonaws.com"
echo "   Proxy:  AUS (graue Wolke!)"
```

---

## Dateien aktualisieren (Deployment)

Nach Änderungen an der Website:

```bash
# Nur geänderte Dateien hochladen
aws s3 sync /pfad/zum/projekt/ s3://meine-domain.de/ --delete
```

---

## Troubleshooting

### Problem: "Access Denied" beim Bucket erstellen
**Lösung:** IAM-User braucht `s3:CreateBucket` Berechtigung, oder Bucket über AWS Console erstellen.

### Problem: "The bucket does not allow ACLs"
**Lösung:** Kein `--acl public-read` verwenden. Die Bucket Policy regelt den Zugriff.

### Problem: Website zeigt "404 Not Found"
**Lösung:**
1. Prüfen ob `index.html` existiert: `aws s3 ls s3://meine-domain.de/`
2. Prüfen ob Website-Hosting aktiv ist: `aws s3api get-bucket-website --bucket meine-domain.de`

### Problem: Website zeigt "403 Forbidden"
**Lösung:**
1. Public Access Block deaktiviert? `aws s3api get-public-access-block --bucket meine-domain.de`
2. Bucket Policy korrekt? `aws s3api get-bucket-policy --bucket meine-domain.de`

### Problem: Domain zeigt nicht auf S3
**Lösung:**
1. Cloudflare Proxy AUS? (graue Wolke)
2. CNAME Ziel korrekt? (bucket-name.s3-website.region.amazonaws.com)
3. DNS-Propagation abwarten (1-5 Minuten)
4. Im Inkognito-Fenster testen

### Problem: HTTPS funktioniert nicht
**Erklärung:** S3 Website-Hosting unterstützt nur HTTP. Für HTTPS wird CloudFront benötigt (separate Anleitung).

---

## IAM-Policy für S3-Deploy-User

Der IAM-User benötigt folgende Berechtigungen:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CreateBuckets",
      "Effect": "Allow",
      "Action": "s3:CreateBucket",
      "Resource": "*"
    },
    {
      "Sid": "ListAllBuckets",
      "Effect": "Allow",
      "Action": "s3:ListAllMyBuckets",
      "Resource": "*"
    },
    {
      "Sid": "ListBucketContents",
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetBucketLocation"
      ],
      "Resource": [
        "arn:aws:s3:::meine-domain.de",
        "arn:aws:s3:::weitere-domain.com"
      ]
    },
    {
      "Sid": "ReadWriteDeleteObjects",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::meine-domain.de/*",
        "arn:aws:s3:::weitere-domain.com/*"
      ]
    },
    {
      "Sid": "ManageBucketConfiguration",
      "Effect": "Allow",
      "Action": [
        "s3:GetBucketPublicAccessBlock",
        "s3:PutBucketPublicAccessBlock",
        "s3:GetBucketPolicy",
        "s3:PutBucketPolicy",
        "s3:GetBucketWebsite",
        "s3:PutBucketWebsite"
      ],
      "Resource": [
        "arn:aws:s3:::meine-domain.de",
        "arn:aws:s3:::weitere-domain.com"
      ]
    }
  ]
}
```

**Tipp:** Für neue Domains einfach die ARNs in allen `Resource`-Arrays ergänzen.

---

## Checkliste für neue Website

- [ ] Domain bei Cloudflare (Nameserver umgestellt)
- [ ] S3-Bucket erstellt (Name = Domain)
- [ ] Public Access Block deaktiviert
- [ ] Bucket Policy gesetzt
- [ ] Website-Hosting aktiviert
- [ ] Dateien hochgeladen
- [ ] S3-URL getestet
- [ ] Cloudflare CNAME erstellt (Proxy AUS!)
- [ ] Domain im Browser getestet

---

## Referenz: AWS-Regionen

| Region | Endpoint |
|--------|----------|
| eu-central-1 (Frankfurt) | `bucket.s3-website.eu-central-1.amazonaws.com` |
| eu-west-1 (Ireland) | `bucket.s3-website-eu-west-1.amazonaws.com` |
| us-east-1 (N. Virginia) | `bucket.s3-website-us-east-1.amazonaws.com` |
| us-west-2 (Oregon) | `bucket.s3-website-us-west-2.amazonaws.com` |

**Hinweis:** Manche Regionen nutzen `-` statt `.` vor der Region (z.B. `s3-website-eu-west-1`).

---

## Zusammenfassung

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Browser        │────▶│  Cloudflare     │────▶│  S3 Bucket      │
│                 │     │  (DNS only)     │     │                 │
│  meine-domain.de│     │  Proxy: AUS     │     │  meine-domain.de│
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
        │   HTTP Request        │   CNAME Redirect      │
        │   Host: meine-domain.de                       │
        │                       │                       │
        └───────────────────────┴───────────────────────┘
```

**Wichtig:**
1. Bucket-Name = Domain-Name (wegen Host-Header)
2. Cloudflare Proxy = AUS (wegen HTTP-only)
3. Kein `--acl` beim Upload (Bucket Policy regelt Zugriff)

---

*Letzte Aktualisierung: 2026-01-08*
