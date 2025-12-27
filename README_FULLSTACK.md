# GATE Quiz App - Full Stack

A comprehensive full-stack quiz application for GATE exam preparation with authentication, user management, and questions from Computer Science, Data Science & AI, and General Aptitude sections.

## 🏗️ Correct Project Structure

```
Gate_Quiz_App/                          # Root directory
├── package.json                        # Root package.json (dev tools)
├── node_modules/                       # Root dependencies (concurrently)
├── README.md
├── .gitignore
│
├── client/                             # React Frontend
│   ├── package.json                    # Client dependencies
│   ├── node_modules/                   # Client node_modules (React, etc.)
│   ├── public/                         # React public folder
│   │   └── index.html
│   ├── src/                            # React source code
│   │   ├── components/                 # React components
│   │   ├── context/                    # Auth & Paper context
│   │   ├── App.js                      # Main App component
│   │   ├── index.js                    # React entry point
│   │   └── ...
│   └── build/                          # Production build (after build)
│
└── server/                             # Node.js Backend
    ├── package.json                    # Server dependencies
    ├── node_modules/                   # Server node_modules (Express, etc.)
    ├── .env                            # Environment variables
    ├── server.js                       # Main server file
    ├── models/                         # MongoDB models
    ├── routes/                         # API routes
    ├── middleware/                     # Custom middleware
    └── utils/                          # Utility functions
```

## 📁 Node Modules Location

### ✅ Correct Setup (3 node_modules folders):

1. **Root `node_modules/`**: Contains development tools
   - `concurrently` (for running client + server together)
   - Other dev dependencies

2. **Client `node_modules/`**: Contains React dependencies
   - `react`, `react-dom`, `react-router-dom`
   - `axios` (for API calls)
   - `react-scripts` (Create React App)

3. **Server `node_modules/`**: Contains Node.js dependencies
   - `express`, `mongoose`, `bcryptjs`
   - `jsonwebtoken`, `cors`, `helmet`
   - `nodemon` (dev dependency)

## 🚀 Installation & Setup

### 1. Install Root Dependencies
```bash
# In root directory
npm install
```

### 2. Install Client Dependencies
```bash
# Install client dependencies
npm run install-client
# OR manually:
cd client && npm install && cd ..
```

### 3. Install Server Dependencies
```bash
# Install server dependencies
npm run install-server
# OR manually:
cd server && npm install && cd ..
```

### 4. Install All at Once
```bash
# Install everything with one command
npm run install-all
```

## 🔧 Development Commands

### Start Both Client & Server
```bash
npm run dev
# This runs both:
# - React app on http://localhost:3000
# - Node.js API on http://localhost:5000
```

### Start Individually
```bash
# Start only React client
npm run client

# Start only Node.js server
npm run server
```

## 🎯 Key Features

### Frontend (React)
- Authentication system (Login/Register)
- Protected routes for quiz access
- User dashboard and profile management
- Responsive design for all devices

### Backend (Node.js + Express)
- RESTful API with JWT authentication
- MongoDB integration for user data
- Security features (rate limiting, password hashing)
- User statistics and performance tracking

### Database (MongoDB)
- User profiles and preferences
- Quiz performance analytics
- Secure authentication data

## 🔐 Environment Setup

Create `server/.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/gate-quiz
JWT_SECRET=your-super-secret-jwt-key-here
CLIENT_URL=http://localhost:3000
```

## 📜 Package.json Files

### Root package.json
- Contains `concurrently` for development
- Scripts to manage both client and server
- No React or Express dependencies

### Client package.json
- React and related frontend dependencies
- Build scripts for production
- Development server configuration

### Server package.json
- Express, MongoDB, authentication dependencies
- Server-specific scripts and configuration
- Production and development modes

## ✅ Verification Checklist

- [ ] `public/` and `src/` folders are ONLY in `client/` directory
- [ ] Root directory has NO React-related files
- [ ] Three separate `node_modules/` folders exist
- [ ] Each `package.json` has appropriate dependencies
- [ ] Environment variables configured in `server/.env`
- [ ] MongoDB running (local or cloud)

## 🚀 Quick Start

```bash
# 1. Clone and navigate
git clone <repo-url>
cd Gate_Quiz_App

# 2. Install all dependencies
npm run install-all

# 3. Setup environment
cp server/.env.example server/.env
# Edit server/.env with your MongoDB URI and JWT secret

# 4. Start development
npm run dev

# 5. Open browser
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
```

This structure follows full-stack best practices with clear separation between frontend and backend code, proper dependency management, and scalable architecture.
