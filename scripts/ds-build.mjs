// Gera ds-dist/project/: os arquivos do Design System "Eternatus Card House"
// no formato do artifact (bundle.js, bundle.css, index.d.ts, tokens, docs).
// Uso: npm run ds:build
import { execSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import tailwind from "@tailwindcss/postcss"
import * as esbuild from "esbuild"
import postcss from "postcss"
import ts from "typescript"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const DS = path.join(ROOT, "ds")
const OUT = path.join(ROOT, "ds-dist", "project")
const NAMESPACE = "Eternatus"
const TITLE = "Eternatus Card House"
const GROUP_ORDER = ["Actions", "Status", "Forms", "Content", "Navigation", "Brand"]
const INTER_URL =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"

const rel = (p) => path.relative(ROOT, p)
const read = (p) => fs.readFileSync(p, "utf8")
function write(p, data) {
  fs.mkdirSync(path.dirname(p), { recursive: true })
  fs.writeFileSync(p, data)
}
function fail(msg) {
  console.error(`\n✗ ${msg}`)
  process.exit(1)
}

// ── Inventário: uma pasta por componente em ds/components ───────────────

function readCards() {
  const dir = path.join(DS, "components")
  const cards = []
  for (const name of fs.readdirSync(dir).sort()) {
    if (name === "Cover") continue
    const preview = path.join(dir, name, "preview.html")
    const readme = path.join(dir, name, "README.md")
    if (!fs.existsSync(preview) || !fs.existsSync(readme)) {
      fail(`ds/components/${name} precisa de README.md e preview.html`)
    }
    const marker = read(preview).split("\n", 1)[0]
    const group = /@dsCard[^>]*group="([^"]+)"/.exec(marker)?.[1]
    if (!group) fail(`ds/components/${name}/preview.html: linha 1 sem <!-- @dsCard group="…" -->`)
    cards.push({ name, group })
  }
  const rank = (g) => (GROUP_ORDER.indexOf(g) + 1 || 99)
  return cards.sort((a, b) => rank(a.group) - rank(b.group))
}

// ── bundle.js ───────────────────────────────────────────────────────────

// React vem da página (window.React / window.ReactDOM): o canvas fornece o
// React 18 dele, e o bundle não pode carregar outro.
const reactGlobals = {
  name: "react-globals",
  setup(build) {
    build.onResolve(
      { filter: /^react(-dom)?(\/client|\/jsx-runtime|\/jsx-dev-runtime)?$/ },
      (args) => ({ path: args.path, namespace: "react-globals" })
    )
    build.onLoad({ filter: /.*/, namespace: "react-globals" }, (args) => {
      if (args.path.startsWith("react-dom")) {
        return { contents: "module.exports = window.ReactDOM", loader: "js" }
      }
      if (args.path.includes("jsx")) {
        return {
          contents: `
            var R = window.React
            function jsx(type, props, key) {
              return R.createElement(type, key === undefined ? props : Object.assign({}, props, { key: key }))
            }
            module.exports = { jsx: jsx, jsxs: jsx, jsxDEV: jsx, Fragment: R.Fragment }`,
          loader: "js",
        }
      }
      return { contents: "module.exports = window.React", loader: "js" }
    })
  },
}

// `import logo from "….png"` no Next devolve { src, width, height }. No bundle,
// a imagem vai embutida: o canvas não enxerga os arquivos do DS por caminho.
const staticImages = {
  name: "static-images",
  setup(build) {
    build.onLoad({ filter: /\.png$/ }, (args) => {
      const buf = fs.readFileSync(args.path)
      const width = buf.readUInt32BE(16)
      const height = buf.readUInt32BE(20)
      const src = `data:image/png;base64,${buf.toString("base64")}`
      return {
        contents: `export default ${JSON.stringify({ src, width, height })}`,
        loader: "js",
      }
    })
  },
}

