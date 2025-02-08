## Semantic Versioning

### Versions

- **MAJOR** (2.0.0) : Incompatible API changes
- **MINOR** (1.1.0) : Backwards-compatible new features
- **PATCH** (1.0.1) : Backwards-compatible bug fixes

### 🌳 Branch Structure

```bash
main (production)
  ├── feature/auth-google
  ├── fix/session-timeout
  └── docs/api-reference
```

### 📖 Commit Conventions

#### Commit Types

- `feat:` - New feature (MINOR)

  ```bash
  feat: add Google authentication
  ```

- `fix:` - Bug fix (PATCH)

  ```bash
  fix: resolve session timeout issue
  ```

- `docs:` - Documentation only

  ```bash
  docs: update API documentation
  ```

- `refactor:` - Code refactoring

  ```bash
  refactor: optimize session management
  ```

- `test:` - Adding or modifying tests

  ```bash
  test: add authentication tests
  ```

- `chore:` - Maintenance

  ```bash
  chore: update dependencies
  ```

### Breaking Changes

For major changes, add "BREAKING CHANGE" in the commit body:

```bash
feat: complete authentication system overhaul

BREAKING CHANGE: new user database structure
```

### 🔄 Development Workflow

1. **Create a Branch**

   ```bash
   git checkout -b feature/auth-google
   ```

2. **Make Meaningful Commits**

   ```bash
   git commit -m "feat: add Google authentication"
   git commit -m "test: add OAuth integration tests"
   git commit -m "fix: correct token validation"
   ```

3. **Pull Request**

   - Do NOT squash commits
   - Keep detailed history
   - Use standard merge commit

4. **Automatic Release**
   - Versions are created automatically
   - CHANGELOG is generated from commits
   - Git tags are created

### 📋 Example Generated CHANGELOG

```markdown
# [2.0.0](https://github.com/user/repo/compare/v1.0.0...v2.0.0) (2025-01-29)

### Features

- add Google authentication (#123)
- add session management (#124)

### Bug Fixes

- fix token validation (#125)

### BREAKING CHANGES

- new user database structure
```

### ✅ Pull Request Checklist

- [ ] Commits follow conventions
- [ ] Each commit is atomic and meaningful
- [ ] Tests are passing
- [ ] Documentation is up to date
- [ ] No commit squashing

### 🤖 Automatic Version Bumps

| Commit Type | Message Example                                | Version Bump  |
| ----------- | ---------------------------------------------- | ------------- |
| fix         | `fix: resolve bug`                             | PATCH (1.0.1) |
| feat        | `feat: new feature`                            | MINOR (1.1.0) |
| BREAKING    | `feat: new api BREAKING CHANGE: new structure` | MAJOR (2.0.0) |

### 📌 Important Notes

1. **Commit Messages**

   - Be descriptive but concise
   - Use present tense ("add feature" not "added feature")
   - Reference issues when relevant (#123)

2. **Branch Names**

   - Use feature/, fix/, docs/ prefixes
   - Use kebab-case
   - Be descriptive

3. **Version Control**
   - Never rewrite published history
   - Keep commits atomic
   - Document breaking changes clearly
