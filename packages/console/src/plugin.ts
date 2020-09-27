import * as postcss from 'postcss';
import MessageFactory from './MessageFactory';

function log(atRule: postcss.AtRule) {
  const message = MessageFactory.getMessage(atRule);
  console.log(message.getFileName());
  try {
    console.log(message.output(atRule.params));
    atRule.remove();
  } catch (error) {
    throw atRule.error(error);
  }
}

const plugin = (): postcss.Plugin => {
  return {
    postcssPlugin: 'postcss-console',
    AtRule: {
      'console.log': log,
      'console.warn': log,
      'console.error': log,
      'console.assert': log,
    },
  };
};

plugin.postcss = true;

export = plugin;
