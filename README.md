# Liminal Backend

Backend API for **Liminal**, built with [NestJS](https://nestjs.com/) and [Prisma](https://www.prisma.io/) (SQLite). It exposes authentication, user, survival-class, report and image (Cloudinary) features through a REST API organized following a hexagonal (ports & adapters) architecture.

## Tech stack

- [NestJS](https://nestjs.com/) 12
- [Prisma ORM](https://www.prisma.io/) 7 with `better-sqlite3` adapter (SQLite database)
- [JWT](https://github.com/nestjs/jwt) authentication
- [Cloudinary](https://cloudinary.com/) for image storage
- [Jest](https://jestjs.io/) for testing

## Project structure

The domain is split by feature module, each following a hexagonal architecture (`application` / `domain` / `infraestructure`):

```
src/
├── auth/            # Authentication (login, JWT, current user decorator)
├── user/            # User management
├── level-class/     # Survival class levels
├── report/          # Reports (ratings, evidence, likes)
├── image/           # Image domain
├── cloudinary/      # Cloudinary integration
└── prisma/          # Prisma service/module
```

## Prerequisites

- Node.js (LTS recommended)
- npm
- A [Cloudinary](https://cloudinary.com/console) account (for image upload features)

## Environment variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable                | Description                                          |
| ----------------------- | ----------------------------------------------------- |
| `DATABASE_URL`           | Prisma connection string. Defaults to a local SQLite file: `file:./dev.db` |
| `JWT_SECRET`             | Secret used to sign and verify JWT auth tokens         |
| `CLOUDINARY_CLOUD_NAME`  | Cloudinary cloud name                                  |
| `CLOUDINARY_API_KEY`     | Cloudinary API key                                     |
| `CLOUDINARY_API_SECRET`  | Cloudinary API secret                                  |
| `PORT`                   | (optional) Port the server listens on. Defaults to `3000` |

## Project setup

```bash
npm install
```

### Database

Run Prisma migrations to create/update the local SQLite database:

```bash
npx prisma migrate dev
```

Generate the Prisma client (also runs automatically after `migrate dev`):

```bash
npx prisma generate
```

Open Prisma Studio to inspect the database:

```bash
npm run studio
```

## Compile and run the project

```bash
# development
npm run start

# watch mode
npm run start:dev

# debug mode
npm run start:debug

# production mode
npm run start:prod
```

## Lint & format

```bash
npm run lint
npm run lint:fix
npm run format
```

## Run tests

```bash
# unit tests
npm run test

# watch mode
npm run test:watch

# test coverage
npm run test:cov

# e2e tests
npm run test:e2e
```

## License

UNLICENSED
