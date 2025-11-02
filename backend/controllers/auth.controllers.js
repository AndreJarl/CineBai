
import { User } from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import validator from "validator";
import crypto from "crypto"

import { sendPasswordResetEmail } from "../utils/emailService.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookies.js";


export async function signup(req, res) {
    try {
        const {username,email,password} = req.body;

        if(!username || !email ||!password){
             return res.status(400).json({success: false, message: "All fields are required."});
        }

            if(!validator.isEmail(email)){
                return res.status(400).json({ success: false, message: "Invalid email" });
            }

               if (!validator.isStrongPassword(password)) {
               return res.status(400).json({
               success: false,
               message: "Password must contain upper/lowercase letters, numbers, and symbols."
               });
               }


        const existingEmail = await User.findOne({email: email});

        if(existingEmail){
             return res.status(400).json({success: false, message:"email already exists."})
        }

        const existingUsername = await User.findOne({username: username});

        if(existingUsername){
              return res.status(400).json({success: false, message:"username already exists."})
        }
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

       const image = "";

       const newUser = new User({
             username,
             email,
             password: hashedPassword,
             image
       });

       generateTokenAndSetCookie(newUser._id, res);
       await newUser.save();

     
       res.status(201).json({
   success: true,
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                image: newUser.image,
            }

});
    } catch (error) {
        console.log("Error in singin controller", error.message);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

export async function login(req, res) {
       try {
         const {email, password} = req.body;
         
         if(!email || !password){
              return res.status(400).json({success: false, message: "Invalid credentials"});
         }

         const user = await User.findOne({email:email});
         if(!user){
              return res.status(400).json({success: false, message:"Invalid credentials"});
         }

         const isPasswordCorrect = await bcryptjs.compare(password, user.password);
         if(!isPasswordCorrect){
              return res.status(400).json({success: false, message:"Invalid credentials"});
         }

         generateTokenAndSetCookie(user._id, res);
         res.status(200).json({
              success:true,
              message:"Logged in successfully.",
              user:{
                 username: user.username,
                 email: user.email,
                 image: user.image
              }

         })

       } catch (error) {
        	console.log("Error in login controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
       }

} 

export async function logout(req, res){
     try {
        res.clearCookie("CineBai-token");
        res.status(200).json({success:true, message: "Logout successfully"});
     } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({success: false, message: "Internal server error"});
     }
}


export async function forgotPassword (req, res){
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    
    // Always return success to prevent email enumeration
    if (!user) {
      return res.json({ 
        success: true, 
        message: 'If an account with that email exists, a password reset link has been sent.' 
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Hash token and set expiry (1 hour)
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    
    await user.save();

    // Send email with reset token (unhashed)
    await sendPasswordResetEmail(user.email, resetToken);

    res.json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent.'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during password reset request'
    });
  }
};

// Verify reset token
export async function verifyResetToken  (req, res) {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Reset token is required'
      });
    }

    // Hash the token to compare with stored hash
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    res.json({
      success: true,
      message: 'Token is valid'
    });

  } catch (error) {
    console.error('Verify token error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during token verification'
    });
  }
};

// Reset password
export async function resetPassword(req, res){
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Token and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Hash the token to compare with stored hash
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Hash new password
    const saltRounds = 12;
    const hashedPassword = await bcryptjs.hash(newPassword, saltRounds);

    // Update user password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    
    await user.save();

    res.json({
      success: true,
      message: 'Password has been reset successfully'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during password reset'
    });
  }
};


export async function authCheck(req, res){
          try {
               res.status(200).json({success:true, user: req.user})
          } catch (error) {
               console.log("Error in authcheck controller", error.message);
               res.status(500).json({success:false, message: "Internal server error"});
          }
}