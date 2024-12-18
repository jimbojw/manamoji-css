## [1.2.1](https://github.com/jimbojw/manamoji-css/compare/v1.2.0...v1.2.1) (2024-12-01)


### Bug Fixes

* Remove a, b, c, and d suffixed manamojis. Add bracketed variants. ([99a552c](https://github.com/jimbojw/manamoji-css/commit/99a552cc28daba346f9c5f58d9cfd3d7dc310627))

# [1.2.0](https://github.com/jimbojw/manamoji-css/compare/v1.1.1...v1.2.0) (2024-11-29)


### Features

* Upgrade images from png to svg. ([f989d77](https://github.com/jimbojw/manamoji-css/commit/f989d7784b2d839168a8cef45e746df16015b060))

## [1.1.1](https://github.com/jimbojw/manamoji-css/compare/v1.1.0...v1.1.1) (2024-11-25)


### Bug Fixes

* Adding `--version-only` option on release config. ([dbb20bb](https://github.com/jimbojw/manamoji-css/commit/dbb20bb56083c1afc9a21dc458cbca8da73577df))
* Using @semantic-release/npm to write version to package.json and @semantic-release/exec to perform build with analyzed version number. ([23675eb](https://github.com/jimbojw/manamoji-css/commit/23675ebd9a0e871b58c326e08f70ddc8e97fc9a8))

# [1.1.0](https://github.com/jimbojw/manamoji-css/compare/v1.0.0...v1.1.0) (2024-11-25)


### Bug Fixes

* Calc shadow size based on font size. ([cc39f6a](https://github.com/jimbojw/manamoji-css/commit/cc39f6ada7c76d774a030f0db5aa26e964268cc0))
* Include generator comment in generated manamoji.css file. ([f3eb29a](https://github.com/jimbojw/manamoji-css/commit/f3eb29a1b20152f5889770e242e5306d8352b823))
* Use CSS attribute token selector to be forgiving of whitespace in attrbitue value. ([8434840](https://github.com/jimbojw/manamoji-css/commit/8434840accedbece9a1a57cbb832723eec5e3105))


### Features

* Parameterize `--manamoji-font-size` and `--manamoji-shadow-opacity`. ([43642ca](https://github.com/jimbojw/manamoji-css/commit/43642ca289f1cf0ccf5329191b60b6b1bfb1e000))

# 1.0.0 (2024-11-25)


### Bug Fixes

* Add GitHub Actions. ([59aab58](https://github.com/jimbojw/manamoji-css/commit/59aab5886f1f50bcdcabf743da65d951e92ff303))
* Clean up calculations, add inline test. ([87bdbfe](https://github.com/jimbojw/manamoji-css/commit/87bdbfe1bf66453066247a60cdd0ae057dd86e31))
* Make it work with inline text, not just child elements. ([20539b3](https://github.com/jimbojw/manamoji-css/commit/20539b32dc85e2c76e95bc24d277121bc17536df))
* Prepend Manamoji public license as `[@license](https://github.com/license)` comment to generated CSS file. ([b291e17](https://github.com/jimbojw/manamoji-css/commit/b291e170ac1713db6f936798211e79074da851bf))
* Reduce selector specificity via :where() pseudo-selector, consolidate repeated attributes. ([7a5d704](https://github.com/jimbojw/manamoji-css/commit/7a5d7047cdcc64e8df36a2cedc3748122dff4c07))


### Features

* Initial implementation. ([184dafa](https://github.com/jimbojw/manamoji-css/commit/184dafa71e39d898e548c3ad8b90e915c5f95b55))
* Using Jimp to autocrop images. ([c59efc0](https://github.com/jimbojw/manamoji-css/commit/c59efc02f270b31b5754b58ff899d20d52d7da27))
