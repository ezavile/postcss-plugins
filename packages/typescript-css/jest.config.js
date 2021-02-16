module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  watchPathIgnorePatterns: ["<rootDir>/src/tests/fake.style.ts"]
};
