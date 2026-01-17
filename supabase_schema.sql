-- Project Ready - Complete Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- Auth Service Tables
-- ==========================================

-- User Table
CREATE TABLE public."User" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "name" TEXT NOT NULL,
    "password" TEXT, -- Nullable for OAuth users
    "role" TEXT DEFAULT 'user',
    "provider" TEXT DEFAULT 'local',
    "providerId" TEXT,
    "avatar" TEXT,
    "emailVerified" BOOLEAN DEFAULT false,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMPWithTimezone DEFAULT NOW(),
    "updatedAt" TIMESTAMPWithTimezone DEFAULT NOW()
);

CREATE INDEX "User_email_idx" ON public."User"("email");
CREATE INDEX "User_provider_idx" ON public."User"("provider", "providerId");

-- Refresh Token Table
CREATE TABLE public."RefreshToken" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "token" TEXT NOT NULL UNIQUE,
    "userId" UUID NOT NULL REFERENCES public."User"("id") ON DELETE CASCADE,
    "expiresAt" TIMESTAMPWithTimezone NOT NULL,
    "createdAt" TIMESTAMPWithTimezone DEFAULT NOW()
);

CREATE INDEX "RefreshToken_userId_idx" ON public."RefreshToken"("userId");
CREATE INDEX "RefreshToken_token_idx" ON public."RefreshToken"("token");

-- Session Table
CREATE TABLE public."Session" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "userId" UUID NOT NULL REFERENCES public."User"("id") ON DELETE CASCADE,
    "token" TEXT NOT NULL UNIQUE,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "expiresAt" TIMESTAMPWithTimezone NOT NULL,
    "createdAt" TIMESTAMPWithTimezone DEFAULT NOW()
);

CREATE INDEX "Session_userId_idx" ON public."Session"("userId");
CREATE INDEX "Session_token_idx" ON public."Session"("token");

-- ==========================================
-- Project Service Tables
-- ==========================================

-- Project Table
CREATE TABLE public."Project" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT[],
    "thumbnail" TEXT,
    "images" TEXT[],
    "demoUrl" TEXT,
    "sourceUrl" TEXT,
    "downloadUrl" TEXT,
    "price" DOUBLE PRECISION DEFAULT 0,
    "isPremium" BOOLEAN DEFAULT false,
    "isActive" BOOLEAN DEFAULT true,
    "isFeatured" BOOLEAN DEFAULT false,
    
    -- Stats
    "views" INTEGER DEFAULT 0,
    "downloads" INTEGER DEFAULT 0,
    "likes" INTEGER DEFAULT 0,
    "rating" DOUBLE PRECISION DEFAULT 0,
    "ratingCount" INTEGER DEFAULT 0,
    
    -- Metadata
    "authorId" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorEmail" TEXT NOT NULL,
    
    -- Tech Stack
    "techStack" TEXT[],
    "framework" TEXT,
    "language" TEXT,
    
    -- SEO
    "slug" TEXT NOT NULL UNIQUE,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "keywords" TEXT[],
    
    "createdAt" TIMESTAMPWithTimezone DEFAULT NOW(),
    "updatedAt" TIMESTAMPWithTimezone DEFAULT NOW(),
    "publishedAt" TIMESTAMPWithTimezone
);

CREATE INDEX "Project_category_idx" ON public."Project"("category");
CREATE INDEX "Project_authorId_idx" ON public."Project"("authorId");
CREATE INDEX "Project_slug_idx" ON public."Project"("slug");
CREATE INDEX "Project_status_idx" ON public."Project"("isActive", "isFeatured");

-- Project File Table
CREATE TABLE public."ProjectFile" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "projectId" UUID NOT NULL REFERENCES public."Project"("id") ON DELETE CASCADE,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "fileType" TEXT NOT NULL,
    "uploadedAt" TIMESTAMPWithTimezone DEFAULT NOW()
);

CREATE INDEX "ProjectFile_projectId_idx" ON public."ProjectFile"("projectId");

-- Review Table
CREATE TABLE public."Review" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "projectId" UUID NOT NULL REFERENCES public."Project"("id") ON DELETE CASCADE,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "isApproved" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMPWithTimezone DEFAULT NOW(),
    "updatedAt" TIMESTAMPWithTimezone DEFAULT NOW(),
    UNIQUE("projectId", "userId")
);

CREATE INDEX "Review_projectId_idx" ON public."Review"("projectId");
CREATE INDEX "Review_userId_idx" ON public."Review"("userId");

-- Favorite Table
CREATE TABLE public."Favorite" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "projectId" UUID NOT NULL REFERENCES public."Project"("id") ON DELETE CASCADE,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMPWithTimezone DEFAULT NOW(),
    UNIQUE("projectId", "userId")
);

CREATE INDEX "Favorite_userId_idx" ON public."Favorite"("userId");
CREATE INDEX "Favorite_projectId_idx" ON public."Favorite"("projectId");

-- Category Table
CREATE TABLE public."Category" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "slug" TEXT NOT NULL UNIQUE,
    "description" TEXT,
    "icon" TEXT,
    "order" INTEGER DEFAULT 0,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMPWithTimezone DEFAULT NOW()
);

