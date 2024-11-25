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

const isDryRun = process.argv.includes("--dry-run");

// Config to use when `--dry-run` is present in the process argv.
const DRY_RUN_CONFIG = {
  repositoryUrl: `file://${SCRIPT_DIR}`,
  branches: [],
  plugins: [
    ["@semantic-release/commit-analyzer"],
    ["@semantic-release/release-notes-generator"],
    ["@semantic-release/changelog", { changelogFile: "CHANGELOG.md" }],
    ["@semantic-release/npm", { npmPublish: false }],
    [
      "@semantic-release/exec",
      {
        verifyReleaseCmd: "BUILD_VERSION=${nextRelease.version} npm run build",
      },
    ],
  ],
};

// Production config to run on CI (GitHub Actions).
const PROD_CONFIG = {
  branches: ["main"],
  plugins: [
    ...DRY_RUN_CONFIG.plugins,
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
export default isDryRun ? DRY_RUN_CONFIG : PROD_CONFIG;
