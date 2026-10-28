// Renderiza cada preview de ds-dist/project num Chromium headless, do mesmo
// jeito que o artifact faz (tokens.css + bundle.css + React 18 + bundle.js),
// e falha se algum quebrar ou sair vazio. Prints em ds-dist/check/.
// Uso: npm run ds:build && npm run ds:check
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { chromium } from "playwright-core"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const OUT = path.join(ROOT, "ds-dist", "project")
const SHOTS = path.join(ROOT, "ds-dist", "check")
// Mesma versão que o canvas do Design fornece às telas.
const REACT = "https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js"
const REACT_DOM = "https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js"

if (!fs.existsSync(OUT)) {
  console.error("✗ ds-dist/project não existe: rode npm run ds:build antes")
  process.exit(1)
}

const read = (p) => fs.readFileSync(path.join(OUT, p), "utf8")
const theme = JSON.parse(read("tokens.json")).color.themes[0].id
const head = `
<style>${read("tokens.css")}</style>
<style>${read("components/bundle.css")}</style>
<script src="${REACT}"></script>
<script src="${REACT_DOM}"></script>
<script>${read("components/bundle.js")}</script>`

const browser = await chromium.launch().catch(() => {
  // Sem o Chromium da versão exata, usa o que estiver no cache do Playwright.
  const cache = path.join(process.env.HOME, ".cache", "ms-playwright")
  const dir = fs.readdirSync(cache).find((d) => d.startsWith("chromium_headless_shell-"))
  if (!dir) throw new Error("nenhum Chromium em ~/.cache/ms-playwright (npx playwright install chromium)")
  return chromium.launch({
    executablePath: path.join(cache, dir, "chrome-headless-shell-linux64", "chrome-headless-shell"),
  })
})
fs.mkdirSync(SHOTS, { recursive: true })

const names = fs.readdirSync(path.join(OUT, "components")).filter((n) => fs.existsSync(path.join(OUT, "components", n, "preview.html")))
let failed = 0
for (const name of names) {
  const page = await browser.newPage({ viewport: { width: 960, height: 400 } })
  const errors = []
  page.on("pageerror", (e) => errors.push(e.message))
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()))

  const html = read(`components/${name}/preview.html`)
    .replace("<html", `<html data-theme="${theme}"`)
    .replace("<head>", `<head>${head}`)
  await page.setContent(html, { waitUntil: "networkidle" })
  await page.waitForTimeout(150)

  const empty = name !== "Cover" && (await page.evaluate(() =>
    [...document.querySelectorAll("body > div[id]")].some((el) => !el.children.length || !el.getBoundingClientRect().height)
  ))
  await page.screenshot({ path: path.join(SHOTS, `${name}.png`), fullPage: true })
  await page.close()

  if (errors.length || empty) {
    failed++
    console.log(`✗ ${name}${empty ? " — renderizou vazio" : ""}`)
    for (const e of errors) console.log(`    ${e}`)
  } else {
    console.log(`✓ ${name}`)
  }
}
await browser.close()

console.log(`\n${names.length - failed}/${names.length} previews ok · prints em ${path.relative(ROOT, SHOTS)}/`)
process.exit(failed ? 1 : 0)
