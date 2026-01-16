#!/bin/bash

# Project Ready - Automated Google Cloud Deployment Script
# This script automates the deployment of all microservices to Google Cloud

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Project Ready - Google Cloud Deployment${NC}"
echo -e "${GREEN}========================================${NC}"

# Configuration
read -p "Enter your Google Cloud Project ID: " PROJECT_ID
read -p "Enter region (default: us-central1): " REGION
REGION=${REGION:-us-central1}

export PROJECT_ID
export REGION

echo -e "\n${YELLOW}Setting up Google Cloud project...${NC}"
gcloud config set project $PROJECT_ID

# Enable APIs
echo -e "\n${YELLOW}Enabling required APIs...${NC}"
gcloud services enable \
  run.googleapis.com \
  sqladmin.googleapis.com \
  redis.googleapis.com \
  containerregistry.googleapis.com \
  cloudbuild.googleapis.com \
  secretmanager.googleapis.com

# Build Docker images
echo -e "\n${YELLOW}Building Docker images...${NC}"

echo "Building Auth Service..."
cd backend/auth-service
docker build -t gcr.io/$PROJECT_ID/auth-service:latest .
docker push gcr.io/$PROJECT_ID/auth-service:latest

echo "Building Project Service..."
cd ../project-service
docker build -t gcr.io/$PROJECT_ID/project-service:latest .
docker push gcr.io/$PROJECT_ID/project-service:latest

echo "Building Payment Service..."
cd ../payment-service
docker build -t gcr.io/$PROJECT_ID/payment-service:latest .
docker push gcr.io/$PROJECT_ID/payment-service:latest

cd ../..

# Deploy services
echo -e "\n${YELLOW}Deploying services to Cloud Run...${NC}"

echo "Deploying Auth Service..."
gcloud run deploy auth-service \
  --image gcr.io/$PROJECT_ID/auth-service:latest \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1

echo "Deploying Project Service..."
gcloud run deploy project-service \
  --image gcr.io/$PROJECT_ID/project-service:latest \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1

echo "Deploying Payment Service..."
gcloud run deploy payment-service \
  --image gcr.io/$PROJECT_ID/payment-service:latest \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1

# Get service URLs
echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}Deployment Complete!${NC}"
echo -e "${GREEN}========================================${NC}"

AUTH_URL=$(gcloud run services describe auth-service --region $REGION --format 'value(status.url)')
PROJECT_URL=$(gcloud run services describe project-service --region $REGION --format 'value(status.url)')
PAYMENT_URL=$(gcloud run services describe payment-service --region $REGION --format 'value(status.url)')

echo -e "\n${GREEN}Service URLs:${NC}"
echo -e "Auth Service:    ${YELLOW}$AUTH_URL${NC}"
echo -e "Project Service: ${YELLOW}$PROJECT_URL${NC}"
echo -e "Payment Service: ${YELLOW}$PAYMENT_URL${NC}"

echo -e "\n${YELLOW}Next Steps:${NC}"
echo "1. Update your .env.production files with these URLs"
echo "2. Run database migrations"
echo "3. Deploy frontend to Vercel"
echo "4. Test all services"

echo -e "\n${GREEN}Deployment script completed successfully!${NC}"
