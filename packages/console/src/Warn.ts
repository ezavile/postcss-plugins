import colors from 'colors';

import Message from './Message';

export default class Warn extends Message {
  constructor(fileName: string, line: number, column: number) {
    super(fileName, line, column);
  }
  public output(msg: string): string {
    return super.output(colors.yellow(msg));
  }
}
