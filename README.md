# Project Ready - GuideSoft Powered Platform

![Project Ready Banner](./public/images/slider/slide1.png)

**Project Ready** is an enterprise-grade academic project platform powered by GuideSoft AI, providing students with 1500+ ready-made projects, complete documentation, and intelligent project recommendations.

## 🚀 Live URLs

- **Production**: https://gsprojects.vercel.app
- **GitHub**: https://github.com/happies2012-cpu/project-ready

## ✨ Features

### For Students
- 📚 **1500+ Projects** - Complete source code, documentation, PPTs, and research papers
- 🤖 **GuideSoft AI** - Intelligent project recommendations and search
- 💎 **Premium Quality** - Hand-picked projects with detailed viva Q&A
- 🎓 **Academic Ready** - Meets strict university guidelines
- ₹499 **One-time Payment** - Lifetime access to all resources

### Enterprise Architecture
- 🔐 **Auth Service** - JWT + OAuth (Google, GitHub) with RBAC
- 🌐 **API Gateway** - Nginx-based routing with rate limiting
- 🐳 **Docker & K8s** - Production-ready containerization
- 📊 **Analytics** - Google Analytics 4 + Sentry error tracking
- 🚀 **CI/CD** - Automated testing and deployment pipelines
- 📈 **Monitoring** - Prometheus + Grafana dashboards

## 🏗️ Architecture

```
project-ready/
├── frontend/              # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/   # UI components (shadcn/ui)
│   │   ├── pages/        # Route pages
│   │   ├── lib/          # Analytics, Sentry, utilities
│   │   └── contexts/     # Auth, theme providers
│   └── public/           # Static assets
├── backend/
│   ├── auth-service/     # Authentication microservice
│   ├── gateway/          # API Gateway (Nginx)
│   ├── project-service/  # Project management (planned)
│   └── payment-service/  # Payment processing (planned)
├── infra/
│   └── k8s/              # Kubernetes manifests
└── .github/workflows/    # CI/CD pipelines
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: React Query + Context API
- **Router**: React Router v6
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod

### Backend
- **Runtime**: Node.js 18
- **Framework**: Express
- **Auth**: Passport.js (JWT, OAuth)
- **Database**: PostgreSQL + Prisma ORM
- **Cache**: Redis
- **API Gateway**: Nginx/Kong

### DevOps
- **Containers**: Docker + Docker Compose
- **Orchestration**: Kubernetes
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus + Grafana
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics 4

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose (for full stack)
- PostgreSQL (for backend services)
- Redis (for session management)

### Development

```bash
# Clone repository
git clone https://github.com/happies2012-cpu/project-ready.git
cd project-ready

# Install dependencies
npm install

# Start development server
npm run dev
# Access at http://localhost:5173
```

### Full Stack with Docker

```bash
# Start all services (frontend, auth, database, redis)
docker-compose up --build

# Access frontend at http://localhost:8080
# Auth service at http://localhost:3001
# API Gateway at http://localhost:3000
```

### Backend Services

```bash
# Auth Service
cd backend/auth-service
npm install
cp .env.example .env
# Configure environment variables
npm run dev
```

## 📦 Environment Variables

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:3000
VITE_AUTH_SERVICE_URL=http://localhost:3001
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=your-sentry-dsn
```

### Auth Service (.env)
```bash
PORT=3001
NODE_ENV=development
JWT_SECRET=your-super-secret-key
DATABASE_URL=postgresql://user:pass@localhost:5432/projectready
REDIS_URL=redis://localhost:6379
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
FRONTEND_URL=http://localhost:5173
```

## 🧪 Testing

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests (when implemented)
npm test
```

## 🚀 Deployment

### Vercel (Frontend)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
npm run deploy:vercel
```

### Google Cloud (Full Stack)
```bash
# Frontend to App Engine
npm run deploy:gcp

# Backend services to Cloud Run
gcloud run deploy auth-service --source ./backend/auth-service
```

### Kubernetes
```bash
# Apply K8s manifests
kubectl apply -f infra/k8s/auth-service/

# Check deployment status
kubectl get pods
kubectl get services
```

## 📊 Monitoring & Analytics

- **Application Monitoring**: Sentry (https://sentry.io)
- **Analytics**: Google Analytics 4
- **Metrics**: Prometheus + Grafana
- **Uptime**: Configured for 99.9% SLA

## 🔒 Security

- JWT-based authentication with refresh tokens
- OAuth 2.0 (Google, GitHub)
- Role-Based Access Control (RBAC)
- Rate limiting (100 req/min per IP)
- Helmet.js security headers
- CORS protection
- Input validation with express-validator

## 📝 API Documentation

### Auth Service Endpoints

```
POST   /api/v1/auth/register       - Register new user
POST   /api/v1/auth/login          - Login with email/password
POST   /api/v1/auth/refresh        - Refresh access token
POST   /api/v1/auth/logout         - Logout user
GET    /api/v1/auth/google         - Google OAuth
GET    /api/v1/auth/github         - GitHub OAuth
GET    /api/v1/auth/me             - Get current user
POST   /api/v1/auth/forgot-password - Request password reset
POST   /api/v1/auth/reset-password/:token - Reset password
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software owned by GuideSoft.

## 🙏 Acknowledgments

- **GuideSoft AI** - Powering intelligent recommendations
- **shadcn/ui** - Beautiful UI components
- **Vercel** - Hosting platform
- **Supabase** - Backend as a Service

## 📞 Support

- **Email**: support@projectready.com
- **Documentation**: https://docs.projectready.com
- **Issues**: https://github.com/happies2012-cpu/project-ready/issues

---

**Built with ❤️ by GuideSoft** | Empowering the next generation of engineers
