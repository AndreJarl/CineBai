import { User } from "../models/user.model.js";

export async function myProfile(req, res) {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if(!user){
            return res.status(404).json({success:false, message: "User not found"})
        }

        res.json({success:true, user});
    } catch (error) {
        res.status(500).json({success:false, message:"Error"});
    }
} 


export async function addToList(req, res) {
     
        const {type} = req.params;
        const {id, mediaType, title, poster_path} = req.body;
        if(!["favorites", "watchLater"].includes(type)){
            return res.status(400).json({success:false, message:"Invalid list type"});
        }
        if(!["movie", "tv"].includes(mediaType)){
            return res.status(400).json({success:false, message:"Invalid list type"});
        }
      try {
        const user = await User.findById(req.user._id);
        const alreadyExists = user[type].some((item) => String(item.id)=== String(id) && item.mediaType === mediaType);
        if(alreadyExists){
              return res.status(409).json({success:false, message:"Already in the list"});
        }

        user[type].push({id, mediaType, title, poster_path});
        await user.save();

        res.json({success:true, favorites: user.favorites, watchLater: user.watchLater});


      } catch (error) {
           console.error("Error in addToListTV:", error.message);
           res.status(500).json({ success: false, message: "Internal Server Error" });
      }
}



export async function deleteToList(req, res) {
     
        const {type} = req.params;
        const {id, mediaType} = req.body;
        if(!["favorites", "watchLater"].includes(type)){
            return res.status(400).json({success:false, message:"Invalid list type"});
        }
        if(!["movie", "tv"].includes(mediaType)){
            return res.status(400).json({success:false, message:"Invalid list type"});
        }
      try {
        const user = await User.findById(req.user._id);

        user[type] = user[type].filter((item) => !(item.id ===(id) && item.mediaType === mediaType));
        await user.save();

        res.json({success:true, content: user});


      } catch (error) {
           console.error("Error in deleteToListTV:", error.message);
           res.status(500).json({ success: false, message: "Internal Server Error" });
      }
}