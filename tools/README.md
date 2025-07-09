# Tools Directory

This directory contains development and testing tools for the Movie Database project.

## 📁 Directory Structure

```
tools/
├── bruno-api/          # Bruno API testing collection
│   ├── test-constants.ts   # Pre-seeded test data IDs
│   └── ...                 # API request collections
└── scripts/            # Build and deployment scripts
    ├── build-all.sh       # Production build script
    ├── deploy-staging.sh  # Staging deployment
    └── test-all.sh        # Test automation
```

## 🧪 API Testing (Bruno)

Professional API testing collection with pre-configured requests for all endpoints.

- **Setup**: Import `bruno-api/` folder into Bruno
- **Test Data**: Uses IDs from `test-constants.ts`
- **Authentication**: Supports both JWT and API token

## 🚀 Build & Deploy Scripts

Automation scripts for CI/CD pipelines:

- **`build-all.sh`**: Complete production build
- **`deploy-staging.sh`**: Staging environment deployment
- **`test-all.sh`**: Automated testing pipeline

## Usage

### API Testing

```bash
# Import tools/bruno-api/ into Bruno desktop app
```

### Build Scripts

```bash
# Build for production
./tools/scripts/build-all.sh

# Deploy to staging
./tools/scripts/deploy-staging.sh

# Run test suite
./tools/scripts/test-all.sh
```
