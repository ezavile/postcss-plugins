import fs from 'fs';
import path from 'path';

import { buildFile, convertToTsContent, toKeyValue } from '../utils';
import { classNames, classNamesAsObject } from './__mocks__/data';

describe('utils', () => {
  let spy: jest.SpyInstance;

  beforeEach(() => {
    spy = jest.spyOn(fs, 'writeFileSync');
  });

  it('toKeyValue() returns classnames as an object', () => {
    expect(toKeyValue(classNames)).toEqual(classNamesAsObject);
  });

  it('convertToTsContent() returns a typescript file', () => {
    const content = convertToTsContent('card', classNamesAsObject);

    expect(content).toContain('export const cardStyle');
  });

  it('buildFile() calls writeFileSync with custom path', () => {
    buildFile(path.join(__dirname, 'card.css'), classNames);

    expect(spy.mock.calls[0][0]).toContain('card.style.ts');
  });
});
