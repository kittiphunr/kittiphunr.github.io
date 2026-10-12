#!/usr/bin/env bash
# One-time server setup (Ubuntu/Debian), run on the VPS as root:
#   sudo bash setup-server.sh [domain] [email] [web-root]
# Values may also come from .env next to this script (see .env.example).
# Installs Nginx + certbot, opens the firewall, creates the web folder, enables HTTPS.
set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
[ -f "$here/.env" ] && { set -a; . "$here/.env"; set +a; }

usage() { echo "usage: sudo bash $0 [domain] [email] [web-root]   (or set DOMAIN, EMAIL, WEB_ROOT in .env)"; }
[ "${1:-}" = "-h" ] || [ "${1:-}" = "--help" ] && { usage; exit 0; }

DOMAIN="${1:-${DOMAIN:-}}"; EMAIL="${2:-${EMAIL:-}}"; WEB_ROOT="${3:-${WEB_ROOT:-/var/www/portfolio}}"
[ -n "$DOMAIN" ] && [ -n "$EMAIL" ] || { usage >&2; exit 1; }
[ "$(id -u)" -eq 0 ] || { echo "run as root (sudo)" >&2; exit 1; }

apt-get update -qq
apt-get install -y -qq nginx certbot python3-certbot-nginx ufw rsync

# Keep SSH reachable before turning the firewall on.
ufw allow OpenSSH >/dev/null
ufw allow 'Nginx Full' >/dev/null
ufw --force enable >/dev/null

mkdir -p "$WEB_ROOT"
# Owned by the account that will rsync the site (the one that ran sudo).
chown -R "${SUDO_USER:-root}": "$WEB_ROOT"

sed -e "s#__DOMAIN__#$DOMAIN#g" -e "s#__ROOT__#$WEB_ROOT#g" "$here/nginx/portfolio.conf" > /etc/nginx/sites-available/portfolio
ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

# HTTPS needs the domain's DNS A record to already point at this server.
certbot --nginx -d "$DOMAIN" -m "$EMAIL" --agree-tos --no-eff-email --redirect --non-interactive

echo "Done. Next, from your computer: bash infra/vps/deploy.sh $DOMAIN ${SUDO_USER:-user}@<server-ip>"
