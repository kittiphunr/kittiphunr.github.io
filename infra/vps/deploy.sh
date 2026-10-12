#!/usr/bin/env bash
# Build the site and upload it to the VPS. Run on your own computer:
#   bash infra/vps/deploy.sh [domain] [user@host] [remote-dir]
# Values may also come from .env next to this script (see .env.example).
# Options (environment):  DRY_RUN=1  list what would change    DELETE=1  also remove files no longer built
# Needs: python3, node/npm, rsync, SSH access to the server.
#
# Only the home page and /projects/index.html are uploaded. The project folders under /projects/
# (bda-mcu-phrae, formsmith, precision-qc-web) are uploaded by hand and never touched here.
set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
[ -f "$here/.env" ] && { set -a; . "$here/.env"; set +a; }

usage() { echo "usage: bash $0 [domain] [user@host] [remote-dir]   (or set DOMAIN, SSH_TARGET, WEB_ROOT in .env)"; }
[ "${1:-}" = "-h" ] || [ "${1:-}" = "--help" ] && { usage; exit 0; }

DOMAIN="${1:-${DOMAIN:-}}"; TARGET="${2:-${SSH_TARGET:-}}"; REMOTE_DIR="${3:-${WEB_ROOT:-/var/www/portfolio}}"
[ -n "$DOMAIN" ] && [ -n "$TARGET" ] || { usage >&2; exit 1; }

cd "$here/../.."

npm ci
npm run build
# Rewrites the site's own URLs (SEO tags, sitemap, robots.txt) to your domain.
python3 scripts/build_deploy.py --base-url "https://$DOMAIN/" --no-zip

# .htaccess is Apache-only; the hand-uploaded folders are protected even with DELETE=1.
opts=(-az --human-readable --exclude '.htaccess'
      --exclude '/projects/bda-mcu-phrae/' --exclude '/projects/formsmith/' --exclude '/projects/precision-qc-web/')
[ "${DELETE:-0}" = "1" ] && opts+=(--delete)
[ "${DRY_RUN:-0}" = "1" ] && opts+=(--dry-run --itemize-changes)
rsync "${opts[@]}" deploy/ "$TARGET:$REMOTE_DIR/"

if [ "${DRY_RUN:-0}" = "1" ]; then echo "Dry run only; nothing was uploaded."; else echo "Uploaded. Open https://$DOMAIN/"; fi
