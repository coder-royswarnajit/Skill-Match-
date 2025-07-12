const Profile = require('../models/Profile');
const { indianUniversities, csMajors, indianStates, popularCities } = require('../utils/indianUniversities');

// Get all skill categories
const getSkillCategories = async (req, res) => {
  try {
    const categories = [
      {
        id: 'programming_languages',
        name: 'Programming Languages',
        description: 'Core programming languages and frameworks',
        skills: [
          'Python', 'Java', 'JavaScript', 'C++', 'C#', 'Go', 'Rust', 'Swift',
          'Kotlin', 'TypeScript', 'PHP', 'Ruby', 'Scala', 'R', 'MATLAB',
          'Assembly', 'COBOL', 'Fortran', 'Pascal', 'Perl', 'Lua', 'Julia'
        ]
      },
      {
        id: 'web_development',
        name: 'Web Development',
        description: 'Frontend, backend, and full-stack web development',
        skills: [
          'React', 'Angular', 'Vue.js', 'Node.js', 'Express.js', 'Django',
          'Flask', 'Spring Boot', 'ASP.NET', 'Laravel', 'Ruby on Rails',
          'HTML5', 'CSS3', 'Sass/SCSS', 'Bootstrap', 'Tailwind CSS',
          'Next.js', 'Nuxt.js', 'Gatsby', 'GraphQL', 'REST APIs',
          'Webpack', 'Babel', 'Vite', 'npm/yarn', 'Git'
        ]
      },
      {
        id: 'mobile_development',
        name: 'Mobile Development',
        description: 'iOS, Android, and cross-platform development',
        skills: [
          'React Native', 'Flutter', 'Xamarin', 'Ionic', 'NativeScript',
          'Swift', 'Kotlin', 'Java (Android)', 'Objective-C',
          'Firebase', 'AWS Mobile', 'App Store Connect', 'Google Play Console',
          'Mobile UI/UX Design', 'Mobile Testing', 'Performance Optimization'
        ]
      },
      {
        id: 'data_science',
        name: 'Data Science',
        description: 'Data analysis, visualization, and statistical modeling',
        skills: [
          'Python (Pandas, NumPy)', 'R', 'SQL', 'Tableau', 'Power BI',
          'Jupyter Notebooks', 'Apache Spark', 'Hadoop', 'Hive',
          'Statistical Analysis', 'Data Visualization', 'ETL Processes',
          'Data Mining', 'Business Intelligence', 'Predictive Analytics'
        ]
      },
      {
        id: 'machine_learning',
        name: 'Machine Learning',
        description: 'ML algorithms, deep learning, and AI applications',
        skills: [
          'TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'OpenCV',
          'Natural Language Processing', 'Computer Vision', 'Neural Networks',
          'Deep Learning', 'Reinforcement Learning', 'Transfer Learning',
          'Model Deployment', 'MLOps', 'AutoML', 'Feature Engineering'
        ]
      },
      {
        id: 'cybersecurity',
        name: 'Cybersecurity',
        description: 'Security, ethical hacking, and digital forensics',
        skills: [
          'Network Security', 'Web Application Security', 'Penetration Testing',
          'Ethical Hacking', 'Cryptography', 'Digital Forensics',
          'Security Auditing', 'Incident Response', 'Vulnerability Assessment',
          'Security Tools (Wireshark, Metasploit)', 'Compliance (ISO 27001)',
          'Threat Intelligence', 'Security Architecture'
        ]
      },
      {
        id: 'cloud_computing',
        name: 'Cloud Computing',
        description: 'Cloud platforms and infrastructure management',
        skills: [
          'AWS', 'Azure', 'Google Cloud Platform', 'Docker', 'Kubernetes',
          'Terraform', 'Ansible', 'Jenkins', 'CI/CD', 'Microservices',
          'Serverless Computing', 'Cloud Security', 'Load Balancing',
          'Auto Scaling', 'Monitoring & Logging', 'Cost Optimization'
        ]
      },
      {
        id: 'devops',
        name: 'DevOps',
        description: 'Development operations and automation',
        skills: [
          'Git', 'GitHub/GitLab', 'Jenkins', 'Travis CI', 'CircleCI',
          'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Chef',
          'Puppet', 'Monitoring (Prometheus, Grafana)', 'ELK Stack',
          'Infrastructure as Code', 'Continuous Integration/Deployment'
        ]
      },
      {
        id: 'database',
        name: 'Database Management',
        description: 'Relational and NoSQL databases',
        skills: [
          'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Cassandra',
          'Oracle', 'SQL Server', 'SQLite', 'Neo4j', 'Elasticsearch',
          'Database Design', 'Query Optimization', 'Data Modeling',
          'Database Administration', 'Backup & Recovery'
        ]
      },
      {
        id: 'algorithms',
        name: 'Algorithms & Data Structures',
        description: 'Problem solving and algorithmic thinking',
        skills: [
          'Data Structures', 'Algorithm Design', 'Dynamic Programming',
          'Graph Algorithms', 'Sorting & Searching', 'Tree Structures',
          'Hash Tables', 'Heaps', 'Queues & Stacks', 'Complexity Analysis',
          'Competitive Programming', 'LeetCode', 'HackerRank', 'Codeforces'
        ]
      },
      {
        id: 'system_design',
        name: 'System Design',
        description: 'Large-scale system architecture and design',
        skills: [
          'Distributed Systems', 'Microservices Architecture', 'Load Balancing',
          'Caching Strategies', 'Database Sharding', 'Message Queues',
          'API Design', 'Scalability Patterns', 'High Availability',
          'Performance Optimization', 'System Monitoring', 'Architecture Patterns'
        ]
      },
      {
        id: 'networking',
        name: 'Computer Networks',
        description: 'Network protocols and infrastructure',
        skills: [
          'TCP/IP', 'HTTP/HTTPS', 'DNS', 'VPN', 'Firewalls',
          'Network Security', 'Routing & Switching', 'Network Protocols',
          'Network Administration', 'Troubleshooting', 'Network Design',
          'Wireless Networks', 'Network Monitoring'
        ]
      },
      {
        id: 'game_development',
        name: 'Game Development',
        description: 'Game design and development',
        skills: [
          'Unity', 'Unreal Engine', 'Godot', 'GameMaker Studio',
          'C#', 'C++', 'Game Design Principles', '3D Modeling',
          'Animation', 'Physics Engines', 'Game AI', 'Multiplayer Development',
          'Mobile Game Development', 'VR/AR Development'
        ]
      },
      {
        id: 'blockchain',
        name: 'Blockchain & Web3',
        description: 'Blockchain technology and decentralized applications',
        skills: [
          'Ethereum', 'Solidity', 'Smart Contracts', 'Web3.js',
          'Bitcoin', 'Hyperledger', 'DeFi', 'NFTs', 'Cryptocurrency',
          'Blockchain Architecture', 'Consensus Mechanisms', 'DApp Development',
          'MetaMask', 'IPFS', 'Zero-Knowledge Proofs'
        ]
      },
      {
        id: 'iot',
        name: 'Internet of Things (IoT)',
        description: 'Connected devices and embedded systems',
        skills: [
          'Arduino', 'Raspberry Pi', 'ESP32', 'MQTT', 'CoAP',
          'IoT Protocols', 'Sensor Networks', 'Edge Computing',
          'Embedded Systems', 'Firmware Development', 'IoT Security',
          'Cloud IoT Platforms', 'Data Analytics for IoT'
        ]
      }
    ];

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching skill categories',
      error: error.message
    });
  }
};

