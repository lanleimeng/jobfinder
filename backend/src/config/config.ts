import dotenv from 'dotenv';

// Load .env variables
dotenv.config();

export default {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/jobfinder',
  jwtSecret: process.env.JWT_SECRET || 'supersecretjwtkey',
  sessionSecret: process.env.SESSION_SECRET || 'supersecretsessionkey',
};
