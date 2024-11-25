/**
 * @license SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Utility to compare symbols for sorting.
 */

// Regex for matching the numeric and string parts of a symbol.
const SYMBOL_PARTS_PATTERN = /^(\d*)(\D*)$/;

/**
 * Compare two symbols for ordering.
 * @param a First symbol to compare.
 * @param b Second symbol to compare.
 * @returns Number indicating sort order.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#comparefn
 */
export function compareSymbols(a: string, b: string): number {
  const aParts = a.match(SYMBOL_PARTS_PATTERN);

  if (!aParts || (!aParts[1] && !aParts[2])) {
    throw new Error(`could not parse symbol: ${a}`);
  }

  const bParts = b.match(SYMBOL_PARTS_PATTERN);

  if (!bParts || (!bParts[1] && !bParts[2])) {
    throw new Error(`could not parse symbol: ${b}`);
  }

  const aNum = parseInt(aParts[1]);
  const bNum = parseInt(bParts[1]);

  const numCompare =
    isNaN(aNum) && isNaN(bNum)
      ? 0
      : isNaN(aNum)
      ? 1
      : isNaN(bNum)
      ? -1
      : aNum - bNum;

  return numCompare || aParts[2].localeCompare(bParts[2]);
}
