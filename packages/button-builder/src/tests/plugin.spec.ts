import { readFileSync } from 'fs';
import postcss from 'postcss';
import prettier from 'prettier';
import path from 'path';

import { ButtonBuilderProps } from '../model';

import plugin from '../plugin';

async function toExpect(opts: Partial<ButtonBuilderProps>, output: string) {
  const result = await postcss([plugin(opts)]).process('', {
    from: '/test.css',
  });

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

describe('postcss-button-builder', () => {
  it('adds default base utilities', async () => {
    await toExpect(
      {
        prefix: '',
      },
      getOutput('base.css')
    );
  });

  it('adds custom base utilities', async () => {
    await toExpect(
      {
        prefix: 'ez',
        base: {
          textAlign: 'center',
          textTransform: 'uppercase',
          color: '#000',
        },
        sizes: {
          small: {
            padding: '0.2rem',
            fontSize: '0.7rem',
          },
          large: {
            padding: '1rem',
            fontSize: '1rem',
          },
        },
        radius: {
          small: '0.2rem',
          large: '1rem',
        },
      },
      getOutput('custom-base.css')
    );
  });

  it('adds button red appearance utilities', async () => {
    await toExpect(
      {
        prefix: 'ez',
        colors: {
          red: '#a61b3a',
        },
      },
      getOutput('appearances.css')
    );
  });
});
