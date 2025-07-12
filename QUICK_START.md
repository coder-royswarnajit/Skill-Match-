# SkillSwap Platform - Quick Start

## 🚀 Getting Started

### Prerequisites
- Node.js 16 or higher
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Quick Start

1. **Start MongoDB** (if using local MongoDB)
   ```bash
   # On Windows
   mongod
   
   # On macOS (with Homebrew)
   brew services start mongodb-community
   
   # On Linux
   sudo systemctl start mongod
   ```

2. **Start the development servers**
   ```bash
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:backend` - Start only backend server
- `npm run dev:frontend` - Start only frontend server
- `npm run build` - Build frontend for production
- `npm run start` - Start backend in production mode

### First Steps

1. **Register an account** at http://localhost:3000/register
2. **Complete your profile** with your skills and learning goals
3. **Browse other students** at http://localhost:3000/browse
4. **Join discussions** at http://localhost:3000/discussions

### Features Available

✅ **User Authentication** - Register, login, logout
✅ **Profile Management** - Add skills, bio, social links
✅ **Student Search** - Find students by skills, location, university
✅ **Discussion Forum** - Ask questions, share knowledge
✅ **Dashboard** - View stats, recent activity, recommendations
✅ **Swap Requests** - Send and manage skill swap requests

### Database Setup

If you're using MongoDB Atlas:
1. Create a free cluster at https://cloud.mongodb.com
2. Get your connection string
3. Update `backend/.env` with your MongoDB URI

### Troubleshooting

- **Port already in use**: Change PORT in backend/.env
- **MongoDB connection failed**: Check your MongoDB URI in backend/.env
- **Frontend not loading**: Check if backend is running on port 5000

### Next Steps

- Set up email notifications
- Add real-time chat functionality
- Implement video call features
- Add mobile app

For detailed documentation, see the docs/ folder.
