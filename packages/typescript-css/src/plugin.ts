import * as postcss from 'postcss';
import parser from 'postcss-selector-parser';

import { buildFile } from './utils';

const plugin = (): postcss.Plugin => {
  return {
    postcssPlugin: 'postcss-typescript-css',
    Root: (root) => {
      const classes = new Set<string>();

      try {
        root.walkRules((rule) => {
          parser((selectors) => {
            selectors.walkClasses((selector) => {
              classes.add(selector.value);
            });
          }).processSync(rule.selector);
        });

        const cssFileName = root.source?.input.file;
        if (!cssFileName) throw root.error('file source is needed');

        buildFile(cssFileName, Array.from(classes));
      } catch (error) {
        throw root.error(error);
      }
    },
  };
};

plugin.postcss = true;

export = plugin;
