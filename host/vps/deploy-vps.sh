#!/usr/bin/env bash
# Build the site and upload it to the VPS. Run from anywhere on your own computer:
#   bash host/vps/deploy-vps.sh example.com user@server-ip [/var/www/portfolio]
# Needs: python3, node/npm, rsync, SSH access to the server.
# Only the home page and /projects/index.html are uploaded: the project folders under /projects/
# (bda-mcu-phrae, formsmith, precision-qc-web) are uploaded by hand and never touched here.
# Files are only added or overwritten; set DELETE=1 to also remove files no longer in the build.
set -euo pipefail

DOMAIN="${1:-}"; TARGET="${2:-}"; REMOTE_DIR="${3:-/var/www/portfolio}"
[ -n "$DOMAIN" ] && [ -n "$TARGET" ] || { echo "usage: bash $0 <domain> <user@host> [remote-dir]" >&2; exit 1; }

cd "$(dirname "$0")/../.."

npm ci
npm run build
# Rewrites the site's own URLs (SEO tags, sitemap, robots.txt) to your domain.
python3 scripts/build_deploy.py --base-url "https://$DOMAIN/" --no-zip

# .htaccess is Apache-only; the hand-uploaded folders are protected even with DELETE=1.
opts=(-az --human-readable --exclude '.htaccess' --exclude '/projects/bda-mcu-phrae/' --exclude '/projects/formsmith/' --exclude '/projects/precision-qc-web/')
[ "${DELETE:-0}" = "1" ] && opts+=(--delete)
rsync "${opts[@]}" deploy/ "$TARGET:$REMOTE_DIR/"

echo "Uploaded. Open https://$DOMAIN/"
