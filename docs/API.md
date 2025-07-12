# Skill Swap Platform API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "jwt_token"
  }
}
```

#### POST /auth/login
Login user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "jwt_token"
  }
}
```

#### GET /auth/me
Get current user information.

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

### Profile Management

#### GET /profile/me
Get user profile.

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "user_id",
    "bio": "Software developer with 5 years of experience",
    "location": "New York, NY",
    "profilePhoto": "photo_url",
    "skillsOffered": [
      {
        "_id": "skill_id",
        "name": "JavaScript",
        "description": "Frontend and backend development",
        "level": "advanced",
        "isApproved": true
      }
    ],
    "skillsWanted": [
      {
        "_id": "skill_id",
        "name": "Graphic Design",
        "description": "Logo and UI design",
        "priority": "high"
      }
    ],
    "availability": {
      "weekdays": {
        "morning": false,
        "afternoon": true,
        "evening": true
      },
      "weekends": {
        "morning": true,
        "afternoon": true,
        "evening": false
      },
      "timezone": "UTC-5"
    },
    "isPublic": true,
    "rating": {
      "average": 4.5,
      "count": 10
    },
    "completedSwaps": 5
  }
}
```

#### PUT /profile/me
Update user profile.

**Request Body:**
```json
{
  "bio": "Updated bio",
  "location": "San Francisco, CA",
  "isPublic": true,
  "availability": {
    "weekdays": {
      "morning": false,
      "afternoon": true,
      "evening": true
    },
    "weekends": {
      "morning": true,
      "afternoon": true,
      "evening": false
    },
    "timezone": "UTC-8"
  }
}
```

#### POST /profile/skills
Add a skill to profile.

**Request Body:**
```json
{
  "name": "Python",
  "description": "Data analysis and automation",
  "level": "intermediate",
  "type": "offered"
}
```

#### DELETE /profile/skills/:skillId
Remove a skill from profile.

#### POST /profile/photo
Upload profile photo.

**Request Body:** FormData with 'photo' field

### Swap Management

#### POST /swaps
Create a new swap request.

**Request Body:**
```json
{
  "recipientId": "recipient_user_id",
  "requestedSkill": {
    "name": "Graphic Design",
    "description": "Logo design for my startup"
  },
  "offeredSkill": {
    "name": "JavaScript",
    "description": "Help with React development"
  },
  "message": "I need a logo designed and can help with your React project",
  "scheduledDate": "2024-01-15T10:00:00Z"
}
```

#### GET /swaps
Get user's swaps.

**Query Parameters:**
- `status`: Filter by status (pending, accepted, rejected, completed, cancelled)
- `type`: Filter by type (sent, received)

#### GET /swaps/:id
Get specific swap details.

#### PUT /swaps/:id
Update swap status.

**Request Body:**
```json
{
  "status": "accepted"
}
```

#### DELETE /swaps/:id
Delete a swap request.

#### POST /swaps/:id/rate
Rate a completed swap.

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Great experience working together!"
}
```

### User Search

#### GET /users/search
Search for users.

**Query Parameters:**
- `q`: Search query
- `skill`: Filter by skill name
- `location`: Filter by location
- `page`: Page number
- `limit`: Results per page

#### GET /users/:id/profile
Get public profile of a user.

#### GET /users/skill/:skillName
Get users by skill.

### Admin Endpoints

#### GET /admin/dashboard
Get admin dashboard statistics.

#### GET /admin/users
Get all users (admin only).

#### PUT /admin/users/:id/ban
Ban/unban a user (admin only).

#### PUT /admin/skills/:id/approve
Approve a skill (admin only).

#### PUT /admin/skills/:id/reject
Reject a skill (admin only).

#### GET /admin/reports
Get platform reports (admin only).

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

## Rate Limiting

API requests are limited to 100 requests per 15 minutes per IP address. 