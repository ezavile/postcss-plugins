import * as fs from 'fs';
import postcss from 'postcss';
import path from 'path';

import plugin from '../plugin';

it('should output the log, warn, error and asserts', async () => {
  const cssFile = path.join(__dirname, 'fakeStyle.css');
  const cssContent = fs.readFileSync(cssFile, 'utf8');

  const result = await postcss([
    require('postcss-each'),
    require('@postcss-plugins/text-transform'),
    plugin(),
  ]).process(cssContent, { from: cssFile });

  expect(result.content.includes('console')).toBeFalsy();
});

it('should throw an error because it calls a different type of log', async () => {
  try {
    await postcss([plugin()]).process(
      `
    .componentName {
      @console.fake fake;
    }
  `,
      { from: 'fakeStyle.css' }
    );
  } catch (error) {
    expect(
      error.message.includes(`Don't exist this method "console.fake"`)
    ).toBeTruthy();
  }
});

it('should throw an error because there is an incorrect condition on the assertion', async () => {
  try {
    await postcss([plugin()]).process(
      `
    .componentName {
      @console.assert fake == 14;
    }
  `,
      { from: 'fakeStyle.css' }
    );
  } catch (error) {
    expect(
      error.message.includes(`Error: ReferenceError: fake is not defined`)
    ).toBeTruthy();
  }
});
