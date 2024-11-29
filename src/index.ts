/**
 * @license SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Download Scryfall mana symbology.
 */

import fs from "fs/promises";
import { JSDOM } from "jsdom";
import path from "path";
import { ElementNode, parse, RootNode } from "svg-parser";
import { fileURLToPath } from "url";

import pkg from "../package.json";
import { compareSymbols } from "./lib/compare-symbols.js";
import { parseViewBox } from "./lib/parse-view-box.js";
import { SymbologyResponse, SymbologySymbol } from "./types/symbology.js";

if (process.env.BUILD_VERSION === "") {
  throw new Error("BUILD_VERSION env variable cannot be an empty string");
}

// Determine version number to use.
const VERSION = process.env.BUILD_VERSION ?? pkg.version;

// Directory of this script, e.g. `__dirname`.
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));

// Project root directory.
const PROJECT_DIR = path.resolve(SCRIPT_DIR, "..");

// Output directory.
const DIST_DIR = path.resolve(PROJECT_DIR, "dist");

interface SymbolContent extends SymbologySymbol {
  svgBuffer: ArrayBuffer;
  svgFilename: string;
  svgRootNode: RootNode;
  symbolName: string;
}

async function main() {
  // Create dist dir if it doesn't already exist.
  await fs.mkdir(DIST_DIR, { recursive: true });

  console.log("Downloading symbology...");

  // Download the Scyfall Symbology.
  const symbologyResponse = await fetch("https://api.scryfall.com/symbology");
  const json = (await symbologyResponse.json()) as SymbologyResponse;

  // Download all symbols.
  console.log("Downloading symbol SVG files...");
  const symbols: SymbolContent[] = await Promise.all(
    json.data.map(async (symbol) => {
      const svgFilename = symbol.svg_uri.match(/[^/]+$/)?.[0];

      if (!svgFilename) {
        throw new Error("could not parse filename from svg uri");
      }

      const symbolName = svgFilename.match(/(.*)\.svg$/)?.[1];

      if (!symbolName) {
        throw new Error("colud not parse symbol name from filename");
      }

      const svgResponse = await fetch(symbol.svg_uri);
      const svgBuffer = await svgResponse.arrayBuffer();

      const text = new TextDecoder("utf-8").decode(new Uint8Array(svgBuffer));
      const svgRootNode = parse(text);

      return { ...symbol, svgBuffer, svgFilename, symbolName, svgRootNode };
    })
  );

  symbols.sort(({ symbolName: a }, { symbolName: b }) => compareSymbols(a, b));

  console.log("Initializing manamoji.css file...");
  const cssWriteStream = (
    await fs.open(path.resolve(DIST_DIR, "manamoji.css"), "w")
  ).createWriteStream();

  // Include comment to signal generator.
  const projectUrl = pkg.homepage ?? pkg.repository.url ?? "";
  cssWriteStream.write(`/* ! ${pkg.name} v${VERSION} | ${projectUrl} */\n`);

  // Initialize CSS file with preamble.
  cssWriteStream.write(
    await fs.readFile(path.resolve(SCRIPT_DIR, "preamble.css"))
  );

  // Write the rest of the Manamoji content to the CSS file.
  console.log("Writing symbol content rules...");
  for (const symbol of symbols) {
    const { symbolName, svgRootNode, svgBuffer } = symbol;

    const svgNode = svgRootNode.children[0] as ElementNode;
    const viewBox = svgNode.properties?.["viewBox"] as string;
    const { width, height } = parseViewBox(viewBox);

    const svgBase64 = Buffer.from(svgBuffer).toString("base64");
    const svgDataUrl = `data:image/svg+xml;base64,${svgBase64}`;

    // Allow either the name of the file, or the symbol text to be used.
    const symbolStrings = [symbol.symbol.slice(1, -1), symbolName].map(
      (symbolString) => symbolString.toUpperCase()
    );

    // Allow naked symbol strings, or `{}` wrapped.
    symbolStrings.push(
      ...symbolStrings.map((symbolString) => `{${symbolString}}`)
    );

    // Create data attribute selectors from the unique values.
    const selectors = [...new Set(symbolStrings)].map(
      (symbolString) => `[data-manamoji~="${symbolString}" i]`
    );

    cssWriteStream.write(
      [
        `:where(${selectors.join(", ")}) {`,
        `--manamoji-height: ${height};`,
        `--manamoji-svg: url("${svgDataUrl}");`,
        `--manamoji-width: ${width};`,
        "}\n",
      ].join("\n")
    );
  }

  // Wait for the CSS file to finish writing.
  await new Promise((resolve) => cssWriteStream.close(resolve));

  console.log("Generating HTML file for testing...");
  const dom = new JSDOM(
    await fs.readFile(path.resolve(SCRIPT_DIR, "template.html"))
  );
  const doc = dom.window.document;
  const body = doc.body;

  const title = `${pkg.name} v${VERSION}`;
  doc.querySelector("head title")!.textContent = title;
  body.querySelector("body h1")!.textContent = title;

  const tbody = body.querySelector("tbody")!;

  for (const symbol of symbols) {
    const abbr = doc.createElement("abbr");
    abbr.setAttribute("data-manamoji", symbol.symbolName);
    abbr.textContent = symbol.symbol;

    const tr = doc.createElement("tr");
    tr.innerHTML = "<td></td><td><code></code></td><td></td>";

    tr.querySelector("td:first-child")!.textContent = symbol.symbolName;
    tr.querySelector("code")!.textContent = abbr.outerHTML;
    tr.querySelector("td:last-child")!.appendChild(abbr);

    tbody.appendChild(tr);
  }

  console.log("Writing HTML file...");
  await fs.writeFile(path.resolve(DIST_DIR, "index.html"), dom.serialize());

  console.log("DONE!");
}

main().catch((err) => {
  throw err;
});
