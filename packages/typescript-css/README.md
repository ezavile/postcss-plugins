# `@postcss-plugins/typescript-css`

[![npm](https://img.shields.io/npm/v/@postcss-plugins/typescript-css.svg?style=flat-square)](https://www.npmjs.com/package/@postcss-plugins/typescript-css)

A [PostCSS] plugin to create a TypeScript file by each CSS file.

## Installation

```
yarn add @postcss-plugins/typescript-css
```

What is this? For example, you have the following CSS file:

**componentName.css**

```css
.ComponentName {
  color: green;
}
.ComponentName-descendentName {
  color: yellow;
}
.ComponentName--modifierName {
  color: red;
}
```

And the plugin will give you a TypeScript file in the same location where the CSS file is. This file generated has almost the same name, only it's added "Style" at the end of the original name of your CSS file, example:

**componentNameStyle.ts**

```javascript
export const componentNameStyle = {
  componentName: 'ComponentName',
  componentDescendentName: 'ComponentName-descendentName',
  componentModifierName: 'ComponentName--modifierName',
};
```

So, you can import the TypeScript file

**Note: you have to import first the componentName.css**

```javascript
import './componentName.css';
import { componentNameStyle } from './componentNameStyle';

const element = document.createElement('div');
element.className = componentNameStyle.componentName;
```

## Usage

```javascript
postcss([require('postcss-typescript-css')]);
```

## Contributing

- ⇄ Pull requests and ★ Stars are always welcome.
- For bugs and feature requests, please create an issue.

[MIT License]

[postcss]: https://github.com/postcss/postcss
[mit license]: https://github.com/ezavile/postcss-plugins/blob/master/packages/typescript-css/LICENSE
