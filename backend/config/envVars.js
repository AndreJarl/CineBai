import dotenv from 'dotenv';

dotenv.config();

export const ENV_VARS = {
      PORT: process.env.PORT || 8080,
      MONGO_URI: process.env.MONGO_URI,
      JWT_SECRET: process.env.JWT_SECRET,
      NODE_ENV: process.env.NODE_ENV || 'development',
      TMDB_KEY: process.env.TMDB_KEY,
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
      EMAIL_USER : process.env.EMAIL_USER,
      EMAIL_PASS: process.env.EMAIL_PASS,
      FE_URL : process.env.FE_URL,
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
}

// Validate critical environment variables in production
if (ENV_VARS.NODE_ENV === 'production') {
  const requiredVars = [
    'MONGO_URI',
    'JWT_SECRET',
    'SENDGRID_API_KEY',
    'EMAIL_USER',
    'FE_URL'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables in production:');
    missingVars.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    console.error('Please set these variables in your Render dashboard.');
  } else {
    console.log('✅ All required environment variables are set');
  }
}