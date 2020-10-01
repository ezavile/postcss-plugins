import { processParams, transform, tokenize } from '../utils';

const params = ['$text', 'uppercase', '$transfromedText'];
const afterProcess = processParams(params.toString());

it('removes $', () => {
  const expected = ['text', 'uppercase', 'transfromedText'];

  params.map((param, i) => {
    expect(tokenize(param)).toBe(expected[i]);
  });
});

it('gets an object from the params', () => {
  expect(afterProcess.text).toBe('text');
  expect(afterProcess.transformation).toBe('uppercase');
  expect(afterProcess.result).toBe('transfromedText');
});

it('returns text as capitalize', () => {
  afterProcess.text = 'text';
  afterProcess.transformation = 'capitalize';

  expect(transform(afterProcess)).toBe('Text');
});

it('returns text as camelCase', () => {
  afterProcess.text = 'some_text';
  afterProcess.transformation = 'camelCase';

  expect(transform(afterProcess)).toBe('someText');
});

it('returns only first letter as lowercase', () => {
  afterProcess.text = 'TEXT';
  afterProcess.transformation = 'lowerFirst';

  expect(transform(afterProcess)).toBe('tEXT');
});

it('returns text as lowercase', () => {
  afterProcess.text = 'TEXT';
  afterProcess.transformation = 'lowerCase';

  expect(transform(afterProcess)).toBe('text');
});

it('returns text as uppercase', () => {
  afterProcess.text = 'text';
  afterProcess.transformation = 'upperCase';

  expect(transform(afterProcess)).toBe('TEXT');
});

it('returns first letter as upperFirst', () => {
  afterProcess.text = 'text';
  afterProcess.transformation = 'upperFirst';

  expect(transform(afterProcess)).toBe('Text');
});

it('returns text as PascalCase', () => {
  afterProcess.text = 'some_text';
  afterProcess.transformation = 'pascalCase';

  expect(transform(afterProcess)).toBe('SomeText');
});

it('throws an error', () => {
  const afterProcessParams = processParams(params.toString());
  afterProcessParams.transformation = 'fakeTransformation';

  expect(() => transform(afterProcessParams)).toThrowError(
    'It can not be transformed to fakeTransformation'
  );
});
