# AWS CLI Befehle - S3 Multi-Domain Hosting

## Projektübersicht

- **S3-Bucket:** `2026crowdhosting`
- **AWS-Region:** `eu-central-1` (Frankfurt)
- **IAM-User:** `s3-deploy-user`
- **Bucket-Struktur:** `s3://2026crowdhosting/domain-name/`

---

## 1. AWS CLI Installation & Konfiguration

### Installation (Debian/Ubuntu)
```bash
cd /tmp
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
sudo apt update && sudo apt install unzip -y
unzip awscliv2.zip
sudo ./aws/install
rm -rf awscliv2.zip aws/
```

### Konfiguration
```bash
# Credentials einrichten
aws configure

# Eingaben:
# AWS Access Key ID: [Dein Access Key]
# AWS Secret Access Key: [Dein Secret Key]
# Default region name: eu-central-1
# Default output format: json
```

### Credentials-Sicherheit
```bash
# Berechtigungen setzen
chmod 600 ~/.aws/credentials
chmod 600 ~/.aws/config
```

### Installation prüfen
```bash
# Version anzeigen
aws --version

# Credentials testen
aws s3 ls
```

---

## 0. WICHTIG: Öffentlichen Zugriff aktivieren

**Nach jedem Upload** müssen die Dateien für den öffentlichen Zugriff freigegeben werden:

```bash
# Bucket Policy setzen (einmalig oder nach Änderungen)
aws s3api put-bucket-policy --bucket 2026crowdhosting \
  --policy '{"Version":"2012-10-17","Statement":[{"Sid":"PublicReadGetObject","Effect":"Allow","Principal":"*","Action":"s3:GetObject","Resource":"arn:aws:s3:::2026crowdhosting/*"}]}'

# Öffentlichen Access Block deaktivieren (einmalig)
aws s3api put-public-access-block --bucket 2026crowdhosting \
  --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# Einzelne Datei mit public-read ACL hochladen
aws s3 cp index.html s3://2026crowdhosting/index.html --acl public-read
```

**Wichtig:** Die Bucket Policy und der Public Access Block müssen korrekt konfiguriert sein, bevor der Upload erfolgt.

---

## 2. Bucket-Verwaltung

### Bucket-Inhalt anzeigen
```bash
# Gesamter Bucket
aws s3 ls s3://2026crowdhosting/

# Bestimmter Ordner
aws s3 ls s3://2026crowdhosting/test1/

# Rekursiv (alle Unterordner)
aws s3 ls s3://2026crowdhosting/ --recursive

# Mit Details (Größe, Datum)
aws s3 ls s3://2026crowdhosting/ --human-readable --summarize
```

### Bucket-Informationen
```bash
# Bucket-Region anzeigen
aws s3api get-bucket-location --bucket 2026crowdhosting

# Bucket-Policy anzeigen
aws s3api get-bucket-policy --bucket 2026crowdhosting

# Website-Konfiguration anzeigen
aws s3api get-bucket-website --bucket 2026crowdhosting
```

---

## 3. Dateien hochladen (Upload)

### Einzelne Datei hochladen
```bash
# Einfacher Upload
aws s3 cp /pfad/zur/datei.html s3://2026crowdhosting/domain.de/datei.html

# Mit Content-Type (empfohlen für HTML/CSS/JS)
aws s3 cp /pfad/zur/index.html s3://2026crowdhosting/domain.de/index.html --content-type "text/html"

# Mit Cache-Control
aws s3 cp /pfad/zur/style.css s3://2026crowdhosting/domain.de/style.css --content-type "text/css" --cache-control "max-age=31536000"
```

### Gesamten Ordner hochladen (Sync)
```bash
# Lokalen Ordner mit S3 synchronisieren
aws s3 sync /pfad/zum/lokalen/ordner/ s3://2026crowdhosting/domain.de/

# Mit Löschung (Dateien die lokal nicht mehr existieren werden auch in S3 gelöscht)
aws s3 sync /pfad/zum/lokalen/ordner/ s3://2026crowdhosting/domain.de/ --delete

# Nur bestimmte Dateitypen
aws s3 sync /pfad/zum/lokalen/ordner/ s3://2026crowdhosting/domain.de/ --exclude "*" --include "*.html" --include "*.css" --include "*.js"

# Mit korrekten Content-Types für Website
aws s3 sync /pfad/zum/lokalen/ordner/ s3://2026crowdhosting/domain.de/ \
  --content-type "text/html" \
  --exclude "*" \
  --include "*.html"
```

