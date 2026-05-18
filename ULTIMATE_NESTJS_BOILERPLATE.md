# Ultimate NestJS Boilerplate

Advanced NestJS boilerplate for building scalable, production-ready backend applications.

Source: https://github.com/niraj-khatiwada/ultimate-nestjs-boilerplate

## Overview

Ultimate NestJS Boilerplate is a full-featured backend starter kit built around NestJS. It is designed for teams that want to start a serious product with many production concerns already prepared, including authentication, database migrations, queues, caching, monitoring, Docker, logging, testing, and CI.

This boilerplate is not just a simple NestJS starter. It is closer to a production backend foundation for SaaS, e-commerce, marketplace, CRM, internal tools, and other applications that need to grow over time.

## Core Stack

- NestJS with Fastify
- PostgreSQL with TypeORM
- Better Auth for authentication
- RESTful API with Swagger documentation and API versioning
- WebSocket API with Socket.io
- Redis for caching, rate limiting, queues, and WebSocket scaling
- BullMQ for background jobs
- Pino for logging
- Prometheus and Grafana for monitoring
- Sentry for error tracking
- Jest for testing
- pnpm as package manager
- Docker for development and production
- GitHub Actions for CI
- Husky and Commitlint for Git workflow

## Main Features

### Fastify Runtime

The boilerplate uses Fastify instead of Express through `@nestjs/platform-fastify`.

Fastify is usually faster and more lightweight than Express, which makes it a good choice for high-throughput APIs. Because of this choice, plugins such as cookies, static files, multipart upload, and file handling need Fastify-compatible packages.

### PostgreSQL and TypeORM

PostgreSQL is used as the main relational database, and TypeORM is used as the ORM layer.

The boilerplate includes migration and seed scripts:

```bash
pnpm migration:up
pnpm migration:down
pnpm migration:generate
pnpm seed:run
```

This means database changes should be handled through migrations instead of automatic schema synchronization in production.

### Better Auth

Authentication is handled by Better Auth instead of a custom JWT-only implementation.

Supported authentication flows include:

- Email and password
- OAuth
- Magic link
- Passkeys
- Two-factor authentication
- Role-based authentication and authorization
- Session management

This is useful because authentication is difficult to maintain securely when implemented from scratch. Better Auth reduces the amount of custom security-sensitive code the project needs to own.

### RESTful API

This project should use RESTful API as the main API style instead of GraphQL.

RESTful API is a good fit for e-commerce because most features map naturally to resources such as users, products, categories, carts, orders, payments, and reviews.

Example API structure:

```http
GET    /api/v1/products
GET    /api/v1/products/:id
POST   /api/v1/products
PATCH  /api/v1/products/:id
DELETE /api/v1/products/:id

GET    /api/v1/categories
POST   /api/v1/categories

POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout

GET    /api/v1/cart
POST   /api/v1/cart/items
PATCH  /api/v1/cart/items/:id
DELETE /api/v1/cart/items/:id

POST   /api/v1/orders
GET    /api/v1/orders
GET    /api/v1/orders/:id
```

The RESTful API should include Swagger documentation and API versioning.

Swagger is useful for:

- Inspecting available endpoints
- Testing requests during development
- Sharing API contracts with frontend developers
- Generating frontend API clients from OpenAPI specs

### WebSocket API

WebSocket support is implemented with Socket.io.

The Socket.io Redis adapter is included so WebSocket events can work across multiple backend instances. This is important when the application is scaled horizontally with multiple containers or servers.

Example use cases:

- Realtime notifications
- Live order status updates
- Chat
- Admin dashboard events
- Realtime inventory updates

### Redis

Redis is used in multiple infrastructure layers:

- Cache storage
- Rate limiter storage
- BullMQ queue backend
- Socket.io adapter for horizontal scaling

Redis becomes especially important when the backend runs with more than one instance.

### BullMQ Queues

BullMQ is used for background jobs.

Background jobs are useful for work that should not block the HTTP request cycle, such as:

- Sending emails
- Processing uploaded files
- Generating invoices
- Retrying failed payment callbacks
- Syncing external services
- Sending notifications

The boilerplate also includes Bull Board UI to inspect and debug queue jobs.

### Email Management

The boilerplate uses React Email for managing email templates.

In development, email templates can be previewed through a local UI. During build, templates are converted into static output that can be used by the backend mail service.

MailPit is used as a local SMTP testing server. This allows developers to test email flows locally without sending real emails.

### File Uploads

The boilerplate supports local and remote file uploads.

Remote storage can use AWS S3, which is useful for production environments where files should not be stored directly on the application server.

### Logging

Pino is used for logging.

