# `@postcss-plugins/token-utility`

[![npm](https://img.shields.io/npm/v/@postcss-plugins/token-utility.svg?style=flat-square)](https://www.npmjs.com/package/@postcss-plugins/token-utility)

A [PostCSS](https://github.com/postcss/postcss) plugin to generate design tokens utilities.

## Installation

```
yarn add @postcss-plugins/token-utility
```

## Usage

This plugin generates utility classes and variables based on key-value pair tokens. Also we have integrated [@postcss-plugins/button-builder](https://github.com/ezavile/postcss-plugins/tree/master/packages/button-builder) to generate utility classes for `solid`, `outline`, `stroke` and `flat` button appearances.

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

And the plugin will give utilities:

**color**

- `.ez-text-red-50`
- `.ez-text-green-50`
- `.ez-text-blue-50`

**background-color**

- `.ez-bg-red-50`
- `.ez-bg-green-50`
- `.ez-bg-blue-50`

**font-size**

- `.ez-text-small`
- `.ez-text-medium`
- `.ez-text-large`

**font-family**

- `.ez-font-main`

**line-height**

- `.ez-leading-1x`
- `.ez-leading-2x`
- `.ez-leading-3x`

**margin and padding**

- `.ez-m-1x`
- `.ez-p-1x`
- `.ez-mt-1x`
- `.ez-pt-1x`
- `.ez-mr-1x`
- `.ez-pr-1x`
- `.ez-mb-1x`
- `.ez-pb-1x`
- `.ez-ml-1x`
- `.ez-pl-1x`
- `.ez-m-2x`
- `.ez-p-2x`
- `.ez-mt-2x`
- `.ez-pt-2x`
- `.ez-mr-2x`
- `.ez-pr-2x`
- `.ez-mb-2x`
- `.ez-pb-2x`
- `.ez-ml-2x`
- `.ez-pl-2x`

**Button Styles**

- `.ez-btn`
- `.ez-btn-block`
- `.ez-btn-disabled`

For radius:

- `.ez-btn-radius-sm`
- `.ez-btn-radius-md`
- `.ez-btn-radius-lg`
- `.ez-btn-radius-rounded`

For sizes:

- `.ez-btn-sm`
- `.ez-btn-md`
- `.ez-btn-lg`

For appearances:

- `.ez-btn-solid-red-50`
- `.ez-btn-outline-red-50`
- `.ez-btn-stroke-red-50`
- `.ez-btn-flat-red-50`

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
