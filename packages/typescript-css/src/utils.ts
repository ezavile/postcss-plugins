import { writeFileSync } from 'fs';
import camelcase from 'camelcase';
import prettier from 'prettier';
import path from 'path';

type KeyValueClassName = { [key in string]: string };

export const toKeyValue = (classes: string[]): KeyValueClassName => {
  const fileContent = classes.reduce((classNames, className) => {
    classNames[camelcase(className)] = className;

    return classNames;
  }, {} as KeyValueClassName);

  return fileContent;
};

export const convertToTsContent = (
  filename: string,
  content: KeyValueClassName
): string => {
  const tsContent = `export const ${camelcase(
    filename
  )}Style = ${JSON.stringify(content)}`;

  const formattedContent = prettier.format(tsContent, {
    singleQuote: true,
    parser: 'typescript',
  });

  return formattedContent;
};

export const buildFile = (cssFileName: string, classes: string[]): void => {
  const dirname = path.dirname(cssFileName);
  const filename = path.basename(cssFileName, path.extname(cssFileName));

  const keyValues = toKeyValue(classes);
  const tsContent = convertToTsContent(filename, keyValues);

  writeFileSync(`${dirname}/${filename}.style.ts`, tsContent);
};