async function buildBundle(cards) {
  const common = {
    entryPoints: [path.join(DS, "entry.ts")],
    bundle: true,
    write: false,
    jsx: "automatic",
    target: "es2018",
    tsconfig: path.join(ROOT, "tsconfig.json"),
    alias: {
      "next/image": path.join(DS, "shims", "next-image.tsx"),
      "next/link": path.join(DS, "shims", "next-link.tsx"),
    },
    define: { "process.env.NODE_ENV": '"production"' },
    plugins: [reactGlobals, staticImages],
    logLevel: "warning",
  }

  // Passo ESM só para saber o que o entry exporta.
  const esm = await esbuild.build({ ...common, format: "esm", metafile: true })
  const exports = Object.values(esm.metafile.outputs)[0].exports
  for (const c of cards) {
    if (!exports.includes(c.name)) fail(`${c.name} tem pasta em ds/components mas não é exportado em ds/entry.ts`)
  }

  const iife = await esbuild.build({
    ...common,
    format: "iife",
    globalName: "__EternatusDS",
    minify: true,
    legalComments: "none",
    charset: "utf8",
    footer: { js: `window.${NAMESPACE}=Object.assign(window.${NAMESPACE}||{},__EternatusDS);` },
  })
  // O bundle é colado inline pelos consumidores: nada de </script nem <!--.
  const code = iife.outputFiles[0].text
    .replace(/<\/script/gi, "<\\/script")
    .replace(/<!--/g, "\\x3C!--")
  const header = { format: 4, namespace: NAMESPACE, components: cards.map((c) => ({ name: c.name })) }
  write(path.join(OUT, "components", "bundle.js"), `/* @ds-bundle: ${JSON.stringify(header)} */\n${code}`)
  return exports
}

// ── bundle.css ──────────────────────────────────────────────────────────

async function buildCss() {
  const globals = read(path.join(ROOT, "app", "globals.css"))
  if (!globals.includes('@import "tailwindcss";')) fail('app/globals.css sem @import "tailwindcss";')
  // Mesmo CSS do app, mas varrendo só os componentes do DS.
  const entry = globals.replace(
    '@import "tailwindcss";',
    '@import "tailwindcss" source(none);\n@source "../components";\n@source "./shims";'
  )
  const from = path.join(DS, "bundle.entry.css") // virtual: só ancora os caminhos
  const result = await postcss([tailwind({ base: ROOT, optimize: { minify: true } })]).process(entry, { from })
  // Inter vem do Google Fonts; no app ela chega por next/font em --font-inter.
  const css = `@import url("${INTER_URL}");\n:root{--font-inter:"Inter"}\n${result.css}`
  if (/<\/style/i.test(css)) fail("bundle.css contém </style")
  write(path.join(OUT, "components", "bundle.css"), css)
}

// ── tokens: ds/tokens.json tem as notas de uso; globals.css tem os valores
// que o código usa. Os dois precisam bater. ─────────────────────────────

const norm = (v) => String(v).toLowerCase().replace(/\s+/g, "").replace(/;$/, "")

