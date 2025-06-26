import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV_VARS} from "../config/envVars.js";

export const protectRoutes = async (req,res,next) =>{
      try {
         const token = req.cookies["CineBai-token"];

         if(!token){
             return res.status(401).json({success:false, message:"No token or Invalid token"});
         }

         const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
         console.log(decoded);
         if(!decoded){
            return res.status(401).json({success:false, message:"No token or Invalid token"});
         }

         const user = await User.findById(decoded.userId).select("-password");

         if(!user){
             return res.status(404).json({success:false, message:"user not found"});

         }

         req.user = user;
         next();
      } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
      }
}