import fs from 'fs';

import postcss from 'postcss';
import path from 'path';

import plugin from '../plugin';
import { classNamesAsObject } from './__mocks__/data';

const cssFile = path.join(__dirname, 'card.css');
const cssContent = fs.readFileSync(cssFile, 'utf8');

describe('plugin', () => {
  beforeEach(async () => {
    await postcss([require('postcss-nested'), plugin()]).process(cssContent, {
      from: cssFile,
    });
  });

  it('creates a ts file with class names as object', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { cardStyle } = require('./card.style');

    expect(cardStyle).toEqual(classNamesAsObject);
  });
});
