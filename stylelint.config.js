module.exports = {
  extends: "stylelint-config-standard",
  ignoreFiles: ["src/**/*.snap"],
  rules: {
    // this rule is entirely too fastidious, people should be free to whitespace
    // as they please
    "declaration-empty-line-before": null,
  },
};
