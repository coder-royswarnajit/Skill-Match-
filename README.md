# Skill Swap Platform

A modern web application that enables users to list their skills and request others in return. Built with React, Node.js, and MongoDB.

## 🚀 Features

### User Features
- **User Authentication**: Secure registration and login with JWT
- **Profile Management**: Create and manage your profile with skills
- **Skill Listing**: List skills you can offer and skills you want to learn
- **User Discovery**: Browse and search for users by skills and location
- **Swap Requests**: Create and manage skill swap requests
- **Rating System**: Rate and review completed swaps
- **Availability Scheduling**: Set your availability for skill exchanges
- **Real-time Notifications**: Get notified about swap requests and updates

### Admin Features
- **User Management**: Monitor and manage user accounts
- **Skill Moderation**: Approve or reject skill submissions
- **Platform Analytics**: View platform statistics and reports
- **Content Moderation**: Ban users who violate platform policies

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hook Form** - Form handling and validation
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Toast notifications
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Joi** - Request validation
- **Multer** - File upload handling
- **Winston** - Logging
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Additional Services
- **Cloudinary** - Image storage (optional)
- **Nodemailer** - Email service (optional)
- **MongoDB Atlas** - Cloud database hosting

## 📁 Project Structure

```
skill-swap-platform/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── context/          # React context providers
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service functions
│   │   ├── styles/           # CSS and styling
│   │   ├── utils/            # Utility functions
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Application entry point
│   ├── public/               # Static assets
│   ├── package.json          # Frontend dependencies
│   └── vite.config.js        # Vite configuration
├── backend/                  # Node.js backend API
│   ├── src/
│   │   ├── controllers/      # API route controllers
│   │   ├── middleware/       # Express middleware
│   │   ├── models/           # MongoDB models
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic services
│   │   ├── utils/            # Utility functions
│   │   └── app.js            # Express application
│   ├── uploads/              # File upload directory
│   ├── package.json          # Backend dependencies
│   └── env.example           # Environment variables template
└── docs/                     # Documentation
    ├── API.md                # API documentation
    ├── SETUP.md              # Setup guide
    └── DEPLOYMENT.md         # Deployment guide
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skill-swap-platform
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📖 Documentation

- **[API Documentation](./docs/API.md)** - Complete API reference
- **[Setup Guide](./docs/SETUP.md)** - Detailed installation instructions
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Production deployment guide

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/skill-swap

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Frontend URL
FRONTEND_URL=http://localhost:3000

```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🎯 Core Features Implementation

### User Authentication
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- Token refresh mechanism

### Profile Management
- User profiles with skills
- Profile photo upload
- Availability scheduling
- Public/private profile settings

### Skill Swap System
- Create swap requests
- Accept/reject swaps
- Track swap status
- Rating and review system

### Search and Discovery
- User search by skills
- Location-based filtering
- Skill-based filtering
- Pagination support

### Admin Panel
- User management
- Skill moderation
- Platform analytics
- Report generation

## 🔒 Security Features

- JWT authentication
- Password hashing
- Input validation
- Rate limiting
- CORS protection
- Helmet security headers
- Environment variable protection

## 🧪 Testing

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

## 🚀 Deployment

### Backend Deployment Options
- Heroku
- Railway
- DigitalOcean App Platform
- AWS Elastic Beanstalk

### Frontend Deployment Options
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Database
- MongoDB Atlas (recommended)
- Self-hosted MongoDB

See [Deployment Guide](./docs/DEPLOYMENT.md) for detailed instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the fast build tool
- Tailwind CSS for the utility-first CSS framework
- MongoDB team for the database
- All contributors and supporters

## 📞 Support

If you have any questions or need help:

1. Check the [documentation](./docs/)
2. Search existing [issues](../../issues)
3. Create a new issue with detailed information

## 🔄 Roadmap

### Planned Features
- [ ] Real-time chat between users
- [ ] Video call integration
- [ ] Mobile app (React Native)
- [ ] Advanced search filters
- [ ] Skill verification system
- [ ] Payment integration for premium features
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Push notifications
- [ ] Social media integration

### Performance Improvements
- [ ] Database query optimization
- [ ] Caching implementation
- [ ] Image optimization
- [ ] Code splitting
- [ ] Lazy loading

---
