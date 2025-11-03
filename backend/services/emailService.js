import nodemailer from "nodemailer";
import { ENV_VARS } from "../config/envVars.js";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
         user: ENV_VARS.EMAIL_USER,
         pass: ENV_VARS.EMAIL_PASS
    }
});

export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${ENV_VARS.FE_URL}/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
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
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send password reset email');
  }
};