import api from './api';

// Get all skill categories
export const getSkillCategories = async () => {
  try {
    const response = await api.get('/skills/categories');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get popular skills for Indian CS students
export const getPopularSkills = async () => {
  try {
    const response = await api.get('/skills/popular');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get Indian universities and related data
export const getIndianUniversities = async () => {
  try {
    const response = await api.get('/skills/universities');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Search skills
export const searchSkills = async (query, category = 'all') => {
  try {
    const response = await api.get('/skills/search', {
      params: { query, category }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get trending skills
export const getTrendingSkills = async () => {
  try {
    const response = await api.get('/skills/trending');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get skills by category
export const getSkillsByCategory = async (category) => {
  try {
    const response = await api.get('/skills/categories');
    const categories = response.data.data;
    const categoryData = categories.find(cat => cat.id === category);
    return categoryData ? categoryData.skills : [];
  } catch (error) {
    throw error;
  }
};

// Get skill suggestions based on user's major
export const getSkillSuggestions = (major) => {
  const suggestions = {
    'Computer Science and Engineering': [
      'Data Structures', 'Algorithms', 'System Design', 'Database Management',
      'Computer Networks', 'Operating Systems', 'Software Engineering'
    ],
    'Information Technology': [
      'Web Development', 'Database Management', 'Network Administration',
      'System Administration', 'IT Project Management', 'Cybersecurity'
    ],
    'Data Science': [
      'Python', 'Machine Learning', 'Data Analysis', 'SQL', 'Statistics',
      'Data Visualization', 'Big Data Technologies'
    ],
    'Artificial Intelligence': [
      'Machine Learning', 'Deep Learning', 'Neural Networks', 'Python',
      'TensorFlow', 'PyTorch', 'Computer Vision', 'NLP'
    ],
    'Cybersecurity': [
      'Network Security', 'Ethical Hacking', 'Cryptography', 'Digital Forensics',
      'Security Auditing', 'Incident Response', 'Penetration Testing'
    ],
    'Software Engineering': [
      'Software Development', 'System Design', 'Testing', 'DevOps',
      'Agile Methodologies', 'Version Control', 'Code Review'
    ]
  };
  
  return suggestions[major] || [
    'Python', 'Java', 'JavaScript', 'Data Structures', 'Algorithms',
    'Web Development', 'Database Management', 'Git'
  ];
};

// Get career path suggestions
export const getCareerPathSuggestions = () => {
  return [
    {
      title: 'Software Development',
      description: 'Build applications and systems',
      skills: ['Programming Languages', 'Web Development', 'Database Management'],
      companies: ['TCS', 'Infosys', 'Wipro', 'HCL', 'Tech Mahindra']
    },
    {
      title: 'Data Science & Analytics',
      description: 'Analyze data and build ML models',
      skills: ['Data Science', 'Machine Learning', 'Statistics', 'Python'],
      companies: ['Amazon', 'Google', 'Microsoft', 'IBM', 'Accenture']
    },
    {
      title: 'DevOps & Cloud',
      description: 'Manage infrastructure and deployment',
      skills: ['Cloud Computing', 'DevOps', 'Linux', 'Docker', 'Kubernetes'],
      companies: ['AWS', 'Azure', 'Google Cloud', 'Red Hat', 'VMware']
    },
    {
      title: 'Cybersecurity',
      description: 'Protect systems and data',
      skills: ['Cybersecurity', 'Network Security', 'Ethical Hacking'],
      companies: ['Cisco', 'Palo Alto Networks', 'Symantec', 'McAfee']
    },
    {
      title: 'Mobile Development',
      description: 'Create mobile applications',
      skills: ['Mobile Development', 'React Native', 'Flutter', 'iOS/Android'],
      companies: ['Apple', 'Google', 'Samsung', 'OnePlus', 'Xiaomi']
    },
    {
      title: 'Blockchain & Web3',
      description: 'Build decentralized applications',
      skills: ['Blockchain', 'Smart Contracts', 'Web3', 'Solidity'],
      companies: ['Coinbase', 'Binance', 'Ethereum Foundation', 'Polygon']
    }
  ];
};

// Get interview preparation resources
export const getInterviewResources = () => {
  return {
    platforms: [
      { name: 'LeetCode', url: 'https://leetcode.com', focus: 'Coding Problems' },
      { name: 'HackerRank', url: 'https://hackerrank.com', focus: 'Programming Challenges' },
      { name: 'Codeforces', url: 'https://codeforces.com', focus: 'Competitive Programming' },
      { name: 'GeeksforGeeks', url: 'https://geeksforgeeks.org', focus: 'DSA & Company Prep' },
      { name: 'InterviewBit', url: 'https://interviewbit.com', focus: 'Interview Preparation' }
    ],
    topics: [
      'Data Structures & Algorithms',
      'System Design',
      'Database Design',
      'Object-Oriented Programming',
      'Operating Systems',
      'Computer Networks',
      'Software Engineering',
      'Machine Learning',
      'Web Technologies',
      'Mobile Development'
    ],
    companies: [
      'Google', 'Microsoft', 'Amazon', 'Meta', 'Apple',
      'Netflix', 'Uber', 'Airbnb', 'Twitter', 'LinkedIn',
      'TCS', 'Infosys', 'Wipro', 'HCL', 'Tech Mahindra',
      'Cognizant', 'Accenture', 'Capgemini', 'IBM', 'Oracle'
    ]
  };
};

// Get hackathon resources
export const getHackathonResources = () => {
  return {
    platforms: [
      { name: 'Devpost', url: 'https://devpost.com', description: 'Find and join hackathons' },
      { name: 'HackerEarth', url: 'https://hackerearth.com', description: 'Indian hackathon platform' },
      { name: 'MLH', url: 'https://mlh.io', description: 'Major League Hacking' },
      { name: 'AngelHack', url: 'https://angelhack.com', description: 'Global hackathon series' }
    ],
    popularTechnologies: [
      'React', 'Node.js', 'Python', 'Flutter', 'Firebase',
      'AWS', 'TensorFlow', 'Blockchain', 'AR/VR', 'IoT'
    ],
    tips: [
      'Plan your project scope carefully',
      'Use version control from the start',
      'Focus on a working MVP',
      'Prepare a good presentation',
      'Network with other participants',
      'Document your code properly'
    ]
  };
}; 