function checkTokens(tokens) {
  const css = read(path.join(ROOT, "app", "globals.css"))
  const vars = new Map()
  for (const m of css.matchAll(/--([\w-]+):\s*([^;]+);/g)) vars.set(m[1], m[2].trim())
  const errors = []
  const families = [
    ...tokens.color.tokens.map((t) => [t.name, typeof t.value === "string" ? t.value : t.value.light]),
    ...tokens.radius.tokens.map((t) => [t.name, t.value]),
    ...tokens.shadow.tokens.map((t) => [t.name, t.value]),
  ]
  for (const [name, value] of families) {
    if (!vars.has(name)) errors.push(`--${name} está em ds/tokens.json mas não em app/globals.css`)
    else if (norm(vars.get(name)) !== norm(value)) {
      errors.push(`--${name}: tokens.json ${value} ≠ globals.css ${vars.get(name)}`)
    }
  }
  for (const group of tokens.type.groups) {
    for (const s of group.styles) {
      const block = new RegExp(`@utility type-${s.name} \\{([^}]*)\\}`).exec(css)?.[1]
      if (!block) {
        errors.push(`estilo ${s.name} está em ds/tokens.json mas não há @utility type-${s.name}`)
        continue
      }
      const props = { fontSize: "font-size", lineHeight: "line-height", fontWeight: "font-weight", letterSpacing: "letter-spacing" }
      for (const [k, cssProp] of Object.entries(props)) {
        if (s[k] == null) continue
        const got = new RegExp(`${cssProp}:\\s*([^;]+);`).exec(block)?.[1]
        if (norm(got) !== norm(s[k])) errors.push(`type-${s.name} ${cssProp}: tokens.json ${s[k]} ≠ globals.css ${got}`)
      }
    }
  }
  // O bloco design-tokens do DESIGN.md (lido pelo lint) também precisa bater.
  const block = /```design-tokens\n([\s\S]*?)```/.exec(read(path.join(ROOT, "DESIGN.md")))?.[1] ?? ""
  const listed = (key) => (new RegExp(`^${key}:(.*)$`, "m").exec(block)?.[1] ?? "").split(",").map(norm).filter(Boolean)
  const want = (list) => [...new Set(list.map(norm))].sort().join(" ")
  const colors = tokens.color.tokens.map((t) => (typeof t.value === "string" ? t.value : t.value.light))
  if (want(listed("colors")) !== want(colors)) errors.push("DESIGN.md: as cores do bloco design-tokens não batem com ds/tokens.json")
  if (want(listed("radii").filter((r) => r !== "0")) !== want(tokens.radius.tokens.map((t) => t.value))) {
    errors.push("DESIGN.md: os raios do bloco design-tokens não batem com ds/tokens.json")
  }
  if (errors.length) fail(`tokens divergentes:\n  ${errors.join("\n  ")}`)
}

function git(cmd) {
  try {
    return execSync(`git ${cmd}`, { cwd: ROOT, stdio: ["ignore", "pipe", "ignore"] }).toString().trim()
  } catch {
    return ""
  }
}

function buildTokens() {
  const tokens = JSON.parse(read(path.join(DS, "tokens.json")))
  checkTokens(tokens)
  const repo = git("remote get-url origin").replace(/^https:\/\/github\.com\/|\.git$/g, "")
  tokens.meta = {
    source: "github",
    repo,
    ref: `${git("rev-parse --abbrev-ref HEAD")}@${git("rev-parse --short HEAD")}`,
    paths: { tokens: ["app/globals.css", "ds/tokens.json"], docs: ["ds/README.md", "ds/components"] },
    synced: new Date().toISOString().slice(0, 10),
  }
  write(path.join(OUT, "tokens.json"), JSON.stringify(tokens, null, 2) + "\n")
  write(path.join(OUT, "tokens.css"), tokensCss(tokens))
  return tokens
}

// Mesmo formato que a página do artifact compila a partir do tokens.json.
function tokensCss(t) {
  const theme = t.color.themes[0].id
  const color = (v) => (typeof v === "string" ? v : v[theme])
  const alias = (v) => color(v).replace(/^\{(.+)\}$/, "var(--$1)")
  const lines = [`/* ${TITLE} — generated from tokens.json */`]
  lines.push(`:root, [data-theme="${theme}"] {`)
  const note = (x) => (x.usage ? ` /* ${x.usage.replace(/\*\//g, "* /")} */` : "")
  for (const c of t.color.tokens) lines.push(`  --${c.name}: ${alias(c.value)};${note(c)}`)
  for (const s of t.shadow?.tokens ?? []) lines.push(`  --${s.name}: ${color(s.value)};${note(s)}`)
  lines.push("}", ":root {")
  for (const s of t.spacing?.tokens ?? []) lines.push(`  --${s.name}: ${s.value};${note(s)}`)
  for (const r of t.radius?.tokens ?? []) lines.push(`  --${r.name}: ${r.value};${note(r)}`)
  for (const [k, v] of Object.entries(t.type.families)) lines.push(`  --font-${k}: ${v};`)
  lines.push("}")
  const px = (v) => (typeof v === "number" ? `${v}px` : v)
  for (const g of t.type.groups) {
    for (const s of g.styles) {
      const decl = [`font-family: var(--font-${s.family ?? g.family})`, `font-size: ${px(s.fontSize)}`]
      if (s.lineHeight != null) decl.push(`line-height: ${s.lineHeight}`)
      if (s.fontWeight != null) decl.push(`font-weight: ${s.fontWeight}`)
      if (s.letterSpacing != null) decl.push(`letter-spacing: ${s.letterSpacing}`)
      lines.push(`.${s.name} { ${decl.join("; ")}; }`)
    }
  }
  return lines.join("\n") + "\n"
}

