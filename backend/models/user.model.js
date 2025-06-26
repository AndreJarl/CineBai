import mongoose from "mongoose";

const userShcema = mongoose.Schema({
    username:{
         type: String,
         required : true,
         uniques: true
    },
    email:{
         type: String,
         required : true,
         uniques: true
    },
    password:{
         type: String,
         required : true
    },
    image:{
        type: String,
        default: ""
    },
    favorites:{
        type: [
            {
                id: String,
                mediaType: String
            }
        ],
        default: []
    },
    watchLater:{
        type: [
            {
                id: String,
                mediaType: String
            }
        ],
        default: []
    }
});

export const User = mongoose.model("User", userShcema);