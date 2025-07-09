# Movie Database Application

A full-stack movie database application built with Next.js, NestJS, and Prisma.

<img src="./images/ui.png" alt="Screenshot of the Movie Database App" width="500">

**Below:** Full development documentation

---

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Git
- Docker Compose

---

## Quick Start

### One-Command Setup (Quickest)

```bash
git clone <repository-url>
cd moviedb-demo-clean

# Copy environment file
cp apps/backend/.env.example apps/backend/.env

# Run everything in one command
npm run setup
```

**Note:** If `npm run setup` fails, please continue with the Docker setup or manual setup.

### Docker Setup (Most Reliable)

```bash
git clone <repository-url>
cd moviedb-demo-clean

npm install

# Then continue with docker backend/db setup for ease
# Docker Compose v2 (newer)
docker compose up

# OR Docker Compose v1 (older)
docker-compose up

# Start the frontend
npm run dev --workspace=frontend
```

This will automatically:

- Start PostgreSQL database
- Build and run the backend API
- Apply database migrations
- Seed the database with sample movies, actors, and ratings
- Start the application

**Access the application:**

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:4000](http://localhost:4000)
- **Database:** `localhost:5438`

**No additional setup required!** The Docker setup includes all environment variables and handles everything automatically.

> **Note:** To check which Docker Compose version you have, run `docker compose version` or `docker-compose version`. Use the command that works for your system.

---

## Manual Setup

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

   **Backend `.env` file (`apps/backend/.env`):**

   ```env
   # Copy from apps/backend/.env.example
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/moviedb?schema=public"
   JWT_SECRET="your-secret-key-here"
   API_SECRET="movie-api-secret-2024"
   PORT=4000
   NODE_ENV=development
   ```

4. **Set up database with sample data**

   ```bash
   npm run db:setup
   ```

   **OR**

   ```bash
   cd apps/backend
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

   This command will:
   - Create database tables from your schema
   - Seed the database with sample movies, actors, and ratings

5. **Start the development servers**

   ```bash
   npm run dev
   ```

   This command starts both the backend API and frontend development servers.

   **Access the application:**
   - **Frontend:** [http://localhost:3000](http://localhost:3000)
   - **Backend API:** [http://localhost:4000](http://localhost:4000)

---

## Project Structure

```
moviedb-demo-clean/
├── apps/
│   ├── backend/       # NestJS API
│   └── frontend/      # Next.js application
├── packages/
│   ├── shared-types/  # Shared TypeScript types
│   └── ui/            # Shared UI components
├── tools/
│   ├── bruno-api/     # API testing collection
│   └── scripts/       # Build & deployment scripts
└── package.json       # Root package.json with scripts
```

---

## Frontend

The frontend is built with Next.js 14+ App Router:

- **Features:** Server Components, Server Actions
- **Styling:** Tailwind CSS
- **UI Components:** Shared component library

---

### Database Connection Issues

- Ensure PostgreSQL is running
- Check `DATABASE_URL` in `apps/backend/.env`
- Verify database exists: `createdb moviedb`

### Port Conflicts

- Backend runs on port 4000
- Frontend runs on port 3000
- Update ports in respective `.env` files if needed
- Docker ports the host 5438 to 5432 to avoid conflicts

### Fresh Start

If you encounter issues, try a fresh database setup:

```bash
# From apps/backend directory
cd apps/backend
npx prisma migrate reset --force
```

---

## 🔧 API Documentation

### Option 1: Interactive Testing with Bruno (Recommended)

<img src="./images/bruno-homepage.webp" alt="Bruno Homepage" width="300">

**Bruno** is a modern API testing tool (like Postman). To use the complete API collection:

1. **Download Bruno:** Go to [https://usebruno.com](https://usebruno.com) and download for your OS.
2. **Import Collection:** Open Bruno → File → Import Collection → Select `/tools/bruno-api/` folder.
3. **Select Environment:** Choose "Docker" or "Local" environment from dropdown.
4. **Test APIs:** Click any request to run it (all endpoints are pre-configured).

**The Bruno collection includes:**

- ✅ All 21 API endpoints pre-configured
- ✅ Authentication automatically handled
- ✅ Sample data in requests
- ✅ Environment switching (Docker/Local)
- ✅ Request documentation

---

### Option 2: Quick Testing with curl (Copy/Paste Ready)

**No installation needed – just copy/paste these commands:**

- **Get all movies:**

  ```bash
  curl http://localhost:4000/movies
  ```

- **Search movies:**

  ```bash
  curl "http://localhost:4000/movies/search?q=pulp"
  ```

- **Search actors:**

  ```bash
  curl "http://localhost:4000/actors/search?q=john"
  ```

- **Create movie (requires API secret):**

  ```bash
  curl -X POST http://localhost:4000/movies \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer movie-api-secret-2024" \
    -d '{"title": "New Movie", "year": 2024, "description": "A great movie"}'
  ```

- **View actor's movies:**

  ```bash
  curl "http://localhost:4000/movies/by-actor/{id}"
  ```

- **View movie's actors:**
  ```bash
  curl "http://localhost:4000/actors/by-movie/{id}"
  ```

---

### 📋 API Endpoints Summary

| Endpoint                   | Method | Description       | Auth |
| -------------------------- | ------ | ----------------- | ---- |
| `/movies`                  | GET    | List all movies   | No   |
| `/movies/search?q={query}` | GET    | Search movies     | No   |
| `/movies/by-actor/{id}`    | GET    | Movies by actor   | No   |
| `/movies/{id}`             | GET    | Movie details     | No   |
| `/movies`                  | POST   | Create movie      | Yes  |
| `/movies/{id}`             | PATCH  | Update movie      | Yes  |
| `/movies/{id}`             | DELETE | Delete movie      | Yes  |
| `/actors`                  | GET    | List all actors   | No   |
| `/actors/search?q={query}` | GET    | Search actors     | No   |
| `/actors/by-movie/{id}`    | GET    | Actors in movie   | No   |
| `/actors/{id}`             | GET    | Actor details     | No   |
| `/actors`                  | POST   | Create actor      | Yes  |
| `/actors/{id}`             | PATCH  | Update actor      | Yes  |
| `/actors/{id}`             | DELETE | Delete actor      | Yes  |
| `/ratings`                 | GET    | List all ratings  | No   |
| `/ratings/by-movie/{id}`   | GET    | Ratings for movie | No   |
| `/ratings/{id}`            | GET    | Rating details    | No   |
| `/ratings`                 | POST   | Create rating     | Yes  |
| `/ratings/{id}`            | DELETE | Delete rating     | Yes  |

**Authentication:** Bearer token `movie-api-secret-2024` for Create/Update/Delete operations.

---

### Option 3: Alternative API Testing Tools

- **Postman:** Import the Bruno collection as JSON (Bruno can export to Postman format)
- **VS Code REST Client:** Use `/tools/api-examples.http` with the REST Client extension
- **Insomnia:** Similar to Bruno, can import the collection
- **Browser:** GET endpoints work directly in browser:
  - [http://localhost:4000/movies](http://localhost:4000/movies)
  - [http://localhost:4000/actors](http://localhost:4000/actors)
  - [http://localhost:4000/movies/search?q=pulp](http://localhost:4000/movies/search?q=pulp)

---

## Tech Stack

- **Frontend:** Next.js 15+, React, Tailwind CSS
- **Backend:** NestJS, Prisma, PostgreSQL
- **Monorepo:** Turborepo
- **Languages:** TypeScript
- **Package Manager:** npm

---

## CI/CD

This project includes a CI/CD pipeline configured with **GitHub Actions** (`.github/workflows/ci-cd.yml`) to automate testing and deployment processes, ensuring code quality and efficient delivery.

---

## License

MIT
