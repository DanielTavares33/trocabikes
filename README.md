# trocabikes

## Quick start

```bash
docker compose build
docker compose run --rm app composer setup
docker compose up
```

Open http://localhost:8000

## Commands

```
docker compose exec app php artisan test --compact
docker compose exec app php artisan wayfinder:generate
docker compose exec app php artisan migrate
docker compose exec app composer lint
docker compose exec app npm run lint
docker compose exec app npm run types:check
```

## Stack

Laravel 13 / Inertia 3 / React 19 / Tailwind CSS 4 / MySQL / Pest 4
