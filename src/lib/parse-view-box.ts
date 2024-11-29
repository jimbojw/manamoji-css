/**
 * @license SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Utility function to parse an SVG viewBox string.
 */

/**
 * Parse an SVG `viewBox` attribute into `minX`, `minY`, `width` and `height`.
 * @param viewBox SVG viewBox string value.
 * @returns Rect object with `minX`, `minY`, `width` and `height` components.
 * @throws {Error} If `viewBox` is missing.
 * @throws {Error} If `viewBox` has the wrong number of parts.
 * @throws {Error} If `viewBox` has any part not parseable as a finite number.
 */
export function parseViewBox(viewBox?: string): {
  minX: number;
  minY: number;
  width: number;
  height: number;
} {
  if (!viewBox) {
    throw new Error("viewBox missing");
  }

  const viewBoxComponents = `${viewBox}`.trim().split(/\s+/);

  if (viewBoxComponents.length !== 4) {
    throw new Error("viewBox wrong number of components");
  }

  const viewBoxNumbers = viewBoxComponents.map((component) =>
    parseFloat(component)
  );

  for (const viewBoxNumber of viewBoxNumbers) {
    if (isNaN(viewBoxNumber) || !Number.isFinite(viewBoxNumber)) {
      throw new Error("viewBox component is not a finite number");
    }
  }

  const [minX, minY, width, height] = viewBoxNumbers;

  return { minX, minY, width, height };
}
