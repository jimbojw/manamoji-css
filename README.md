# manamoji-css

Provides
[scryfall/manamoji-discord](https://github.com/scryfall/manamoji-discord)
images as a single, comprehensive CSS file.

DEMO: https://jimbojw.github.io/manamoji-css/

## Quickstart

To use this project, first download the
[`manamoji.css`](https://raw.githubusercontent.com/jimbojw/manamoji-css/refs/heads/main/dist/manamoji.css)
file from the project's `dist/` directory. Then include it in your HTML page via
standard `<link>` syntax:

```html
<link rel="stylesheet" href="manamoji.css" />
```

Then, to show a manamoji, give any element a `data-manamoji` data attribute,
with the value of the symbol to show.

For example, to show a black mana symbol
(<img src="https://raw.githubusercontent.com/scryfall/manamoji-discord/refs/heads/main/emojis/manab.png" width="16"/>)
you would set the attribute to
`data-manamoji="b"` or `data-manamoji="B"`. The CSS selector is
case-insensitive, so either upper or lowercase will work, and it is tolerant of
whitespace before and/or after the symbol name (`data-manamoji=" b "` will work
too).

Using the `<abbr>` tag is a good choice for this, but it should work with any
tag name.

Minimum necessary example:

```html
<abbr data-manamoji="b"></abbr>
```

Any text or child elements will not be visible, although they will remain in the
DOM. For this reason, you may want to include the symbol inside the element:

```html
<abbr data-manamoji="b">{b}</abbr>
```

For accessibility, consider adding a `title` attribute to the element to
describe the meaning of the symbol:

```html
<abbr data-manamoji="b" title="one black mana">{b}</abbr>
```

## API

This project exposes configurable attributes for the Manamoji symbols by way of
CSS variables with the `--manamoji-` prefix.

Most manamojis are circular and opaque, such as normal mana symbols (`{w}`), the
tap symbol (`{t}`), etc. For these, a thin drop-shadow will be shown.

Other manamojis have tranparent backgrounds, such as the Ticket symbol
(<img src="https://raw.githubusercontent.com/scryfall/manamoji-discord/refs/heads/main/emojis/manatk.png" width="16"/>),
or have irregular shape, like the half red mana symbol
(<img src="https://raw.githubusercontent.com/scryfall/manamoji-discord/refs/heads/main/extras/manahr.png" width="16"/>).
For these, the drop-shadow is not shown.

For a description of the following value types, see MDN's guide on
[CSS values and units](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units).

**`--manamoji-font-size`**

Font size of the manamoji.

Value type: `<dimension>`. Default value: `1.1em`.

**`--manamoji-height`**

Height of the image in pixels (without `px` suffix).

Value type: `<integer>`. Default value: varies by symbol.

**`--manamoji-offset-top`**

Sets the `top` to align with surrounding text.

Value type: `<dimension>`. Default value: 1/16 of font size.

**`--manamoji-png`**

Base64 encoded `data:` URI of the image in PNG format.

Value type: `url()`. Default value: varies by symbol.

**`--manamoji-shadow-color`**

Color of the shadow.

Value type: `<color>`. Default value: `rgba(0 0 0 / 90%)` OR `transparent`.

**`--manamoji-shadow-opacity`**

Opacity of the shadow.

Value type: `<number>`. Default value: `1`.

**`--manamoji-shadow-size`**

Width of the shadow.

Valueu type: `<dimension>`. Default value: 1/16 of font size OR `0`.

**`--manamoji-width`**

Width of the image in pixels (without `px` suffix).

Value type: `<integer>`. Default value: varies by symbol.

## Development

After you check out this git repository, with Node installed, install
dependencies:

```sh
npm install
```

To run the build process just once:

```sh
npm run build
```

To continuously run the build process whenever source files change:

```sh
npm run dev
```

Whenever the build script runs, it will produce a `manamoji.css` file and an
`index.html` file in the `dist/` directory.

Open the `index.html` file in your browser to view the effects of your changes.

## LICENSE

The source code for this project is licensed under the Apache-2.0 license. See
[LICENSE](./LICENSE).

The generated `manamoji.css` file is released to the public under the same
spirit and motivation as the scryfall/manamoji-discord project. See
[scryfall/manamoji-discord/LICENSE.md](https://github.com/scryfall/manamoji-discord/blob/main/LICENSE.md)
