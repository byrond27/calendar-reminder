.PHONY: 

up:
	@docker-compose up -d

down:
	@docker-compose down

test:
	@docker-compose exec -T react-app npm run test

build:
	@docker-compose build