# Overview

SmartCareer AI is a comprehensive career guidance and education advisory platform designed for students in Jammu & Kashmir. Built as a submission for SIH 2025 (Problem ID: 25094), it provides AI-powered career assessments, personalized recommendations, college directory services, and intelligent counseling through Google Gemini AI integration.

The application serves as a one-stop solution for career planning, offering features like personality-based career matching, J&K-specific college information, AI chat counseling, and administrative analytics. It targets students, parents, and administrators with role-based functionality and localized content relevant to the J&K education landscape.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18+ with TypeScript using Vite for development and building
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **Animations**: Framer Motion for page transitions and interactive animations
- **Charts**: Recharts for data visualization in admin dashboard

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints with structured error handling
- **Data Validation**: Zod schemas for type-safe request/response validation
- **Storage**: In-memory storage with interface-based design for easy database migration
- **Development**: Hot reload with Vite middleware integration

## Authentication & Authorization
- **Session Management**: Role-based authentication with support for student, parent, and admin roles
- **User Context**: React Context API for managing authentication state
- **Demo Mode**: Pre-configured demo user for immediate functionality demonstration

## AI Integration
- **Primary AI Service**: Google Gemini AI (Gemini 2.5 Pro model)
- **Career Analysis**: Real-time personality and career matching based on quiz responses
- **Chat Counseling**: Context-aware conversational AI for career guidance
- **Response Formatting**: Structured JSON responses with confidence scoring
- **Local Context**: AI trained on J&K-specific opportunities and educational landscape

## Data Architecture
- **Schema Design**: TypeScript interfaces with Zod validation for type safety
- **Mock Data**: Comprehensive datasets for colleges, quiz questions, and career paths
- **Career Recommendations**: AI-generated career matches with detailed roadmaps
- **User Profiles**: Rich profile system with interests, achievements, and preferences

## UI/UX Design Patterns
- **Design System**: Consistent component library with New York style variants
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Accessibility**: WCAG-compliant components with proper ARIA attributes
- **Progressive Enhancement**: Graceful degradation for different device capabilities
- **Loading States**: Skeleton screens and progressive loading for better UX

# External Dependencies

## AI Services
- **Google Gemini AI**: Primary AI service for career analysis and chat counseling
  - Model: Gemini 2.5 Pro
  - API Key: Integrated with environment variables
  - Features: JSON response formatting, system instructions, confidence scoring

## Database & Storage
- **Drizzle ORM**: Configured for PostgreSQL with schema-first approach
- **Neon Database**: Serverless PostgreSQL database provider
- **Session Storage**: PostgreSQL session storage with connect-pg-simple

## UI & Styling
- **shadcn/ui**: Complete component library built on Radix UI
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Radix UI**: Headless UI components for accessibility and functionality
- **Lucide React**: Consistent icon library for UI elements

## Development Tools
- **Vite**: Fast build tool with hot module replacement
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Fast bundling for production builds
- **React Developer Tools**: Development debugging and optimization

## Third-party Libraries
- **TanStack Query**: Server state management with caching and synchronization
- **React Hook Form**: Form handling with validation
- **Date-fns**: Date manipulation and formatting
- **Framer Motion**: Animation library for smooth transitions
- **Class Variance Authority**: Type-safe CSS class management