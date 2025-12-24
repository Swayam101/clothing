# Express TypeScript Scaffold

A modular and production-ready scaffold for building Node.js Express applications with TypeScript. This scaffold includes authentication, database integration, and a well-structured architecture to kickstart your API development.

## ✨ Features

- **TypeScript** - Full TypeScript support with strict mode
- **🔥 Firebase Authentication** - Unified auth for Google and Facebook sign-in
- **Role-Based Authorization** - JWT-based authorization with admin/user roles
- **Yup Validation** - Centralized request validation with Yup schemas
- **Database** - MongoDB integration with Mongoose ODM
- **Product Management** - Full CRUD with filtering, pagination, and search
- **Order Management** - Complete order system with status tracking
- **Payment Integration** - Cashfree Hosted Checkout integration
- **Webhook Handler** - Automatic order confirmation on payment success
- **Inventory Management** - Automatic stock reduction on payment
- **Error Handling** - Centralized error handling middleware
- **CORS** - Configurable CORS support
- **Modular Architecture** - Clean separation of concerns (routes, controllers, services, models)
- **Graceful Shutdown** - Handles SIGTERM and SIGINT signals properly
- **Health Check** - Built-in health check endpoint
- **Environment Configuration** - dotenv for environment variables
- **Async Wrapper** - Utility for handling async route errors

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose)
- **Authentication**: Firebase Auth + JWT
- **Payments**: Cashfree
- **Validation**: Yup
- **Development**: ts-node + Nodemon

## 📁 Project Structure

```
src/
├── config/          # Configuration files (database, env)
├── controllers/     # Request handlers
│   ├── auth/        # Authentication controllers
│   ├── orders/      # Order management controllers
│   ├── payments/    # Payment controllers
│   ├── products/    # Product controllers
│   └── webhooks/    # Webhook handlers
├── dao/             # Data access layer
├── middleware/      # Custom middleware (auth, error handling, admin check)
├── models/          # Database models (User, Product, Order)
├── routes/          # API routes
├── scripts/         # Utility scripts (seeders)
├── services/        # Business logic layer
│   ├── auth/        # Auth services
│   ├── orders/      # Order services
│   ├── payments/    # Payment services (Cashfree)
│   └── products/    # Product services
├── types/           # TypeScript type definitions
├── utils/           # Utility functions (logger, response helpers)
├── app.ts           # Express app setup
└── index.ts         # Server entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or remote instance)
- Yarn or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd node-express-scaffold
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

**Note:** The project includes Cashfree payment integration. Make sure to install the required package:
```bash
yarn add cashfree-pg
# or
npm install cashfree-pg
```

3. Set up environment variables:

**For Development:**
```bash
cp .env.development.example .env.development
```

**For Production:**
```bash
cp env.example .env
```

4. Update the environment files with your configuration:

**Development (`.env.development`):**
```env
PORT=3000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/express-scaffold-dev
JWT_SECRET=dev-secret-key-change-this
JWT_EXPIRES_IN=7d

# Firebase Authentication (supports Google and Facebook)
FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json

CORS_ORIGIN=*
CF_ENVIRONMENT=sandbox
CF_CLIENT_ID=your_cashfree_app_id
CF_CLIENT_SECRET=your_cashfree_secret_key
CF_RETURN_URL=http://localhost:3000/payment-result
```

**Production (`.env`):**
```env
PORT=3000
NODE_ENV=production
DATABASE_URL=mongodb://your-production-db-url
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://yourdomain.com
```

### Running the Application

**Development mode** (with auto-restart using nodemon):
```bash
npm run dev
# or
yarn dev
```

This starts the server with:
- ✅ **Auto-restart** on file changes
- ✅ **TypeScript** support via ts-node
- ✅ **Development environment** (.env.development)
- ✅ **Fast reload** with nodemon

**See [NODEMON_GUIDE.md](./NODEMON_GUIDE.md) for configuration details.**

**Production mode** (uses `.env`):
```bash
# Build the project
npm run build
# or
yarn build

# Start the server
npm start
# or
yarn start
```

**Run built code in development** (uses `.env.development`):
```bash
npm run start:dev
# or
yarn start:dev
```

The server will start on `http://localhost:3000` (or your configured PORT).

> **Note:** The application automatically loads the correct environment file based on `NODE_ENV`:
> - `development` → `.env.development`
> - `production` → `.env`

### Cashfree Payment Setup

To enable payment processing, you need to:

