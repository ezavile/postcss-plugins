# `@postcss-plugins/token-utility`

[![npm](https://img.shields.io/npm/v/@postcss-plugins/token-utility.svg?style=flat-square)](https://www.npmjs.com/package/@postcss-plugins/token-utility)

A [PostCSS](https://github.com/postcss/postcss) plugin to generate design tokens utilities.

## Installation

```
yarn add @postcss-plugins/token-utility
```

## Usage

This plugin generates utility classes and variables based on key-value pair tokens.

```javascript
const tokenUtilityPlugin = require('@postcss-plugins/token-utility');

postcss([
  tokenUtilityPlugin({
    prefix: 'ez',
    colors: {
      'red-50': '#ec1b49',
      'green-50': '#14d0a6',
      'blue-50': '#0056ff',
    },
    spacing: {
      '1x': '8px',
      '2x': '12px',
    },
    font: {
      family: {
        main: 'roboto',
      },
      sizes: {
        small: '12px',
        medium: '14px',
        large: '16px',
      },
    },
    leading: {
      '1x': '1.2',
      '2x': '1.5',
      '3x': '1.7',
    },
  }),
]);
```

And the plugin will give you:

```css
.ez-text-red-50 {
  color: #ec1b49 !important;
}
.ez-text-green-50 {
  color: #14d0a6 !important;
}
.ez-text-blue-50 {
  color: #0056ff !important;
}
.ez-bg-red-50 {
  background-color: #ec1b49 !important;
}
.ez-bg-green-50 {
  background-color: #14d0a6 !important;
}
.ez-bg-blue-50 {
  background-color: #0056ff !important;
}
.ez-text-small {
  font-size: 12px !important;
}
.ez-text-medium {
  font-size: 14px !important;
}
.ez-text-large {
  font-size: 16px !important;
}
.ez-font-main {
  font-family: 'roboto' !important;
}
.ez-leading-1x {
  line-height: 1.2 !important;
}
.ez-leading-2x {
  line-height: 1.5 !important;
}
.ez-leading-3x {
  line-height: 1.7 !important;
}
.ez-m-1x {
  margin: 8px !important;
}
.ez-p-1x {
  padding: 8px !important;
}
.ez-mt-1x {
  margin-top: 8px !important;
}
.ez-pt-1x {
  padding-top: 8px !important;
}
.ez-mr-1x {
  margin-right: 8px !important;
}
.ez-pr-1x {
  padding-right: 8px !important;
}
.ez-mb-1x {
  margin-bottom: 8px !important;
}
.ez-pb-1x {
  padding-bottom: 8px !important;
}
.ez-ml-1x {
  margin-left: 8px !important;
}
.ez-pl-1x {
  padding-left: 8px !important;
}
.ez-m-2x {
  margin: 12px !important;
}
.ez-p-2x {
  padding: 12px !important;
}
.ez-mt-2x {
  margin-top: 12px !important;
}
.ez-pt-2x {
  padding-top: 12px !important;
}
.ez-mr-2x {
  margin-right: 12px !important;
}
.ez-pr-2x {
  padding-right: 12px !important;
}
.ez-mb-2x {
  margin-bottom: 12px !important;
}
.ez-pb-2x {
  padding-bottom: 12px !important;
}
.ez-ml-2x {
  margin-left: 12px !important;
}
.ez-pl-2x {
  padding-left: 12px !important;
}
```

### Naming Convention

Utility classes are generated following the same [Tailwind's](https://tailwindcss.com/) naming convention.

## Options

The plugin accepts these configuration options:

```typescript
export interface TokenUtilityProps {
  prefix?: string;
  colors?: { [key in string]: string };
  spacing?: { [key in string]: string };
  font?: {
    family?: { [key in string]: string };
    sizes?: { [key in string]: string };
  };
  leading?: { [key in string]: string };
}
```

As can you see, there are no required attributes. The class utilities only are generated according to configuration.

### Examples:

**`prefix`**

Allows you to add a custom prefix only to generated token utility classes.

**`colors`**

For `color` and `background-color` attributes.

```js
tokenUtilityPlugin({
  prefix: 'ez',
  colors: {
    rojo: '#ec1b49',
  },
});
```

```css
$ez-color-rojo: #ec1b49;

.ez-text-rojo {
  color: #ec1b49 !important;
}
.ez-bg-rojo {
  background-color: #ec1b49 !important;
}

/* you can use the tokens as variables */
.your-custom-class {
  color: $ez-color-rojo;
}
```

**`spacing`**

For `{margin|padding}`, `{margin|padding}-top`, `{margin|padding}-right`, `{margin|padding}-bottom`, and `{margin|padding}-left` attributes.

```js
tokenUtilityPlugin({
  spacing: {
    small: '4px',
  },
});
```

```css
$spacing-small: 4px;

/* margins */
.m-small {
  margin: 4px !important;
}
.mt-small {
  margin-top: 4px !important;
}
.mr-small {
  margin-right: 4px !important;
}
.mb-small {
  margin-bottom: 4px !important;
}
.ml-small {
  margin-left: 4px !important;
}
/* paddings */
.p-small {
  padding: 4px !important;
}
.pt-small {
  padding-top: 4px !important;
}
.pr-small {
  padding-right: 4px !important;
}
.pb-small {
  padding-bottom: 4px !important;
}
.pl-small {
  padding-left: 4px !important;
}

/* you can use the tokens as variables */
.your-custom-class {
  padding: $spacing-small;
  margin: $spacing-small;
}
```

**`font`**

For `font-family` and `font-size` attributes.

```js
tokenUtilityPlugin({
  prefix: 'ez',
  font: {
    family: {
      main: 'roboto',
    },
    sizes: {
      small: '12px',
    },
  },
});
```

```css
$ez-font-main: 'roboto';
$ez-text-small: 12px;

.ez-font-main {
  font-family: 'roboto' !important;
}
.ez-text-small {
  font-size: 12px !important;
}

/* you can use the tokens as variables */
.your-custom-class {
  font-family: $ez-font-main;
  font-size: $ez-text-small;
}
```

**`leading`**

For `line-height` attributes.

```js
tokenUtilityPlugin({
  leading: {
    small: '1.2',
  },
});
```

```css
$leading-small: 1.2;

.leading-small {
  line-height: 1.2;
}

/* you can use the tokens as variables */
.your-custom-class {
  line-height: $leading-small;
}
```

## Contributing

- ⇄ Pull requests and ★ Stars are always welcome.
- For bugs and feature requests, please create an issue.

[MIT License]

[mit license]: https://github.com/ezavile/postcss-plugins/blob/master/packages/token-utility/LICENSE
