# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy root package.json and package-lock.json
COPY package*.json ./

# Copy backend package.json
COPY apps/backend/package*.json ./apps/backend/

# Install dependencies
RUN npm install

# Copy the rest of the monorepo source code
COPY . .

# Build shared packages
RUN cd packages/shared-types && npm run build

# Generate Prisma client
RUN cd apps/backend && npx prisma generate

# Build the backend application
RUN npx turbo run build --filter=backend

# Stage 2: Create the production image
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy dependencies from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/apps/backend/node_modules ./apps/backend/node_modules

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /usr/src/app/apps/backend/package*.json ./apps/backend/
COPY --from=builder /usr/src/app/apps/backend/prisma ./apps/backend/prisma
COPY --from=builder /usr/src/app/packages ./packages

# Copy the entrypoint script
COPY apps/backend/entrypoint.sh ./apps/backend/
RUN chmod +x ./apps/backend/entrypoint.sh

# Change working directory to backend
WORKDIR /usr/src/app/apps/backend

# Expose the port the app runs on
EXPOSE 4000

# Use the entrypoint script
ENTRYPOINT ["./entrypoint.sh"]