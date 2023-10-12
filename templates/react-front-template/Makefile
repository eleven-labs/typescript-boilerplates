WORKSPACE ?= $(PWD)
REPORTS_DIR ?= build/reports
STAGE ?= dev

install: ## Install the project
	@yarn --production=false --frozen-lockfile

start-server: install ## Build assets and launch server
	@STAGE=${STAGE} yarn dev

build: ## Build for production
	@STAGE=${STAGE} yarn build

prepare-ci: ## Prepare workspace to run CI targets
	@mkdir -p build/reports

lint: ## Run Lint
	@yarn lint

lint-ci: prepare-ci ## Run Lint and generate report file
	- yarn lint:ci
	- sed -e 's#$(PWD)#$(WORKSPACE)#g' -i $(REPORTS_DIR)/checkstyle.xml

unit-tests: ## Run unit tests and generate report file
	@yarn test

unit-tests-ci: prepare-ci ## Run unit tests and generate report file
	@yarn test:ci

graphql-codegen: ## Generate Operation Apollo GraphQL
	@yarn graphql:codegen

.PHONY: install

.DEFAULT_GOAL := help
help:
	@grep -E '(^[0-9a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-25s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'
.PHONY: help
