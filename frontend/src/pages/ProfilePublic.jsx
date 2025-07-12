import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfileById } from '../services/profile';
import { User, GraduationCap, MapPin, Code, Award, Github, Linkedin, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ProfilePublic = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await getProfileById(userId);
        if (response.success) {
          setProfile(response.data);
        } else {
          toast.error('Profile not found');
          navigate('/browse');
        }
      } catch (error) {
        toast.error('Profile not found');
        navigate('/browse');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 relative overflow-hidden">
          <motion.div
            className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-tr from-blue-400 to-purple-500 opacity-20 rounded-full z-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
          />
          <div className="flex items-center space-x-6 relative z-10">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                {profile.userId?.firstName} {profile.userId?.lastName}
              </h1>
              <p className="text-gray-600 mb-2">{profile.userId?.email}</p>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <GraduationCap className="w-4 h-4 mr-1" />
                {profile.userId?.university} • {profile.userId?.major}
              </div>
              {profile.location && (
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {profile.location}
                </div>
              )}
              <div className="flex space-x-3 mt-2">
                {profile.githubProfile && (
                  <a href={profile.githubProfile} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {profile.linkedinProfile && (
                  <a href={profile.linkedinProfile} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {profile.portfolio && (
                  <a href={profile.portfolio} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-900 transition-colors">
                    <Globe className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
          {profile.bio && (
            <motion.p
              className="mt-6 text-lg text-gray-700 italic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {profile.bio}
            </motion.p>
          )}
        </div>

        {/* Skills Offered */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
            <Code className="w-5 h-5 mr-2" /> Skills Offered
          </h2>
          <div className="flex flex-wrap gap-4">
            {profile.skillsOffered && profile.skillsOffered.length > 0 ? (
              profile.skillsOffered.map((skill, idx) => (
                <motion.div
                  key={idx}
                  className="bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-lg shadow-sm flex flex-col items-start min-w-[160px]"
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(80,0,200,0.12)' }}
                >
                  <span className="font-semibold text-blue-900">{skill.name}</span>
                  <span className="text-xs text-gray-500 mb-1">{skill.category}</span>
                  <span className="text-xs text-gray-600">{skill.level}</span>
                  {skill.description && <span className="text-xs text-gray-700 mt-1">{skill.description}</span>}
                </motion.div>
              ))
            ) : (
              <span className="text-gray-400">No skills listed</span>
            )}
          </div>
        </motion.div>

        {/* Achievements */}
        {profile.achievements && profile.achievements.length > 0 && (
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 mb-8"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2" /> Achievements
            </h2>
            <ul className="space-y-2">
              {profile.achievements.map((ach, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium text-gray-800">{ach.title}</span>
                  <span className="text-xs text-gray-500">{ach.type}</span>
                  <span className="text-xs text-gray-400">{new Date(ach.date).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfilePublic; 