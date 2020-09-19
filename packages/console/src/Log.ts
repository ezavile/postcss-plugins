import colors from 'colors';

import Message from './Message';

export default class Log extends Message {
  constructor(fileName: string, line: number, column: number) {
    super(fileName, line, column);
  }

  output(msg: string): string {
    return super.output(colors.white(msg));
  }
}
