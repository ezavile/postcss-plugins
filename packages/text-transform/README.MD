# `@postcss-plugins/text-transform`

[![npm](https://img.shields.io/npm/v/@postcss-plugins/text-transform.svg?style=flat-square)](https://www.npmjs.com/package/@postcss-plugins/text-transform)

A [PostCSS] plugin to transform the text.

## Installation

```
yarn add @postcss-plugins/text-transform
```

What is this? For example, you have the following CSS file (I'm using [postcss-each] and [postcss-cssnext]):

**backgrounds.css**

```css
.u {
  @each $color in green, yellow, red {
    @text-transform $color, upperFirst, $transformed {
      &-bg$(transformed) {
        background-color: $color;
      }
    }
  }
}
```

And the plugin will give you:

```css
.u-bgGreen {
  background-color: green;
}

.u-bgYellow {
  background-color: yellow;
}

.u-bgRed {
  background-color: red;
}
```

## Usage

```javascript
postcss([require('@postcss-plugins/text-transform')]);
```

```css
@text-transform $color, transformation, $textTransformed {
  .u-bg$(transformed) {
    background-color: $color;
  }
}
```

**Transformations**

- camelCase - Converts to camel case.
- capitalize - Converts the first character of string to upper case and the remaining to lower case.
- lowerCase - Converts string, as space separated words, to lower case.
- lowerFirst - Converts the first character of string to lower case.
- pascalCase - Converts to pascal case.
- upperCase - Converts string, as space separated words, to upper case.
- upperFirst - Converts the first character of string to upper case.

## Testing

```javascript
yarn test
```

## Contributing

- ⇄ Pull requests and ★ Stars are always welcome.
- For bugs and feature requests, please create an issue.

[MIT License]

[postcss]: https://github.com/postcss/postcss
[postcss-each]: https://github.com/outpunk/postcss-each
[postcss-cssnext]: https://github.com/MoOx/postcss-cssnext
[mit license]: https://github.com/ezavile/postcss-plugins/blob/master/packages/text-transform/LICENSE
