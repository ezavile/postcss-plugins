# `@postcss-plugins/console`

[![npm](https://img.shields.io/npm/v/@postcss-plugins/console.svg?style=flat-square)](https://www.npmjs.com/package/@postcss-plugins/console)

A [PostCSS] plugin to output messages to the terminal.

## Installation

```
yarn add @postcss-plugins/console
```

What is this? For example, you have the following CSS file (I'm using [postcss-each], [@postcss-plugins/text-transform] and [postcss-cssnext]):

**backgrounds.css**

```css
.u {
  @console.warn Here comes the postcss-console plugin;
  @each $color in green, yellow, red {
    @console.assert '$color' == 'green';
    @text-transform $color, upperFirst, $transformed {
      @console.log the text was transformed from $color to $transformed;
      &-bg$(transformed) {
        background-color: $color;
      }
    }
  }
  @console.error This is an error message;
}
```

And the plugin will give you:

![console](https://github.com/ezavile/postcss-plugins/blob/master/packages/console/console.png?raw=true 'Messages on terminal')

## Usage

Put this plugin after all plugins.

```javascript
postcss([require('other-plugin'), require('@postcss-plugins/console')]);
```

## Methods

```css
@console.log This is an informative message
@console.warn This is a warn message
@console.error This is an error message
@console.assert Boolean expression;
```

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
[@postcss-plugins/text-transform]: https://github.com/ezavile/postcss-plugins/tree/master/packages/text-transform
[postcss-cssnext]: https://github.com/MoOx/postcss-cssnext
[mit license]: https://github.com/ezavile/postcss-plugins/blob/master/packages/console/LICENSE
