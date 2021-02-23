import { readFileSync } from 'fs';
import postcss from 'postcss';
import prettier from 'prettier';
import path from 'path';

import { TokenUtilityProps } from '../model';

import plugin from '../plugin';

function toExpect(
  opts: Partial<TokenUtilityProps>,
  input: string,
  output: string
) {
  const result = postcss([plugin(opts)]).process(input, { from: '/test.css' });
  const formatted = prettier.format(result.css, {
    tabWidth: 2,
    singleQuote: true,
    parser: 'css',
  });
  expect(formatted).toEqual(output);
}

function getOutput(file: string) {
  const cssFilePath = path.join(__dirname, file);
  return readFileSync(cssFilePath, 'utf8');
}

describe('postcss-token-utility', () => {
  it('adds prefix to colors tokens utilities', () => {
    toExpect(
      {
        prefix: 'ez',
        colors: {
          'red-50': '#ec1b49',
          'green-50': '#14d0a6',
          'blue-50': '#0056ff',
        },
      },
      '.custom-class { color: $ez-color-red-50; }',
      getOutput('colors.css')
    );
  });

  it('adds spacing tokens utilities', () => {
    toExpect(
      {
        spacing: {
          '1x': '8px',
          '2x': '12px',
        },
      },
      '.custom-class { margin: $spacing-2x; }',
      getOutput('spacing.css')
    );
  });

  it('adds font tokens utilities', () => {
    toExpect(
      {
        prefix: 'ez',
        font: {
          family: ['roboto'],
          sizes: {
            small: '12px',
            medium: '14px',
            large: '16px',
          },
        },
      },
      `.custom-class { font-family: '$ez-font-roboto'; font-size: $ez-text-large; }`,
      getOutput('font.css')
    );
  });

  it('adds leading tokens utilities', () => {
    toExpect(
      {
        leading: {
          '1x': '1.2',
          '2x': '1.5',
          '3x': '1.7',
        },
      },
      `.custom-class { line-height: $leading-3x; }`,
      getOutput('leading.css')
    );
  });
});
