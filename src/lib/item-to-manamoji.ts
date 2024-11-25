/**
 * @license SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Process a found item during directory walk into a Manamoji.
 */

import { Jimp } from "jimp";
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

  const jimpImage = await Jimp.read(item.path);

  // NOTE: For some reason, Jimp seems incapable of auto cropping the white mana
  // symbol, `w`. So here we special-case the cropping to omit the 8px border.
  // 1/16 of 128px = 8px.
  const croppedImage =
    symbol === "w"
      ? jimpImage.crop({
          x: (1 / 16) * jimpImage.width,
          y: (1 / 16) * jimpImage.height,
          w: (14 / 16) * jimpImage.width,
          h: (14 / 16) * jimpImage.height,
        })
      : jimpImage.autocrop({
          cropOnlyFrames: false,
          cropSymmetric: true,
        });

  const inputBuffer = await croppedImage.getBuffer("image/png");
  const sharpImage = sharp(inputBuffer);
  const meta = await sharpImage.metadata();

  // Skip images that lack height or width.
  if (!meta.width || !meta.height) {
    // TODO(jimbo): Should this throw instead?
    return undefined;
  }

  const sharpCompressedOutputBuffer = await sharpImage
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
