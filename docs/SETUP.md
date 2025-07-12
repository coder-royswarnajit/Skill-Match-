# Skill Swap Platform Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd skill-swap-platform
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp env.example .env

# Edit .env file with your configuration
# See Environment Variables section below

# Start development server
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file (optional)
# Create .env file if you need to override default API URL

# Start development server
npm run dev
```

## Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/skill-swap

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Cloudinary Configuration (Optional)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Logging
LOG_LEVEL=info
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

## Database Setup

### MongoDB Local Installation

1. Download and install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Create database: `skill-swap`

### MongoDB Atlas (Cloud)

1. Create account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string and update `MONGODB_URI` in backend `.env`

## Running the Application

### Development Mode

1. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on: http://localhost:5000

2. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on: http://localhost:3000

### Production Mode

1. **Build Frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start Backend:**
   ```bash
   cd backend
   npm start
   ```

## Project Structure

```
skill-swap-platform/
├── backend/
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utilities
│   │   └── app.js           # Main app file
│   ├── uploads/             # File uploads
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── context/         # React context
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── styles/          # CSS styles
│   │   ├── utils/           # Utilities
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   └── package.json
└── docs/                    # Documentation
```

## API Endpoints

The backend provides the following main API endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `GET /api/profile/me` - Get user profile
- `PUT /api/profile/me` - Update user profile
- `POST /api/swaps` - Create swap request
- `GET /api/swaps` - Get user swaps
- `GET /api/users/search` - Search users

See [API.md](./API.md) for complete API documentation.

## Features

### User Features
- User registration and authentication
- Profile management with skills
- Browse and search other users
- Create and manage swap requests
- Rate and review completed swaps
- Availability scheduling

### Admin Features
- User management
- Skill moderation
- Platform analytics
- Report generation

## Development

### Adding New Features

1. **Backend:**
   - Add model in `src/models/`
   - Add controller in `src/controllers/`
   - Add routes in `src/routes/`
   - Update validation schemas

2. **Frontend:**
   - Add components in `src/components/`
   - Add pages in `src/pages/`
   - Add services in `src/services/`
   - Update routing in `App.jsx`

### Code Style

- Use ESLint for JavaScript/React linting
- Follow consistent naming conventions
- Add comments for complex logic
- Use TypeScript for better type safety (optional)

## Testing

### Backend Testing

```bash
cd backend
npm test
```

### Frontend Testing

```bash
cd frontend
npm test
```

## Deployment

### Backend Deployment

1. Set environment variables for production
2. Build the application
3. Deploy to platform (Heroku, Railway, etc.)

### Frontend Deployment

1. Build the application: `npm run build`
2. Deploy to platform (Vercel, Netlify, etc.)
3. Set environment variables

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error:**
   - Check if MongoDB is running
   - Verify connection string in `.env`
   - Check network connectivity

2. **JWT Token Issues:**
   - Verify `JWT_SECRET` is set
   - Check token expiration settings

3. **CORS Errors:**
   - Verify `FRONTEND_URL` in backend `.env`
   - Check CORS configuration in `app.js`

4. **File Upload Issues:**
   - Check upload directory permissions
   - Verify Cloudinary configuration (if using)

### Getting Help

- Check the logs for error messages
- Review the API documentation
- Check environment variable configuration
- Ensure all dependencies are installed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. 