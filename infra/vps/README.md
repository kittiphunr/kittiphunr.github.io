# Self-hosting on a VPS (Nginx + HTTPS)

Serves the built portfolio from your own Linux server. It lives outside `site/` on purpose, so the
server settings are never published with the website.

```
infra/vps/
├── setup-server.sh        one-time server setup (run on the VPS)
├── deploy.sh              build + upload (run on your computer, every update)
├── nginx/portfolio.conf   Nginx server block template
└── .env.example           optional defaults for both scripts
```

## Before you start
- A VPS running Ubuntu/Debian that you can SSH into, with `sudo`
- DNS: an **A record** for your domain pointing at the server (certbot needs it)
- On your computer: `python3`, `node`/`npm`, `rsync`

## 1. Set up the server (once)
```bash
scp -r infra/vps user@SERVER_IP:~/vps
ssh user@SERVER_IP
sudo bash ~/vps/setup-server.sh example.com you@example.com   # optional 3rd argument: web root
```
This installs Nginx and certbot, opens the firewall for SSH and web traffic, creates `/var/www/portfolio`
and turns on HTTPS with automatic renewal (check with `sudo certbot renew --dry-run`).

## 2. Build and upload (every update)
```bash
bash infra/vps/deploy.sh example.com user@SERVER_IP
```
The script builds the CSS, produces `deploy/` with the site's own URLs (SEO tags, sitemap, robots.txt)
rewritten to your domain, then uploads it with `rsync`.

To avoid retyping, copy `.env.example` to `.env` (git-ignored) and run `bash infra/vps/deploy.sh`.

| Option | Effect |
|---|---|
| `DRY_RUN=1` | list what would change, upload nothing |
| `DELETE=1` | also remove files that are no longer part of the build |

## What is and is not uploaded
- Uploaded: the home page and `/projects/index.html` (with their assets).
- Never touched, even with `DELETE=1`: `projects/bda-mcu-phrae/`, `projects/formsmith/`,
  `projects/precision-qc-web/`. Upload those yourself.
- `.htaccess` files are skipped: they are for Apache, and `nginx/portfolio.conf` already provides the
  equivalent compression, caching and security headers.
- Links to the hand-uploaded projects keep pointing at the university domain
  (`kittiphun.rut.mcupr.ac.th`).

## Verify
```bash
curl -I https://example.com/        # expect HTTP/2 200
```
