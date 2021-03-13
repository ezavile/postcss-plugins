import * as postcss from 'postcss';
import vars from 'postcss-simple-vars';
import buttonBuilder from '@postcss-plugins/button-builder';

import { TokenUtilityProps } from './model';

const plugin = ({
  prefix = '',
  colors = {},
  spacing = {},
  leading = {},
  font = { family: {}, sizes: {} },
}: Partial<TokenUtilityProps>): postcss.Plugin => {
  return {
    postcssPlugin: 'postcss-token-utility',
    OnceExit: async (root: postcss.Root, helpers) => {
      const base = `${prefix ? `${prefix}-` : ''}`;
      const variables: { [key in string]: string } = {};

      const utils = [
        {
          selector: `${base}text`,
          prop: 'color',
          values: colors,
          variableName: `${base}color`,
        },
        {
          selector: `${base}bg`,
          prop: 'background-color',
          values: colors,
          variableName: `${base}color`,
        },
        {
          selector: `${base}text`,
          prop: 'font-size',
          values: font.sizes || {},
        },
        {
          selector: `${base}font`,
          prop: 'font-family',
          values: Object.fromEntries(
            Object.keys(font.family || {}).map((k) => [
              k,
              `'${(font.family || {})[k]}'`,
            ])
          ),
        },
        {
          selector: `${base}leading`,
          prop: 'line-height',
          values: leading,
        },
      ].map((token) => {
        return Object.keys(token.values).map((key) => {
          const variableName = token.variableName || token.selector;
          variables[`${variableName}-${key}`] = token.values[key];

          const declaration = new helpers.Declaration({
            prop: token.prop,
            value: token.values[key],
          });

          declaration.important = true;

          const rule = new helpers.Rule({
            selector: `.${token.selector}-${key}`,
          });

          rule.append(declaration);

          return rule;
        });
      });

      const attributes = ['margin', 'padding'];
      const sides = ['top', 'right', 'bottom', 'left'];

      let spacingUtils = '';

      Object.keys(spacing).forEach((key) => {
        spacingUtils += attributes.reduce(
          (prevAttr, nextAttr) =>
            `${prevAttr}
              .${base}${nextAttr.charAt(0)}-${key} {
                ${nextAttr}: ${spacing[key]} !important;
              }`,
          ''
        );

        spacingUtils += `
            ${sides.reduce(
              (prevSide, nextSide) =>
                attributes.reduce(
                  (prevAttr, nextAttr) =>
                    `${prevAttr}
                    .${base}${nextAttr.charAt(0)}${nextSide.charAt(0)}-${key} {
                      ${nextAttr}-${nextSide}: ${spacing[key]} !important;
                    }`,
                  prevSide
                ),
              ''
            )}
          `;

        variables[`${base}spacing-${key}`] = spacing[key];
      });

      root.prepend(...utils, spacingUtils);

      const processor = helpers.postcss([
        vars({ variables }),
        buttonBuilder({ prefix, colors }),
      ]);

      await processor.process(root, { from: undefined });

      root.cleanRaws();
    },
  };
};

export = plugin;
