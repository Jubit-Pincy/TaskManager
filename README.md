# React Task App

Simple React task manager with SonarCloud analysis and Azure Static Web Apps deployment.

## Setup

```bash
npm install
npm start       # Dev server at localhost:3000
npm test        # Run tests + coverage
npm run build   # Production build
```

## SonarCloud Setup

1. Create project at [sonarcloud.io](https://sonarcloud.io)
2. In `.github/workflows/ci-cd.yml`, replace `YOUR_ORG` with your SonarCloud organization key
3. Add `SONAR_TOKEN` secret to GitHub repo settings

## Azure Deployment (Student Plan = Static Web Apps Free Tier)

1. In Azure Portal → Create **Static Web App** (Free tier)
2. Connect your GitHub repo
3. Set build details:
   - App location: `/`
   - Output location: `build`
4. Copy the deployment token → add as `AZURE_STATIC_WEB_APPS_API_TOKEN` in GitHub secrets

## CI/CD Flow

`push to main` → Run tests → SonarCloud analysis → Deploy to Azure