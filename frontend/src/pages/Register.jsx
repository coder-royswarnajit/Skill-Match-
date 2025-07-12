import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/useAuth'
import { Eye, EyeOff, GraduationCap, MapPin, User } from 'lucide-react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const Register = () => {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const password = watch('password')

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setIsLoading(true)
    const result = await registerUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      studentId: data.studentId,
      major: data.major,
      university: data.university,
      graduationYear: data.graduationYear
    })
    setIsLoading(false)

    if (result.success) {
      toast.success('Registration successful! Welcome to SkillSwap!')
      navigate('/dashboard')
    } else {
      toast.error(result.error || 'Registration failed')
    }
  }

  const universities = [
    'UNC Charlotte',
    'North Carolina State University',
    'University of North Carolina at Chapel Hill',
    'Duke University',
    'Other'
  ]

  const majors = [
    'Computer Science',
    'Software Engineering',
    'Information Technology',
    'Computer Engineering',
    'Data Science',
    'Cybersecurity',
    'Other'
  ]

  const graduationYears = [
    '2024',
    '2025',
    '2026',
    '2027',
    '2028',
    '2029',
    '2030+'
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 80, damping: 18 }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(120deg, #e0ffe7 0%, #e0e7ff 100%)' }}
    >
      {/* Animated background shapes */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.10 }}
        transition={{ delay: 0.2, duration: 1.2, type: 'spring' }}
        className="absolute -top-24 -right-24 w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-green-300 via-blue-300 to-purple-300 z-0"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.10 }}
        transition={{ delay: 0.4, duration: 1.2, type: 'spring' }}
        className="absolute -bottom-24 -left-24 w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-purple-200 via-pink-200 to-yellow-200 z-0"
      />
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7, type: 'spring' }}
        className="max-w-lg w-full space-y-8 z-10"
      >
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.7, rotate: 8 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            className="mx-auto h-14 w-14 bg-gradient-to-tr from-green-400 via-blue-400 to-purple-400 rounded-xl flex items-center justify-center shadow-lg"
          >
            <span className="text-white font-extrabold text-2xl tracking-tight">SS</span>
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6, type: 'spring' }}
            className="mt-6 text-center text-4xl font-extrabold text-gray-900 drop-shadow-lg"
          >
            Join SkillSwap
          </motion.h2>
          <p className="mt-2 text-center text-md text-gray-700">
            Connect with fellow CS students and share your skills
          </p>
          <p className="mt-2 text-center text-md text-gray-700">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-bold text-blue-500 hover:text-blue-600 transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>

        <motion.form
          className="mt-8 space-y-6 bg-white/80 rounded-2xl shadow-xl p-8 backdrop-blur-md"
          onSubmit={handleSubmit(onSubmit)}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
        >
          <div className="space-y-6">
            {/* Personal Information */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7, type: 'spring' }}
              className="bg-gradient-to-tr from-green-100 via-blue-100 to-purple-100 p-5 rounded-2xl border border-blue-200 shadow-md"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-500" />
                Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-bold text-gray-700">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    {...register('firstName', {
                      required: 'First name is required',
                      minLength: {
                        value: 2,
                        message: 'First name must be at least 2 characters'
                      }
                    })}
                    className="input mt-1"
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-bold text-gray-700">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    {...register('lastName', {
                      required: 'Last name is required',
                      minLength: {
                        value: 2,
                        message: 'Last name must be at least 2 characters'
                      }
                    })}
                    className="input mt-1"
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="email" className="block text-sm font-bold text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="input mt-1"
                  placeholder="john.doe@uncc.edu"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </motion.div>
            {/* Academic Information */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7, type: 'spring' }}
              className="bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100 p-5 rounded-2xl border border-purple-200 shadow-md"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-purple-500" />
                Academic Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="studentId" className="block text-sm font-bold text-gray-700">
                    Student ID
                  </label>
                  <input
                    id="studentId"
                    type="text"
                    {...register('studentId', {
                      required: 'Student ID is required',
                      pattern: {
                        value: /^\d{8,9}$/,
                        message: 'Please enter a valid student ID'
                      }
                    })}
                    className="input mt-1"
                    placeholder="800123456"
                  />
                  {errors.studentId && (
                    <p className="mt-1 text-sm text-red-600">{errors.studentId.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="graduationYear" className="block text-sm font-bold text-gray-700">
                    Graduation Year
                  </label>
                  <select
                    id="graduationYear"
                    {...register('graduationYear', {
                      required: 'Graduation year is required'
                    })}
                    className="input mt-1"
                  >
                    <option value="">Select Year</option>
                    {graduationYears.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  {errors.graduationYear && (
                    <p className="mt-1 text-sm text-red-600">{errors.graduationYear.message}</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="university" className="block text-sm font-bold text-gray-700">
                  University
                </label>
                <select
                  id="university"
                  {...register('university', {
                    required: 'University is required'
                  })}
                  className="input mt-1"
                >
                  <option value="">Select University</option>
                  {universities.map(uni => (
                    <option key={uni} value={uni}>{uni}</option>
                  ))}
                </select>
                {errors.university && (
                  <p className="mt-1 text-sm text-red-600">{errors.university.message}</p>
                )}
              </div>
            </motion.div>
            {/* Major Selection */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7, type: 'spring' }}
              className="bg-gradient-to-tr from-yellow-100 via-pink-100 to-green-100 p-5 rounded-2xl border border-yellow-200 shadow-md"
            >
              <label htmlFor="major" className="block text-sm font-bold text-gray-700 mb-2">
                Major
              </label>
              <select
                id="major"
                {...register('major', {
                  required: 'Major is required'
                })}
                className="input mt-1"
              >
                <option value="">Select Major</option>
                {majors.map(major => (
                  <option key={major} value={major}>{major}</option>
                ))}
              </select>
              {errors.major && (
                <p className="mt-1 text-sm text-red-600">{errors.major.message}</p>
              )}
            </motion.div>
            {/* Passwords */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7, type: 'spring' }}
              className="bg-gradient-to-tr from-pink-100 via-yellow-100 to-green-100 p-5 rounded-2xl border border-pink-200 shadow-md"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-bold text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters'
                        }
                      })}
                      className="input pr-10"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700">
                    Confirm Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: value => value === password || 'Passwords do not match'
                      })}
                      className="input pr-10"
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
          <div>
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-md font-bold rounded-lg text-white bg-gradient-to-r from-green-400 via-blue-400 to-purple-600 shadow-lg hover:from-green-500 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </motion.div>
  )
}

export default Register 