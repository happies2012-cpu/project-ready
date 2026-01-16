#!/bin/bash

# Project Ready - Git Commit and Push Script
# Prepares and commits all changes to Git repository

set -e

echo "🚀 Project Ready - Git Preparation"
echo "===================================="

# Check if git is initialized
if [ ! -d .git ]; then
    echo "Initializing Git repository..."
    git init
    git branch -M main
fi

# Add all files
echo "📦 Adding files to Git..."
git add .

# Create commit
echo "💾 Creating commit..."
git commit -m "feat: Complete enterprise transformation with microservices

- Implement Magic UI glassmorphism design system with dark/light mode
- Add complete logo integration from workflow.gsapps.in
- Build Auth Service with JWT + OAuth (Google, GitHub) + RBAC
- Build Project Service with CRUD + S3 + Redis + Reviews
- Build Payment Service with Stripe + Subscriptions + Invoices
- Create Nginx API Gateway with rate limiting
- Add Docker Compose for full stack orchestration
- Create Kubernetes manifests with HPA for all services
- Setup CI/CD pipelines with GitHub Actions
- Add complete production deployment package for Google Cloud
- Include automated deployment scripts and comprehensive guides

Production-ready with 3 microservices, 12+ database models, 35+ API endpoints"

echo ""
echo "✅ Git commit created successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Add remote repository:"
echo "   git remote add origin https://github.com/yourusername/project-ready.git"
echo ""
echo "2. Push to GitHub:"
echo "   git push -u origin main"
echo ""
echo "3. Deploy to Google Cloud:"
echo "   ./deploy-gcloud.sh"
echo ""
echo "🎉 Ready for deployment!"
