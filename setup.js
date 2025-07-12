#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up SkillSwap Platform for Indian CS Students...\n');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m'
};

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

// Check if Node.js is installed
try {
  const nodeVersion = process.version;
  log(`✅ Node.js ${nodeVersion} detected`, 'green');
} catch (error) {
  log('❌ Node.js is not installed. Please install Node.js 16 or higher.', 'red');
  process.exit(1);
}

// Check if npm is available
try {
  execSync('npm --version', { stdio: 'ignore' });
  log('✅ npm is available', 'green');
} catch (error) {
  log('❌ npm is not available. Please install npm.', 'red');
  process.exit(1);
}

// Create .env files if they don't exist
const createEnvFile = (filePath, content) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    log(`✅ Created ${filePath}`, 'green');
  } else {
    log(`⚠️  ${filePath} already exists, skipping...`, 'yellow');
  }
};

// Backend .env
const backendEnvContent = `# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/skillswap
# For MongoDB Atlas, use: mongodb+srv://username:password@cluster.mongodb.net/skillswap

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Optional: Email Configuration (for future features)
# EMAIL_HOST=smtp.gmail.com
# EMAIL_PORT=587
# EMAIL_USER=your-email@gmail.com
# EMAIL_PASS=your-app-password

# Optional: Cloudinary Configuration (for image uploads)
# CLOUDINARY_CLOUD_NAME=your-cloud-name
# CLOUDINARY_API_KEY=your-api-key
# CLOUDINARY_API_SECRET=your-api-secret
`;

// Frontend .env
const frontendEnvContent = `# API Configuration
VITE_API_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=SkillSwap
VITE_APP_DESCRIPTION=Skill sharing platform for Indian CS students
`;

createEnvFile('backend/.env', backendEnvContent);
createEnvFile('frontend/.env', frontendEnvContent);

// Install dependencies
log('\n📦 Installing backend dependencies...', 'blue');
try {
  execSync('npm install', { cwd: 'backend', stdio: 'inherit' });
  log('✅ Backend dependencies installed', 'green');
} catch (error) {
  log('❌ Failed to install backend dependencies', 'red');
  process.exit(1);
}

log('\n📦 Installing frontend dependencies...', 'blue');
try {
  execSync('npm install', { cwd: 'frontend', stdio: 'inherit' });
  log('✅ Frontend dependencies installed', 'green');
} catch (error) {
  log('❌ Failed to install frontend dependencies', 'red');
  process.exit(1);
}

// Create uploads directory
const uploadsDir = path.join('backend', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  log('✅ Created uploads directory', 'green');
}

// Create package.json scripts
const updatePackageScripts = () => {
  const rootPackagePath = 'package.json';
  let rootPackage = {};

  if (fs.existsSync(rootPackagePath)) {
    rootPackage = JSON.parse(fs.readFileSync(rootPackagePath, 'utf8'));
  }

  rootPackage.scripts = {
    ...rootPackage.scripts,
    'dev': 'concurrently \"npm run dev:backend\" \"npm run dev:frontend\"',
    'dev:backend': 'cd backend && npm run dev',
    'dev:frontend': 'cd frontend && npm run dev',
    'build': 'cd frontend && npm run build',
    'start': 'cd backend && npm start',
    'install:all': 'npm install && cd backend && npm install && cd ../frontend && npm install'
  };

  fs.writeFileSync(rootPackagePath, JSON.stringify(rootPackage, null, 2));
  log('✅ Updated root package.json with scripts', 'green');
};

updatePackageScripts();

// Create README for quick start
const quickStartReadme = `# SkillSwap Platform - Quick Start

## 🚀 Getting Started

### Prerequisites
- Node.js 16 or higher
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Quick Start

1. **Start MongoDB** (if using local MongoDB)
   \`\`\`bash
   # On Windows
   mongod
   
   # On macOS (with Homebrew)
   brew services start mongodb-community
   
   # On Linux
   sudo systemctl start mongod
   \`\`\`

2. **Start the development servers**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Available Scripts

- \`npm run dev\` - Start both frontend and backend in development mode
- \`npm run dev:backend\` - Start only backend server
- \`npm run dev:frontend\` - Start only frontend server
- \`npm run build\` - Build frontend for production
- \`npm run start\` - Start backend in production mode

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
3. Update \`backend/.env\` with your MongoDB URI

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
`;

fs.writeFileSync('QUICK_START.md', quickStartReadme);
log('✅ Created QUICK_START.md', 'green');

// Final instructions
log('\n🎉 Setup completed successfully!', 'green');
log('\n📋 Next steps:', 'blue');
log('1. Start MongoDB (if using local MongoDB)', 'yellow');
log('2. Run: npm run dev', 'yellow');
log('3. Open http://localhost:3000 in your browser', 'yellow');
log('4. Register your first account', 'yellow');
log('\n📖 See QUICK_START.md for detailed instructions', 'blue');
log('\n🔧 Configuration files created:', 'blue');
log('   - backend/.env (update with your MongoDB URI)', 'yellow');
log('   - frontend/.env (ready to use)', 'yellow');

log('\n💡 Tips for Indian CS Students:', 'blue');
log('   - Add your university and major in your profile', 'yellow');
log('   - Include your GitHub, LinkedIn, and portfolio links', 'yellow');
log('   - Add skills you can teach and want to learn', 'yellow');
log('   - Join discussions about trending tech topics', 'yellow');
log('   - Connect with students from IITs, NITs, and other universities', 'yellow');

console.log('\n🚀 Happy skill swapping!'); 