### Beispiel: Komplettes Website-Deployment
```bash
# Für Projekt in /media/xray/NEU/Code/S3Hosting/
cd /media/xray/NEU/Code/S3Hosting/

# Alles hochladen
aws s3 sync . s3://2026crowdhosting/test1/ --delete

# Oder nur bestimmte Dateien
aws s3 sync . s3://2026crowdhosting/test1/ \
  --exclude ".*" \
  --exclude "node_modules/*" \
  --exclude "*.md" \
  --delete
```

---

## 4. Dateien herunterladen (Download)

### Einzelne Datei herunterladen
```bash
aws s3 cp s3://2026crowdhosting/domain.de/index.html ./index.html
```

### Gesamten Ordner herunterladen
```bash
aws s3 sync s3://2026crowdhosting/domain.de/ ./lokaler-ordner/
```

---

## 5. Dateien löschen

### Einzelne Datei löschen
```bash
aws s3 rm s3://2026crowdhosting/domain.de/datei.html
```

### Ordner löschen (rekursiv)
```bash
aws s3 rm s3://2026crowdhosting/domain.de/ --recursive
```

### Bestimmte Dateitypen löschen
```bash
aws s3 rm s3://2026crowdhosting/domain.de/ --recursive --exclude "*" --include "*.log"
```

---

## 6. Static Website Hosting konfigurieren

### Bucket als Website konfigurieren
```bash
# Website Hosting aktivieren
aws s3 website s3://2026crowdhosting/ \
  --index-document index.html \
  --error-document error.html
```

### Public Access Block deaktivieren
```bash
# WICHTIG: Nur für öffentliche Websites!
aws s3api put-public-access-block \
  --bucket 2026crowdhosting \
  --public-access-block-configuration \
    "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
```

### Bucket Policy für öffentlichen Zugriff
```bash
# Policy-Datei erstellen
cat > /tmp/bucket-policy.json << 'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::2026crowdhosting/*"
    }
  ]
}
EOF

# Policy anwenden
aws s3api put-bucket-policy --bucket 2026crowdhosting --policy file:///tmp/bucket-policy.json
```

### Website-URL anzeigen
Nach der Konfiguration ist die Website erreichbar unter:
```
http://2026crowdhosting.s3-website.eu-central-1.amazonaws.com/domain-name/
```

---

## 7. Content-Type für verschiedene Dateitypen

### Wichtige Content-Types
```bash
# HTML
--content-type "text/html"

# CSS
--content-type "text/css"

# JavaScript
--content-type "application/javascript"

# JSON
--content-type "application/json"

# Images
--content-type "image/jpeg"
--content-type "image/png"
--content-type "image/gif"
--content-type "image/svg+xml"

# Fonts
--content-type "font/woff"
--content-type "font/woff2"
```

### Alle Dateien mit korrektem Content-Type hochladen
```bash
# HTML-Dateien
find . -name "*.html" -type f -exec aws s3 cp {} s3://2026crowdhosting/domain.de/{} --content-type "text/html" \;

# CSS-Dateien
find . -name "*.css" -type f -exec aws s3 cp {} s3://2026crowdhosting/domain.de/{} --content-type "text/css" \;

# JavaScript-Dateien
find . -name "*.js" -type f -exec aws s3 cp {} s3://2026crowdhosting/domain.de/{} --content-type "application/javascript" \;
```

---

## 8. Deployment-Script erstellen

