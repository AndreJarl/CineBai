import dotenv from 'dotenv';

dotenv.config();


export const ENV_VARS = {
      PORT: process.env.PORT,
      MONGO_URI: process.env.MONGO_URI,
      JWT_SECRET: process.env.JWT_SECRET,
      NODE_ENV: process.env.NODE_ENV,
      TMDB_KEY: process.env.TMDB_KEY,
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
      EMAIL_USER : process.env.EMAIL_USER,
      EMAIL_PASS: process.env.EMAIL_PASS,
      FE_URL : process.env.FE_URL,
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
}