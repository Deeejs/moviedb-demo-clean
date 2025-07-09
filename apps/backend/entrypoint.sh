#!/bin/sh

echo "Waiting for database to be ready..."

# Wait for database to be ready and sync schema
until npx prisma db push --accept-data-loss; do
  echo "Database not ready, waiting..."
  sleep 2
done

echo "Database schema synced successfully!"

# Run the seed
echo "Running database seed..."
npx prisma db seed

echo "Database seeded successfully!"

# Start the application (correct path: dist/src/main.js)
echo "Starting the application..."
exec node dist/src/main.js