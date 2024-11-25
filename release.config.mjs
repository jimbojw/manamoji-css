/**
 * @license SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Configuration for semantic-release.
 */

import path from "path";
import { fileURLToPath } from "url";

// Directory of this script, e.g. `__dirname`.
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));

// Read the GIT_BRANCH env variable if required, or default to 'main'.
const GIT_BRANCH =
  process.env.GIT_BRANCH ??
  (process.argv.includes("--dry-run") || process.argv.includes("--version-only")
    ? undefined
    : "main");

if (GIT_BRANCH === undefined) {
  throw new Error("GIT_BRANCH env variable missing for non-prod config");
}

// Config to use when `--version-only` is present in the process argv. This is
// so we can update the `package.json` version field *before* running the build,
// which wants to read and include the version in generated outputs.
const VERSION_ONLY_CONFIG = {
  repositoryUrl: `file://${SCRIPT_DIR}`,
  branches: [GIT_BRANCH],
  ci: false,
  plugins: [
    ["@semantic-release/commit-analyzer"],
    ["@semantic-release/git", { assets: ["package.json"] }],
  ],
};

// Config to use when `--dry-run` is present in the process argv.
const DRY_RUN_CONFIG = {
  repositoryUrl: `file://${SCRIPT_DIR}`,
  branches: [GIT_BRANCH],
  plugins: [
    ["@semantic-release/commit-analyzer"],
    ["@semantic-release/release-notes-generator"],
    ["@semantic-release/changelog", { changelogFile: "CHANGELOG.md" }],
  ],
};

// Production config to run on CI (GitHub Actions).
const PROD_CONFIG = {
  branches: [GIT_BRANCH],
  plugins: [
    ["@semantic-release/commit-analyzer"],
    ["@semantic-release/release-notes-generator"],
    ["@semantic-release/changelog", { changelogFile: "CHANGELOG.md" }],
    [
      "@semantic-release/git",
      {
        assets: [
          "CHANGELOG.md",
          "dist/**",
          "package.json",
          "package-lock.json",
        ],
        message:
          "chore(release): set `package.json` to ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
    ["@semantic-release/github"],
  ],
};

// Export config matching presence of dry run flag.
export default process.argv.includes("--version-only")
  ? VERSION_ONLY_CONFIG
  : process.argv.includes("--dry-run")
  ? DRY_RUN_CONFIG
  : PROD_CONFIG;