Structured logging is better for production systems because logs can be searched, filtered, and aggregated more easily in log management tools.

### Rate Limiting

Rate limiting is backed by Redis.

This helps protect APIs from abuse and works correctly across multiple backend instances because request counters are stored in Redis instead of local memory.

### Graceful Shutdown

The boilerplate includes graceful shutdown handling.

This allows the server to close existing connections and finish ongoing work before the process exits. It is important for Docker, Kubernetes, and production deployments.

### Monitoring

Prometheus and Grafana are included for server and database monitoring.

Monitoring is optional and can be enabled through Docker Compose profiles.

Example:

```env
COMPOSE_PROFILES=monitoring
```

Prometheus collects metrics, and Grafana displays dashboards.

### Sentry

Sentry is included for production error tracking.

It helps capture exceptions, stack traces, and runtime errors that happen after deployment.

### Internationalization

The boilerplate includes i18n support, making it easier to build APIs that return localized messages.

This is useful for applications that support multiple languages.

### Testing

Jest is used for testing.

Testing support includes:

- Unit tests
- Integration tests
- End-to-end tests

### Docker

The boilerplate includes Docker support for both development and production.

Common commands:

```bash
pnpm docker:dev:up
pnpm docker:dev:down
pnpm docker:prod:up
pnpm docker:prod:down
```

Typical development setup:

```bash
cp ./.env.example ./.env
cp ./.env.docker.example ./.env.docker
pnpm docker:dev:up
```

After starting containers, migrations should be run:

```bash
docker exec -it nestjs-boilerplate-server sh
pnpm migration:up
```

### Git Workflow

The boilerplate includes Husky and Commitlint.

This helps enforce consistent commit messages and run checks before commits.

### Dependency Graph

The boilerplate includes scripts for visualizing module dependencies and detecting circular dependencies.

```bash
pnpm graph:app
pnpm graph:circular
```

Graphviz must be installed for graph image generation.

### Entity Relationship Diagram

The boilerplate can generate an ERD from database entities.

```bash
pnpm erd:generate
```

This is useful for understanding and documenting database relationships.

## Common Scripts

```bash
pnpm start:dev
pnpm build
pnpm test
pnpm lint
pnpm migration:up
pnpm migration:down
pnpm migration:generate
pnpm seed:run
pnpm docker:dev:up
pnpm docker:dev:down
pnpm graph:app
pnpm graph:circular
pnpm erd:generate
```

## When This Boilerplate Is a Good Fit

This boilerplate is a good fit when the project needs:

- Authentication beyond simple JWT login
- PostgreSQL with migrations
- Background jobs
- Realtime features
- Redis-backed cache and rate limiting
- Docker-based development
- Production logging and monitoring
- A backend architecture that can scale over time

Good project examples:

- E-commerce backend
- SaaS platform
- Marketplace
- CRM
- Booking platform
- Internal admin system
- Realtime dashboard

## When It May Be Too Heavy

This boilerplate may be too heavy for:

- Small learning projects
- Simple CRUD APIs
- MVPs that only need basic login and database access
- Teams that are not ready to maintain Docker, Redis, queues, monitoring, and realtime infrastructure

Using every feature from the beginning can increase complexity. For smaller projects, it is better to adopt only the parts that are actually needed.

## Recommended Adoption for This E-commerce Project

For the current e-commerce backend, do not copy the entire boilerplate at once. A safer approach is to adopt it in layers.

Recommended order:

1. Define core modules: users, auth, products, categories, cart, orders, payments.
2. Add PostgreSQL and TypeORM.
3. Add configuration and environment validation.
4. Add authentication.
5. Add Swagger documentation.
6. Add Redis only when cache, rate limit, queue, or WebSocket scaling is needed.
7. Add BullMQ when there are real background jobs.
8. Add Docker once the database and Redis services are required locally.
9. Add monitoring when preparing for staging or production.

## Practical E-commerce Mapping

Useful boilerplate features for e-commerce:

- Better Auth for customer and admin authentication
- PostgreSQL and TypeORM for products, users, carts, orders, and payments
- BullMQ for order emails, invoice generation, and payment retries
- Redis cache for product catalog and session-related data
- Redis rate limiting for login, checkout, and public APIs
- WebSocket for realtime order status and admin notifications
- S3 upload support for product images
- Swagger for frontend API integration
- Sentry for production error tracking
- Prometheus and Grafana for monitoring traffic, latency, and database health

## Key Takeaway

Ultimate NestJS Boilerplate is a strong production-oriented backend foundation. It provides many tools that a real product usually needs later, but it also introduces significant complexity.

For this project, the best strategy is to study its architecture and reuse the useful pieces step by step instead of replacing the current codebase with the full boilerplate immediately.
