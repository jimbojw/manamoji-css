/**
 * @license SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Type holding details about a processed manamoji image.
 */

import sharp from "sharp";

export interface Manamoji {
  /**
   * Metadata produced by the sharp library.
   */
  meta: sharp.Metadata;

  /**
   * Base64 encoded string representation of the Manamoji PNG image.
   */
  pngDataUrl: string;

  /**
   * Symbol string for this mana symbol, such as `0`, `r`, `pw` etc.
   */
  symbol: string;
}
