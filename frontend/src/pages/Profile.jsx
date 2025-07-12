import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  User, 
  MapPin, 
  GraduationCap, 
  Code, 
  Plus, 
  X, 
  Edit3, 
  Save, 
  Camera,
  Github,
  Linkedin,
  Globe,
  Award,
  Calendar,
  Clock
} from 'lucide-react';
import { getSkillCategories, getIndianUniversities, getSkillSuggestions } from '../services/skills';
import { updateProfile, getProfile } from '../services/profile';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion'

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [skillCategories, setSkillCategories] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    city: '',
    state: '',
    githubProfile: '',
    linkedinProfile: '',
    portfolio: '',
    currentSemester: '',
    cgpa: '',
    skillsOffered: [],
    skillsWanted: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, categoriesRes, universitiesRes] = await Promise.all([
          getProfile(),
          getSkillCategories(),
          getIndianUniversities()
        ]);

        if (profileRes.success) {
          setProfile(profileRes.data);
          setFormData({
            bio: profileRes.data.bio || '',
            location: profileRes.data.location || '',
            city: profileRes.data.city || '',
            state: profileRes.data.state || '',
            githubProfile: profileRes.data.githubProfile || '',
            linkedinProfile: profileRes.data.linkedinProfile || '',
            portfolio: profileRes.data.portfolio || '',
            currentSemester: profileRes.data.currentSemester || '',
            cgpa: profileRes.data.cgpa || '',
            skillsOffered: profileRes.data.skillsOffered || [],
            skillsWanted: profileRes.data.skillsWanted || []
          });
        }

        setSkillCategories(categoriesRes.data || []);
        setUniversities(universitiesRes.data || {});
      } catch (error) {
        console.error('Error fetching profile data:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await updateProfile(formData);
      if (response.success) {
        setProfile(response.data);
        setIsEditing(false);
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const addSkillOffered = () => {
    setFormData(prev => ({
      ...prev,
      skillsOffered: [...prev.skillsOffered, {
        name: '',
        category: 'programming_languages',
        description: '',
        level: 'intermediate',
        projects: [],
        certifications: []
      }]
    }));
  };

  const removeSkillOffered = (index) => {
    setFormData(prev => ({
      ...prev,
      skillsOffered: prev.skillsOffered.filter((_, i) => i !== index)
    }));
  };

  const updateSkillOffered = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      skillsOffered: prev.skillsOffered.map((skill, i) => 
        i === index ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const addSkillWanted = () => {
    setFormData(prev => ({
      ...prev,
      skillsWanted: [...prev.skillsWanted, {
        name: '',
        category: 'programming_languages',
        description: '',
        priority: 'medium',
        learningGoal: 'personal_project'
      }]
    }));
  };

  const removeSkillWanted = (index) => {
    setFormData(prev => ({
      ...prev,
      skillsWanted: prev.skillsWanted.filter((_, i) => i !== index)
    }));
  };

  const updateSkillWanted = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      skillsWanted: prev.skillsWanted.map((skill, i) => 
        i === index ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const getSuggestedSkills = () => {
    return getSkillSuggestions(user?.major || 'Computer Science and Engineering');
  };

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
      className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-white relative overflow-hidden py-8"
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
          className="bg-gradient-to-tr from-blue-200 via-purple-200 to-white rounded-2xl shadow-xl p-8 mb-8 border border-blue-100"
        >
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-blue-900 drop-shadow-lg">
                  {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-purple-700 font-semibold">{user?.email}</p>
                <div className="flex items-center mt-2">
                  <GraduationCap className="w-4 h-4 text-purple-500 mr-2" />
                  <span className="text-md text-blue-700 font-medium">
                    {user?.university} • {user?.major}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center px-5 py-2 bg-gradient-to-r from-purple-500 via-blue-400 to-blue-700 text-white rounded-lg font-semibold shadow-lg hover:from-purple-600 hover:to-blue-800 transition-all"
            >
              {isEditing ? <X className="w-5 h-5 mr-2" /> : <Edit3 className="w-5 h-5 mr-2" />}
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
          {/* Profile Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div whileHover={{ scale: 1.04 }} className="text-center p-4 bg-gradient-to-tr from-blue-100 via-white to-purple-100 rounded-xl shadow">
              <div className="text-2xl font-bold text-blue-600">
                {profile?.skillsOffered?.length || 0}
              </div>
              <div className="text-sm text-blue-900 font-semibold">Skills Offered</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} className="text-center p-4 bg-gradient-to-tr from-green-100 via-white to-blue-100 rounded-xl shadow">
              <div className="text-2xl font-bold text-green-600">
                {profile?.skillsWanted?.length || 0}
              </div>
              <div className="text-sm text-green-900 font-semibold">Skills Wanted</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} className="text-center p-4 bg-gradient-to-tr from-purple-100 via-white to-blue-100 rounded-xl shadow">
              <div className="text-2xl font-bold text-purple-600">
                {profile?.completedSwaps || 0}
              </div>
              <div className="text-sm text-purple-900 font-semibold">Completed Swaps</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} className="text-center p-4 bg-gradient-to-tr from-yellow-100 via-white to-blue-100 rounded-xl shadow">
              <div className="text-2xl font-bold text-yellow-600">
                {profile?.rating?.average?.toFixed(1) || '0.0'}
              </div>
              <div className="text-sm text-yellow-900 font-semibold">Rating</div>
            </motion.div>
          </div>
        </motion.div>
        {/* Profile Form */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7, type: 'spring' }}
          className="bg-gradient-to-tr from-white via-blue-100 to-purple-100 rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Profile Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                rows="4"
                placeholder="Tell us about yourself, your interests, and what you're passionate about..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                placeholder="City, State"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                placeholder="Your city"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <select
                value={formData.state}
                onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              >
                <option value="">Select State</option>
                {universities.states?.map((state, index) => (
                  <option key={index} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Semester
              </label>
              <select
                value={formData.currentSemester}
                onChange={(e) => setFormData(prev => ({ ...prev, currentSemester: e.target.value }))}
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              >
                <option value="">Select Semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CGPA
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={formData.cgpa}
                onChange={(e) => setFormData(prev => ({ ...prev, cgpa: e.target.value }))}
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                placeholder="e.g., 8.5"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Github className="w-4 h-4 inline mr-2" />
                  GitHub Profile
                </label>
                <input
                  type="url"
                  value={formData.githubProfile}
                  onChange={(e) => setFormData(prev => ({ ...prev, githubProfile: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Linkedin className="w-4 h-4 inline mr-2" />
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  value={formData.linkedinProfile}
                  onChange={(e) => setFormData(prev => ({ ...prev, linkedinProfile: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Portfolio
                </label>
                <input
                  type="url"
                  value={formData.portfolio}
                  onChange={(e) => setFormData(prev => ({ ...prev, portfolio: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  placeholder="https://yourportfolio.com"
                />
              </div>
            </div>
          </div>

          {/* Skills Offered */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Skills I Can Teach</h3>
              {isEditing && (
                <button
                  onClick={addSkillOffered}
                  className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </button>
              )}
            </div>

            {formData.skillsOffered.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Code className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No skills added yet. Add your first skill to start teaching others!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.skillsOffered.map((skill, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Skill Name
                        </label>
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => updateSkillOffered(index, 'name', e.target.value)}
                          disabled={!isEditing}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                          placeholder="e.g., React, Python, Machine Learning"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category
                        </label>
                        <select
                          value={skill.category}
                          onChange={(e) => updateSkillOffered(index, 'category', e.target.value)}
                          disabled={!isEditing}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                        >
                          {skillCategories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Level
                        </label>
                        <select
                          value={skill.level}
                          onChange={(e) => updateSkillOffered(index, 'level', e.target.value)}
                          disabled={!isEditing}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                          <option value="expert">Expert</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={skill.description}
                        onChange={(e) => updateSkillOffered(index, 'description', e.target.value)}
                        disabled={!isEditing}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                        rows="2"
                        placeholder="Describe your expertise in this skill..."
                      />
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => removeSkillOffered(index)}
                        className="mt-2 text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove Skill
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Skills Wanted */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Skills I Want to Learn</h3>
              {isEditing && (
                <button
                  onClick={addSkillWanted}
                  className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </button>
              )}
            </div>

            {formData.skillsWanted.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Award className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No skills added yet. Add skills you want to learn!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.skillsWanted.map((skill, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Skill Name
                        </label>
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => updateSkillWanted(index, 'name', e.target.value)}
                          disabled={!isEditing}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                          placeholder="e.g., React, Python, Machine Learning"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Priority
                        </label>
                        <select
                          value={skill.priority}
                          onChange={(e) => updateSkillWanted(index, 'priority', e.target.value)}
                          disabled={!isEditing}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Learning Goal
                        </label>
                        <select
                          value={skill.learningGoal}
                          onChange={(e) => updateSkillWanted(index, 'learningGoal', e.target.value)}
                          disabled={!isEditing}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                        >
                          <option value="personal_project">Personal Project</option>
                          <option value="academic">Academic</option>
                          <option value="career_advancement">Career Advancement</option>
                          <option value="interview_prep">Interview Prep</option>
                          <option value="hackathon">Hackathon</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={skill.description}
                        onChange={(e) => updateSkillWanted(index, 'description', e.target.value)}
                        disabled={!isEditing}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                        rows="2"
                        placeholder="Why do you want to learn this skill?"
                      />
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => removeSkillWanted(index)}
                        className="mt-2 text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove Skill
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Suggested Skills */}
          {isEditing && (
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Suggested Skills for {user?.major}</h3>
              <div className="flex flex-wrap gap-2">
                {getSuggestedSkills().map((skill, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const skillExists = formData.skillsWanted.some(s => s.name === skill);
                      if (!skillExists) {
                        addSkillWanted();
                        setTimeout(() => {
                          const newIndex = formData.skillsWanted.length;
                          updateSkillWanted(newIndex, 'name', skill);
                        }, 100);
                      }
                    }}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Save Button */}
          {isEditing && (
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile; 