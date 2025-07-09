# Movie Database API - Bruno Collection

This Bruno collection contains all API endpoints for the Movie Database backend.

### 1. Download Bruno

- Go to [https://usebruno.com](https://usebruno.com)
- Download for your OS (Windows/Mac/Linux)
- Install (no account needed)

### 2. Import This Collection

- Open Bruno
- Click "Import Collection" or File → Import Collection
- Select this folder: `/tools/bruno-api/`
- Collection loads with all endpoints

### 3. Start Testing

- **Start the backend**: `docker compose up` from project root
- **Select environment**: Choose "Docker" from dropdown
- **Click any request**: All endpoints are pre-configured and ready to test

### 4. What You'll See

- **Movies folder**: All movie endpoints (CRUD, search, relationships)
- **Actors folder**: All actor endpoints (CRUD, search, relationships)
- **Ratings folder**: All rating endpoints (CRUD, relationships)
- **Auth folder**: Authentication examples
- **Environments**: Docker and Local configurations

## No Bruno? No Problem!

**Alternative 1: Use curl commands** (copy from DEMO-SETUP.md)
**Alternative 2: Use browser** for GET endpoints:

- http://localhost:4000/movies
- http://localhost:4000/actors
- http://localhost:4000/movies/search?q=pulp

## Getting Started (Detailed)

## Environment Variables

- `baseUrl`: http://localhost:4000 (backend server)
- `apiToken`: movie-api-secret-2024 (for authenticated requests)

## Authentication

Protected endpoints (Create, Update, Delete) require Bearer token authentication:

```
Authorization: Bearer movie-api-secret-2024
```

## API Endpoints Overview

### Movies (`/movies`)

- **GET** `/movies` - List all movies
- **GET** `/movies?q={query}` - Search movies by title
- **GET** `/movies/by-actor/{actorId}` - Movies by actor
- **GET** `/movies/{id}` - Movie details
- **POST** `/movies` - Create movie (auth required)
- **PATCH** `/movies/{id}` - Update movie (auth required)
- **DELETE** `/movies/{id}` - Delete movie (auth required)

### Actors (`/actors`)

- **GET** `/actors` - List all actors
- **GET** `/actors?q={query}` - Search actors by name
- **GET** `/actors/by-movie/{movieId}` - Actors in movie
- **GET** `/actors/{id}` - Actor details
- **POST** `/actors` - Create actor (auth required)
- **PATCH** `/actors/{id}` - Update actor (auth required)
- **DELETE** `/actors/{id}` - Delete actor (auth required)

### Ratings (`/ratings`)

- **GET** `/ratings` - List all ratings
- **GET** `/ratings/by-movie/{movieId}` - Ratings for movie
- **GET** `/ratings/{id}` - Rating details
- **POST** `/ratings` - Create rating (auth required)
- **DELETE** `/ratings/{id}` - Delete rating (auth required)

## Testing Workflow

1. **Setup**: Start backend server and seed database
2. **Read Operations**: Test all GET endpoints first (no auth needed)
3. **Get IDs**: Note down movie/actor/rating IDs from responses
4. **Update Variables**: Replace placeholder IDs in Bruno requests
5. **Write Operations**: Test POST/PATCH/DELETE with authentication
6. **Search**: Test search functionality with various queries
7. **Relationships**: Test cross-entity endpoints

## Sample Test Data

The seeded database includes:

- **Movies**: "Pulp Fiction", "La La Land", "The Wolf of Wall Street"
- **Actors**: John Travolta, Samuel L. Jackson, Emma Stone, Ryan Gosling, Leonardo DiCaprio, Margot Robbie, Jonah Hill
- **Ratings**: Various ratings for each movie

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing/invalid token)
- `404` - Not Found
- `500` - Internal Server Error
