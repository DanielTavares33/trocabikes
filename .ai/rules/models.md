---
paths:
  - app/Models/Bike.php
---

# Models

## Keyword LIKE filters need a driver-specific ESCAPE clause
Bike::scopeFiltered `q` searches title, description, and brand name with LIKE. Always reuse escapeLike, then add ESCAPE so `%` and `_` are literals: SQLite needs `ESCAPE '\'` (one backslash), MySQL/MariaDB need `ESCAPE '\\'`. Pest covers match/miss plus those wildcards.
