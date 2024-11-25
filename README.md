# manamoji-css

Provides
[scryfall/manamoji-discord](https://github.com/scryfall/manamoji-discord)
images, but as a single, comprehensive CSS file.

## Quickstart

To use this project, first download the
[`manamoji.css`](https://raw.githubusercontent.com/jimbojw/manamoji-css/refs/heads/main/dist/manamoji.css)
file from the project's `dist/` directory. Then include it in your HTML page via
standard `<link>` syntax:

```html
<html>
  <head>
    <!-- ... -->
    <link rel="stylesheet" href="manamoji.css" />
  </head>
</html>
```

Then, to show a manamoji, give any element a `data-manamoji` data attribute,
with the value of the symbol to show.

For example, to show a black mana symbol, you would set the attribute to
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

Table of available attributes:

| CSS Variable                | Value type\*  | Default value                        | Description                                            |
| --------------------------- | ------------- | ------------------------------------ | ------------------------------------------------------ |
| `--manamoji-font-size`      | `<dimension>` | `1.1em`                              | Font size of the manamoji.                             |
| `--manamoji-height`         | `<integer>`   | varies by symbol                     | Height of the image in pixels (without `px` suffix).   |
| `--manamoji-offset-top`     | `<dimension>` | 1/16 of font size                    | Sets the `top` to align with surrounding text.         |
| `--manamoji-png`            | `url()`       | varies by symbol                     | Base64 encoded `data:` URI of the image in PNG format. |
| `--manamoji-shadow-color`   | `<color>`     | `rgba(0 0 0 / 90%)` OR `transparent` | Color of the shadow.                                   |
| `--manamoji-shadow-opacity` | `<number>`    | `1`                                  | Opacity of the shadow.                                 |
| `--manamoji-shadow-size`    | `<dimension>` | 1/16 of font size OR `0`             | Width of the shadow.                                   |
| `--manamoji-width`          | `<integer>`   | varies by symbol                     | Width of the image in pixels (without `px` suffix).    |

\* See MDN's guide on [CSS values and units](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units)

Most manamojis are circular and opaque, such as normal mana symbols (`{w}`), the
tap symbol (`{t}`), etc. For these, a thin drop-shadow will be shown.

Other manamojis have tranparent backgrounds, such as the Ticket symbol (`{tk}`),
or have irregular shape, like the half red mana symbol (`{hr}`). For these, the
drop-shadow is not shown.

## Development

After you check out this git repository, you'll need to init and udpate git
submodules:

```sh
git submodule init ; git submodule update
```

This will download the `manamoji-discord` content.

Next, with Node installed, install dependencies:

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

The source code for this project is licensed under the Apache-2.0 license. The
generated output files are released to the public under the same spirit and
motivation as the `manamoji-discord` project.
