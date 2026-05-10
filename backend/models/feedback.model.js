// models/feedback.model.js
import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    summary: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    details: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;