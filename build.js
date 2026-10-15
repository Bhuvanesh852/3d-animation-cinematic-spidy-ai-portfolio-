// Copies the site into dist/ and fills in your website address (for share previews, sitemap, robots).
// Address priority: SITE_URL (your own domain) > Vercel production URL > Vercel preview URL > none (local).
const fs = require("fs"), path = require("path");
const root = __dirname, out = path.join(root, "dist"), env = process.env;
const raw = env.SITE_URL || (env.VERCEL_PROJECT_PRODUCTION_URL && "https://" + env.VERCEL_PROJECT_PRODUCTION_URL) || (env.VERCEL_URL && "https://" + env.VERCEL_URL) || "";
const site = raw.replace(/\/+$/, "");
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
for (const dir of ["assets", "resume"]) fs.cpSync(path.join(root, dir), path.join(out, dir), { recursive: true });
fs.copyFileSync(path.join(root, "favicon.svg"), path.join(out, "favicon.svg"));
const html = fs.readFileSync(path.join(root, "index.html"), "utf8").split("__SITE_URL__").join(site);
fs.writeFileSync(path.join(out, "index.html"), html);
fs.writeFileSync(path.join(out, "robots.txt"), "User-agent: *\nAllow: /\n" + (site ? "Sitemap: " + site + "/sitemap.xml\n" : ""));
if (site) fs.writeFileSync(path.join(out, "sitemap.xml"), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>' + site + '/</loc></url></urlset>\n');
console.log("Built dist/ for " + (site || "local preview (no site URL)"));
