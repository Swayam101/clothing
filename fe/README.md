# Clothing E-Commerce Frontend

A modern e-commerce frontend built with React, TypeScript, and Vite, featuring Strapi CMS integration with mock data support for client demos.

## 🚀 Quick Start

### Development with Mock Data (No Backend Required)

Perfect for client demos and UI development:

```bash
# Install dependencies
yarn install

# The project is already configured to use mock data by default
# Just start the dev server
yarn dev
```

The app will run at `http://localhost:5173` with 16 pre-populated mock products!

### Development with Real API

```bash
# Create .env file (if not exists)
echo "VITE_USE_MOCK_DATA=false" > .env
echo "VITE_API_BASE_URL=http://localhost:1337/api" >> .env

# Start your Strapi backend first (on port 1337)
# Then start the dev server
yarn dev
```

## 📚 Documentation

- **[Mock Data Setup Guide](./MOCK_DATA_SETUP.md)** - Complete guide on using mock data
- **[API Integration](./src/api/README.md)** - API documentation (if available)

## ✨ Features

- 🛍️ Product listing with pagination
- 🔍 Product detail pages with image galleries
- 📱 Responsive design (mobile-first)
- 💬 WhatsApp/Instagram order integration
- 🎭 **Mock data support** - Works without backend!
- 🚀 React 19 with React Compiler
- 🎨 TailwindCSS + DaisyUI for styling
- 📦 Zustand for state management
- 🔄 TanStack Query for data fetching

## 🛠️ Tech Stack

- **React 19.2.0** with TypeScript
- **Vite 7.2.4** for blazing fast HMR
- **TailwindCSS 4.1.18** for styling
- **React Router DOM 7.10.1** for routing
- **TanStack Query 5.90.12** for server state
- **Zustand 5.0.9** for client state
- **Axios 1.13.2** for API calls

## 📝 Available Scripts

```bash
yarn dev      # Start development server
yarn build    # Build for production
yarn preview  # Preview production build
yarn lint     # Run ESLint
```

## 🎭 Mock Data vs Real API

The app intelligently switches between mock data and real API:

| Mode | Environment Variable | Use Case |
|------|---------------------|----------|
| Mock Data | `VITE_USE_MOCK_DATA=true` | Client demos, development without backend |
| Real API | `VITE_USE_MOCK_DATA=false` | Production, full backend integration |
| Auto-Fallback | Any setting | If API fails, automatically uses mock data |

## 📁 Project Structure

```
src/
├── api/              # API layer (services, hooks, mocks)
├── features/         # Feature modules (pages + components)
├── shared/           # Reusable UI components
├── layouts/          # Layout wrappers
├── store/            # Zustand state stores
├── types/            # TypeScript interfaces
├── utils/            # Helper functions
└── context/          # React contexts
```

## 🌐 Environment Variables

Create a `.env` file:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:1337/api

# Mock Data Toggle
VITE_USE_MOCK_DATA=true
```

See `.env.example` for all options.

## 🎨 Customization

### Adding Mock Products

Edit `src/api/mocks/products.mock.ts` to add/modify mock products.

### Updating Brand Info

Edit `src/utils/constants.ts` for contact info, FAQs, and WhatsApp messages.

## 📦 Building for Production

```bash
# Build with real API
VITE_USE_MOCK_DATA=false yarn build

# Build with mock data (for demo sites)
VITE_USE_MOCK_DATA=true yarn build
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test with both mock and real API
4. Submit a pull request

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
