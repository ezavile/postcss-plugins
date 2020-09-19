const scopes = require('@commitlint/config-lerna-scopes');

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': (ctx) =>
      scopes.rules['scope-enum'](ctx).then(([level, applicable, packages]) => [
        level,
        applicable,
        packages,
      ]),
  },
};
