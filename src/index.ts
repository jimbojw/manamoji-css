/**
 * @license SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Generates the manamoji.css file from manamoji-discord source.
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import pkg from "../package.json";
import { directoryToManamojis } from "./lib/directory-to-manamojis.js";
import { Manamoji } from "./lib/manamoji.js";

// Directory of this script, e.g. `__dirname`.
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));

// Project root directory.
const PROJECT_DIR = path.resolve(SCRIPT_DIR, "..");

// Manamoji input directory.
const MANAMOJI_DIR = path.resolve(
  PROJECT_DIR,
  "submodules",
  "manamoji-discord"
);

// Output directory.
const DIST_DIR = path.resolve(PROJECT_DIR, "dist");

async function main() {
  // Find, read and process manamoji files.
  const manamojis: Manamoji[] = await directoryToManamojis(MANAMOJI_DIR);

  // Create dist dir if it doesn't already exist.
  await fs.mkdir(DIST_DIR, { recursive: true });

  const cssWriteStream = (
    await fs.open(path.resolve(DIST_DIR, "manamoji.css"), "w")
  ).createWriteStream();

  // Initialize CSS file with preamble.
  cssWriteStream.write(
    await fs.readFile(path.resolve(SCRIPT_DIR, "preamble.css"))
  );

  // Write the rest of the Manamoji content to the CSS file.
  for (const manamoji of manamojis) {
    const { symbol, meta, pngDataUrl } = manamoji;
    cssWriteStream.write(
      [
        `[data-manamoji="${symbol.toUpperCase()}" i] {`,
        `--manamoji-height: ${meta.height};`,
        `--manamoji-png: url("${pngDataUrl}");`,
        `--manamoji-width: ${meta.width};`,
        "}\n",
      ].join("\n")
    );
  }

  // Wait for the CSS file to finish writing.
  await new Promise((resolve) => cssWriteStream.close(resolve));

  // Create an HTML file for testing.
  const html = ` 
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="stylesheet" href="./manamoji.css" />
        <title>${pkg.name} v${pkg.version}</title>
        <style>
          body {
            font-size: 16px;
          }
          th {
            text-align: left;
          }
          td:last-child {
            font-size: 64px;
          }
        </style>
      </head>
      <body>
        <h1>${pkg.name} v${pkg.version}</h1>
        <table>
          <thead>
            <tr>
              <th>symbol</th>
              <th>code</th>
              <th>rendered</th>
            </tr>
          </thead>
          <tbody>
          ${manamojis
            .map(({ symbol }) => {
              const abbr = `<abbr data-manamoji="${symbol}">{${symbol}}</abbr>`;
              return `
                <tr>
                  <td>${symbol}</td>
                  <td>
                    <code>
                      ${abbr.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
                    </code>
                  </td>
                  <td>${abbr}</td>
                </tr>
              `;
            })
            .join("\n")}
          </tbody>
        </table>
      </body>
    </html>
  `;

  await fs.writeFile(path.resolve(DIST_DIR, "index.html"), html);
}

main().catch((err) => {
  throw err;
});
