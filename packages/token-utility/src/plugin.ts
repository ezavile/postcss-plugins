import * as postcss from 'postcss';

import { TokenUtilityProps } from './model';

import vars from 'postcss-simple-vars';

const plugin = ({
  prefix = '',
  colors = {},
  spacing = {},
  font = { family: [], sizes: {} },
  leading = {},
}: Partial<TokenUtilityProps>): postcss.Plugin => {
  return {
    postcssPlugin: 'postcss-token-utility',
    OnceExit: (root: postcss.Root, helpers) => {
      const base = `${prefix ? `${prefix}-` : ''}`;
      const variables: { [key in string]: string } = {};
      let content = '';

      Object.keys(colors).forEach((key) => {
        content += `
            .${base}text-${key} {
              color: ${colors[key]} !important;
            }
            .${base}bg-${key} {
              background-color: ${colors[key]} !important;
            }
         `;

        variables[`${base}color-${key}`] = colors[key];
      });

      Object.keys(spacing).forEach((key) => {
        content += ['margin', 'padding'].reduce(
          (prevAttr, nextAttr) =>
            `${prevAttr}
              .${base}${nextAttr.charAt(0)}-${key} {
                ${nextAttr}: ${spacing[key]} !important;
              }`,
          ''
        );

        content += `
            ${['top', 'right', 'bottom', 'left'].reduce(
              (prevSide, nextSide) =>
                ['margin', 'padding'].reduce(
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

      font.family?.forEach((family) => {
        content += `
            .${base}font-${family} {
              font-family: '${family}' !important;
            }
          `;

        variables[`${base}font-${family}`] = family;
      });

      Object.keys(font.sizes).forEach((key) => {
        content += `
            .${base}text-${key} {
              font-size: ${font.sizes[key]} !important;
            }
          `;

        variables[`${base}text-${key}`] = font.sizes[key];
      });

      Object.keys(leading).forEach((key) => {
        content += `
            .${base}leading-${key} {
              line-height: ${leading[key]} !important;
            }
          `;

        variables[`${base}leading-${key}`] = leading[key];
      });

      root.prepend(content);

      const processor = helpers.postcss([vars({ variables })]);
      processor.process(root).root;

      root.cleanRaws();
    },
  };
};

export = plugin;
