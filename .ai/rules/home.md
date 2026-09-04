---
paths:
  - 'resources/js/components/home/**'
---

# Home

## Home search and category cards filter the catalog
SearchSection is an Inertia GET Form to bikesIndex with `q` and `location` (testids home-search-q, home-search-submit). CategoriesGrid is driven by HomeController `{ id, name, slug }[]` and links with bikesIndex.url({ query: { bike_category_id } }), testid home-category plus data-slug matching BikeCategory slugs. Catalog filters keep `q` in the URL via catalogQueryFromFilters.
