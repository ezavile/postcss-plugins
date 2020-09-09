module.exports = {
  "**/*.json": [
    "prettier --write"
  ],
  "**/package.json": [
    "format-package -w"
  ],
  "**/*.ts*": [
    "prettier --write",
    "eslint --fix-dry-run"
  ],
};
