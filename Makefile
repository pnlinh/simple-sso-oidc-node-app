SERVICE ?= 'app'
DOCKER_COMPOSE=$(if $(shell which docker compose),docker compose,docker-compose)

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "⚡ \033[34m%-30s\033[0m %s\n", $$1, $$2}'

all: build run

build: ## Build docker image
	$(DOCKER_COMPOSE) build --no-cache

start: run
run: ## Run application in Docker. Run 'make build' first
	$(DOCKER_COMPOSE) up -d

restart: ## Restart service containers
	$(DOCKER_COMPOSE) restart

stop: ## Force stop service containers
	$(DOCKER_COMPOSE) kill

down: destroy
destroy: ## Alias docker-compose down command
	$(DOCKER_COMPOSE) down

shell: ## Enter bash in running Docker container
	$(DOCKER_COMPOSE) exec app sh

root: ## Enter bash in running Docker container as root user
	$(DOCKER_COMPOSE) exec --user root app sh

ps: status ## View services status
status:
	$(DOCKER_COMPOSE) ps

logs: ## Show service container logs
	$(DOCKER_COMPOSE) logs -f $(SERVICE)

redis-cli: ## Connect redis cli
	$(DOCKER_COMPOSE) exec redis-2 redis-cli
