export default {
  token: process.env.GITHUB_TOKEN,
  $schema: 'https://docs.renovatebot.com/renovate-schema.json',
  extends: [
    'config:base',
    ':preserveSemverRanges',
    ':enablePreCommit',
    ':automergePatch',
    ':automergeMinor',
  ],
  platform: 'github',
  onboarding: false,
  repositories: ['ai-driven-dev/le-journal'],
  enabledManagers: ['npm'],
  rangeStrategy: 'bump',
  gitAuthor: 'Renovate Bot <bot@renovateapp.com>',
  packageRules: [
    {
      matchDepTypes: ['devDependencies'],
      groupName: 'Dev Dependencies',
      automerge: true,
    },
    {
      matchDepTypes: ['dependencies'],
      groupName: 'Main Dependencies',
      automerge: true,
    },
    {
      matchPackageNames: ['@types/node'],
      matchManagers: ['npm'],
      groupName: 'Node.js types',
    },
    {
      matchPackagePatterns: ['^@typescript-eslint/'],
      groupName: 'TypeScript-ESLint packages',
    },
  ],
  // Configuration spécifique pour monorepo
  ignorePaths: ['**/node_modules/**', '**/dist/**'],
  includePaths: [
    'package.json',
    'apps/*/package.json',
    'packages/*/package.json',
  ],
  postUpgradeTasks: {
    commands: ['pnpm install', 'pnpm build'],
    fileFilters: ['**/pnpm-lock.yaml', '**/*.json'],
  },
};
