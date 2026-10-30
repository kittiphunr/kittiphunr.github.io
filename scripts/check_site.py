#!/usr/bin/env python3
"""Static checks for site/ — run by CI on every pull request.

    python3 scripts/check_site.py

Fails (exit 1) when something would be broken on the live site:
  * portfolio.json is not valid JSON, or a file it references is missing
    (any string starting with assets/, e.g. images and CV PDFs);
  * a local href/src in a site HTML page points to a file that does not exist;
  * a URL in sitemap.xml on the primary host has no file behind it;
  * a project link on the primary host points to a folder that is not in site/;
  * a JavaScript file in site/assets/js/ has a syntax error.

Folders that live only on the university host are listed in HOST_ONLY; they are
reported as notices instead of errors.
"""

from __future__ import annotations

import json
import re
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "site"
PRIMARY = "https://kittiphun.rut.mcupr.ac.th/"
# Folders that exist only on the host: Formsmith, the 360° tour (BDA-MCU-PHRAE),
# Precision QC and Hematocrit are uploaded there by hand from their own repositories, so portfolio.json and sitemap.xml
# link to them without a copy in site/.
HOST_ONLY: tuple[str, ...] = ("projects/formsmith", "projects/bda-mcu-phrae", "projects/precision-qc-web", "projects/hematocrit")

errors: list[str] = []
notices: list[str] = []


def exists(rel: str) -> bool:
    """A URL path (relative to the site root) resolves to a file or a folder with index.html."""
    p = SITE / rel
    return p.is_file() or (p.is_dir() and (p / "index.html").is_file())


def host_only(rel: str) -> bool:
    return any(rel.startswith(h) for h in HOST_ONLY)


def strings(node):
    if isinstance(node, str):
        yield node
    elif isinstance(node, dict):
        for v in node.values():
            yield from strings(v)
    elif isinstance(node, list):
        for v in node:
            yield from strings(v)


def check_json() -> None:
    path = SITE / "data" / "portfolio.json"
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, ValueError) as e:
        errors.append(f"{path.relative_to(ROOT)}: not valid JSON ({e})")
        return
    for s in strings(data):
        if s.startswith("assets/") and not exists(s):
            errors.append(f"portfolio.json: missing file {s}")
        if s.startswith(PRIMARY):
            rel = s[len(PRIMARY):].split("#")[0].split("?")[0]
            if rel and not exists(rel):
                (notices if host_only(rel) else errors).append(
                    f"portfolio.json: link {s} has no folder in site/" + (" (host-only, ok)" if host_only(rel) else ""))


class Refs(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.refs: list[str] = []

    def handle_starttag(self, tag, attrs):
        for k, v in attrs:
            if k in ("href", "src") and v:
                self.refs.append(v)


def check_html() -> None:
    for page in sorted(SITE.rglob("*.html")):
        if "vendor" in page.relative_to(SITE).parts:
            continue
        parser = Refs()
        parser.feed(page.read_text(encoding="utf-8"))
        for ref in parser.refs:
            if re.match(r"^(?:[a-z][a-z0-9+.-]*:|//|#)", ref, re.I):
                continue  # external, data:, mailto:, anchors
            target = unquote(urlparse(ref).path)
            if not target:
                continue
            base = SITE if target.startswith("/") else page.parent
            p = (base / target.lstrip("/")).resolve()
            try:
                rel = p.relative_to(SITE.resolve()).as_posix()
            except ValueError:
                errors.append(f"{page.relative_to(ROOT)}: {ref} leaves site/")
                continue
            if not (p.is_file() or (p.is_dir() and (p / "index.html").is_file())):
                errors.append(f"{page.relative_to(ROOT)}: broken reference {ref}")


def check_sitemap() -> None:
    sm = SITE / "sitemap.xml"
    for loc in re.findall(r"<(?:loc|image:loc)>([^<]+)</", sm.read_text(encoding="utf-8")):
        if loc.startswith(PRIMARY):
            rel = loc[len(PRIMARY):].split("?")[0].split("#")[0]
            if rel and not exists(rel):
                if host_only(rel):
                    notices.append(f"sitemap.xml: {loc} has no file in site/ (host-only, ok)")
                else:
                    errors.append(f"sitemap.xml: {loc} has no file in site/")


def check_js() -> None:
    for js in sorted((SITE / "assets" / "js").glob("*.js")):
        r = subprocess.run(["node", "--check", str(js)], capture_output=True, text=True)
        if r.returncode:
            errors.append(f"{js.relative_to(ROOT)}: syntax error\n{r.stderr.strip()}")


def main() -> int:
    check_json()
    check_html()
    check_sitemap()
    check_js()
    for n in notices:
        print(f"notice: {n}")
    for e in errors:
        print(f"ERROR: {e}")
    print(f"{len(errors)} error(s), {len(notices)} notice(s)")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
