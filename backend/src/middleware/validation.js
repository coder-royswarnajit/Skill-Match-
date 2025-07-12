const Joi = require('joi');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }
    next();
  };
};

// Validation schemas
const authSchemas = {
  register: Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required(),
    studentId: Joi.string().pattern(/^\d{8,9}$/).required(),
    university: Joi.string().required(),
    major: Joi.string().required(),
    graduationYear: Joi.string().required()
  }),
  
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
};

const profileSchemas = {
  updateProfile: Joi.object({
    bio: Joi.string().max(500).optional(),
    location: Joi.string().max(100).optional(),
    isPublic: Joi.boolean().optional(),
    availability: Joi.object({
      weekdays: Joi.object({
        morning: Joi.boolean(),
        afternoon: Joi.boolean(),
        evening: Joi.boolean()
      }),
      weekends: Joi.object({
        morning: Joi.boolean(),
        afternoon: Joi.boolean(),
        evening: Joi.boolean()
      }),
      timezone: Joi.string()
    }).optional()
  }),
  
  addSkill: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().max(200).optional(),
    level: Joi.string().valid('beginner', 'intermediate', 'advanced', 'expert').optional(),
    type: Joi.string().valid('offered', 'wanted').required(),
    priority: Joi.string().valid('low', 'medium', 'high').optional()
  })
};

const swapSchemas = {
  createSwap: Joi.object({
    recipientId: Joi.string().required(),
    requestedSkill: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().max(200).optional()
    }).required(),
    offeredSkill: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().max(200).optional()
    }).required(),
    message: Joi.string().max(500).optional(),
    scheduledDate: Joi.date().optional()
  }),
  
  updateSwap: Joi.object({
    status: Joi.string().valid('accepted', 'rejected', 'completed', 'cancelled').required()
  }),
  
  rateSwap: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().max(300).optional()
  })
};

module.exports = {
  validate,
  authSchemas,
  profileSchemas,
  swapSchemas
}; 