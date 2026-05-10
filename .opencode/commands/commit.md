---
description: Create a commit following conventional commits + gitmoji
---

Load the `commit` skill.

Then follow the conventions from the skill to create a commit:

1. Run `git status` and `git diff` to understand all changes.
2. Run `git log --oneline -5` to check the project's existing commit style.
3. Categorize the changes — are they a new feature, bug fix, refactoring, tests, etc.?
4. Pick the correct conventional commit type and matching gitmoji from the skill's reference table.
5. Write the commit message in the format:
   ```
   type(scope): :emoji: Short description
   ```
6. Create the commit.
7. Verify the commit succeeded with `git status`.
8. **Never push to remote** — unless the user explicitly asks you to.