// ── index.d.ts: props reais lidas dos .tsx pelo compilador ──────────────

// Elemento que cada primitivo Radix renderiza, para herdar os atributos HTML.
const RADIX_ELEMENT = {
  "AlertDialog.Action": "button",
  "AlertDialog.Cancel": "button",
  "AlertDialog.Content": "div",
  "AlertDialog.Description": "p",
  "AlertDialog.Overlay": "div",
  "AlertDialog.Title": "h2",
  "AlertDialog.Trigger": "button",
  "Checkbox.Root": "button",
  "Dialog.Close": "button",
  "Dialog.Content": "div",
  "Dialog.Description": "p",
  "Dialog.Overlay": "div",
  "Dialog.Title": "h2",
  "Dialog.Trigger": "button",
  "Label.Root": "label",
  "Progress.Root": "div",
  "Switch.Root": "button",
  "Tabs.Content": "div",
  "Tabs.List": "div",
  "Tabs.Root": "div",
  "Tabs.Trigger": "button",
  "Toggle.Root": "button",
  "ToggleGroup.Root": "div",
  "ToggleGroup.Item": "button",
  "Tooltip.Content": "div",
  "Tooltip.Trigger": "button",
}

function buildTypes(exportNames) {
  const program = ts.createProgram([path.join(DS, "entry.ts")], {
    jsx: ts.JsxEmit.ReactJSX,
    strict: true,
    skipLibCheck: true,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2020,
    baseUrl: ROOT,
    paths: { "@/*": ["./*"] },
  })
  const checker = program.getTypeChecker()
  const entry = program.getSourceFile(path.join(DS, "entry.ts"))
  const symbols = checker.getExportsOfModule(checker.getSymbolAtLocation(entry))
  const flags = ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseSingleQuotesForStringLiteralType

  // Props de @types/react e do DOM ficam de fora (são centenas); entram as
  // nossas e as do Radix, que mudam o comportamento (value, onValueChange…).
  const ownProp = (p) =>
    (p.declarations ?? []).some((d) => !/node_modules\/(@types\/react|typescript)\//.test(d.getSourceFile().fileName))

  const api = {}
  const out = [`// ${TITLE} — componentes em window.${NAMESPACE}. Gerado de ds/entry.ts; não edite.`, "import * as React from 'react';", ""]
  for (const name of exportNames) {
    let sym = symbols.find((s) => s.name === name)
    if (!sym) continue
    if (sym.flags & ts.SymbolFlags.Alias) sym = checker.getAliasedSymbol(sym)
    const decl = sym.declarations?.[0]
    if (!decl) continue
    const src = decl.getSourceFile()

    if (ts.isTypeAliasDeclaration(decl)) {
      out.push(`export ${decl.getText(src)}`, "")
      continue
    }
    if (!ts.isFunctionDeclaration(decl)) continue // cva (buttonVariants…) fica fora

    // Descrição: o comentário acima da função ou, sem ele, a 1ª frase do README.
    const readme = path.join(DS, "components", name, "README.md")
    const comment =
      (ts.getLeadingCommentRanges(src.text, decl.getFullStart()) ?? [])
        .map((r) => src.text.slice(r.pos, r.end))
        .filter((c) => c.startsWith("//"))
        .map((c) => c.replace(/^\/\/\s?/, ""))
        .join(" ") || (fs.existsSync(readme) ? read(readme).split("\n", 1)[0] : "")
    const param = decl.parameters[0]
    const paramType = param ? checker.getTypeAtLocation(param) : null
    const annotation = param?.type?.getText(src) ?? ""
    const radixMatch = /ComponentProps<typeof (\w+)\.(\w+)>/.exec(annotation)
    const radix = radixMatch && `${radixMatch[1].replace(/Primitive$/, "")}.${radixMatch[2]}`
    const native = /ComponentProps<"(\w+)">/.exec(annotation)?.[1] ?? (radix && RADIX_ELEMENT[radix])
    const generic = decl.typeParameters?.length ? `<${decl.typeParameters.map((p) => p.name.text).join(", ")} = any>` : ""

    const props = []
    const rows = []
    for (const p of paramType ? checker.getPropertiesOfType(paramType) : []) {
      if (!ownProp(p) || p.name === "ref" || p.name === "key") continue
      const optional = (p.flags & ts.SymbolFlags.Optional) !== 0
      let type = checker.typeToString(checker.getTypeOfSymbolAtLocation(p, param), param, flags)
      if (optional) type = type.replace(/\s*\|\s*(undefined|null)\b/g, "")
      // Radix repete a doc em cada sobrecarga (single/multiple): fica a 1ª frase.
      const fullDoc = ts.displayPartsToString(p.getDocumentationComment(checker)).replace(/\s+/g, " ").trim()
      const doc = /^.*?\.(?=\s|$)/.exec(fullDoc)?.[0] ?? fullDoc
      if (doc) props.push(`  /** ${doc} */`)
      // Nome que não é identificador (aria-label) vai entre aspas.
      const key = /^[A-Za-z_$][\w$]*$/.test(p.name) ? p.name : `'${p.name}'`
      props.push(`  ${key}${optional ? "?" : ""}: ${type};`)
      rows.push({ name: p.name, type, optional, doc })
    }
    api[name] = { summary: comment, props: rows, native, radix }
    const base = native && `React.ComponentProps<'${native}'>`
    const ext = !native ? "" : props.length ? ` extends Omit<${base}, ${propNames(props)}>` : ` extends ${base}`
    const summary = [comment, radix && !comment.includes("Radix") && `(Radix ${radix})`].filter(Boolean).join(" ")
    if (summary) out.push(`/** ${summary} */`)
    out.push(`export interface ${name}Props${generic}${ext} {`, ...props, "}")
    out.push(`export declare function ${name}${generic}(props: ${name}Props${generic ? "<" + decl.typeParameters.map((p) => p.name.text).join(", ") + ">" : ""}): JSX.Element;`, "")
  }
  write(path.join(OUT, "components", "index.d.ts"), out.join("\n"))
  return api
}

function propNames(lines) {
  const names = lines.map((l) => /^\s+'?([\w-]+)'?\??:/.exec(l)?.[1]).filter(Boolean)
  return names.map((n) => `'${n}'`).join(" | ")
}

// ── Docs: README, componentes e assets vão como estão ───────────────────

function copyDocs() {
  const walk = (dir) =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
      const p = path.join(dir, e.name)
      return e.isDirectory() ? walk(p) : [p]
    })
  write(path.join(OUT, "README.md"), read(path.join(DS, "README.md")))
  for (const sub of ["components", "assets"]) {
    for (const f of walk(path.join(DS, sub))) {
      if (!/\.(md|html)$/.test(f)) continue // imagens já estão no asset store do artifact
      write(path.join(OUT, path.relative(DS, f)), read(f))
    }
  }
}

