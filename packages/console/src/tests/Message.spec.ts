import Message from '../Message';

const message = new Message('./fakeStyle.css', 1, 2);

describe('check the structure of the output message', () => {
  it('some', () => {
    const msg = message.output('testing message');
    expect(msg).toContain('[postcss-console]');
    expect(msg).toContain('(1, 2)');
  });
});
