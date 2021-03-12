import * as postcss from 'postcss';

// @ts-ignore
import colorMod from 'postcss-color-mod-function';

import { ButtonBuilderProps } from './model';
import { kebabCase, getAppearances, Appearance } from './utils';
import { BASE, SIZES, RADIUS } from './defaults';

const plugin = ({
  prefix = '',
  colors = {},
  base = BASE,
  sizes = SIZES,
  radius = RADIUS,
}: Partial<ButtonBuilderProps>): postcss.Plugin => ({
  postcssPlugin: 'postcss-button-builder',
  OnceExit: async (root: postcss.Root, helpers) => {
    try {
      const getDecl = (prop: string, value: string) => {
        const declaration = new helpers.Declaration({
          prop: kebabCase(prop),
          value,
        });

        declaration.important = true;

        return declaration;
      };

      const getRule = (selector: string, attrs: { [x: string]: string }) => {
        const rule = new helpers.Rule({
          selector,
        });

        rule.append(Object.keys(attrs).map((key) => getDecl(key, attrs[key])));

        return rule;
      };

      const basePrefix = `${prefix ? `.${prefix}-btn` : '.btn'}`;

      const baseRules = [
        getRule(basePrefix, base),
        getRule(`${basePrefix}:disabled, ${basePrefix}-disabled`, {
          pointerEvents: 'none',
          opacity: '0.5',
        }),
        getRule(`${basePrefix}-block`, {
          display: 'block',
          width: ' 100%',
        }),
      ];

      const appearancesRules = Object.keys(colors)
        .map((key) => ({
          color: key,
          ...getAppearances(colors[key]),
        }))
        .flatMap(({ color, ...appearances }) =>
          Object.keys(appearances).map((appearance) => {
            const baseSelector = `${basePrefix}-${appearance}-${color}`;
            const { initial, hover } = appearances[appearance as Appearance];

            return [
              getRule(baseSelector, {
                ...initial,
                outlineColor: `color-mod(${color} blackness(35%))`,
              }),
              getRule(`${baseSelector}:hover, ${baseSelector}:active`, hover),
            ];
          })
        );

      const radiusRules = Object.keys(radius).map((r) =>
        getRule(`${basePrefix}-radius-${r}`, { borderRadius: radius[r] })
      );

      const sizeRules = Object.keys(sizes).map((size) =>
        getRule(`${basePrefix}-${size}`, sizes[size])
      );

      root.prepend(
        ...baseRules,
        ...radiusRules,
        ...sizeRules,
        ...appearancesRules
      );
      const processor = helpers.postcss([colorMod()]);
      await processor.process(root, { from: undefined });
    } catch (error) {
      throw root.error(error);
    }
  },
});

export = plugin;
