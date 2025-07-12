# Skill Swap Platform Deployment Guide

## Overview

This guide covers deploying the Skill Swap Platform to various cloud platforms for production use.

## Prerequisites

- Git repository with the project code
- Cloud platform accounts (Heroku, Railway, Vercel, etc.)
- MongoDB database (Atlas recommended for production)
- Environment variables configured

## Backend Deployment

### Option 1: Heroku

1. **Install Heroku CLI:**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku:**
   ```bash
   heroku login
   ```

3. **Create Heroku App:**
   ```bash
   cd backend
   heroku create your-skill-swap-backend
   ```

4. **Add MongoDB Add-on:**
   ```bash
   heroku addons:create mongolab:sandbox
   ```

5. **Set Environment Variables:**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-production-jwt-secret
   heroku config:set FRONTEND_URL=https://your-frontend-domain.com
   ```

6. **Deploy:**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Option 2: Railway

1. **Connect Repository:**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository
   - Select the backend directory

2. **Add MongoDB:**
   - Add MongoDB plugin from Railway marketplace
   - Copy connection string to environment variables

3. **Set Environment Variables:**
   ```env
   NODE_ENV=production
   JWT_SECRET=your-production-jwt-secret
   FRONTEND_URL=https://your-frontend-domain.com
   ```

4. **Deploy:**
   - Railway will automatically deploy on push to main branch

### Option 3: DigitalOcean App Platform

1. **Create App:**
   - Go to DigitalOcean App Platform
   - Connect your repository
   - Select Node.js environment

2. **Configure Environment:**
   - Set build command: `npm install`
   - Set run command: `npm start`
   - Add environment variables

3. **Add Database:**
   - Create managed MongoDB database
   - Link to your app

## Frontend Deployment

### Option 1: Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd frontend
   vercel
   ```

3. **Set Environment Variables:**
   ```env
   VITE_API_URL=https://your-backend-domain.com/api
   ```

### Option 2: Netlify

1. **Build Locally:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy:**
   - Drag and drop `dist` folder to Netlify
   - Or connect repository for automatic deployment

3. **Set Environment Variables:**
   - Go to Site Settings > Environment Variables
   - Add `VITE_API_URL`

### Option 3: GitHub Pages

1. **Update package.json:**
   ```json
   {
     "homepage": "https://yourusername.github.io/skill-swap",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

2. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

## Database Setup

### MongoDB Atlas (Recommended)

1. **Create Cluster:**
   - Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Create a new cluster (M0 free tier available)

2. **Configure Network Access:**
   - Add your IP address or `0.0.0.0/0` for all IPs

3. **Create Database User:**
   - Create a database user with read/write permissions

4. **Get Connection String:**
   - Copy the connection string
   - Replace `<password>` with your database password
   - Add to environment variables as `MONGODB_URI`

### Local MongoDB (Development Only)

Not recommended for production due to:
- No automatic backups
- No scaling capabilities
- Manual maintenance required

## Environment Variables

### Production Backend Variables

```env
# Server
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skill-swap

# JWT
JWT_SECRET=your-super-secure-production-jwt-secret
JWT_EXPIRES_IN=7d

# Frontend
FRONTEND_URL=https://your-frontend-domain.com

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Cloudinary (Optional)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Logging
LOG_LEVEL=error
```

### Production Frontend Variables

```env
VITE_API_URL=https://your-backend-domain.com/api
```

## SSL/HTTPS Configuration

### Automatic (Recommended)
Most cloud platforms provide automatic SSL certificates:
- Heroku: Automatic with custom domains
- Railway: Automatic
- Vercel: Automatic
- Netlify: Automatic

### Manual Configuration
If using a VPS or custom server:

1. **Install Certbot:**
   ```bash
   sudo apt-get update
   sudo apt-get install certbot
   ```

2. **Generate Certificate:**
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

3. **Auto-renewal:**
   ```bash
   sudo crontab -e
   # Add: 0 12 * * * /usr/bin/certbot renew --quiet
   ```

## Domain Configuration

### Custom Domain Setup

1. **Purchase Domain:**
   - Use providers like Namecheap, GoDaddy, or Google Domains

2. **Configure DNS:**
   - Point to your hosting provider's nameservers
   - Or create CNAME records pointing to your app URLs

3. **Update Environment Variables:**
   - Update `FRONTEND_URL` in backend
   - Update `VITE_API_URL` in frontend

## Monitoring and Logging

### Application Monitoring

1. **Error Tracking:**
   - Set up Sentry for error monitoring
   - Configure Winston logger for file logging

2. **Performance Monitoring:**
   - Use New Relic or DataDog
   - Monitor response times and error rates

3. **Health Checks:**
   - Implement `/api/health` endpoint
   - Set up uptime monitoring

### Database Monitoring

1. **MongoDB Atlas:**
   - Built-in monitoring and alerts
   - Performance advisor
   - Query optimization suggestions

2. **Backup Strategy:**
   - Enable automatic backups
   - Test restore procedures regularly

## Security Considerations

### Environment Variables
- Never commit `.env` files to version control
- Use secure random strings for JWT secrets
- Rotate secrets regularly

### Database Security
- Use strong passwords
- Enable network access restrictions
- Regular security updates

### API Security
- Implement rate limiting
- Use HTTPS only
- Validate all inputs
- Sanitize user data

### CORS Configuration
```javascript
// Backend CORS setup
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

## Scaling Considerations

### Horizontal Scaling
- Use load balancers for multiple instances
- Implement session management (Redis)
- Database connection pooling

### Vertical Scaling
- Increase server resources as needed
- Monitor resource usage
- Optimize database queries

### Caching
- Implement Redis for session storage
- Cache frequently accessed data
- Use CDN for static assets

## Backup and Recovery

### Database Backups
1. **MongoDB Atlas:**
   - Automatic daily backups
   - Point-in-time recovery
   - Cross-region backup copies

2. **Manual Backups:**
   ```bash
   mongodump --uri="your-connection-string"
   ```

### Application Backups
1. **Code:**
   - Use Git for version control
   - Tag releases for easy rollback

2. **Files:**
   - Backup uploaded files
   - Use cloud storage (S3, Cloudinary)

## Troubleshooting

### Common Deployment Issues

1. **Build Failures:**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Check for syntax errors

2. **Environment Variables:**
   - Verify all required variables are set
   - Check for typos in variable names
   - Ensure proper formatting

3. **Database Connection:**
   - Verify connection string format
   - Check network access settings
   - Test connection locally

4. **CORS Errors:**
   - Verify FRONTEND_URL is correct
   - Check CORS configuration
   - Ensure HTTPS/HTTP consistency

### Performance Issues

1. **Slow Response Times:**
   - Optimize database queries
   - Implement caching
   - Check server resources

2. **Memory Leaks:**
   - Monitor memory usage
   - Implement proper cleanup
   - Use profiling tools

## Maintenance

### Regular Tasks
- Monitor error logs
- Update dependencies
- Review security patches
- Backup verification
- Performance monitoring

### Updates
- Plan maintenance windows
- Test updates in staging
- Rollback procedures
- Communication with users

## Cost Optimization

### Free Tier Options
- Heroku: Free tier available
- Railway: Free tier available
- Vercel: Free tier available
- MongoDB Atlas: M0 free tier

### Paid Services
- Scale based on usage
- Monitor costs regularly
- Optimize resource usage
- Consider reserved instances

## Support and Resources

### Documentation
- Platform-specific documentation
- API documentation
- Troubleshooting guides

### Community
- Stack Overflow
- GitHub issues
- Platform support forums

### Professional Support
- Platform support plans
- Database support
- Third-party services support 