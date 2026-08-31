.PHONY: help build up up-d down restart rebuild ps logs logs-app logs-mysql shell setup fresh destroy \
	artisan composer bun test lint migrate wayfinder ci storage-link e2e e2e-tag

COMPOSE := docker compose
APP := app
MYSQL := mysql
DB_DATABASE ?= trocabikes

.DEFAULT_GOAL := help

help: ## Show available targets
	@grep -E '^[a-zA-Z0-9_-]+:.*##' $(MAKEFILE_LIST) | sort | \
		awk 'BEGIN {FS = ":.*## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'

# --- Docker lifecycle ---

build: ## Build app image
	$(COMPOSE) build

up: ## Start app + MySQL (foreground)
	$(COMPOSE) up

up-d: ## Start app + MySQL (detached)
	$(COMPOSE) up -d

down: ## Stop containers
	$(COMPOSE) down

restart: down up-d ## Restart containers

rebuild: ## Rebuild app image without cache
	$(COMPOSE) build --no-cache

ps: ## List running containers
	$(COMPOSE) ps

logs: ## Follow all service logs
	$(COMPOSE) logs -f

logs-app: ## Follow app logs
	$(COMPOSE) logs -f $(APP)

logs-mysql: ## Follow MySQL logs
	$(COMPOSE) logs -f $(MYSQL)

destroy: ## Stop containers and remove volumes (deletes database data)
	$(COMPOSE) down -v

# --- Setup ---

setup: build ## First-time setup (build, install deps, key, migrate, build assets)
	$(COMPOSE) run --rm $(APP) composer setup

fresh: destroy setup up-d ## Reset database volume and run full setup

# --- Shell access ---

shell: ## Open a shell in the app container
	$(COMPOSE) exec $(APP) bash

mysql: ## Open MySQL CLI
	$(COMPOSE) exec $(MYSQL) mysql -u root $(DB_DATABASE)

# --- App commands (container must be running) ---

artisan: ## Run artisan (e.g. make artisan cmd="migrate")
	$(COMPOSE) exec $(APP) php artisan $(cmd)

composer: ## Run composer (e.g. make composer cmd="install")
	$(COMPOSE) exec $(APP) composer $(cmd)

bun: ## Run bun (e.g. make bun cmd="run dev")
	$(COMPOSE) exec $(APP) bun $(cmd)

test: ## Run Pest tests
	$(COMPOSE) exec $(APP) php artisan test --compact

lint: ## Run PHP and JS linters
	$(COMPOSE) exec $(APP) composer lint
	$(COMPOSE) exec $(APP) bun run lint

migrate: ## Run database migrations
	$(COMPOSE) exec $(APP) php artisan migrate

storage-link: ## Create the public/storage symlink (relative, for php artisan serve)
	$(COMPOSE) exec $(APP) php -r "$$target='../storage/app/public'; $$link='public/storage'; if (is_link($$link)) { unlink($$link); } elseif (file_exists($$link)) { fwrite(STDERR, 'public/storage exists and is not a symlink.'.PHP_EOL); exit(1); } symlink($$target, $$link); echo 'Storage link created.'.PHP_EOL;"

wayfinder: ## Regenerate Wayfinder TypeScript routes
	$(COMPOSE) exec $(APP) php artisan wayfinder:generate

ci: ## Run full CI pipeline
	$(COMPOSE) exec $(APP) composer ci:check

e2e: ## Run Playwright BDD e2e tests (host PHP + Bun; build assets first)
	bun run build
	bun run test:e2e

e2e-tag: ## Run e2e tests matching TAG (e.g. make e2e-tag TAG='@auth')
	bun run build
	bun run test:e2e:tag -- '$(TAG)'

e2e-report: ## Run e2e tests and open Allure HTML report
	bun run build
	bun run test:e2e:report