// ── Arquivos que a página do artifact gera sozinha ao salvar. Com o DS em
// modo "sincronizado com o código" a página não grava nada, então saem daqui:
// fichas api/, manifest.json e as seções geradas do README. ──────────────

const GENERATED = "<!-- @generated by npm run ds:build (campeonatus-mockup) — do not edit -->"
const cell = (v) => String(v).replace(/\|/g, "\\|").replace(/\n/g, " ")
const firstSentence = (name) => {
  const f = path.join(DS, "components", name, "README.md")
  return fs.existsSync(f) ? read(f).split("\n", 1)[0].trim() : ""
}

function componentCard(c, info, exportNames) {
  const summary = firstSentence(c.name) || info.summary
  const required = info.props.filter((p) => !p.optional && p.type === "string" && p.name !== "children")
  const attrs = required.map((p) => ` ${p.name}="…"`).join("")
  const hasChildren = info.props.some((p) => p.name === "children") || info.native
  const jsx = hasChildren ? `<${NAMESPACE}.${c.name}${attrs}>…</${NAMESPACE}.${c.name}>` : `<${NAMESPACE}.${c.name}${attrs} />`
  const parts = exportNames.filter((n) => n !== c.name && n.startsWith(c.name) && /^[A-Z]/.test(n.slice(c.name.length)))
  const lines = [
    GENERATED, `# ${c.name}`, "", summary, "", `\`${NAMESPACE}.${c.name}\` · ${c.group}`, "",
    "## Use", "", "```jsx", jsx, "```", "", "```html",
    `<x-import component-from-global-scope="${NAMESPACE}.${c.name}"${attrs}>${hasChildren ? "…" : ""}</x-import>`, "```", "",
    "## Props", "", "| prop | type | note |", "| --- | --- | --- |",
    ...info.props.map((p) => `| \`${p.name}\`${p.optional ? "" : " *"} | \`${cell(p.type)}\` | ${cell(p.doc ?? "")} |`),
  ]
  if (info.native) lines.push("", `Também aceita os atributos nativos de \`<${info.native}>\`${info.radix ? ` (Radix ${info.radix})` : ""}.`)
  if (parts.length) lines.push("", "## Parts", "", parts.map((n) => `\`${NAMESPACE}.${n}\``).join(" · "))
  lines.push("", "## More", "", `Long-form usage: \`components/${c.name}/README.md\`.`, "")
  return lines.join("\n")
}

