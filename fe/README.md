# Clothing E-Commerce Frontend

A modern thrift store e-commerce frontend built with React, TypeScript, and Vite, featuring authentication and payment integration.

## 🚀 Quick Start

### Development Setup

```bash
# Install dependencies
yarn install

# Create .env file
echo "VITE_API_BASE_URL=http://localhost:3000/api" > .env

# Start the dev server
yarn dev
```

The app will run at `http://localhost:5173`

**Note:** You need to have the backend API running on `http://localhost:3000` for full functionality.

## ✨ Features

- 🛍️ Product listing with pagination
- 🔍 Product detail pages with image galleries
- 🔐 **User Authentication** (Login/Register with JWT)
- 📱 Responsive design (mobile-first)
- 💬 Instagram order integration
- 🚀 React 19 with React Compiler
- 🎨 TailwindCSS + DaisyUI for styling
- 📦 Zustand for state management (including auth state)
- 🔄 TanStack Query for data fetching
- 💳 Cashfree payment integration ready

## 🛠️ Tech Stack

- **React 19.2.0** with TypeScript
- **Vite 7.2.4** for blazing fast HMR
- **TailwindCSS 4.1.18** for styling
- **React Router DOM 7.10.1** for routing
- **TanStack Query 5.90.12** for server state
- **Zustand 5.0.9** for client state (+ persist middleware for auth)
- **Axios 1.13.2** for API calls

## 📝 Available Scripts

```bash
yarn dev      # Start development server
yarn build    # Build for production
yarn preview  # Preview production build
yarn lint     # Run ESLint
```

## 🔐 Authentication

The app uses **Firebase Authentication** with social sign-in:

- **🔥 Firebase Authentication** - Google and Facebook sign-in
- **No Passwords** - Secure OAuth 2.0 flow handled by Firebase
- **Persistent Sessions** - JWT tokens stored in localStorage via Zustand persist
- **Auto Token Injection** - Axios interceptor automatically adds JWT to requests
- **Auto Logout** - 401 responses trigger automatic logout and redirect
- **Seamless UX** - One-click sign-in with existing social accounts

### Quick Setup

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for complete Firebase configuration instructions.

### Auth State Management

Auth state is managed with Zustand and persisted to localStorage:

```typescript
import { useFirebaseAuth } from './hooks/useFirebaseAuth';

const { user, isAuthenticated, signInWithGoogle, signOut } = useFirebaseAuth();
```

### Using Auth in Components

```typescript
import { useAuthStore } from '../store/useAuthStore';

const MyComponent = () => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <p>Please sign in</p>;
  }
  
  return <p>Welcome, {user?.name}!</p>;
};
```

## 📁 Project Structure

```
src/
├── api/              # API layer (services, hooks, config)
│   ├── services/     # API service functions (auth, products, orders)
│   ├── hooks/        # React Query hooks (useProducts, useOrders)
│   └── config.ts     # Axios instance with JWT interceptor
├── config/           # App configuration
│   └── firebase.ts   # Firebase initialization
├── hooks/            # Custom React hooks
│   └── useFirebaseAuth.ts  # Firebase auth hook
├── features/         # Feature modules (pages + components)
│   ├── auth/         # Authentication pages (LoginPage)
│   ├── products/     # Product pages
│   ├── home/         # Homepage
│   └── ...
├── shared/           # Reusable UI components
├── layouts/          # Layout wrappers
├── store/            # Zustand state stores
│   ├── useAuthStore.ts    # Auth state (user, token, persisted)
│   ├── useProductStore.ts # Product selection state
│   └── useUIStore.ts      # UI state (mobile menu, etc.)
├── types/            # TypeScript interfaces
│   ├── auth.ts       # Auth & User types
│   ├── api.ts        # Product types
│   └── order.ts      # Order & Payment types
├── utils/            # Helper functions
└── context/          # React contexts
```

## 🌐 Environment Variables

Create a `.env` file:

```env
# Backend API
VITE_API_BASE_URL=http://localhost:3000/api

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Get Firebase credentials:** Follow [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

## 🎨 Customization

### Updating Brand Info

Edit `src/utils/constants.ts` for contact info, FAQs, and delivery information.

### Firebase Configuration

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for enabling additional auth providers.

## 📦 Building for Production

```bash
# Build for production
yarn build

# Preview production build
yarn preview
```

**Important:** Make sure to:
1. Update `.env` with production API URL
2. Add production domain to Firebase authorized domains
3. Configure CORS on backend for production domain

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test authentication flow
4. Run linter: `yarn lint`
5. Submit a pull request

---

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
