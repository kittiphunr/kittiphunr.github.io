#!/usr/bin/env bash
# Build the site and upload it to the VPS. Run from anywhere on your own computer:
#   bash host/vps/deploy-vps.sh example.com user@server-ip [/var/www/portfolio]
# Needs: python3, node/npm, rsync, SSH access to the server.
# The 360° tour repo is private: export PROJECTS_TOKEN=<fine-grained PAT, Contents: read> first.
# Files are only added or overwritten; set DELETE=1 to also remove files no longer in the build.
set -euo pipefail

DOMAIN="${1:-}"; TARGET="${2:-}"; REMOTE_DIR="${3:-/var/www/portfolio}"
[ -n "$DOMAIN" ] && [ -n "$TARGET" ] || { echo "usage: bash $0 <domain> <user@host> [remote-dir]" >&2; exit 1; }

cd "$(dirname "$0")/../.."

python3 scripts/fetch_projects.py
npm ci
npm run build
# Rewrites the site's own URLs (SEO tags, sitemap, robots.txt) to your domain.
python3 scripts/build_deploy.py --base-url "https://$DOMAIN/" --no-zip

opts=(-az --human-readable --exclude '.htaccess')   # .htaccess is Apache-only
[ "${DELETE:-0}" = "1" ] && opts+=(--delete)
rsync "${opts[@]}" deploy/ "$TARGET:$REMOTE_DIR/"

echo "Uploaded. Open https://$DOMAIN/"
