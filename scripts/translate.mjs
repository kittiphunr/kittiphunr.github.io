#!/usr/bin/env node
// Fills in missing languages in site/data/portfolio.json.
//
// Any object whose keys are only language codes (th, en, ja, zh) is treated as a
// translatable field. Languages that are missing or empty are machine-translated:
//   th -> en, then en (or th) -> ja / zh.
// Existing translations are never overwritten, so hand-edited text is kept.
//
// Usage: node scripts/translate.mjs [path/to/file.json] [--dry-run]

import { readFile, writeFile } from "node:fs/promises";

const LANGS = ["th", "en", "ja", "zh"];
const API_LANG = { th: "th", en: "en", ja: "ja", zh: "zh-CN" };
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const file = args.find((a) => !a.startsWith("--")) || "site/data/portfolio.json";

const isI18n = (v) =>
  v && typeof v === "object" && !Array.isArray(v) &&
  Object.keys(v).length > 0 && Object.keys(v).every((k) => LANGS.includes(k));

const filled = (v, code) => typeof v[code] === "string" && v[code].trim() !== "";

function pickSource(v, target) {
  const order = target === "en" ? ["th", "ja", "zh"] : ["en", "th", "ja", "zh"];
  return order.find((code) => code !== target && filled(v, code)) || null;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function viaGoogle(text, from, to) {
  const url = "https://translate.googleapis.com/translate_a/single?client=gtx&dt=t" +
    `&sl=${API_LANG[from]}&tl=${API_LANG[to]}&q=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Google HTTP ${res.status}`);
  const json = await res.json();
  return json[0].map((seg) => seg[0]).join("");
}

async function viaMyMemory(text, from, to) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}` +
    `&langpair=${API_LANG[from]}|${API_LANG[to]}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`MyMemory HTTP ${res.status}`);
  const json = await res.json();
  if (json.responseStatus !== 200) throw new Error(`MyMemory ${json.responseStatus}`);
  return json.responseData.translatedText;
}

async function translate(text, from, to) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await viaGoogle(text, from, to);
    } catch (e) {
      await sleep(800 * (attempt + 1));
    }
  }
  return viaMyMemory(text, from, to);
}

function collect(node, out = []) {
  if (Array.isArray(node)) node.forEach((n) => collect(n, out));
  else if (isI18n(node)) out.push(node);
  else if (node && typeof node === "object") Object.values(node).forEach((n) => collect(n, out));
  return out;
}

const raw = await readFile(file, "utf8");
const data = JSON.parse(raw);
const fields = collect(data);
let added = 0;
let failed = 0;

// English first, so it can act as the pivot for Japanese and Chinese.
for (const target of ["en", "th", "ja", "zh"]) {
  for (const field of fields) {
    if (filled(field, target)) continue;
    const src = pickSource(field, target);
    if (!src) continue;
    try {
      const out = (await translate(field[src], src, target)).trim();
      if (!out) throw new Error("empty result");
      field[target] = out;
      added++;
      console.log(`+ [${src}→${target}] ${field[src].slice(0, 60)}  =>  ${out.slice(0, 60)}`);
      await sleep(150);
    } catch (e) {
      failed++;
      console.warn(`! [${src}→${target}] ${field[src].slice(0, 60)}: ${e.message}`);
    }
  }
}

// Keep a stable key order (th, en, ja, zh) inside each translatable field.
for (const field of fields) {
  const ordered = Object.fromEntries(LANGS.filter((c) => c in field).map((c) => [c, field[c]]));
  for (const k of Object.keys(field)) delete field[k];
  Object.assign(field, ordered);
}

const output = JSON.stringify(data, null, 2) + "\n";
if (!dryRun && output !== raw) await writeFile(file, output);
console.log(`Done: ${added} translation(s) added, ${failed} failed${dryRun ? " (dry run)" : ""}.`);
