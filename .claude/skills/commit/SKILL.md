---
name: commit
description: "Use this skill whenever creating git commits or being asked about commit conventions. Trigger when: the user asks to commit changes, the AI needs to create a commit as part of a task, or when discussing commit history or best practices. Covers: conventional commits, gitmoji emoji selection, commit message formatting, git safety rules. Do not use for: general git operations (branching, rebasing, merging) or CI/CD configuration."
license: MIT
metadata:
  author: laravel
---

# Commit Conventions

This project follows **conventional commits** combined with **gitmoji** emoji indicators.

## 🚫 Git Safety (Hard Rules)

These rules are **never** to be broken:

- **Never push to remote** unless the user explicitly instructs you to.
- **Never force push** (`--force`, `--force-with-lease`) to any branch.
- **Never skip git hooks** (`--no-verify`, `--no-gpg-sign`).
- **Never amend a pushed commit** — only amend commits that exist only locally and were created by you in this conversation.
- If a commit is rejected by a hook, **fix the issue and create a new commit** — never amend a failed commit.

## Commit Format

```
type(scope): :emoji: Short description
```

### Rules

- **type** — one of the types below (conventional commits)
- **scope** (optional) — lowercase context like `auth`, `api`, `ui`, `deps`
- **emoji** — gitmoji shortcode matching the change type
- **Short description** — imperative mood, no period, ≤72 characters
- **Body** (optional) — blank line after title, wrapped at 72 chars
- **Footer** (optional) — `BREAKING CHANGE:` or `Refs:` or `Closes:`

### Examples

```
feat: :sparkles: Add user authentication flow
fix: :bug: Resolve cart overflow on mobile
docs: :memo: Document API rate limiting
refactor: :recycle: Extract payment service from controller
test: :white_check_mark: Add validation tests for checkout
chore: :wrench: Upgrade vite to v6
perf: :zap: Optimize image loading with lazy loading
style: :art: Format code with Prettier
revert: :rewind: Restore deleted migration
```

## Gitmoji Reference

| Type | Gitmoji | When to use |
|---|---|---|
| `feat` | `:sparkles:` | A new feature |
| `fix` | `:bug:` | A bug fix |
| `docs` | `:memo:` | Documentation only changes |
| `refactor` | `:recycle:` | Code change that neither fixes a bug nor adds a feature |
| `test` | `:white_check_mark:` | Adding or correcting tests |
| `chore` | `:wrench:` | Build process, tooling, dependency changes |
| `style` | `:art:` | Formatting, missing semicolons, etc. (no production change) |
| `perf` | `:zap:` | Performance improvement |
| `ci` | `:green_heart:` | CI configuration and scripts |
| `revert` | `:rewind:` | Reverts a previous commit |
| `security` | `:lock:` | Security fixes |
| `deps` | `:arrow_up:` | Dependency upgrades |
| `initial` | `:tada:` | Initial commit |
| `release` | `:bookmark:` | Release / version tag |
| `wip` | `:construction:` | Work in progress (use sparingly) |

## How to Apply

When the user asks you to commit:

1. Run `git status` and `git diff` to understand all changes.
2. Run `git log --oneline -5` to check the project's existing commit style.
3. Categorize the changes: are they a new feature, a bug fix, refactoring, tests, etc.?
4. Pick the correct type and matching gitmoji from the table above.
5. Write the commit message following the format, summarizing *why* (not what).
6. **Never push** unless explicitly told to.
7. Verify the commit succeeded with `git status`.

## Common Pitfalls

- Pushing without explicit permission (always ask first if unsure)
- Amending commits that were already pushed
- Using the wrong emoji for a change type (e.g., `:bug:` for a new feature)
- Writing messages that describe *what* changed instead of *why*
- Including emojis in the body or footer — they belong only after the type
- Using past tense ("Added") instead of imperative ("Add")