// Get popular skills for Indian CS students
const getPopularSkills = async (req, res) => {
  try {
    const popularSkills = [
      // Programming Languages
      'Python', 'Java', 'JavaScript', 'C++', 'C#',
      
      // Web Development
      'React', 'Node.js', 'HTML/CSS', 'MongoDB', 'Express.js',
      
      // Data Science & ML
      'Machine Learning', 'Data Analysis', 'SQL', 'Pandas', 'NumPy',
      
      // Cloud & DevOps
      'AWS', 'Docker', 'Git', 'Linux', 'Jenkins',
      
      // Competitive Programming
      'Data Structures', 'Algorithms', 'Problem Solving', 'Dynamic Programming',
      
      // Mobile Development
      'Android Development', 'React Native', 'Flutter',
      
      // Other Popular Skills
      'Cybersecurity', 'Blockchain', 'DevOps', 'System Design'
    ];

    res.json({
      success: true,
      data: popularSkills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching popular skills',
      error: error.message
    });
  }
};

// Get Indian universities data
const getIndianUniversities = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        universities: indianUniversities,
        majors: csMajors,
        states: indianStates,
        cities: popularCities
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching Indian universities data',
      error: error.message
    });
  }
};

// Search skills
const searchSkills = async (req, res) => {
  try {
    const { query, category } = req.query;
    
    let searchQuery = {};
    
    if (query) {
      searchQuery['skillsOffered.name'] = { $regex: query, $options: 'i' };
    }
    
    if (category && category !== 'all') {
      searchQuery['skillsOffered.category'] = category;
    }
    
    const profiles = await Profile.find(searchQuery)
      .populate('userId', 'firstName lastName university')
      .limit(20);
    
    const skills = [];
    profiles.forEach(profile => {
      profile.skillsOffered.forEach(skill => {
        if (!skills.find(s => s.name === skill.name)) {
          skills.push({
            name: skill.name,
            category: skill.category,
            level: skill.level,
            user: profile.userId
          });
        }
      });
    });
    
    res.json({
      success: true,
      data: skills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching skills',
      error: error.message
    });
  }
};

// Get trending skills (based on most wanted skills)
const getTrendingSkills = async (req, res) => {
  try {
    const profiles = await Profile.find({})
      .populate('userId', 'firstName lastName university')
      .limit(100);
    
    const skillCount = {};
    
    profiles.forEach(profile => {
      profile.skillsWanted.forEach(skill => {
        if (skillCount[skill.name]) {
          skillCount[skill.name]++;
        } else {
          skillCount[skill.name] = 1;
        }
      });
    });
    
    const trendingSkills = Object.entries(skillCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 20)
      .map(([name, count]) => ({ name, count }));
    
    res.json({
      success: true,
      data: trendingSkills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching trending skills',
      error: error.message
    });
  }
};

module.exports = {
  getSkillCategories,
  getPopularSkills,
  getIndianUniversities,
  searchSkills,
  getTrendingSkills
}; 