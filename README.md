# Project Ready - Enterprise Project Management Platform

> **GuideSoft Powered** - A complete enterprise-grade project management and marketplace platform with microservices architecture, advanced analytics, and seamless payment processing.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/project-ready)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Live Demo

- **Frontend**: [https://project-ready.vercel.app](https://project-ready.vercel.app)
- **API Gateway**: `http://localhost:3000` (local)

## ✨ Features

### 🎨 Premium UI/UX
- **Dynamic Hero Slider** with AI-generated imagery
- **Glassmorphism Design System** with modern aesthetics
- **Premium Project Cards** with hover effects and quick view
- **Responsive Design** optimized for all devices
- **Dark Mode Support** with smooth transitions

### 🔐 Authentication & Authorization
- **JWT-based Authentication** with refresh tokens
- **OAuth 2.0 Integration** (Google, GitHub)
- **Role-Based Access Control (RBAC)**
- **Session Management** with Redis
- **Password Reset** functionality

### 📦 Project Management
- **Full CRUD Operations** for projects
- **Advanced Search & Filtering** with pagination
- **File Upload to S3** with presigned URLs
- **Redis Caching** for improved performance
- **Favorites & Bookmarks** system
- **Review & Rating** system
- **Trending Projects** algorithm

### 💳 Payment Processing
- **Stripe Integration** for secure payments
- **One-time Payments** and subscriptions
- **Refund Processing** with tracking
- **Invoice Generation** (PDF)
- **Payment History** and analytics
- **Webhook Support** for real-time updates

### 📊 Analytics & SEO
- **Google Analytics 4** integration
- **Sentry Error Tracking** with user context
- **Dynamic SEO** with react-helmet-async
- **Schema.org Markup** for rich snippets
- **Open Graph & Twitter Cards**

### 🏗️ Architecture
- **Microservices Backend** (Auth, Projects, Payments)
- **API Gateway** with Nginx (rate limiting, routing)
- **PostgreSQL Database** with Prisma ORM
- **Redis Cache** for session and data caching
- **Docker & Docker Compose** for containerization
- **Kubernetes** ready with HPA

### 🔧 DevOps & CI/CD
- **GitHub Actions** for CI/CD pipelines
- **Automated Testing** with Jest
- **Security Scanning** with Trivy
- **Multi-stage Docker Builds**
- **Health Checks** for all services

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast builds
- **Tailwind CSS** for styling
- **Embla Carousel** for sliders
- **Framer Motion** for animations
- **React Router** for navigation
- **Supabase** for real-time features

### Backend Services
- **Node.js 18** with Express
- **Prisma ORM** for database
- **PostgreSQL 15** database
- **Redis 7** for caching
- **Passport.js** for OAuth
- **Stripe SDK** for payments
- **AWS S3** for file storage

### Infrastructure
- **Docker & Docker Compose**
- **Kubernetes** with HPA
- **Nginx** API Gateway
- **GitHub Actions** CI/CD
- **Vercel** for frontend hosting

## 📋 Prerequisites

- Node.js 18+ and npm
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 7+
- AWS Account (for S3)
- Stripe Account (for payments)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/project-ready.git
cd project-ready
```

### 2. Environment Setup

Create `.env` files for each service:

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:3000
VITE_AUTH_SERVICE_URL=http://localhost:3001
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_GA_TRACKING_ID=your_ga_id
VITE_SENTRY_DSN=your_sentry_dsn
```

**Auth Service (backend/auth-service/.env)**
```env
PORT=3001
JWT_SECRET=your_jwt_secret
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/projectready
REDIS_URL=redis://localhost:6379
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

**Project Service (backend/project-service/.env)**
```env
PORT=3002
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/projectready
REDIS_URL=redis://localhost:6379
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
S3_BUCKET_NAME=project-ready-files
```

**Payment Service (backend/payment-service/.env)**
```env
PORT=3003
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/projectready
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

### 3. Development Setup

**Option A: Docker Compose (Recommended)**

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

**Option B: Local Development**

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend/auth-service && npm install
cd ../project-service && npm install
cd ../payment-service && npm install

# Run database migrations
cd backend/auth-service && npm run db:migrate
cd ../project-service && npm run db:migrate
cd ../payment-service && npm run db:migrate

# Start services (in separate terminals)
npm run dev                              # Frontend
cd backend/auth-service && npm run dev   # Auth Service
cd backend/project-service && npm run dev # Project Service
cd backend/payment-service && npm run dev # Payment Service
```

### 4. Access the Application

- **Frontend**: http://localhost:8080
- **API Gateway**: http://localhost:3000
- **Auth Service**: http://localhost:3001
- **Project Service**: http://localhost:3002
- **Payment Service**: http://localhost:3003

## 📚 API Documentation

### Authentication Endpoints

```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login user
POST   /api/auth/refresh           - Refresh access token
POST   /api/auth/logout            - Logout user
GET    /api/auth/me                - Get current user
GET    /api/auth/google            - Google OAuth
GET    /api/auth/github            - GitHub OAuth
```

### Project Endpoints

```
GET    /api/projects               - Get all projects (paginated)
GET    /api/projects/trending      - Get trending projects
GET    /api/projects/:slug         - Get project by slug
POST   /api/projects               - Create project (auth)
PUT    /api/projects/:id           - Update project (auth)
DELETE /api/projects/:id           - Delete project (auth)
POST   /api/projects/:id/favorite  - Toggle favorite (auth)
GET    /api/projects/user/favorites - Get user favorites (auth)
```

### Payment Endpoints

```
POST   /api/payments               - Create payment (auth)
POST   /api/payments/confirm       - Confirm payment (auth)
GET    /api/payments/user          - Get user payments (auth)
GET    /api/payments/:id           - Get payment by ID (auth)
POST   /api/payments/:id/refund    - Request refund (auth)
GET    /api/payments/admin/stats   - Get payment stats (admin)
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 🚢 Deployment

### Vercel (Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Google Cloud (Backend)

```bash
# Build Docker images
docker build -t gcr.io/PROJECT_ID/auth-service ./backend/auth-service
docker build -t gcr.io/PROJECT_ID/project-service ./backend/project-service
docker build -t gcr.io/PROJECT_ID/payment-service ./backend/payment-service

# Push to Google Container Registry
docker push gcr.io/PROJECT_ID/auth-service
docker push gcr.io/PROJECT_ID/project-service
docker push gcr.io/PROJECT_ID/payment-service

# Deploy to Kubernetes
kubectl apply -f infra/k8s/
```

## 🔒 Security

- **JWT Authentication** with secure token storage
- **OAuth 2.0** for third-party authentication
- **RBAC** for fine-grained access control
- **Rate Limiting** on all API endpoints
- **Helmet.js** for security headers
- **CORS** protection
- **Input Validation** with express-validator
- **SQL Injection Protection** via Prisma ORM
- **XSS Protection** with sanitization

## 📈 Monitoring

- **Sentry** for error tracking
- **Google Analytics** for user analytics
- **Prometheus** for metrics (Kubernetes)
- **Grafana** for dashboards (Kubernetes)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **GuideSoft AI** - Powered by advanced AI technology
- Design inspiration from modern SaaS platforms
- Community contributors and open-source projects

## 📞 Support

For support, email support@projectready.com or join our Slack channel.

---

**Built with ❤️ by GuideSoft Powered**