function tokensCard(t) {
  const theme = t.color.themes[0].id
  const val = (v) => (typeof v === "string" ? v : v[theme])
  const table = (rows) => ["| token | value | usage |", "| --- | --- | --- |", ...rows.map((x) => `| \`--${x.name}\` | ${cell(val(x.value))} | ${cell(x.usage ?? "")} |`)]
  const lines = [GENERATED, "# Tokens", "",
    "No CSS de uma página: o nome do token com o valor da tabela como fallback, `color: var(--ink, #1c2344);`. Onde `var()` não funciona (atributo `fill` de SVG, opções de gráfico), só o valor.", "",
    `## Color (${t.color.tokens.length})`, "", ...table(t.color.tokens), "",
    "## Type", "", `Família: \`--font-sans\` = ${cell(t.type.families.sans)}. No código, os estilos são as classes \`type-<nome>\`; no tokens.css, \`.<nome>\`.`, "",
    "| style | size / line | weight | tracking | usage |", "| --- | --- | --- | --- | --- |"]
  for (const g of t.type.groups) for (const s of g.styles) {
    lines.push(`| \`${s.name}\` | ${s.fontSize} / ${s.lineHeight} | ${s.fontWeight ?? ""} | ${s.letterSpacing ?? ""} | ${cell(s.usage ?? "")} |`)
  }
  for (const [key, title] of [["spacing", "Spacing"], ["radius", "Radius"], ["shadow", "Shadow"]]) {
    if (t[key]) lines.push("", `## ${title} (${t[key].tokens.length})`, "", ...table(t[key].tokens))
  }
  return lines.join("\n") + "\n"
}

