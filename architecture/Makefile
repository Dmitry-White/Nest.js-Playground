.PHONY: start, stop

ENV_FILE = .env

start:
	docker compose \
		--env-file $(ENV_FILE) \
		up -d

stop:
	docker compose \
		--env-file $(ENV_FILE) \
		down

list:
	docker compose ps -a

immigrate:
	npx typeorm migration:run -d dist/typeorm-cli.config

emigrate:
	npx typeorm migration:revert -d dist/typeorm-cli.config
