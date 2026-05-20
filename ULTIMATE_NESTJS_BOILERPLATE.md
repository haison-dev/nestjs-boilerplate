# Ultimate NestJS Boilerplate Notes

This project is based on `niraj-khatiwada/ultimate-nestjs-boilerplate`.

Source: https://github.com/niraj-khatiwada/ultimate-nestjs-boilerplate

## Adaptation Decision

The original boilerplate supports:

- REST API
- GraphQL API with Apollo
- WebSocket API

This project keeps the boilerplate structure and infrastructure but removes GraphQL/Apollo.

The active API stack is:

- RESTful API
- Swagger/OpenAPI
- URI API versioning
- WebSocket with Socket.io

## Current Stack

- NestJS 10
- Fastify
- PostgreSQL
- TypeORM
- Better Auth
- Swagger/OpenAPI
- Socket.io
- Redis
- BullMQ
- Bull Board
- React Email
- Nodemailer
- MailPit
- Pino
- Redis-backed throttling
- Graceful shutdown
- Prometheus
- Grafana
- Sentry
- Jest
- `nestjs-i18n`
- pnpm
- Docker
- GitHub Actions
- Husky
- Commitlint
- lint-staged
- Madge dependency graph
- TypeORM ERD generation

## Source Organization

The codebase follows the source boilerplate folder style:

```text
src/api
src/auth
src/common
src/config
src/constants
src/database
src/decorators
src/generated
src/i18n
src/interceptors
src/middlewares
src/services
src/shared
src/tools
src/utils
src/worker
```

Important folders:

- `src/api`: REST API modules such as health, user, file.
- `src/auth`: Better Auth integration and auth entities.
- `src/config`: typed configuration modules.
- `src/database`: TypeORM data source, migrations, seeds, base models.
- `src/shared`: cache, mail, socket infrastructure.
- `src/worker`: BullMQ workers and processors.
- `src/tools`: Swagger, logger, Grafana assets.

## Removed From Source Boilerplate

GraphQL-specific parts were removed:

- Apollo driver
- Nest GraphQL module
- GraphQL factory
- User resolver
- GraphQL schema files
- Generated GraphQL schema output

REST controllers remain the API surface.

## RESTful API

REST API is the main API style.

The project uses:

- Controllers under `src/api`
- Swagger decorators
- API versioning
- DTO-based validation and serialization
- OpenAPI generation support

Swagger is available in non-production environments.

## Better Auth

Better Auth handles authentication flows such as:

- Email/password
- OAuth
- Magic link
- Passkeys
- Two-factor authentication
- Session management

Auth-related entities are kept in `src/auth/entities`, matching the original boilerplate.

## Infrastructure

The project keeps the original boilerplate infrastructure direction:

- Redis for cache, sessions, queues, throttling, and socket scaling.
- BullMQ for async jobs.
- Bull Board for queue inspection.
- React Email and MailPit for email workflows.
- Prometheus and Grafana for monitoring.
- Sentry for error tracking.
- Docker Compose for dev/prod services.
- GitHub Actions for CI.
- Husky, lint-staged, and Commitlint for local Git workflow.

## Verification Commands

Use these commands to verify the current setup:

```bash
pnpm build
pnpm lint
pnpm test --runInBand
pnpm test:e2e --runInBand
pnpm exec prettier --check .
```

## Current Principle

Keep the source as close as practical to `ultimate-nestjs-boilerplate`, with one intentional architectural change:

```text
GraphQL/Apollo removed, RESTful API kept.
```
