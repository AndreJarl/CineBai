import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true  // Fixed typo: was "uniques"
    },
    email: {
        type: String,
        required: true,
        unique: true  // Fixed typo: was "uniques"
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    favorites: {
        type: [
            {
                id: String,
                mediaType: String,
                title: String,
                poster_path: String,
            }
        ],
        default: []
    },
    watchLater: {
        type: [
            {
                id: String,
                mediaType: String,
                title: String,
                poster_path: String,
            }
        ],
        default: []
    },
    watched: [{
    id: String,
    mediaType: { type: String, enum: ["movie", "tv"] },
    title: String,
    poster_path: String,
    watchedAt: { type: Date, default: Date.now }, // optional but handy
}],
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, {  // Fixed: Moved timestamps to the correct position
    timestamps: true
});

export const User = mongoose.model("User", userSchema);  // Fixed typo: was "userShcema"