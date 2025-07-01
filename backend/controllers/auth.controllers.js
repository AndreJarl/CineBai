
import { User } from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookies.js";

export async function signup(req, res) {
    try {
        const {username,email,password} = req.body;

        if(!username || !email ||!password){
             return res.status(400).json({success: false, message: "All fields are required."});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
             return res.status(400).json({success:false, message: "Invalid email"});
        }

        if(password.length < 6){
              return res.status(400).json({success:false, message: "password must be at least 6 characters"});
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

export async function authCheck(req, res){
          try {
               res.status(200).json({success:true, user: req.user})
          } catch (error) {
               console.log("Error in authcheck controller", error.message);
               res.status(500).json({success:false, message: "Internal server error"});
          }
}