function buildGenerated(cards, api, tokens, exportNames) {
  for (const c of cards) write(path.join(OUT, "api", "components", `${c.name}.md`), componentCard(c, api[c.name], exportNames))
  write(path.join(OUT, "api", "tokens.md"), tokensCard(tokens))

  // assetGroups/storage são do artifact (ids do asset store): a sincronização
  // copia os da versão publicada para este manifest.
  const files = []
  const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).forEach((e) => {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p)
    else files.push(path.relative(OUT, p))
  })
  walk(OUT)
  const manifest = {
    manifestVersion: 3, name: TITLE, namespace: NAMESPACE,
    files: files.filter((f) => !f.startsWith("api/") && !/preview\.html$/.test(f) && f !== "README.md" && f !== "tokens.json").sort(),
    libraries: [{ name: "react", version: "18", global: "React" }, { name: "react-dom", version: "18", global: "ReactDOM" }],
    components: cards.map((c) => ({ name: c.name, group: c.group, summary: firstSentence(c.name) || api[c.name].summary })),
  }
  write(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n")

  const groups = [...new Set(cards.map((c) => c.group))]
  const readme = read(path.join(OUT, "README.md")).trimEnd() + `

---

## Consuming this system (generated — do not edit)

Every path named below is under \`project/\` in this design system: read \`project/api/tokens.md\`, not \`api/tokens.md\`.

\`components/bundle.js\` defines \`window.${NAMESPACE}\` (${cards.length} components, built from the campeonatus-mockup repo with shadcn + Radix); \`components/bundle.css\` is its stylesheet (Tailwind, with the Inter font from Google Fonts); \`tokens.css\` is every token as a CSS variable. The bundle needs react 18 (\`window.React\`) and react-dom 18 (\`window.ReactDOM\`), loaded before it. Build any UI by mounting these components; never hand-build a control the system provides.

- **Standalone page:** inline \`tokens.css\` and \`components/bundle.css\` in a \`<style>\`, then React 18, ReactDOM 18 and \`components/bundle.js\` as classic scripts.
- **Design canvas:** bring \`tokens.css\`, \`components/bundle.css\`, \`components/bundle.js\` and \`components/index.d.ts\` onto the canvas in full, as the canvas type’s design-system components reference says; in each artboard, right after the \`support.js\` line, load \`tokens.css\`, then the stylesheet, then the script; the artboard supplies React; mount with \`<x-import component-from-global-scope="${NAMESPACE}.<Comp>" …>\`.
- **Slides deck, or any surface that cannot run the bundle:** tokens only, from \`api/tokens.md\`.

**This system is synced from code** (repo \`${tokens.meta.repo}\`, \`${tokens.meta.ref}\`): change it there and run the sync again; edits made on this page are overwritten.

**Read, per thing:** a component’s props, parts and examples: \`api/components/<Comp>.md\`; token values: \`api/tokens.md\`; stored assets and their ids: \`api/assets/<Group>.md\`.

## Index (generated — do not edit)

**Tokens**

- \`api/tokens.md\` — every token: color, type, spacing, radius, shadow.

**Icons and assets**

- \`api/assets/Logos.md\` — the logo files, by asset id.

**Components** (\`api/components/<Comp>.md\`, ${cards.length})

${groups.map((g) => `- **${g}**: ${cards.filter((c) => c.group === g).map((c) => `\`${c.name}\` — ${firstSentence(c.name).replace(/\.$/, "")}`).join(" · ")}`).join("\n")}
`
  write(path.join(OUT, "README.md"), readme)
}

// ── main ────────────────────────────────────────────────────────────────

fs.rmSync(path.join(ROOT, "ds-dist"), { recursive: true, force: true })
const cards = readCards()
const exportNames = await buildBundle(cards)
await buildCss()
const tokens = buildTokens()
const api = buildTypes(exportNames)
copyDocs()
buildGenerated(cards, api, tokens, exportNames)

const size = (p) => `${(fs.statSync(path.join(OUT, p)).size / 1024).toFixed(1)} KB`
console.log(`✓ ${rel(OUT)}`)
console.log(`  ${cards.length} componentes: ${cards.map((c) => c.name).join(", ")}`)
console.log(`  bundle.js ${size("components/bundle.js")} · bundle.css ${size("components/bundle.css")} · index.d.ts ${size("components/index.d.ts")}`)
