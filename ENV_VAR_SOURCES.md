# 🔑 Where to Get Every Environment Variable
# Use this guide to find the exact values for your `.env` files.

## 1. Analytics & Monitoring

### `VITE_GA_TRACKING_ID` (Google Analytics 4)
- **Where to get it**: [Google Analytics Admin](https://analytics.google.com/analytics/web/)
- **Steps**:
  1. Go to Admin (Gear icon) -> Property Settings -> Data collection and modification -> Data Streams.
  2. Click on your Web stream.
  3. Copy the **"Measurement ID"** (starts with `G-`).

### `VITE_SENTRY_DSN` (Error Tracking)
- **Where to get it**: [Sentry.io Dashboard](https://sentry.io/projects/)
- **Steps**:
  1. Create a project (Select "React").
  2. Go to **Settings** (Gear icon inside the project).
  3. Click **Client Keys (DSN)** in the sidebar.
  4. Copy the **DSN** URL (e.g., `https://examplePublicKey@o0.ingest.sentry.io/0`).

---

## 2. API Endpoints (Deployment URLs)

### `VITE_API_URL` & `VITE_AUTH_SERVICE_URL`
- **Where to get it**: **Google Cloud Console** (After Deployment) or Terminal Output
- **Steps**:
  1. Run `./deploy-gcloud.sh`.
  2. Look for the output **"Service URLs"**.
  3. Or go to [Google Cloud Run Console](https://console.cloud.google.com/run).
  4. Copy the URL for `auth-service` (e.g., `https://auth-service-xyz.run.app`).

### `FRONTEND_URL`
- **Where to get it**: **Vercel Dashboard** (After Frontend Deployment)
- **URL**: [Vercel Dashboard](https://vercel.com/dashboard)
- **Value**: The URL of your deployed frontend (e.g., `https://project-ready.vercel.app`).

---

## 3. Security Secrets (Self-Generated)

### `JWT_SECRET`
- **How to get it**: Generate it yourself in the terminal.
- **Command**:
  ```bash
  openssl rand -hex 32
  ```
- **Value**: Copy the long random string output.

### `VITE_NODE_ENV`
- **Value**: `production` (for live site) or `development` (for local).

---

## 4. OAuth Credentials (Social Login)

### `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`
- **Where to get it**: [Google Cloud Credentials](https://console.cloud.google.com/apis/credentials)
- **Steps**:
  1. Click **"+ CREATE CREDENTIALS"** -> **OAuth client ID**.
  2. Application type: **Web application**.
  3. **Authorized redirect URIs**:
     - Local: `http://localhost:3001/api/auth/google/callback`
     - Prod: `https://YOUR-AUTH-SERVICE-URL.run.app/api/auth/google/callback`

### `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET`
- **Where to get it**: [GitHub Developer Settings](https://github.com/settings/developers)
- **Steps**:
  1. Click **"New OAuth App"**.
  2. **Authorization callback URL**:
     - Local: `http://localhost:3001/api/auth/github/callback`
     - Prod: `https://YOUR-AUTH-SERVICE-URL.run.app/api/auth/github/callback`

---

## 5. Database & Cache

### `DATABASE_URL`
- **Where to get it**: [Supabase Database Settings](https://supabase.com/dashboard/project/_/settings/database)
- **Connection String**: URI
- **Format**: `postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres`
- **Note**: You set the password when creating the project.

### `REDIS_URL`
- **Where to get it**: [Upstash](https://upstash.com/) (Recommended for Serverless) or Google Cloud Memorystore.
- **Upstash Steps**:
  1. Create Database.
  2. Copy the **Redis URL** (starts with `redis://...`).
