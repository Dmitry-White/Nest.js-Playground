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
