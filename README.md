# E-commerce Backend Boilerplate

Production-oriented NestJS backend based on `niraj-khatiwada/ultimate-nestjs-boilerplate`, adapted to use RESTful API instead of GraphQL.

Source template: https://github.com/niraj-khatiwada/ultimate-nestjs-boilerplate

## Current Stack

- NestJS 10 with Fastify
- RESTful API with Swagger and URI API versioning
- WebSocket with Socket.io and Redis adapter
- PostgreSQL with TypeORM
- Better Auth for authentication
- Redis for cache, queue, rate limit, sessions, and WebSocket scaling
- BullMQ and Bull Board for background jobs
- Worker server for queue processing
- React Email templates with Nodemailer
- MailPit for local email testing
- Pino logging
- Redis-backed rate limiting
- Graceful shutdown
- Prometheus and Grafana monitoring
- Sentry error tracking
- Offset and cursor pagination utilities
- Local and AWS S3 file upload support
- Internationalization with `nestjs-i18n`
- Jest unit and e2e testing
- pnpm package manager
- Docker dev/prod setup
- GitHub Actions CI
- Husky, lint-staged, and Commitlint
- Dependency graph and ERD generation scripts

## Key Difference From The Source Boilerplate

The source boilerplate supports REST, GraphQL, and WebSocket APIs.

This project intentionally removes GraphQL/Apollo and keeps:

- RESTful API
- Swagger/OpenAPI documentation
- WebSocket support

There should be no GraphQL/Apollo dependency or source reference in this codebase.

## Source Layout

The `src` folder follows the source boilerplate organization:

```text
src/api
src/auth
src/common
src/config
src/constants
src/database
src/decorators
src/i18n
src/interceptors
src/middlewares
src/services
src/shared
src/tools
src/utils
src/worker
src/main.ts
src/app.module.ts
```

API features live under `src/api`.

Auth lives separately under `src/auth`.

Shared infrastructure such as cache, mail, and socket lives under `src/shared`.

Background queue processing lives under `src/worker`.

## Development

Create environment files:

```bash
cp ./.env.example ./.env
cp ./.env.docker.example ./.env.docker
```

Start development services:

```bash
pnpm docker:dev:up
```

Run database migrations:

```bash
pnpm migration:up
```

Start the API:

```bash
pnpm start:dev
```

## Common Scripts

```bash
pnpm build
pnpm lint
pnpm test
pnpm test:e2e
pnpm format
pnpm migration:up
pnpm migration:down
pnpm migration:generate
pnpm seed:run
pnpm docker:dev:up
pnpm docker:dev:down
pnpm docker:prod:up
pnpm docker:prod:down
pnpm graph:app
pnpm graph:circular
pnpm erd:generate
```

## API Documentation

Swagger documentation is available in non-production environments.

Default path:

```text
/api-docs
```

Better Auth API reference is available at:

```text
/api/auth/reference
```

Protected internal tools such as Swagger, Better Auth reference, and Bull Board use basic auth middleware.

## Authentication

Authentication is handled by Better Auth.

Supported flows include:

- Email/password
- OAuth
- Magic link
- Passkeys
- Two-factor authentication
- Session management
- Role-based auth patterns

Auth entities are located in `src/auth/entities`.

## Database

The project uses PostgreSQL and TypeORM.

Database code is organized under:

```text
src/database
src/auth/entities
```

Migrations are in:

```text
src/database/migrations
```

Seeds are in:

```text
src/database/seeds
```

## Queues

BullMQ is used for background jobs.

Queue code is organized under:

```text
src/worker
```

The current queue setup includes email job processing.

## Email

React Email templates live under:

```text
src/shared/mail/templates
```

Mail sending is handled by Nodemailer through the shared mail module.

MailPit is available through Docker for local SMTP testing.

## Monitoring

Prometheus and Grafana are available through Docker Compose profiles.

Enable monitoring with:

```env
COMPOSE_PROFILES=monitoring
```

## Verification

The current setup has been verified with:

```bash
pnpm build
pnpm lint
pnpm test --runInBand
pnpm test:e2e --runInBand
pnpm exec prettier --check .
```
