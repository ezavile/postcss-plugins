import * as postcss from 'postcss';
import MessageFactory from './MessageFactory';

const plugin = (): postcss.Plugin => {
  return {
    postcssPlugin: 'postcss-console',
    Root(root: postcss.Root) {
      root.walkAtRules(/console\w*/, (atRule) => {
        const message = MessageFactory.getMessage(atRule);
        console.log(message.getFileName());
        try {
          console.log(message.output(atRule.params));
          atRule.remove();
        } catch (error) {
          throw atRule.error(error);
        }
      });
    },
  };
};

plugin.postcss = true;

export = plugin;
