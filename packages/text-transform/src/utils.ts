import postcss from 'postcss';
import camelcase from 'camelcase';

export function tokenize(str: string): string {
  return postcss.list.comma(str).map((s) => s.replace(/^\$/, ''))[0];
}

export interface TransformParams {
  text: string;
  transformation: string;
  result: string;
}

export function processParams(params: string): TransformParams {
  const [text, transformation, result] = params.split(',').map(tokenize);
  return {
    text,
    transformation,
    result,
  };
}

export function transform(params: TransformParams): string {
  const { text, transformation } = params;

  const firstLetter = text.charAt(0);
  const restLetters = text.slice(1);

  switch (transformation) {
    case 'capitalize':
      return `${firstLetter.toUpperCase()}${restLetters.toLowerCase()}`;
    case 'camelCase':
      return camelcase(text);
    case 'lowerFirst':
      return `${firstLetter.toLowerCase()}${restLetters}`;
    case 'pascalCase':
      return camelcase(text, { pascalCase: true });
    case 'lowerCase':
      return text.toLowerCase();
    case 'upperCase':
      return text.toUpperCase();
    case 'upperFirst':
      return `${firstLetter.toUpperCase()}${restLetters}`;
    default:
      throw `It can not be transformed to ${transformation}`;
  }
}
