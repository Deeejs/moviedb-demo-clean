# Movie Database Application

A full-stack movie database application built with Next.js, NestJS, and Prisma.

<img src="./images/ui.png" alt="Screenshot of the Movie Database App" width="500">

**Quick Demo Setup:** See [DEMO-SETUP.md](DEMO-SETUP.md) for quick setup

**Below:** Full development documentation

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Git
- Docker Compose

## Quick Start

### Option 1: Docker (Easiest - Zero Configuration)

**All platforms (Windows, Mac, Linux):**

```bash
git clone <repository-url>
cd moviedb-demo-clean

# Docker Compose v2 (newer)
docker compose up

# OR Docker Compose v1 (older)
docker-compose up
```

This will automatically:

- Start PostgreSQL database
- Build and run the backend API
- Apply database migrations
- Seed the database with sample movies, actors, and ratings
- Start the application

**Access the application:**

- Backend API: http://localhost:4000
- Database: localhost:5438

**To run the frontend (if not included in docker compose):**

```bash
cd apps/frontend
npm install
npm run dev
```

The frontend will be available at: http://localhost:3000

**No additional setup required!** The Docker setup includes all environment variables and handles everything automatically.

> **Note:** To check which Docker Compose version you have, run `docker compose version` or `docker-compose version`. Use the command that works for your system.

### Option 2: Automated Setup Scripts

**macOS/Linux:**

```bash
git clone <repository-url>
cd moviedb-demo-clean
./setup.sh
npm run dev
```

**Windows:**

```bash
git clone <repository-url>
cd moviedb-demo-clean
setup.bat
npm run dev
```

**Both scripts will:**

- Install all dependencies
- Create necessary .env files (root, backend, and frontend)
- Run database migrations
- Seed the database with sample data
- Guide you through any manual configuration needed
- Start both the backend API and frontend development servers.

**Access the application:**

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000

### Option 3: Manual Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd moviedb-demo-clean
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment files**

   Create a PostgreSQL database named `moviedb` and set up environment files:

   **Root `.env` file (`.env`):**

   ```env
   # Copy from .env.example and update database credentials
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/moviedb?schema=public"
   JWT_SECRET="your-secret-key-here"
   API_SECRET="movie-api-secret-2024"
   # ... other variables
   ```

   **Backend `.env` file (`apps/backend/.env`):**

   ```env
   # Copy from apps/backend/.env.example
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/moviedb?schema=public"
   JWT_SECRET="your-secret-key-here"
   API_SECRET="movie-api-secret-2024"
   PORT=4000
   NODE_ENV=development
   ```

   **Frontend `.env.local` file (`apps/frontend/.env.local`):**

   ```env
   # Copy from apps/frontend/.env.local.example
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```

4. **Set up database with migrations and sample data**

   ```bash
   npm run db:setup
   ```

   This command will:
   - Apply all database migrations
   - Seed the database with sample movies, actors, and ratings

5. **Start the development servers**

   ```bash
   npm run dev
   ```

   This command starts both the backend API and frontend development servers.

   **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000

## Project Structure

```
moviedb-demo-clean/
├── apps/
│   ├── backend/     # NestJS API
│   └── frontend/    # Next.js application
├── packages/
│   ├── shared-types/  # Shared TypeScript types
│   └── ui/           # Shared UI components
├── tools/
│   ├── bruno-api/   # API testing collection
│   └── scripts/     # Build & deployment scripts
└── package.json     # Root package.json with scripts
```

### API Documentation

**Complete API Collection:** Import `/tools/bruno-api/` into [Bruno](https://usebruno.com) for interactive testing

**Key Endpoints:**

- **Movies**: CRUD operations, search by title, get by actor
- **Actors**: CRUD operations, search by name, get by movie
- **Ratings**: CRUD operations, get by movie
- **Authentication**: Bearer token required for Create/Update/Delete operations

**Authentication Token:** `movie-api-secret-2024`

See [DEMO-SETUP.md](DEMO-SETUP.md) for complete API examples and endpoint table.

## Frontend

The frontend is built with Next.js 14+ App Router:

- **Features**: Server Components, Server Actions
- **Styling**: Tailwind CSS
- **UI Components**: Shared component library

### Database Connection Issues

- Ensure PostgreSQL is running
- Check DATABASE_URL in `apps/backend/.env`
- Verify database exists: `createdb moviedb`

### Port Conflicts

- Backend runs on port 4000
- Frontend runs on port 3000
- Update ports in respective `.env` files if needed

### Fresh Start

If you encounter issues, try a fresh database setup:

```bash
# From apps/backend directory
cd apps/backend
npx prisma migrate reset --force
```

## Tech Stack

- **Frontend**: Next.js 15+, React, Tailwind CSS
- **Backend**: NestJS, Prisma, PostgreSQL
- **Monorepo**: Turborepo
- **Languages**: TypeScript
- **Package Manager**: npm

## CI/CD

This project includes a CI/CD pipeline configured with **GitHub Actions** (`.github/workflows/ci-cd.yml`) to automate testing and deployment processes, ensuring code quality and efficient delivery.

## License

MIT
