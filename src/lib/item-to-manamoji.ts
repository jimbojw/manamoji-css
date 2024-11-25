/**
 * @license SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Process a found item during directory walk into a Manamoji.
 */

import fs from "fs/promises";
import klaw from "klaw";
import path from "path";
import sharp from "sharp";

import { Manamoji } from "./manamoji.js";

// Regex for extracting the symbol string from the manamoji file name.
const SYMBOL_FILE_PATTERN = /^mana(.+)\.png$/;

/**
 * Convert a klaw found Item into a Manamoji object.
 * @param item Directory or file found during klaw walk.
 * @returns Either a Manamoji or undefined if the file can't be made into one.
 */
export async function itemToManamoji(
  item: klaw.Item
): Promise<Manamoji | undefined> {
  // Ignore directories.
  if (item.stats.isDirectory()) {
    return undefined;
  }

  const filename = path.basename(item.path);

  // Ignore non-image files.
  const symbol = (filename.match(SYMBOL_FILE_PATTERN) ?? [])[1];
  if (!symbol) {
    return undefined;
  }

  const inputBuffer = await fs.readFile(item.path);
  const img = sharp(inputBuffer);
  const meta = await img.metadata();

  // Skip images that lack height or width.
  if (!meta.width || !meta.height) {
    // TODO(jimbo): Should this throw instead?
    return undefined;
  }

  const sharpCompressedOutputBuffer = await img
    .png({ compressionLevel: 9, effort: 10 })
    .toBuffer();

  const outputOptions = [
    { buffer: inputBuffer, mimeType: "image/png" },
    { buffer: sharpCompressedOutputBuffer, mimeType: "image/png" },
  ];

  outputOptions.sort(({ buffer: a }, { buffer: b }) => a.length - b.length);

  const { buffer: bestBuffer, mimeType } = outputOptions[0];

  const pngBase64 = bestBuffer.toString("base64");
  const pngDataUrl = `data:${mimeType};base64,${pngBase64}`;

  return { meta, pngDataUrl, symbol };
}
