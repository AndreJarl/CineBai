import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';

const isProd = ENV_VARS.NODE_ENV === "production";

export const cookieOptions = {
  httpOnly: true,
  secure: isProd,                    // required when sameSite is "none"
  sameSite: isProd ? "none" : "lax", // "none" for cross-site (Vercel -> Render)
};

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "7d" });

  res.cookie("CineBai-token", token, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};