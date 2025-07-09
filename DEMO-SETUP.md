# 🎬 Movie Database Demo - Quick Setup

This is a full-stack movie database application built with NestJS, Next.js, and Prisma.

### 🚀 Quick Start

```bash
git clone <repository-url>
cd moviedb-demo-clean
docker compose up
```

**That's it!** The application will be running at:

- **Backend API**: http://localhost:4000
- **Database**: PostgreSQL on localhost:5438

**To run the frontend:**

```bash
cd apps/frontend
npm install
npm run dev
```

The frontend will be available at: http://localhost:3000

### 🎯 Key Features Implemented

✅ **CRUD Operations** - Movies, Actors, Ratings
✅ **Search Functionality** - Search movies/actors by name
✅ **Relationships** - Movies↔Actors, Movies↔Ratings
✅ **API Security** - Token-based auth for CUD operations
✅ **Error Handling** - Proper HTTP status codes
✅ **Data Validation** - Zod schemas
✅ **Unit Tests** - Backend test coverage
✅ **SOLID Principles** - Clean architecture with use cases

### 🔧 API Documentation

#### Option 1: Interactive Testing with Bruno (Recommended)

**Bruno** is a modern API testing tool (like Postman). To use the complete API collection:

1. **Download Bruno**: Go to [https://usebruno.com](https://usebruno.com) and download for your OS
2. **Import Collection**: Open Bruno → File → Import Collection → Select `/tools/bruno-api/` folder
3. **Select Environment**: Choose "Docker" or "Local" environment from dropdown
4. **Test APIs**: Click any request to run it (all endpoints are pre-configured)

**The Bruno collection includes:**

- ✅ All 21 API endpoints pre-configured
- ✅ Authentication automatically handled
- ✅ Sample data in requests
- ✅ Environment switching (Docker/Local)
- ✅ Request documentation

#### Option 2: Quick Testing with curl (Copy/Paste Ready)

**No installation needed - just copy/paste these commands:**

**Get all movies:**

```bash
curl http://localhost:4000/movies
```

**Search movies:**

```bash
curl "http://localhost:4000/movies/search?q=pulp"
```

**Search actors:**

```bash
curl "http://localhost:4000/actors/search?q=john"
```

**Create movie (requires API secret):**

```bash
curl -X POST http://localhost:4000/movies \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer movie-api-secret-2024" \
  -d '{"title": "New Movie", "year": 2024, "description": "A great movie"}'
```

**View actor's movies:**

```bash
curl "http://localhost:4000/movies/by-actor/{id}"
```

**View movie's actors:**

```bash
curl "http://localhost:4000/actors/by-movie/{id}"
```

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

**Authentication:** Bearer token `movie-api-secret-2024` for Create/Update/Delete operations

#### Option 3: Alternative API Testing Tools

**If you prefer other tools:**

**Postman:** Import the Bruno collection as JSON (Bruno can export to Postman format)

**VS Code REST Client:** Use `/tools/api-examples.http` with the REST Client extension

**Insomnia:** Similar to Bruno, can import the collection

**Browser:** GET endpoints work directly in browser:

- http://localhost:4000/movies
- http://localhost:4000/actors
- http://localhost:4000/movies/search?q=pulp

### 📁 Architecture

```
apps/
├── backend/          # NestJS API (SOLID principles)
│   ├── src/
│   │   ├── movies/   # Movie domain
│   │   ├── actors/   # Actor domain
│   │   ├── ratings/  # Rating domain
│   │   └── auth/     # Authentication
│   └── prisma/       # Database schema
└── frontend/         # Next.js UI (if implemented)
```

### 🧪 Testing

```bash
# Run all tests
npm test

# Run backend tests with coverage
cd apps/backend && npm run test:cov
```

### 🔧 Technologies Used

- **Backend**: NestJS, Prisma, PostgreSQL, TypeScript
- **Frontend**: Next.js, TailwindCSS, React Query
- **Testing**: Jest, Supertest
- **DevOps**: Docker, GitLab CI/CD
- **Code Quality**: ESLint, Prettier, Husky

### 📋 Challenge Requirements Met

✅ NestJS + TypeScript backend
✅ CRUD operations for Movies, Actors, Ratings
✅ Search functionality
✅ Entity relationships
✅ API security with tokens
✅ Proper validation & error handling
✅ Docker support
✅ Unit tests
✅ GitLab CI/CD pipeline
✅ SOLID principles
✅ Cross-platform compatibility

---

**Total setup time: ~30 seconds**
**Sample data**: Pre-seeded with movies, actors, and ratings
**API Collection**: Available in `/tools/bruno-api/`
