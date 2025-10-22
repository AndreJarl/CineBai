import dotenv from 'dotenv';

dotenv.config();


export const ENV_VARS = {
      PORT: process.env.PORT,
      MONGO_URI: process.env.MONGO_URI,
      JWT_SECRET: process.env.JWT_SECRET,
      NODE_ENV: process.env.NODE_ENV,
      TMDB_KEY: process.env.TMDB_KEY,
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
}