-- Tag Table
CREATE TABLE public."Tag" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "slug" TEXT NOT NULL UNIQUE,
    "count" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMPWithTimezone DEFAULT NOW()
);

-- ==========================================
-- Payment Service Tables
-- ==========================================

-- Payment Table
CREATE TABLE public."Payment" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT DEFAULT 'INR',
    "status" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    
    "gateway" TEXT NOT NULL,
    "gatewayPaymentId" TEXT UNIQUE,
    "gatewayOrderId" TEXT,
    "gatewaySignature" TEXT,
    
    "projectId" TEXT,
    "projectTitle" TEXT,
    
    "subscriptionId" TEXT,
    "subscriptionPlan" TEXT,
    
    "invoiceNumber" TEXT UNIQUE NOT NULL,
    "invoiceUrl" TEXT,
    
    "description" TEXT,
    "metadata" JSONB,
    
    "refundAmount" DOUBLE PRECISION,
    "refundReason" TEXT,
    "refundedAt" TIMESTAMPWithTimezone,
    
    "createdAt" TIMESTAMPWithTimezone DEFAULT NOW(),
    "updatedAt" TIMESTAMPWithTimezone DEFAULT NOW()
);

CREATE INDEX "Payment_userId_idx" ON public."Payment"("userId");
CREATE INDEX "Payment_status_idx" ON public."Payment"("status");

-- Subscription Table
CREATE TABLE public."Subscription" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    
    "plan" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT DEFAULT 'INR',
    "interval" TEXT NOT NULL,
    
    "gateway" TEXT NOT NULL,
    "gatewaySubId" TEXT UNIQUE,
    "gatewayCustomerId" TEXT,
    
    "currentPeriodStart" TIMESTAMPWithTimezone NOT NULL,
    "currentPeriodEnd" TIMESTAMPWithTimezone NOT NULL,
    "cancelAtPeriodEnd" BOOLEAN DEFAULT false,
    "cancelledAt" TIMESTAMPWithTimezone,
    
    "trialStart" TIMESTAMPWithTimezone,
    "trialEnd" TIMESTAMPWithTimezone,
    
    "createdAt" TIMESTAMPWithTimezone DEFAULT NOW(),
    "updatedAt" TIMESTAMPWithTimezone DEFAULT NOW()
);

CREATE INDEX "Subscription_userId_idx" ON public."Subscription"("userId");
CREATE INDEX "Subscription_status_idx" ON public."Subscription"("status");

-- Invoice Table
CREATE TABLE public."Invoice" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "invoiceNumber" TEXT NOT NULL UNIQUE,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    
    "amount" DOUBLE PRECISION NOT NULL,
    "tax" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "currency" TEXT DEFAULT 'INR',
    "status" TEXT NOT NULL,
    
    "paymentId" TEXT,
    
    "issueDate" TIMESTAMPWithTimezone DEFAULT NOW(),
    "dueDate" TIMESTAMPWithTimezone NOT NULL,
    "paidDate" TIMESTAMPWithTimezone,
    
    "pdfUrl" TEXT,
    "items" JSONB NOT NULL,
    
    "createdAt" TIMESTAMPWithTimezone DEFAULT NOW(),
    "updatedAt" TIMESTAMPWithTimezone DEFAULT NOW()
);

CREATE INDEX "Invoice_userId_idx" ON public."Invoice"("userId");
CREATE INDEX "Invoice_status_idx" ON public."Invoice"("status");

-- Insert Default Categories
INSERT INTO public."Category" ("name", "slug", "description", "order") VALUES
('Engineering', 'engineering', 'Civil, Mechanical, Electrical, and other engineering projects', 1),
('Computer Science', 'computer-science', 'Web dev, AI, ML, Data Science projects', 2),
('Medical', 'medical', 'Healthcare, Pharmacy, and Medical research projects', 3),
('Management', 'management', 'MBA, BBA, and Business management projects', 4),
('Arts & Science', 'arts-science', 'Literature, History, Physics, Chemistry projects', 5);

-- ==========================================
-- System Settings Table
-- ==========================================

CREATE TABLE public."SystemSetting" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "key" TEXT NOT NULL UNIQUE,
    "value" TEXT NOT NULL,
    "type" TEXT DEFAULT 'string', -- string, boolean, number, json
    "description" TEXT,
    "isPublic" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMPWithTimezone DEFAULT NOW(),
    "updatedAt" TIMESTAMPWithTimezone DEFAULT NOW()
);

CREATE INDEX "SystemSetting_key_idx" ON public."SystemSetting"("key");

-- Insert Default Settings
INSERT INTO public."SystemSetting" ("key", "value", "type", "isPublic", "description") VALUES
('SITE_NAME', 'Project Ready', 'string', true, 'Global site name'),
('MAINTENANCE_MODE', 'false', 'boolean', true, 'Toggle maintenance mode'),
('MAX_UPLOAD_SIZE', '52428800', 'number', true, 'Max file upload size in bytes (50MB)'),
('SUPPORT_EMAIL', 'support@projectready.com', 'string', true, 'Public support email'),
('ALLOW_REGISTRATION', 'true', 'boolean', true, 'Allow new user registrations');
