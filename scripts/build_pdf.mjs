#!/usr/bin/env node
// Builds the downloadable resume PDFs (A4) for every language.
//
//   npm run pdf                  # writes site/assets/cv/Kittiphun-Ruttanakorn-Resume-{TH,EN,JA,ZH}.pdf
//   npm run pdf -- --serve       # preview the template at http://localhost:8123/resume/?lang=en
//
// The template (resume/index.html) reads site/data/portfolio.json, so re-run this
// after editing the content. Uses an installed Chrome/Chromium through
// playwright-core: set CHROME_PATH to point at a specific browser if needed.

import { createServer } from "node:http";
import { readFile, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = join(ROOT, "site/assets/cv");
const LANGS = ["th", "en", "ja", "zh"];
const PORT = 8123;
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".jpg": "image/jpeg", ".png": "image/png", ".woff2": "font/woff2", ".woff": "font/woff", ".svg": "image/svg+xml" };

export const pdfName = (lang) => `Kittiphun-Ruttanakorn-Resume-${lang.toUpperCase()}.pdf`;

// Minimal static server for the repo root (template, site data and node_modules fonts).
function serve() {
  const server = createServer(async (req, res) => {
    try {
      let path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^(\.\.[/\\])+/, "");
      if (path.endsWith("/")) path += "index.html";
      const file = join(ROOT, path);
      if (!file.startsWith(ROOT) || !(await stat(file)).isFile()) throw new Error("not found");
      res.writeHead(200, { "Content-Type": TYPES[extname(file)] || "application/octet-stream" });
      res.end(await readFile(file));
    } catch {
      res.writeHead(404); res.end("not found");
    }
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

function launchOptions() {
  if (process.env.CHROME_PATH) return { executablePath: process.env.CHROME_PATH };
  for (const p of ["/opt/pw-browsers/chromium", "/usr/bin/chromium", "/usr/bin/chromium-browser"]) if (existsSync(p)) return { executablePath: p };
  return { channel: "chrome" }; // installed Google Chrome
}

const server = await serve();
if (process.argv.includes("--serve")) {
  console.log(`Preview: http://localhost:${PORT}/resume/?lang=en  (Ctrl+C to stop)`);
} else {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch(launchOptions());
  try {
    for (const lang of LANGS) {
      const page = await browser.newPage();
      await page.goto(`http://localhost:${PORT}/resume/?lang=${lang}`);
      await page.waitForFunction(() => window.__resumeReady === true, null, { timeout: 30000 });
      const file = join(OUT, pdfName(lang));
      await page.pdf({
        path: file, format: "A4", printBackground: true, preferCSSPageSize: true,
        displayHeaderFooter: true, headerTemplate: "<span></span>",
        footerTemplate: `<div style="width:100%;font:7.5pt Helvetica,Arial,sans-serif;color:#8a7782;padding:0 15mm;display:flex;justify-content:space-between">
          <span>Kittiphun Ruttanakorn · kittiphun.rut.mcupr.ac.th</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`
      });
      const pages = (await readFile(file, "latin1")).match(/\/Type\s*\/Page[^s]/g)?.length ?? "?";
      console.log(`${pdfName(lang)}  ${pages} page(s)  ${((await stat(file)).size / 1024).toFixed(0)} KB`);
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
}
