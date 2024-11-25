/**
 * @license SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Format the Manamoji license text as a `@license` comment.
 */

/**
 * Default max line length in characters.
 */
const DEFAULT_MAX_LINE_LENGTH = 80;

/**
 * Format the Manamoji license text as a `@license` comment.
 * @param licenseText Original license text to format.
 * @param maxLineLength Max line length in characters.
 * @returns Formatted license text as comment.
 */
export function formatLicenseComment(
  licenseText: string,
  maxLineLength = DEFAULT_MAX_LINE_LENGTH
): string {
  return [
    "/**",
    " * @license",
    ...licenseText
      .trim()
      .split("\n")
      .map((line) => textLineToCommentLines(line, maxLineLength)),
    " */",
    "",
  ].join("\n");
}

/**
 * Helper function to convert a license text line to one or more comment lines,
 * capped by the maximum line length.
 * @param words Array of words to convert.
 * @param maxLineLength Maximum line length in characters.
 * @returns Array of comment line strings.
 */
function textLineToCommentLines(
  textLine: string,
  maxLineLength = DEFAULT_MAX_LINE_LENGTH
): string {
  const lines: string[] = [" *"];
  for (const word of textLine.split(" ")) {
    if (lines[lines.length - 1].length + word.length > maxLineLength) {
      lines.push(" *");
    }
    lines[lines.length - 1] += ` ${word}`;
  }
  return lines.join("\n");
}
