// middleware/optionalAuth.js
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV_VARS} from "../config/envVars.js";

export const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies["CineBai-token"];

    // If no token, just continue without user
    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
    
    // If invalid token, just continue without user (don't throw error)
    if (!decoded) {
      req.user = null;
      return next();
    }

    const user = await User.findById(decoded.userId).select("-password");
    req.user = user; // This could be null if user not found
    
    next();
  } catch (error) {
    // If any error (expired token, etc), just continue without user
    console.log("Optional auth error (non-critical): ", error.message);
    req.user = null;
    next();
  }
}