1. **Create a Cashfree account** at [cashfree.com](https://www.cashfree.com)
2. **Get your API credentials** from the Cashfree dashboard
3. **Configure environment variables** with your Cashfree keys
4. **Set up webhooks** (optional but recommended for production)

**Important Security Notes:**
- Never expose your Cashfree secret key in frontend code
- Always create orders on the backend only
- Verify payment status server-side before fulfilling orders
- Use sandbox environment for testing before going live

### Seeding Demo Data

After setting up your database, you can populate it with demo product data:

```bash
yarn seed
```

This will create sample clothing products including t-shirts, jeans, dresses, jackets, and accessories with various styles, colors, and sizes. The seeding script includes:

- **15+ unique products** across different categories
- **Multiple sizes** for popular items
- **Featured products** for highlighting
- **Realistic pricing and stock levels**
- **High-quality sample images** from Unsplash

The script will skip seeding if products already exist in the database to prevent duplicates.

## ✅ Validation System

This project uses **Yup** for request validation with a centralized middleware approach.

**📖 Complete Validation Guide:** See [VALIDATION_GUIDE.md](./VALIDATION_GUIDE.md) for:
- How to create validation schemas
- Using the validation middleware
- Available validation methods
- Error handling
- Best practices

**Key Benefits:**
- ✅ Separation of concerns (Mongoose for data, Yup for validation)
- ✅ Clear, descriptive error messages
- ✅ Automatic input sanitization and transformation
- ✅ Type-safe with TypeScript
- ✅ Reusable validation schemas

**Example Usage:**
```typescript
import { validate, createProductSchema } from '../validations';

router.post('/products', validate(createProductSchema), createProduct);
```

**Validation Response:**
```json
{
  "success": false,
  "error": "Validation failed",
  "data": {
    "validationErrors": {
      "email": "Please provide a valid email address",
      "password": "Password must be at least 6 characters long"
    }
  }
}
```

## 📡 API Documentation

**📖 Complete API Documentation for Frontend:** See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for comprehensive frontend integration guide with:
- All API endpoints with detailed examples
- Request/response formats
- TypeScript interfaces
- Frontend integration examples (Fetch, Axios, React)
- Cashfree payment integration guide
- Error handling best practices

### Quick API Endpoints Overview

### Health Check
```
GET /health
```
Returns server health status.

### Authentication

#### 🔥 Firebase Authentication (Unified Endpoint)

**Single endpoint supports Google and Facebook sign-in!**

```
POST /api/auth/firebase
Content-Type: application/json

{
  "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6...",
  "displayName": "John Doe",
  "photoURL": "https://example.com/photo.jpg"
}
```

**Request Fields:**
- `idToken` (required) - Firebase ID token from client
- `displayName` (optional) - User's display name
- `photoURL` (optional) - User's profile picture URL

**Success Response (200):**
```json
{
  "success": true,
  "message": "Authentication successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "name": "John Doe",
      "profilePicture": "https://example.com/photo.jpg",
      "role": "user",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    "isNewUser": false
  }
}
```

#### Get Profile (Protected)
```
GET /api/auth/profile
Authorization: Bearer <your-jwt-token>
```

**📖 Complete Firebase Auth Guide:** See [FIREBASE_AUTH_GUIDE.md](./FIREBASE_AUTH_GUIDE.md) for:
- Firebase project setup
- Google and Facebook configuration
- Service account key generation
- Frontend integration examples (React)
- Security best practices
- Troubleshooting common issues

### Products

#### Get All Products (Public)
```
GET /api/products
```
Returns a paginated list of products. Supports query parameters:
- `?style=<string>` - Filter by style
- `?color=<string>` - Filter by color
- `?size=<string>` - Filter by size
- `?condition=<string>` - Filter by condition
- `?featured=<boolean>` - Filter by featured status
- `?search=<string>` - Search across title, description, style, fabric
- `?page=<number>` - Page number (default: 1)
- `?limit=<number>` - Items per page (default: 10, max: 100)

#### Get Product by ID (Public)
```
GET /api/products/:id
```
Returns a single product by ID.

#### Create Product (Admin Only)
```
POST /api/products
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "Cotton T-Shirt",
  "color": "Blue",
  "condition": "New",
  "price": 29.99,
  "instock": 100,
  "fabric": "Cotton",
  "description": "Comfortable cotton t-shirt",
  "style": "Casual",
  "size": "M",
  "featured": false,
  "image": "https://example.com/image.jpg"
}
```

#### Update Product (Admin Only)
```
PUT /api/products/:id
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "Updated T-Shirt",
  "price": 34.99
}
```

#### Delete Product (Admin Only)
```
DELETE /api/products/:id
Authorization: Bearer <your-jwt-token>
```

#### Update Product Stock (Admin Only)
```
PATCH /api/products/:id/stock
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "instock": 150
}
```

### Payments (Cashfree Integration)

#### Create Payment Order (Admin Only)
```
POST /api/payments/create-order
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "amount": 100,
  "orderId": "order_1234567890",
  "customer": {
    "id": "cust_123",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9999999999"
  }
}
```

#### Verify Payment Order (Admin Only)
```
GET /api/payments/verify/:orderId
Authorization: Bearer <your-jwt-token>
```

### Orders

#### Create Order (Authenticated Users)
```
POST /api/orders
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "items": [
    {
      "product": "product_id_here",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001",
    "country": "India"
  },
  "billingAddress": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001",
    "country": "India"
  },
  "paymentMethod": "cashfree",
  "customerNotes": "Please handle with care"
}
```

#### Get User Orders (Authenticated Users)
```
GET /api/orders
Authorization: Bearer <your-jwt-token>
```
Query parameters: `?status=pending&page=1&limit=10&startDate=2024-01-01&endDate=2024-12-31`

#### Get Order by ID (Authenticated Users)
```
GET /api/orders/:id
Authorization: Bearer <your-jwt-token>
```

#### Update Order (Admin Only)
```
PUT /api/orders/:id
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "status": "shipped",
  "trackingNumber": "TRACK123",
  "shippingCarrier": "FedEx"
}
```

#### Get All Orders (Admin Only)
```
GET /api/orders/admin/all
Authorization: Bearer <your-jwt-token>
```

#### Get Order Statistics (Admin Only)
```
GET /api/orders/admin/stats
Authorization: Bearer <your-jwt-token>
```

## 🔐 Authentication & Authorization

This application uses **OAuth 2.0 (Google Sign-In)** for authentication with a simple, unified user model:

### 🔥 Firebase Authentication Providers
- ✅ **Google** - Fully implemented
- ✅ **Facebook** - Fully implemented

**Benefits:**
- Single unified endpoint for all providers
- Firebase manages OAuth flows
- Automatic token verification
- Easy to add more providers (Apple, GitHub, Twitter, etc.)

### Simplified Architecture
- ✅ Single User collection (no separate social accounts table)
- ✅ Provider info stored directly in user document
- ✅ Fast queries with no joins needed
- ✅ Easy to understand and maintain

### How It Works
1. User signs in with Google (frontend gets ID token)
2. Frontend sends ID token to backend
3. Backend verifies token with Google
4. Backend creates/updates user with provider info
5. Backend issues JWT token for API access

### JWT Tokens
After successful OAuth authentication, you'll receive a JWT token that must be included in the `Authorization` header for protected routes:

```
Authorization: Bearer <your-jwt-token>
```

**📖 Complete Guide:** See [OAUTH_GUIDE.md](./OAUTH_GUIDE.md) for detailed OAuth implementation details.

## 📝 Available Scripts

- `yarn dev` - Run the app in development mode with ts-node (uses `.env.development`)
- `yarn build` - Compile TypeScript to JavaScript
- `yarn start` - Run the compiled app in production mode (uses `.env`)
- `yarn start:dev` - Run the compiled app in development mode (uses `.env.development`)
- `yarn clean` - Remove the dist folder
- `yarn seed` - Seed the database with demo product data
- `yarn test` - Run tests (to be implemented)

## 🏗️ Architecture

This scaffold follows a layered architecture:

- **Routes** - Define API endpoints and map them to controllers
- **Controllers** - Handle HTTP requests/responses
- **Services** - Contain business logic
- **Models** - Define database schemas
- **Middleware** - Handle cross-cutting concerns (auth, error handling)
- **Utils** - Reusable utility functions

## 🔧 Configuration

All configuration is managed through environment-specific files:

### Environment Files

- **`.env.development`** - Used when `NODE_ENV=development` (for local development)
- **`.env`** - Used when `NODE_ENV=production` (for production deployments)
- **`env.example`** - Template for production environment
- **`.env.development.example`** - Template for development environment

The application automatically loads the correct file based on the `NODE_ENV` variable. This is handled in `src/config/index.ts`.

### Configuration Variables

See the example files for all available configuration options:
- Server configuration (PORT, NODE_ENV)
- Database connection (DATABASE_URL)
- JWT settings (JWT_SECRET, JWT_EXPIRES_IN)
- CORS settings (CORS_ORIGIN)
- API versioning (API_VERSION)

## 📋 Codebase Status & Roadmap

### ✅ **IMPLEMENTATION COMPLETE!**

**🎉 Latest Update:** All critical features have been implemented!

See [IMPLEMENTATION_COMPLETE.md](./IMPLEMENTATION_COMPLETE.md) for detailed documentation on:
- ✅ Role-based authentication (admin/user)
- ✅ Admin authorization middleware
- ✅ Payment-order integration
- ✅ Cashfree webhook handler
- ✅ Automatic inventory management
- ✅ Protected admin routes
- ✅ Admin seeding script

### Quick Start for New Features

1. **Create Admin User:**
```bash
npm run seed:admin
```
Default credentials: `admin@clothing.com` / `Admin@123456`

2. **Test Flow:**
   - Register user → Login → Browse products
   - Create order → Payment automatically created
   - Webhook updates order → Stock reduced automatically

**📊 Previous Analysis:** See [CODEBASE_ANALYSIS.md](./CODEBASE_ANALYSIS.md) for historical analysis and future improvements.

**Production Readiness:** ~85% ⬆️
- ✅ Role-based authentication
- ✅ Admin authorization system
- ✅ Complete e-commerce API
- ✅ Payment integration (Cashfree)
- ✅ Inventory management
- ✅ Webhook handling
- ⚠️ Testing suite (optional)
- ⚠️ Advanced security features (future)

## 🤝 Contributing

Feel free to fork this project and customize it for your needs. This is a scaffold meant to be adapted to your specific requirements.

## 📄 License

ISC

## 👤 Author

swayam

---

**Happy Coding! 🚀**

