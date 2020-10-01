import { readFileSync } from 'fs';
import postcss, { CssSyntaxError } from 'postcss';
import path from 'path';

import plugin from '../plugin';

const toExpect = async (input: { css: string; from: string }) => {
  return postcss([require('postcss-each'), plugin()])
    .process(input.css, { from: input.from })
    .then((result) => {
      expect(result.css).toEqual(expect.stringMatching(/bgGreen/));
      expect(result.css).toEqual(expect.stringMatching(/bgYellow/));
      expect(result.css).toEqual(expect.stringMatching(/bgRed/));
    })
    .catch((error: CssSyntaxError) => {
      throw new Error(error.message);
    });
};

it('transforms internal vars to capitalize', async () => {
  const cssFile = path.join(__dirname, 'fake-style.css');
  const cssContent = readFileSync(cssFile, 'utf8');

  await toExpect({ css: cssContent, from: cssFile });
});

it('throws an error', async () => {
  const cssFile = path.join(__dirname, 'fail-fake-style.css');
  const cssContent = readFileSync(cssFile, 'utf8');

  await expect(toExpect({ css: cssContent, from: cssFile })).rejects.toThrow(
    'It can not be transformed to fakeTransformation'
  );
});
