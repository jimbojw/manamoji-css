/**
 * @license SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Walk a directory looking for manamojis to read and process.
 */

import klaw from "klaw";

import { compareSymbols } from "./compare-symbols.js";
import { itemToManamoji } from "./item-to-manamoji.js";
import { Manamoji } from "./manamoji.js";

/**
 * Walk a directory looking for manamoji symbol files, process them, and return
 * the array of output objects.
 * @param directory Directory to walk.
 * @returns Array of Manamoji objects.
 */
export async function directoryToManamojis(
  directory: string
): Promise<Manamoji[]> {
  const promises: Promise<Manamoji | undefined>[] = [];

  // Walk the directory, appending matching symbol files' jobs to array.
  await new Promise((resolve, reject) => {
    klaw(directory)
      .on("data", (item) => promises.push(itemToManamoji(item)))
      .on("end", resolve)
      .on("error", reject);
  });

  const manamojis = (await Promise.all(promises)).filter(
    (manamojiOrUndefined) => manamojiOrUndefined
  ) as Manamoji[];

  manamojis.sort(({ symbol: a }, { symbol: b }) => compareSymbols(a, b));

  return manamojis;
}
