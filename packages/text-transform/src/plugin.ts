import * as postcss from 'postcss';

import vars from 'postcss-simple-vars';
import { processParams, transform } from './utils';

const plugin = (): postcss.Plugin => {
  return {
    postcssPlugin: 'postcss-text-transform',
    AtRule: {
      'text-transform': (rule, helpers) => {
        try {
          const params = processParams(rule.params);
          const transformed = transform(params);

          const proxy = new helpers.Root();

          rule.nodes.forEach((node) => {
            const clone = node.clone();
            proxy.append(clone);
          });

          const variables = { [params.result]: transformed };
          const processor = helpers.postcss([vars({ only: variables } as any)]);

          processor.process(proxy).root;

          rule.parent?.insertBefore(rule, proxy);
          rule.remove();
        } catch (error) {
          throw rule.error(error);
        }
      },
    },
  };
};

plugin.postcss = true;

export = plugin;
