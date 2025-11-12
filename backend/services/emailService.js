import nodemailer from "nodemailer";
import { ENV_VARS } from "../config/envVars.js";

// Validate required environment variables
if (!ENV_VARS.SENDGRID_API_KEY) {
  console.error("❌ ERROR: SENDGRID_API_KEY is not set in environment variables");
}

if (!ENV_VARS.EMAIL_USER) {
  console.error("❌ ERROR: EMAIL_USER is not set in environment variables");
}

if (!ENV_VARS.FE_URL) {
  console.error("❌ ERROR: FE_URL is not set in environment variables");
}

// Updated transporter using SendGrid SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net", // Use SendGrid SMTP host
  port: 587,                 // TLS port
  secure: false,             // false for port 587
  auth: {
    user: "apikey",          // MUST literally be "apikey"
    pass: ENV_VARS.SENDGRID_API_KEY, // Your SendGrid API key
  },
  // Add connection timeout and retry options
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

// Verify transporter on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP connection error:", error.message);
    console.error("Full error:", error);
  } else {
    console.log("✅ SMTP server ready to send emails");
  }
});

export const sendPasswordResetEmail = async (email, resetToken) => {
  // Validate required environment variables
  if (!ENV_VARS.SENDGRID_API_KEY) {
    console.error('❌ SENDGRID_API_KEY is missing');
    throw new Error('Email service configuration error: SENDGRID_API_KEY is not set');
  }

  if (!ENV_VARS.EMAIL_USER) {
    console.error('❌ EMAIL_USER is missing');
    throw new Error('Email service configuration error: EMAIL_USER is not set');
  }

  if (!ENV_VARS.FE_URL) {
    console.error('❌ FE_URL is missing');
    throw new Error('Email service configuration error: FE_URL is not set');
  }

  // Remove trailing slash from FE_URL if present
  const baseUrl = ENV_VARS.FE_URL.replace(/\/$/, '');
  const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;
  
  console.log(`📧 Attempting to send password reset email to: ${email}`);
  console.log(`🔗 Reset URL: ${resetUrl}`);
  
  const mailOptions = {
    from: `"CineBai Support" <${ENV_VARS.EMAIL_USER}>`,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>You requested to reset your password. Click the link below to proceed:</p>
        <a href="${resetUrl}" 
           style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px;">
          Reset Password
        </a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          Or copy and paste this URL in your browser:<br>
          ${resetUrl}
        </p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Password reset email sent successfully');
    console.log('📧 Email info:', {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected
    });
    return info;
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    console.error('Full error details:', {
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode
    });
    
    // Provide more specific error messages
    if (error.code === 'EAUTH') {
      throw new Error('Email authentication failed. Please check your SendGrid API key.');
    } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      throw new Error('Failed to connect to email server. Please try again later.');
    } else {
      throw new Error(`Failed to send password reset email: ${error.message}`);
    }
  }
};