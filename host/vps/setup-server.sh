#!/usr/bin/env bash
# Run ONCE on the VPS (Ubuntu/Debian) as root:
#   sudo bash setup-server.sh example.com you@example.com [/var/www/portfolio]
# Installs Nginx + certbot, opens the firewall, creates the web folder and turns on HTTPS.
set -euo pipefail

DOMAIN="${1:-}"; EMAIL="${2:-}"; ROOT="${3:-/var/www/portfolio}"
[ -n "$DOMAIN" ] && [ -n "$EMAIL" ] || { echo "usage: sudo bash $0 <domain> <email> [web-root]" >&2; exit 1; }
[ "$(id -u)" -eq 0 ] || { echo "run as root (sudo)" >&2; exit 1; }

here="$(cd "$(dirname "$0")" && pwd)"
apt-get update -qq
apt-get install -y -qq nginx certbot python3-certbot-nginx ufw rsync

# Keep SSH reachable before turning the firewall on.
ufw allow OpenSSH >/dev/null
ufw allow 'Nginx Full' >/dev/null
ufw --force enable >/dev/null

mkdir -p "$ROOT"
# Owned by the account that will rsync the site (the one that ran sudo).
chown -R "${SUDO_USER:-root}": "$ROOT"

sed -e "s#__DOMAIN__#$DOMAIN#g" -e "s#__ROOT__#$ROOT#g" "$here/nginx.conf" > /etc/nginx/sites-available/portfolio
ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

# HTTPS needs the domain's DNS A record to already point at this server.
certbot --nginx -d "$DOMAIN" -m "$EMAIL" --agree-tos --no-eff-email --redirect --non-interactive

echo "Done. Next, from your computer: bash host/vps/deploy-vps.sh $DOMAIN ${SUDO_USER:-user}@<server-ip> $ROOT"
