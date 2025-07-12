import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Code, 
  Users, 
  TrendingUp, 
  BookOpen, 
  Target, 
  Award,
  GraduationCap,
  Briefcase,
  Globe,
  Zap,
  Star,
  ArrowRight,
  Search,
  Filter
} from 'lucide-react';
import { getPopularSkills, getTrendingSkills, getCareerPathSuggestions, getInterviewResources } from '../services/skills';
import { motion } from 'framer-motion'

const Home = () => {
  const [popularSkills, setPopularSkills] = useState([]);
  const [trendingSkills, setTrendingSkills] = useState([]);
  const [careerPaths, setCareerPaths] = useState([]);
  const [interviewResources, setInterviewResources] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [popularRes, trendingRes] = await Promise.all([
          getPopularSkills(),
          getTrendingSkills()
        ]);
        
        setPopularSkills(popularRes.data || []);
        setTrendingSkills(trendingRes.data || []);
        setCareerPaths(getCareerPathSuggestions());
        setInterviewResources(getInterviewResources());
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Skill Exchange",
      description: "Trade your programming skills with other CS students. Learn Python while teaching someone React!"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Student Network",
      description: "Connect with students from IITs, NITs, and top universities across India"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Career Growth",
      description: "Build your portfolio and get ready for placements with real-world projects"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Discussion Forum",
      description: "Ask questions, share knowledge, and discuss the latest in tech"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Interview Prep",
      description: "Practice with peers and get ready for technical interviews"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Hackathon Teams",
      description: "Find teammates for hackathons and build amazing projects together"
    }
  ];

  const stats = [
    { number: "500+", label: "CS Students" },
    { number: "50+", label: "Skills Available" },
    { number: "100+", label: "Universities" },
    { number: "1000+", label: "Skill Swaps" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 60 }}
      transition={{ type: 'spring', stiffness: 80, damping: 18 }}
      className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden"
    >
      {/* Animated background shapes */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.10 }}
        transition={{ delay: 0.2, duration: 1.2, type: 'spring' }}
        className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-blue-400 via-purple-400 to-white z-0"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.10 }}
        transition={{ delay: 0.4, duration: 1.2, type: 'spring' }}
        className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-purple-200 via-blue-200 to-white z-0"
      />
      {/* Hero Section */}
      <motion.section
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
        className="relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7, type: 'spring' }}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SkillSwap
              </span>
              <br />
              <span className="text-3xl md:text-4xl text-gray-700">
                for CS Students
              </span>
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7, type: 'spring' }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Connect with fellow computer science students across India. Exchange skills, 
              build projects, and prepare for your dream tech career together.
            </motion.p>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7, type: 'spring' }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Get Started Free
              </Link>
              <Link
                to="/browse"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Browse Skills
              </Link>
            </motion.div>
          </div>
        </div>
        {/* Floating elements */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 0.18 }}
          transition={{ delay: 0.6, duration: 1.2, type: 'spring' }}
          className="absolute top-20 left-10"
        >
          <div className="bg-blue-100 p-3 rounded-full">
            <Code className="w-6 h-6 text-blue-600" />
          </div>
        </motion.div>
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 0.18 }}
          transition={{ delay: 0.8, duration: 1.2, type: 'spring' }}
          className="absolute top-40 right-20"
        >
          <div className="bg-purple-100 p-3 rounded-full">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
        </motion.div>
      </motion.section>
      {/* Stats Section */}
      <motion.section
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7, type: 'spring' }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6, type: 'spring' }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7, type: 'spring' }}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose SkillSwap?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built specifically for Indian CS students to accelerate their learning and career growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6, type: 'spring' }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Popular Skills Section */}
      <motion.section
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7, type: 'spring' }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Skills in Demand
            </h2>
            <p className="text-xl text-gray-600">
              These are the most sought-after skills among Indian CS students
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {popularSkills.slice(0, 12).map((skill, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6, type: 'spring' }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg text-center hover:from-blue-100 hover:to-purple-100 transition-all duration-300"
              >
                <div className="font-semibold text-gray-800">{skill}</div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              to="/browse"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All Skills <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Career Paths Section */}
      <motion.section
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7, type: 'spring' }}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Career Paths
            </h2>
            <p className="text-xl text-gray-600">
              Discover the skills you need for your dream tech career
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careerPaths.map((career, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6, type: 'spring' }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <Briefcase className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">{career.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{career.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Key Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {career.skills.slice(0, 3).map((skill, skillIndex) => (
                      <span key={skillIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Top Companies:</h4>
                  <div className="text-sm text-gray-600">
                    {career.companies.slice(0, 3).join(', ')}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Trending Skills Section */}
      <motion.section
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7, type: 'spring' }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trending Skills
            </h2>
            <p className="text-xl text-gray-600">
              Skills that students are most interested in learning
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingSkills.slice(0, 8).map((skill, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6, type: 'spring' }}
                className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">{skill.name}</h3>
                  <Star className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="text-sm text-gray-600">
                  {skill.count} students want to learn
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Interview Resources Section */}
      <motion.section
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.7, type: 'spring' }}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Interview Preparation
            </h2>
            <p className="text-xl text-gray-600">
              Resources to help you ace technical interviews
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6, type: 'spring' }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Practice Platforms</h3>
              <div className="space-y-3">
                {interviewResources.platforms?.slice(0, 5).map((platform, index) => (
                  <a
                    key={index}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <span className="font-medium text-gray-800">{platform.name}</span>
                    <ArrowRight className="w-4 h-4 text-gray-500" />
                  </a>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.6, type: 'spring' }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Topics</h3>
              <div className="space-y-2">
                {interviewResources.topics?.slice(0, 8).map((topic, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">{topic}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6, type: 'spring' }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Companies</h3>
              <div className="grid grid-cols-2 gap-2">
                {interviewResources.companies?.slice(0, 10).map((company, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded text-center text-sm text-gray-700">
                    {company}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.7, type: 'spring' }}
        className="py-20 bg-gradient-to-r from-blue-600 to-purple-600"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Skill Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of CS students who are already learning and growing together on SkillSwap
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Create Free Account
            </Link>
            <Link
              to="/discussions"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Join Discussions
            </Link>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home; 