# NodeJS Express Starter

A modern and scalable REST API starter template built with Node.js, Express 5, and TypeScript.

Designed to help developers bootstrap backend projects faster with a clean architecture, structured logging, middleware support, and production-ready tooling already configured.

---

## Features

- ⚡ Express.js 5
- 🟦 Full TypeScript support
- 📦 PNPM package manager support
- 🧹 ESLint-ready architecture
- 🎨 Colored console output using Colorette
- 📜 Structured logging with Pino and Error Handler
- 🪵 Automatic log rotation support
- 🍪 Cookie parser integration
- 🌐 CORS support
- ⏱️ Request response-time tracking
- 🔐 Environment variables with dotenv
- 🧩 Modular and scalable architecture
- 🚀 Ready for production environments

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express 5 | Web framework |
| TypeScript | Static typing |
| Pino | Logging |
| PNPM | Package manager |
| dotenv | Environment configuration |
| cors | Cross-origin requests |
| cookie-parser | Cookie handling |

---

## Project Structure

```bash
.
├── .logs/                  # Application logs
├── dist/                   # Production build output
├── src/
│   ├── config/             # App configs and SDK initialization
│   ├── controllers/        # Request handlers/controllers
│   ├── exception/          # Custom exceptions and error handlers
│   ├── middlewares/        # Express middlewares
│   ├── models/             # Database layer and data access
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── types/              # Shared TypeScript types
│   └── index.ts            # Application entry point
│
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/nodejs-express-starter.git
```

Install dependencies:

```bash
pnpm install
```

---

## Available Scripts

### Start Development Server

```bash
pnpm run dev
```

Runs the project in watch mode using Node.js experimental TypeScript execution.

---

### Build Project

```bash
pnpm run build
```

Compiles the TypeScript source code into the `dist/` directory.

---

### Start Production Server

```bash
pnpm run start
```

Runs the compiled production build.

---

## Logging System

This starter uses `pino` and `pino-http` for high-performance structured logging.

Logs are automatically categorized and stored inside:

```bash
.logs/
```

Supported log levels:
- info
- warn
- error

Log rotation is supported through `rotating-file-stream`.

---

## Environment Variables

Create a `.env` file in the root directory.

Example:

```env
PORT=3000
NODE_ENV=development
```

---

## Philosophy

This repository was created to avoid repeating the same Express + TypeScript setup process across multiple projects.

The objective is to provide a reusable and production-ready foundation so developers can focus on building features instead of configuring boilerplate every time.

If you're completely new to Express or TypeScript, it is strongly recommended to first build a project from scratch to understand the ecosystem and architecture concepts before using starter templates.

---

## Recommended Improvements

These are some improvements you can add later to make the starter even more professional:

- ESLint configuration
- Prettier integration
- Husky + lint-staged
- Swagger/OpenAPI documentation
- Docker support
- Unit testing with Vitest or Jest
- GitHub Actions CI/CD
- Prisma or Drizzle ORM support
- Rate limiting
- Helmet security middleware
- Request validation with Zod

---

## License

ISC License.

Free to use for personal and commercial projects.