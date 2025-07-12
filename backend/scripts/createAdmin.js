const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import User model
const User = require('../src/models/User');
const Profile = require('../src/models/Profile');

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/skill-swap');
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@skillswap.com' });
    if (existingAdmin) {
      console.log('❌ Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const adminUser = new User({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@skillswap.com',
      password: 'admin123456',
      studentId: '12345678',
      university: 'SkillSwap University',
      major: 'Computer Science',
      graduationYear: '2025',
      role: 'admin',
      isVerified: true
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully');

    // Create profile for admin
    const adminProfile = new Profile({
      userId: adminUser._id,
      bio: 'Platform Administrator',
      location: 'India',
      isPublic: true
    });

    await adminProfile.save();
    console.log('✅ Admin profile created successfully');

    console.log('\n🎉 Admin user setup complete!');
    console.log('📧 Email: admin@skillswap.com');
    console.log('🔑 Password: admin123456');
    console.log('\n⚠️  Remember to change the password after first login!');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

createAdminUser(); 