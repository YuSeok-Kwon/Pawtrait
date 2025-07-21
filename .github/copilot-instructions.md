# Pawtrait AI Coding Instructions

## Project Overview

Pawtrait is a pet image style conversion application that transforms pet photos into Ghibli-style artwork using AI. The project uses a **client-server monorepo architecture** with React frontend and Express backend.

## Architecture Patterns

### Monorepo Structure

```
pawtrait/
├── client/              # React + TypeScript frontend
│   ├── src/
│   │   ├── pages/       # Route-based pages (HomePage, UploadPage, etc.)
│   │   ├── components/  # Reusable React components
│   │   ├── api/         # Axios API client functions
│   │   └── types/       # Frontend-specific types
├── server/              # Express + TypeScript backend
│   ├── src/
│   │   ├── controllers/ # HTTP request handlers
│   │   ├── routes/      # Express route definitions
│   │   ├── services/    # Business logic (emotion analysis, style conversion)
│   │   └── middlewares/ # Express middleware (upload, error handling)
└── shared/              # Common types and utilities
    └── types.ts         # Shared TypeScript interfaces
```

### Client-Server Communication

- **Frontend**: React Router for SPA routing, Axios for API calls
- **Backend**: Express REST API with `/api` prefix
- **Proxy**: Vite dev server proxies `/api` requests to backend (port 3001)
- **Shared Types**: Common interfaces in `shared/types.ts` imported via `@shared/*` alias

## Development Workflow

### Commands (Run from Root)

- `npm run install:all` - Install dependencies for all packages
- `npm run dev` - Start both client (3000) and server (3001) concurrently
- `npm run dev:client` - Client only (React + Vite)
- `npm run dev:server` - Server only (Express + tsx watch)
- `npm run build` - Build both client and server for production

### Component Development Pattern

```typescript
// Use shared types from monorepo
import type { PetImageData } from '@shared/types';

// API calls in separate files
import { uploadImage } from '@/api/imageApi';

// Page components export as named functions
export function UploadPage() {
  // Component logic
}
```

## Key Patterns & Conventions

### API Integration Architecture

```typescript
// Backend: Express controllers with service layer separation
export const uploadImage = async (req: Request, res: Response) => {
  const emotion = await emotionService.analyzeEmotion(imageId);
  const processed = await styleService.convertStyle(imageId, style, emotion);
};

// Frontend: Axios API client with TypeScript
export const uploadImage = async (file: File): Promise<PetImageData> => {
  const response = await api.post<UploadResponse>(
    '/api/images/upload',
    formData
  );
  return response.data.data;
};
```

### File Upload Pattern

- **Backend**: Multer middleware with disk storage in `uploads/` directory
- **Frontend**: FormData with File objects
- **Types**: Shared `UploadResponse` and `PetImageData` interfaces

### Error Handling Convention

- **Backend**: Centralized error handler middleware, structured JSON responses
- **Frontend**: Axios interceptors and React error boundaries
- **Format**: `{ success: boolean, data?: T, error?: string }`

### External API Integration (HuggingFace + OpenAI)

Based on `Developing/pawtrait-style-api-guide.md`:

- **Emotion Analysis**: HuggingFace `nateraw/visual-emotion` model
- **Style Conversion**: OpenAI DALL-E integration
- **Config**: Environment variables in `server/.env`

## TypeScript Patterns

### Path Aliases

- `@/*` - Relative imports within each package
- `@shared/*` - Common types and utilities from shared directory

### Type Exports Pattern

```typescript
// shared/types.ts - Central type definitions
export interface PetImageData {
  /* ... */
}
export interface ApiResponse<T> {
  /* ... */
}

// Use throughout client and server
import type { PetImageData } from '@shared/types';
```

## Critical Dependencies

- **Client**: React 18, React Router 6, Vite 4, Axios
- **Server**: Express 4, Multer, tsx (dev), TypeScript 5
- **Shared**: TypeScript strict mode, ESM modules

## When Adding Features

1. Define shared types in `shared/types.ts` first
2. Implement backend API endpoint in appropriate controller
3. Add route to `server/src/routes/`
4. Create frontend API client function in `client/src/api/`
5. Build React components using shared types
6. Update both client and server TypeScript as needed

## Environment Setup

- Copy `server/.env.example` to `server/.env` and configure API keys
- Run `npm run install:all` to set up all dependencies
- Use `npm run dev` for full-stack development with hot reload
