export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['fix', 'build', 'feat', 'docs', 'chore', 'refactor', 'test', 'BREAKING CHANGE'],
    ],
  },
};
