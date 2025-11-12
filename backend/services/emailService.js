import sgMail from "@sendgrid/mail";
import { ENV_VARS } from "../config/envVars.js";

// Validate required environment variables
if (!ENV_VARS.SENDGRID_API_KEY) {
  console.error("❌ ERROR: SENDGRID_API_KEY is not set in environment variables");
} else {
  // Set SendGrid API key
  sgMail.setApiKey(ENV_VARS.SENDGRID_API_KEY);
  console.log("✅ SendGrid API key configured");
}

if (!ENV_VARS.EMAIL_USER) {
  console.error("❌ ERROR: EMAIL_USER is not set in environment variables");
}

if (!ENV_VARS.FE_URL) {
  console.error("❌ ERROR: FE_URL is not set in environment variables");
}

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
  
  const msg = {
    to: email,
    from: ENV_VARS.EMAIL_USER, // Must be a verified sender in SendGrid
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
    const response = await sgMail.send(msg);
    console.log('✅ Password reset email sent successfully');
    console.log('📧 SendGrid response status:', response[0].statusCode);
    return response;
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    
    // SendGrid provides detailed error information
    if (error.response) {
      console.error('SendGrid error details:', {
        statusCode: error.response.statusCode,
        body: error.response.body,
        headers: error.response.headers
      });
      
      // Provide user-friendly error messages based on SendGrid error codes
      if (error.response.statusCode === 401) {
        throw new Error('Email authentication failed. Please check your SendGrid API key.');
      } else if (error.response.statusCode === 403) {
        throw new Error('SendGrid API key does not have permission to send emails.');
      } else if (error.response.statusCode === 400) {
        const errorMessage = error.response.body?.errors?.[0]?.message || 'Invalid email request.';
        throw new Error(`Email validation error: ${errorMessage}`);
      } else {
        throw new Error(`Failed to send email. Status: ${error.response.statusCode}`);
      }
    } else {
      throw new Error(`Failed to send password reset email: ${error.message}`);
    }
  }
};