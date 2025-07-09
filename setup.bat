@echo off
REM Movie Database Setup Script for Windows
REM This script sets up the entire application from scratch

echo Movie Database Setup Script
echo ============================

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: npm is not installed. Please install Node.js and npm first.
    exit /b 1
)

REM Install dependencies
echo.
echo Installing dependencies...
call npm install

REM Check for root .env file
if not exist ".env" (
    echo.
    echo Creating root .env file from example...
    copy ".env.example" ".env"
    echo Created .env file
)

REM Check for backend .env file
if not exist "apps\backend\.env" (
    echo.
    echo Creating backend .env file from example...
    copy "apps\backend\.env.example" "apps\backend\.env"
    echo Created apps\backend\.env
)

REM Check for frontend .env.local file
if not exist "apps\frontend\.env.local" (
    echo.
    echo Creating frontend .env.local file from example...
    copy "apps\frontend\.env.local.example" "apps\frontend\.env.local"
    echo Created apps\frontend\.env.local
)

REM Run database migrations
echo.
echo Setting up database...
echo Running migrations...
cd apps\backend
call npx prisma migrate dev --name init --skip-seed

REM Run database seed
echo.
echo Seeding database with sample data...
call npx prisma db seed

REM Return to root directory
cd ..\..

echo.
echo Setup complete!
echo.
echo To start the application, run:
echo    Local development: npm run dev
echo    Docker (v2): docker compose up
echo    Docker (v1): docker-compose up
echo.
echo The application will be available at:
echo    - Frontend: http://localhost:3000
echo    - Backend API: http://localhost:4000
echo.