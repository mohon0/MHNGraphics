# MHNGraphics Documentation

**Note:** This documentation covers an overview of the project structure, setup instructions, coding conventions, and deployment guidelines for the MHNGraphics Next.js project. The site is hosted at [mhngraphics.vercel.app](https://mhngraphics.vercel.app/) and the codebase is available on [GitHub](https://github.com/sejarparvez/MHNGraphics).

## Table of Contents

- [MHNGraphics Documentation](#mhngraphics-documentation)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Project Overview](#project-overview)
  - [Key Features](#key-features)
  - [Tech Stack](#tech-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [DevOps \& Tools](#devops--tools)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Development Server](#running-the-development-server)
  - [Project Structure](#project-structure)
    - [Root Directory](#root-directory)
    - [App Directory Structure](#app-directory-structure)
  - [Configuration](#configuration)
    - [Environment Variables](#environment-variables)
    - [ESLint and Prettier](#eslint-and-prettier)
      - [ESLint Configuration](#eslint-configuration)
      - [Prettier Configuration](#prettier-configuration)
    - [Tailwind Configuration](#tailwind-configuration)
    - [Next.js Configuration](#nextjs-configuration)
  - [Database Setup](#database-setup)
    - [Database Operations](#database-operations)
  - [Authentication](#authentication)
    - [Authentication Types](#authentication-types)
  - [API Routes](#api-routes)
    - [Example API Route](#example-api-route)
  - [Coding Standards and Conventions](#coding-standards-and-conventions)
  - [Testing](#testing)
    - [Running Tests](#running-tests)
    - [Example Test](#example-test)
  - [Performance Optimization](#performance-optimization)
    - [Image Optimization](#image-optimization)
    - [Code Splitting](#code-splitting)
    - [Caching](#caching)
    - [Core Web Vitals](#core-web-vitals)
  - [Deployment](#deployment)
    - [Vercel Deployment](#vercel-deployment)
    - [Manual Deployment](#manual-deployment)
    - [Docker Deployment](#docker-deployment)
    - [CI/CD Pipeline](#cicd-pipeline)
  - [Security Best Practices](#security-best-practices)
    - [Authentication and Authorization](#authentication-and-authorization)
    - [Data Validation](#data-validation)
    - [API Security](#api-security)
    - [Environment Variables](#environment-variables-1)
  - [Contributing](#contributing)
    - [Contribution Process](#contribution-process)
    - [Commit Message Guidelines](#commit-message-guidelines)
    - [Code Review Process](#code-review-process)
  - [Troubleshooting](#troubleshooting)
    - [Common Issues and Solutions](#common-issues-and-solutions)
      - [Development Server Issues](#development-server-issues)
      - [Database Issues](#database-issues)
      - [Authentication Issues](#authentication-issues)
      - [Build and Deployment Issues](#build-and-deployment-issues)
  - [Changelog](#changelog)
    - [Version 1.0.0 (2023-10-15)](#version-100-2023-10-15)
    - [Version 1.1.0 (2023-11-20)](#version-110-2023-11-20)
    - [Version 1.2.0 (2024-01-10)](#version-120-2024-01-10)
    - [Version 1.3.0 (2024-03-05)](#version-130-2024-03-05)
  - [License](#license)
  - [Contact](#contact)

---

## Introduction

MHNGraphics is a modern Next.js web application bootstrapped with [create-next-app](https://nextjs.org/). It leverages TypeScript, Next.js built-in features, and additional tools (like Prisma for database management and NextAuth for authentication) to deliver a fast, scalable, and maintainable website. This documentation provides a comprehensive guide to understand, setup, and contribute to the codebase.

The project aims to provide a robust platform for graphic design services, showcasing portfolios, handling client requests, and managing design projects efficiently. With a focus on performance, accessibility, and user experience, MHNGraphics demonstrates best practices in modern web development.

## Project Overview

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (configured via `tailwind.config.ts`)
- **Database:** PostgreSQL managed via Prisma (see the `/prisma` folder)
- **Authentication:** Configured with NextAuth (see `next-auth.d.ts`)
- **State Management:** React Context API and SWR for data fetching
- **Form Handling:** React Hook Form with Zod validation
- **Linting and Formatting:** ESLint (`.eslintrc.json`) and Prettier (`.prettierrc`)
- **Testing:** Jest and React Testing Library
- **Deployment:** Hosted on [Vercel](https://vercel.com/)

## Key Features

- **Portfolio Showcase:** Display graphic design work with detailed project information
- **User Authentication:** Secure login and registration system with role-based access control
- **Project Management:** Track design projects from request to completion
- **Client Dashboard:** Allow clients to view project status and provide feedback
- **Admin Panel:** Comprehensive admin interface for managing users, projects, and content
- **Responsive Design:** Fully responsive interface that works on all devices
- **Dark Mode:** Toggle between light and dark themes
- **Internationalization:** Support for multiple languages
- **SEO Optimization:** Built-in SEO best practices for better search engine visibility
- **Analytics Integration:** Track user behavior and site performance

## Tech Stack

### Frontend

- **Next.js:** React framework for server-rendered applications
- **TypeScript:** Typed JavaScript for better developer experience
- **Tailwind CSS:** Utility-first CSS framework
- **Framer Motion:** Animation library for React
- **React Icons:** Icon library for React applications
- **SWR:** React Hooks for data fetching
- **React Hook Form:** Form validation library
- **Zod:** TypeScript-first schema validation

### Backend

- **Next.js API Routes:** Serverless functions for backend logic
- **Prisma:** Next-generation ORM for Node.js and TypeScript
- **PostgreSQL:** Relational database for data storage
- **NextAuth.js:** Authentication for Next.js applications
- **AWS S3:** Cloud storage for media files
- **Nodemailer:** Module for sending emails

### DevOps & Tools

- **Vercel:** Deployment platform for Next.js applications
- **GitHub Actions:** CI/CD workflows
- **ESLint & Prettier:** Code quality and formatting
- **Jest & React Testing Library:** Testing frameworks
- **Husky & lint-staged:** Git hooks for pre-commit checks
- **Sentry:** Error tracking and monitoring

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or above)
- A package manager such as [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)
- [PostgreSQL](https://www.postgresql.org/) (version 12 or above) or a PostgreSQL-compatible database service
- Git for version control

### Installation

1.  **Clone the Repository:**

        git clone https://github.com/sejarparvez/MHNGraphics.git
        cd MHNGraphics

2.  **Install Dependencies:**

    Use your preferred package manager:

        # Using npm
        npm install

        # Or using yarn
        yarn install

        # Or using pnpm
        pnpm install

3.  **Set Up Environment Variables:**

    Create a `.env.local` file in the root directory and add the necessary environment variables (see the Configuration section for details).

4.  **Set Up the Database:**

        # Generate Prisma client
        npx prisma generate

        # Run database migrations
        npx prisma migrate dev

5.  **Seed the Database (Optional):**

        npx prisma db seed

### Running the Development Server

Start the development server with one of the following commands:

    npm run dev
    # or
    yarn dev
    # or
    pnpm dev

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

**Tip:** For a better development experience, install the recommended VS Code extensions listed in `.vscode/extensions.json`.

## Project Structure

Here is a detailed overview of the key folders and files in the project:

### Root Directory

- `/src`  
  Contains the main application code, including pages, components, and utilities.

  - `/app` - Next.js App Router directory containing all routes and layouts
  - `/components` - Reusable UI components organized by feature or function
  - `/lib` - Utility functions, hooks, and shared logic
  - `/styles` - Global styles and Tailwind CSS configuration
  - `/types` - TypeScript type definitions and interfaces
  - `/context` - React Context providers for state management
  - `/hooks` - Custom React hooks
  - `/services` - API service functions and external integrations
  - `/utils` - Helper functions and utilities
  - `/constants` - Application constants and configuration values

- `/public`  
  Static assets such as images, fonts, and other public files.

  - `/images` - Image assets used throughout the application
  - `/fonts` - Custom font files
  - `/icons` - SVG icons and favicon files
  - `/locales` - Internationalization files for multiple languages

- `/prisma`  
  Prisma configuration and schema files for database interactions.

  - `schema.prisma` - Database schema definition
  - `/migrations` - Database migration files
  - `/seed` - Database seeding scripts

- `/tests`  
  Test files organized by type and component.

  - `/unit` - Unit tests for individual functions and components
  - `/integration` - Integration tests for API routes and complex components
  - `/e2e` - End-to-end tests for user flows
  - `/__mocks__` - Mock data and functions for testing

- **Configuration Files:**

  - `next.config.mjs` - Next.js configuration
  - `.eslintrc.json` - ESLint configuration
  - `.prettierrc` - Prettier configuration
  - `tsconfig.json` - TypeScript configuration
  - `postcss.config.mjs` - PostCSS configuration
  - `tailwind.config.ts` - Tailwind CSS configuration
  - `jest.config.js` - Jest testing configuration
  - `.env.example` - Example environment variables
  - `.gitignore` - Git ignore rules
  - `.dockerignore` - Docker ignore rules
  - `Dockerfile` - Docker configuration for containerization
  - `docker-compose.yml` - Docker Compose configuration for local development

### App Directory Structure

The `/src/app` directory follows Next.js App Router conventions:

- `/src/app/layout.tsx` - Root layout component
- `/src/app/page.tsx` - Home page component
- `/src/app/loading.tsx` - Loading UI component
- `/src/app/error.tsx` - Error handling component
- `/src/app/not-found.tsx` - 404 page component
- `/src/app/api` - API route handlers
- `/src/app/(auth)` - Authentication-related routes (login, register, etc.)
- `/src/app/(dashboard)` - Dashboard routes for authenticated users
- `/src/app/(marketing)` - Public-facing marketing pages
- `/src/app/portfolio` - Portfolio showcase pages
- `/src/app/blog` - Blog pages and articles
- `/src/app/contact` - Contact form and information

## Configuration

### Environment Variables

The project uses environment variables for configuration. Create a `.env.local` file at the root of the project with the following variables:

    # Database
    DATABASE_URL="postgresql://username:password@localhost:5432/mhngraphics"

    # NextAuth
    NEXTAUTH_URL="http://localhost:3000"
    NEXTAUTH_SECRET="your-secret-key-at-least-32-characters"

    # Authentication Providers
    GOOGLE_CLIENT_ID="your-google-client-id"
    GOOGLE_CLIENT_SECRET="your-google-client-secret"
    GITHUB_ID="your-github-client-id"
    GITHUB_SECRET="your-github-client-secret"

    # AWS S3 (for file uploads)
    AWS_ACCESS_KEY_ID="your-aws-access-key"
    AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
    AWS_REGION="your-aws-region"
    AWS_BUCKET_NAME="your-s3-bucket-name"

    # Email (Nodemailer)
    EMAIL_SERVER_HOST="smtp.example.com"
    EMAIL_SERVER_PORT="587"
    EMAIL_SERVER_USER="your-email@example.com"
    EMAIL_SERVER_PASSWORD="your-email-password"
    EMAIL_FROM="noreply@example.com"

    # Analytics
    NEXT_PUBLIC_ANALYTICS_ID="your-analytics-id"

    # Sentry (Error Tracking)
    NEXT_PUBLIC_SENTRY_DSN="your-sentry-dsn"

**Important:** Make sure to add `.env.local` to your `.gitignore` to keep sensitive information secure. Use `.env.example` as a template for required variables without actual values.

### ESLint and Prettier

The project is set up with ESLint and Prettier to maintain code quality and consistency.

#### ESLint Configuration

The `.eslintrc.json` file includes rules for TypeScript, React, and accessibility:

    {
      "extends": [
        "next/core-web-vitals",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "prettier"
      ],
      "plugins": ["@typescript-eslint", "react", "jsx-a11y"],
      "rules": {
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "jsx-a11y/anchor-is-valid": "warn"
      }
    }

#### Prettier Configuration

The `.prettierrc` file defines code formatting rules:

    {
      "semi": true,
      "singleQuote": true,
      "tabWidth": 2,
      "trailingComma": "es5",
      "printWidth": 100,
      "arrowParens": "avoid"
    }

You can run linting and formatting with:

    # Lint the codebase
    npm run lint

    # Format the codebase
    npm run format

### Tailwind Configuration

The project uses Tailwind CSS for styling. The configuration is defined in `tailwind.config.ts`:

    import type { Config } from 'tailwindcss';

    const config: Config = {
      content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      ],
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            primary: {
              50: '#f0f9ff',
              100: '#e0f2fe',
              200: '#bae6fd',
              300: '#7dd3fc',
              400: '#38bdf8',
              500: '#0ea5e9',
              600: '#0284c7',
              700: '#0369a1',
              800: '#075985',
              900: '#0c4a6e',
              950: '#082f49',
            },
            secondary: {
              // Custom secondary color palette
            },
            // Additional custom colors
          },
          fontFamily: {
            sans: ['var(--font-inter)', 'sans-serif'],
            heading: ['var(--font-montserrat)', 'sans-serif'],
          },
          // Additional theme extensions
        },
      },
      plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
      ],
    };

### Next.js Configuration

The `next.config.mjs` file configures Next.js behavior:

    /** @type {import('next').NextConfig} */
    const nextConfig = {
      reactStrictMode: true,
      images: {
        domains: ['images.unsplash.com', 'your-s3-bucket.amazonaws.com'],
        formats: ['image/avif', 'image/webp'],
      },
      experimental: {
        serverActions: true,
        serverComponentsExternalPackages: ['@prisma/client'],
      },
      // Additional configuration options
    };

    export default nextConfig;

## Database Setup

The project uses Prisma ORM with PostgreSQL. The database schema is defined in `prisma/schema.prisma`:

    generator client {
      provider = "prisma-client-js"
    }

    datasource db {
      provider = "postgresql"
      url      = env("DATABASE_URL")
    }

    // User model
    model User {
      id            String    @id @default(cuid())
      name          String?
      email         String    @unique
      emailVerified DateTime?
      image         String?
      password      String?
      role          Role      @default(USER)
      createdAt     DateTime  @default(now())
      updatedAt     DateTime  @updatedAt
      accounts      Account[]
      sessions      Session[]
      projects      Project[]
      // Additional user fields
    }

    // Role enum
    enum Role {
      USER
      ADMIN
      DESIGNER
    }

    // Project model
    model Project {
      id          String   @id @default(cuid())
      title       String
      description String?
      status      Status   @default(PENDING)
      createdAt   DateTime @default(now())
      updatedAt   DateTime @updatedAt
      userId      String
      user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
      images      Image[]
      // Additional project fields
    }

    // Status enum
    enum Status {
      PENDING
      IN_PROGRESS
      COMPLETED
      CANCELLED
    }

    // Image model
    model Image {
      id        String   @id @default(cuid())
      url       String
      alt       String?
      projectId String
      project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
      createdAt DateTime @default(now())
      updatedAt DateTime @updatedAt
      // Additional image fields
    }

    // NextAuth models
    model Account {
      id                String  @id @default(cuid())
      userId            String
      type              String
      provider          String
      providerAccountId String
      refresh_token     String? @db.Text
      access_token      String? @db.Text
      expires_at        Int?
      token_type        String?
      scope             String?
      id_token          String? @db.Text
      session_state     String?
      user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

      @@unique([provider, providerAccountId])
    }

    model Session {
      id           String   @id @default(cuid())
      sessionToken String   @unique
      userId       String
      expires      DateTime
      user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
    }

    model VerificationToken {
      identifier String
      token      String   @unique
      expires    DateTime

      @@unique([identifier, token])
    }

### Database Operations

Common Prisma commands for database management:

    # Generate Prisma client
    npx prisma generate

    # Create a migration
    npx prisma migrate dev --name migration_name

    # Apply migrations to the database
    npx prisma migrate deploy

    # Reset the database (caution: deletes all data)
    npx prisma migrate reset

    # Open Prisma Studio (database GUI)
    npx prisma studio

## Authentication

The project uses NextAuth.js for authentication. The configuration is in `src/app/api/auth/[...nextauth]/route.ts`:

    import NextAuth from "next-auth";
    import { PrismaAdapter } from "@auth/prisma-adapter";
    import { prisma } from "@/lib/prisma";
    import CredentialsProvider from "next-auth/providers/credentials";
    import GoogleProvider from "next-auth/providers/google";
    import GithubProvider from "next-auth/providers/github";
    import bcrypt from "bcryptjs";

    export const authOptions = {
      adapter: PrismaAdapter(prisma),
      providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
              return null;
            }

            const user = await prisma.user.findUnique({
              where: { email: credentials.email }
            });

            if (!user || !user.password) {
              return null;
            }

            const isPasswordValid = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (!isPasswordValid) {
              return null;
            }

            return user;
          }
        }),
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        GithubProvider({
          clientId: process.env.GITHUB_ID!,
          clientSecret: process.env.GITHUB_SECRET!
        }),
      ],
      session: {
        strategy: "jwt",
      },
      callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.id = user.id;
            token.role = user.role;
          }
          return token;
        },
        async session({ session, token }) {
          if (session.user) {
            session.user.id = token.id;
            session.user.role = token.role;
          }
          return session;
        },
      },
      pages: {
        signIn: "/login",
        signOut: "/",
        error: "/error",
        verifyRequest: "/verify-request",
      },
      secret: process.env.NEXTAUTH_SECRET,
    };

    const handler = NextAuth(authOptions);
    export { handler as GET, handler as POST };

### Authentication Types

The NextAuth types are extended in `src/types/next-auth.d.ts`:

    import { DefaultSession, DefaultUser } from "next-auth";
    import { Role } from "@prisma/client";

    declare module "next-auth" {
      interface Session {
        user: {
          id: string;
          role: Role;
        } & DefaultSession["user"];
      }

      interface User extends DefaultUser {
        role: Role;
      }
    }

## API Routes

The project uses Next.js API routes for backend functionality. API routes are located in `src/app/api`:

### Example API Route

Here's an example of a protected API route for projects in `src/app/api/projects/route.ts`:

    import { NextResponse } from "next/server";
    import { getServerSession } from "next-auth/next";
    import { prisma } from "@/lib/prisma";
    import { authOptions } from "../auth/[...nextauth]/route";
    import { z } from "zod";

    // Schema for project creation
    const projectSchema = z.object({
      title: z.string().min(3).max(100),
      description: z.string().optional(),
      status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"]).optional(),
    });

    // GET all projects (with pagination)
    export async function GET(request: Request) {
      try {
        const session = await getServerSession(authOptions);

        if (!session) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        const projects = await prisma.project.findMany({
          where: {
            userId: session.user.id,
          },
          include: {
            images: true,
          },
          skip,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
        });

        const total = await prisma.project.count({
          where: {
            userId: session.user.id,
          },
        });

        return NextResponse.json({
          projects,
          pagination: {
            total,
            pages: Math.ceil(total / limit),
            page,
            limit,
          },
        });
      } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
      }
    }

    // POST create a new project
    export async function POST(request: Request) {
      try {
        const session = await getServerSession(authOptions);

        if (!session) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();

        // Validate request body
        const validationResult = projectSchema.safeParse(body);
        if (!validationResult.success) {
          return NextResponse.json({ error: validationResult.error.errors }, { status: 400 });
        }

        const project = await prisma.project.create({
          data: {
            ...validationResult.data,
            userId: session.user.id,
          },
        });

        return NextResponse.json(project, { status: 201 });
      } catch (error) {
        console.error("Error creating project:", error);
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
      }
    }

## Coding Standards and Conventions

- **TypeScript:** Ensure that all new code is written in TypeScript and properly typed.
- **Component Organization:** Keep components in the `/src/components` directory organized by feature or function.
- **Styling:** Use Tailwind CSS classes for styling components. For complex styles, consider using additional CSS modules.
- **Naming Conventions:**
  - Use PascalCase for React components and interfaces
  - Use camelCase for variables, functions, and methods
  - Use kebab-case for file names
  - Use UPPER_CASE for constants
- **File Structure:**
  - Group related files together
  - Keep files small and focused on a single responsibility
  - Use index.ts files for exporting multiple components from a directory
- **Comments & Documentation:**
  - Write clear inline comments where necessary
  - Use JSDoc comments for functions and components
  - Update documentation when significant changes are made to the codebase
- **Error Handling:**
  - Use try/catch blocks for error handling
  - Log errors with appropriate context
  - Provide user-friendly error messages
- **Testing:**
  - Write tests for all new features
  - Aim for high test coverage
  - Use descriptive test names

## Testing

The project uses Jest and React Testing Library for testing. Tests are located in the `/tests` directory.

### Running Tests

    # Run all tests
    npm run test

    # Run tests in watch mode
    npm run test:watch

    # Run tests with coverage
    npm run test:coverage

### Example Test

Here's an example of a component test:

    import { render, screen } from '@testing-library/react';
    import userEvent from '@testing-library/user-event';
    import ProjectCard from '@/components/ProjectCard';

    describe('ProjectCard', () => {
      const mockProject = {
        id: '1',
        title: 'Test Project',
        description: 'This is a test project',
        status: 'IN_PROGRESS',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 'user1',
        images: [
          {
            id: '1',
            url: '/placeholder.jpg',
            alt: 'Test Image',
            projectId: '1',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      };

      it('renders project details correctly', () => {
        render();

        expect(screen.getByText('Test Project')).toBeInTheDocument();
        expect(screen.getByText('This is a test project')).toBeInTheDocument();
        expect(screen.getByText('IN_PROGRESS')).toBeInTheDocument();
        expect(screen.getByAltText('Test Image')).toBeInTheDocument();
      });

      it('calls onView when View button is clicked', async () => {
        const onView = jest.fn();
        render();

        await userEvent.click(screen.getByText('View Details'));
        expect(onView).toHaveBeenCalledWith('1');
      });
    });

## Performance Optimization

The project implements several performance optimization techniques:

### Image Optimization

- Use Next.js Image component for automatic image optimization
- Implement responsive images with appropriate sizes
- Use modern image formats (WebP, AVIF) when supported
- Lazy load images that are below the fold

### Code Splitting

- Use dynamic imports for large components
- Implement route-based code splitting with Next.js
- Lazy load components that are not immediately visible

### Caching

- Implement SWR for client-side data fetching with caching
- Use Next.js ISR (Incremental Static Regeneration) for frequently updated pages
- Configure appropriate cache headers for static assets

### Core Web Vitals

- Optimize Largest Contentful Paint (LCP) by prioritizing critical content
- Minimize Cumulative Layout Shift (CLS) by specifying image dimensions
- Improve First Input Delay (FID) by optimizing JavaScript execution
- Use Web Vitals library to monitor performance metrics

## Deployment

### Vercel Deployment

MHNGraphics is deployed on Vercel for seamless CI/CD and performance optimization. To deploy your changes:

1.  Push your changes to the GitHub repository.
2.  Vercel automatically detects the repository and triggers a deployment.
3.  **Environment Variables:** Ensure that Vercel has the necessary environment variables configured in the project settings.

### Manual Deployment

To manually deploy the project to Vercel:

    # Install Vercel CLI
    npm install -g vercel

    # Login to Vercel
    vercel login

    # Deploy to production
    vercel --prod

### Docker Deployment

The project includes Docker configuration for containerized deployment:

    # Build the Docker image
    docker build -t mhngraphics .

    # Run the container
    docker run -p 3000:3000 --env-file .env.local mhngraphics

### CI/CD Pipeline

The project uses GitHub Actions for CI/CD. The workflow is defined in `.github/workflows/ci.yml`:

    name: CI/CD Pipeline

    on:
      push:
        branches: [main]
      pull_request:
        branches: [main]

    jobs:
      test:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - name: Set up Node.js
            uses: actions/setup-node@v3
            with:
              node-version: '18'
              cache: 'npm'
          - name: Install dependencies
            run: npm ci
          - name: Run linting
            run: npm run lint
          - name: Run tests
            run: npm run test

      deploy:
        needs: test
        if: github.ref == 'refs/heads/main'
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - name: Deploy to Vercel
            uses: amondnet/vercel-action@v20
            with:
              vercel-token: ${{ secrets.VERCEL_TOKEN }}
              vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
              vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
              vercel-args: '--prod'

## Security Best Practices

The project implements several security best practices:

### Authentication and Authorization

- Use NextAuth.js for secure authentication
- Implement role-based access control
- Store passwords securely using bcrypt
- Use JWT with appropriate expiration times

### Data Validation

- Validate all user inputs using Zod
- Sanitize data to prevent XSS attacks
- Use prepared statements with Prisma to prevent SQL injection

### API Security

- Implement rate limiting for API routes
- Use CSRF protection for form submissions
- Set appropriate security headers
- Implement proper error handling to avoid information leakage

### Environment Variables

- Store sensitive information in environment variables
- Use different environment variables for development and production
- Never commit sensitive information to version control

## Contributing

Contributions are welcome! If you want to contribute to the project, please follow these steps:

### Contribution Process

1.  **Fork the Repository:** Create your own fork of the repository on GitHub.
2.  **Create a Feature Branch:**

        git checkout -b feature/your-feature-name

3.  **Make Your Changes:** Implement your feature or bug fix.
4.  **Write Tests:** Add tests for your changes to ensure they work as expected.
5.  **Run Tests and Linting:**

        npm run test
        npm run lint

6.  **Commit Your Changes:** Follow the commit message guidelines.

        git commit -m "feat: add new feature"

7.  **Push to Your Fork:**

        git push origin feature/your-feature-name

8.  **Open a Pull Request:** Create a pull request from your fork to the main repository.

### Commit Message Guidelines

The project follows the Conventional Commits specification:

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation changes
- `style:` Changes that do not affect the meaning of the code (formatting, etc.)
- `refactor:` Code changes that neither fix a bug nor add a feature
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Changes to the build process or auxiliary tools

### Code Review Process

All pull requests will be reviewed by the project maintainers. The review process includes:

- Code quality and style check
- Test coverage verification
- Functionality testing
- Documentation review

Before submitting a pull request, ensure that your code passes all linting and testing checks.

## Troubleshooting

### Common Issues and Solutions

#### Development Server Issues

- **Issue:** Server fails to start  
  **Solution:** Make sure you have installed all dependencies with `npm install` and that your Node.js version is compatible (v16+).
- **Issue:** Hot reloading not working  
  **Solution:** Check if you have any syntax errors in your code. Try restarting the development server.
- **Issue:** Environment variables not working  
  **Solution:** Verify that your `.env.local` file is in the root directory and that you're accessing variables correctly.

#### Database Issues

- **Issue:** Prisma client generation fails  
  **Solution:** Make sure your database is running and accessible. Check your database connection string in `.env.local`.
- **Issue:** Migration errors  
  **Solution:** Try running `npx prisma migrate reset` to reset your database (caution: this will delete all data).
- **Issue:** Database connection timeout  
  **Solution:** Check your network settings and database server status. Ensure your connection string is correct.

#### Authentication Issues

- **Issue:** NextAuth.js not working  
  **Solution:** Verify that your `NEXTAUTH_SECRET` and `NEXTAUTH_URL` are set correctly in `.env.local`.
- **Issue:** OAuth providers not working  
  **Solution:** Check that your OAuth provider credentials are correct and that the callback URLs are properly configured in the provider's dashboard.
- **Issue:** Session not persisting  
  **Solution:** Make sure your session configuration is correct and that cookies are being set properly.

#### Build and Deployment Issues

- **Issue:** Build fails on Vercel  
  **Solution:** Check the build logs for specific errors. Ensure that all environment variables are set in the Vercel dashboard.
- **Issue:** TypeScript errors during build  
  **Solution:** Fix type errors in your code. You can run `npm run type-check` to identify issues.
- **Issue:** Missing dependencies in production  
  **Solution:** Make sure all dependencies are listed in `package.json` and not just in `devDependencies`.

If issues persist, please open an issue in the GitHub repository with detailed information about the problem, including error messages and steps to reproduce.

## Changelog

### Version 1.0.0 (2023-10-15)

- Initial release
- Core features implemented
- Authentication system with NextAuth.js
- Project management functionality
- Responsive design with Tailwind CSS

### Version 1.1.0 (2023-11-20)

- Added dark mode support
- Improved performance with optimized images
- Enhanced user dashboard
- Added file upload functionality with AWS S3
- Fixed various bugs and improved error handling

### Version 1.2.0 (2024-01-10)

- Implemented internationalization support
- Added analytics integration
- Enhanced admin panel with more features
- Improved accessibility throughout the application
- Added comprehensive test suite

### Version 1.3.0 (2024-03-05)

- Upgraded to Next.js 14
- Implemented Server Actions for form handling
- Added blog functionality
- Enhanced security with improved authentication
- Performance optimizations for faster page loads

## License

This project is licensed under the MIT License - see the LICENSE file for details.

    MIT License

    Copyright (c) 2023-2024 MHNGraphics

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

## Contact

For questions or further support, please contact the project maintainer or open an issue on GitHub.

- **GitHub Repository:** [https://github.com/sejarparvez/MHNGraphics](https://github.com/sejarparvez/MHNGraphics)
- **Website:** [https://mhngraphics.vercel.app/](https://mhngraphics.vercel.app/)
- **Email:** [contact@mhngraphics.com](mailto:contact@mhngraphics.com)
- **Twitter:** [@mhngraphics](https://twitter.com/mhngraphics)

This documentation aims to serve as a comprehensive guide to understanding the project's structure, development workflow, and deployment process. Feel free to enhance or modify it as the project evolves.

Happy coding!