### Einfaches Deployment-Script
```bash
#!/bin/bash

# deployment.sh - Website zu S3 deployen

BUCKET="2026crowdhosting"
DOMAIN="test1"
LOCAL_PATH="/media/xray/NEU/Code/S3Hosting"

echo "🚀 Deploying to S3..."
echo "Bucket: $BUCKET"
echo "Domain: $DOMAIN"
echo "Source: $LOCAL_PATH"

# Sync mit S3
aws s3 sync "$LOCAL_PATH" "s3://$BUCKET/$DOMAIN/" \
  --delete \
  --exclude ".*" \
  --exclude "*.md" \
  --exclude "deployment.sh"

echo "✅ Deployment complete!"
echo "URL: http://$BUCKET.s3-website.eu-central-1.amazonaws.com/$DOMAIN/"
```

### Script ausführbar machen
```bash
chmod +x deployment.sh
./deployment.sh
```

---

## 9. Nützliche Befehle

### Bucket-Größe anzeigen
```bash
aws s3 ls s3://2026crowdhosting/ --recursive --human-readable --summarize
```

### Alle Domains im Bucket auflisten
```bash
aws s3 ls s3://2026crowdhosting/ | grep PRE
```

### Letzte Änderungen anzeigen
```bash
aws s3 ls s3://2026crowdhosting/ --recursive | sort -r | head -20
```

### Bucket komplett leeren (VORSICHT!)
```bash
# NUR IN NOTFÄLLEN!
aws s3 rm s3://2026crowdhosting/ --recursive
```

---

## 10. Troubleshooting

### Problem: "Access Denied" beim Upload
```bash
# Credentials prüfen
aws sts get-caller-identity

# IAM-Berechtigungen prüfen (in AWS Console)
```

### Problem: Website zeigt "Access Denied"
```bash
# 1. Public Access Block prüfen
aws s3api get-public-access-block --bucket 2026crowdhosting

# 2. Bucket Policy prüfen
aws s3api get-bucket-policy --bucket 2026crowdhosting

# 3. Website-Konfiguration prüfen
aws s3api get-bucket-website --bucket 2026crowdhosting
```

### Problem: Falsche Content-Types
```bash
# Metadata einer Datei anzeigen
aws s3api head-object --bucket 2026crowdhosting --key test1/index.html

# Content-Type nachträglich ändern
aws s3 cp s3://2026crowdhosting/test1/index.html s3://2026crowdhosting/test1/index.html \
  --content-type "text/html" \
  --metadata-directive REPLACE
```

---

## 11. Best Practices

### Deployment-Workflow
1. Lokal entwickeln & testen
2. Dateien committen (Git)
3. `aws s3 sync` zum Deployen
4. Website im Browser testen
5. Bei Fehlern: Logs prüfen, erneut deployen

### Sicherheit
- ✅ AWS Credentials niemals in Git committen
- ✅ `.aws/credentials` Berechtigungen: `chmod 600`
- ✅ Nur notwendige IAM-Berechtigungen vergeben
- ✅ Access Keys regelmäßig rotieren (alle 90 Tage)

### Performance
- ✅ Cache-Control Header setzen
- ✅ Bilder optimieren vor Upload
- ✅ CSS/JS minifizieren
- ✅ Später: CloudFront CDN nutzen

### Organisation
- ✅ Ein Ordner pro Domain im Bucket
- ✅ Klare Ordnerstruktur: `css/`, `js/`, `images/`
- ✅ Deployment-Scripts versionieren
- ✅ README.md pro Projekt anlegen

---

## 12. Schnellreferenz

```bash
# Upload einzelne Datei
aws s3 cp datei.html s3://2026crowdhosting/domain/datei.html --content-type "text/html"

# Upload ganzer Ordner
aws s3 sync . s3://2026crowdhosting/domain/ --delete

# Download
aws s3 sync s3://2026crowdhosting/domain/ ./local-folder/

# Löschen
aws s3 rm s3://2026crowdhosting/domain/datei.html

# Bucket anzeigen
aws s3 ls s3://2026crowdhosting/domain/

# Website URL
http://2026crowdhosting.s3-website.eu-central-1.amazonaws.com/domain/
```

---

## 13. Weitere Ressourcen

- AWS CLI Dokumentation: https://docs.aws.amazon.com/cli/
- S3 Website Hosting: https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html
- IAM Best Practices: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html
