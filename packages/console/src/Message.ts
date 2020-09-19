import colors from 'colors';

export default class Message {
  private fileName: string;
  private line: number;
  private column: number;

  constructor(fileName: string, line: number, column: number) {
    this.fileName = fileName;
    this.line = line;
    this.column = column;
  }

  getFileName(): string {
    return colors.bold.underline(this.fileName);
  }

  output(msg: string): string {
    const pluginName = '[postcss-console]';
    const where = `(${this.line}, ${this.column})`;

    return `${colors.gray(pluginName)} ${msg} ${colors.gray(where)}`;
  }
}
