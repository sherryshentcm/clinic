#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE_URL = "https://xiastcm.com";
const DEFAULT_COVER = "images/xia-yang.jpg";
const TODAY = new Date().toISOString().slice(0, 10);

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, file), "utf8"));
}

function esc(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pick(value, lang) {
  if (value && typeof value === "object") return lang === "en" ? value.en : value.zh;
  return value || "";
}

function absoluteUrl(value) {
  if (!value) return `${SITE_URL}/${DEFAULT_COVER}`;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}/${String(value).replace(/^\/+/, "")}`;
}

function articlePath(slug) {
  return path.join(ROOT, "articles", slug, "index.html");
}

function renderBody(text) {
  return String(text || "")
    .split(/\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      if (line.startsWith("## ")) return `<h2 class="ab-h">${esc(line.slice(3))}</h2>`;
      if (line.startsWith("> ")) return `<blockquote class="ab-note">${esc(line.slice(2))}</blockquote>`;
      return `<p>${esc(line)}</p>`;
    })
    .join("\n");
}

function articleHtml(article) {
  const titleZh = pick(article.title, "zh");
  const titleEn = pick(article.title, "en");
  const desc = pick(article.ex, "en") || pick(article.ex, "zh");
  const canonical = `${SITE_URL}/articles/${article.slug}/`;
  const cover = article.cover || DEFAULT_COVER;
  const coverUrl = absoluteUrl(cover);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: titleEn || titleZh,
    alternativeHeadline: titleZh && titleEn ? titleZh : undefined,
    description: desc,
    image: coverUrl,
    author: {
      "@type": "Person",
      name: pick(article.author, "en") || pick(article.author, "zh") || "Xia Yang",
    },
    publisher: {
      "@type": "Organization",
      name: "夏草堂 Xia's TCM",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.svg`,
      },
    },
    mainEntityOfPage: canonical,
  };

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(titleZh || titleEn)} · 夏草堂 Xia's TCM</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="夏草堂 Xia's TCM">
<meta property="og:title" content="${esc(titleZh || titleEn)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${coverUrl}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(titleZh || titleEn)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${coverUrl}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/styles.css">
<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>
</head>
<body>
<header class="site-head scrolled">
  <div class="wrap bar">
    <a href="/" class="brand">
      <span class="seal">夏</span>
      <span class="nm"><span class="cn">夏草堂</span><span class="en">Xia's TCM · GTA</span></span>
    </a>
    <nav class="nav">
      <a href="/#about">关于夏医师</a>
      <a href="/#services">诊疗服务</a>
      <a href="/#conditions">主治病症</a>
      <a href="/#pricing">收费</a>
      <a href="/#blog" class="active">养生资讯</a>
    </nav>
    <div class="head-cta"><a href="tel:4168250982" class="phone-btn">416-825-0982</a></div>
  </div>
</header>
<main>
  <article>
    <div class="article-head">
      <div class="wrap">
        <a href="/#blog" class="article-back">← 养生资讯 / Journal</a>
        <div class="article-cat">${esc(pick(article.cat, "zh"))} · ${esc(pick(article.cat, "en"))}</div>
        <h1 class="article-title">${esc(titleZh || titleEn)}</h1>
        ${titleEn ? `<p class="h-sub" style="color:oklch(0.93 0.012 95 / .85)">${esc(titleEn)}</p>` : ""}
        <div class="article-meta">
          <span>${esc(pick(article.author, "zh"))}</span><span class="sep">·</span>
          <span>${esc(pick(article.date, "zh"))}</span><span class="sep">·</span>
          <span>${esc(pick(article.read, "zh"))}</span>
        </div>
      </div>
    </div>
    <div class="wrap article-wrap">
      <div class="article-cover">
        <img src="/${esc(cover).replace(/^\/+/, "")}" alt="${esc(titleZh || titleEn)}" style="width:100%;height:100%;object-fit:cover;border-radius:16px;display:block">
      </div>
      <div class="article-body">
${renderBody(pick(article.body, "zh"))}
      </div>
      ${pick(article.body, "en") ? `<div class="rule" style="margin:56px 0"><span class="dot"></span></div>
      <div class="article-body" lang="en">
        <h2 class="ab-h">${esc(titleEn || "English")}</h2>
${renderBody(pick(article.body, "en"))}
      </div>` : ""}
      <div class="article-foot">
        <div class="rule"><span class="dot"></span></div>
        <div class="article-cta">
          <div>
            <div class="serif" style="font-size:22px;font-weight:600">有相关的困扰？</div>
            <p style="color:var(--ink-soft);font-size:15px;margin-top:6px">欢迎来电预约，由医师为您辨证调理。</p>
          </div>
          <a href="tel:4168250982" class="btn btn-seal">416-825-0982</a>
        </div>
      </div>
    </div>
  </article>
</main>
<footer class="foot">
  <div class="wrap">
    <div class="btm"><span>© 2026 夏草堂 Xia's TCM. 版权所有。</span><span>安省注册中医针灸师</span></div>
  </div>
</footer>
</body>
</html>
`;
}

function sitemapXml(articles) {
  const articleUrls = articles.map((article) => `  <url>
    <loc>${SITE_URL}/articles/${article.slug}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
${articleUrls ? articleUrls + "\n" : ""}</urlset>
`;
}

function main() {
  const data = readJson("content/articles.json");
  const articles = Array.isArray(data) ? data : (Array.isArray(data.articles) ? data.articles : []);
  for (const article of articles) {
    if (!/^[a-z0-9-]+$/.test(article.slug || "")) {
      throw new Error(`Invalid article slug: ${article.slug}`);
    }
    const out = articlePath(article.slug);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, articleHtml(article));
  }
  fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemapXml(articles));
  console.log(`Generated ${articles.length} article page(s) and sitemap.xml`);
}

main();
